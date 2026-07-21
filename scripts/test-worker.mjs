import assert from "node:assert/strict";
import worker from "../worker/index.js";

class Statement {
  constructor(db, sql) { this.db = db; this.sql = sql; this.args = []; }
  bind(...args) { this.args = args; return this; }
  async run() {
    const sql = this.sql;
    if (sql.startsWith("CREATE ")) return { success: true };
    if (sql.startsWith("INSERT INTO users")) {
      const [email, name, createdAt, updatedAt] = this.args;
      const current = this.db.users.get(email);
      if (current) { if (name) current.full_name = name; current.updated_at = updatedAt; }
      else this.db.users.set(email, { email, full_name: name, state_json: "{}", initialized: 0, created_at: createdAt, updated_at: updatedAt });
      return { success: true };
    }
    if (sql.startsWith("UPDATE users SET state_json")) {
      const [state, updatedAt, email] = this.args;
      Object.assign(this.db.users.get(email), { state_json: state, initialized: 1, updated_at: updatedAt });
      return { success: true };
    }
    if (sql.startsWith("INSERT INTO materials")) {
      const [email, id, name, size, type, mime, r2Key, createdAt] = this.args;
      this.db.materials.set(email + "\n" + id, { user_email: email, id, name, size, type, mime, r2_key: r2Key, created_at: createdAt });
      return { success: true };
    }
    if (sql.startsWith("INSERT INTO auth_sessions")) {
      const [tokenHash, email, googleSub, fullName, createdAt, expiresAt] = this.args;
      this.db.authSessions.set(tokenHash, { token_hash: tokenHash, email, google_sub: googleSub, full_name: fullName, created_at: createdAt, expires_at: expiresAt });
      return { success: true };
    }
    if (sql.startsWith("DELETE FROM auth_sessions WHERE expires_at")) {
      const cutoff = Date.parse(this.args[0]);
      for (const [key, item] of this.db.authSessions) if (Date.parse(item.expires_at) <= cutoff) this.db.authSessions.delete(key);
      return { success: true };
    }
    if (sql.startsWith("DELETE FROM auth_sessions WHERE token_hash")) {
      this.db.authSessions.delete(this.args[0]);
      return { success: true };
    }
    if (sql.startsWith("DELETE FROM materials")) {
      this.db.materials.delete(this.args[0] + "\n" + this.args[1]);
      return { success: true };
    }
    throw new Error("Unhandled run: " + sql);
  }
  async first() {
    const sql = this.sql;
    if (sql.startsWith("SELECT full_name")) return this.db.users.get(this.args[0]) || null;
    if (sql.startsWith("SELECT r2_key FROM materials")) return this.db.materials.get(this.args[0] + "\n" + this.args[1]) || null;
    if (sql.startsWith("SELECT name, mime, r2_key")) return this.db.materials.get(this.args[0] + "\n" + this.args[1]) || null;
    if (sql.startsWith("SELECT email, full_name, expires_at FROM auth_sessions")) return this.db.authSessions.get(this.args[0]) || null;
    throw new Error("Unhandled first: " + sql);
  }
  async all() {
    if (this.sql.startsWith("SELECT id, name, size")) {
      const results = [...this.db.materials.values()].filter((item) => item.user_email === this.args[0]).map((item) => ({ id: item.id, name: item.name, size: item.size, type: item.type, mime: item.mime, createdAt: item.created_at }));
      return { results };
    }
    throw new Error("Unhandled all: " + this.sql);
  }
}

class MockDB {
  users = new Map();
  materials = new Map();
  authSessions = new Map();
  prepare(sql) { return new Statement(this, sql); }
  async batch(statements) { return Promise.all(statements.map((statement) => statement.run())); }
}

class MockBucket {
  objects = new Map();
  async put(key, bytes) { this.objects.set(key, new Uint8Array(bytes)); }
  async get(key) { const bytes = this.objects.get(key); return bytes ? { body: bytes } : null; }
  async delete(key) { this.objects.delete(key); }
}

const clientId = "studia-test-client.apps.googleusercontent.com";
const env = { DB: new MockDB(), BUCKET: new MockBucket(), GOOGLE_CLIENT_ID: clientId };
const call = (path, options = {}) => worker.fetch(new Request("https://studia.test" + path, options), env);

const keyPair = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
const publicJwk = await crypto.subtle.exportKey("jwk", keyPair.publicKey);
Object.assign(publicJwk, { kid: "test-key", use: "sig", alg: "RS256" });
const base64Url = (value) => Buffer.from(typeof value === "string" ? value : value).toString("base64url");
async function googleToken(email, name, overrides = {}) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT", kid: "test-key" }));
  const payload = base64Url(JSON.stringify({ iss: "https://accounts.google.com", aud: clientId, sub: "sub-" + email, email, email_verified: true, name, iat: now - 5, exp: now + 3600, ...overrides }));
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", keyPair.privateKey, new TextEncoder().encode(header + "." + payload));
  return header + "." + payload + "." + base64Url(new Uint8Array(signature));
}
const originalFetch = globalThis.fetch;
globalThis.fetch = async (input, init) => {
  if (String(input) === "https://www.googleapis.com/oauth2/v3/certs") return new Response(JSON.stringify({ keys: [publicJwk] }), { headers: { "content-type": "application/json", "cache-control": "public, max-age=3600" } });
  return originalFetch(input, init);
};

async function signIn(email, name) {
  const response = await call("/api/auth/google", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ credential: await googleToken(email, name) }) });
  assert.equal(response.status, 200);
  const cookie = response.headers.get("set-cookie");
  assert.match(cookie, /__Host-studia_session=/);
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /SameSite=Lax/);
  return cookie.split(";")[0];
}

let response = await call("/");
assert.equal(response.status, 200);
const signInHtml = await response.text();
assert.match(signInHtml, /Google ანგარიშზე/);
assert.match(signInHtml, new RegExp(clientId.replaceAll(".", "\\.")));

response = await call("/", { headers: { "oai-authenticated-user-email": "spoof@example.com" } });
assert.match(await response.text(), /Google ანგარიშზე/);

const anaCookie = await signIn("ana@example.com", "ანა სტუდენტი");
response = await call("/", { headers: { cookie: anaCookie } });
assert.match(await response.text(), /სწავლის ანალიტიკა/);

response = await call("/api/bootstrap");
assert.equal(response.status, 401);

response = await call("/api/bootstrap", { headers: { cookie: anaCookie } });
let payload = await response.json();
assert.equal(payload.isNew, true);
assert.equal(payload.user.name, "ანა სტუდენტი");

const anaState = { profile: { name: "ანა", goalMinutes: 720 }, tasks: [{ id: "t1", name: "ესე", subject: "ისტორია", date: "2026-07-22", minutes: 45 }], exams: [{ id: "e1", subject: "ისტორია", date: "2026-08-01", time: "10:00" }], studySeconds: { "2026-07-21": 42 } };
response = await call("/api/state", { method: "PUT", headers: { cookie: anaCookie, "content-type": "application/json" }, body: JSON.stringify(anaState) });
assert.equal(response.status, 200);

response = await call("/api/bootstrap", { headers: { cookie: anaCookie } });
payload = await response.json();
assert.equal(payload.isNew, false);
assert.equal(payload.state.studySeconds["2026-07-21"], 42);
assert.equal(payload.state.exams[0].subject, "ისტორია");

const bekaCookie = await signIn("beka@example.com", "ბექა");
response = await call("/api/bootstrap", { headers: { cookie: bekaCookie } });
payload = await response.json();
assert.equal(payload.isNew, true);
assert.equal(payload.state, null);
assert.deepEqual(payload.materials, []);

const materialBody = { id: "m1", name: "notes.txt", type: "text/plain", data: "data:text/plain;base64," + Buffer.from("hello").toString("base64") };
response = await call("/api/materials", { method: "POST", headers: { cookie: anaCookie, "content-type": "application/json" }, body: JSON.stringify(materialBody) });
assert.equal(response.status, 201);

response = await call("/api/materials/m1", { headers: { cookie: bekaCookie } });
assert.equal(response.status, 404);
response = await call("/api/materials/m1", { headers: { cookie: anaCookie } });
assert.equal(await response.text(), "hello");

response = await call("/api/auth/google", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ credential: await googleToken("mallory@example.com", "Mallory", { aud: "wrong-client.apps.googleusercontent.com" }) }) });
assert.equal(response.status, 401);

response = await call("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message: "ტესტი" }) });
assert.equal(response.status, 401);

response = await call("/api/auth/logout", { method: "POST", headers: { cookie: anaCookie } });
assert.equal(response.status, 200);
assert.match(response.headers.get("set-cookie"), /Max-Age=0/);
response = await call("/api/bootstrap", { headers: { cookie: anaCookie } });
assert.equal(response.status, 401);

globalThis.fetch = originalFetch;

console.log("Google authentication, secure sessions, per-account state, and material isolation tests passed");
