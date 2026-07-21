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
    if (sql.startsWith("INSERT INTO calendar_connections")) {
      const [email, ciphertext, iv, calendarEmail, connectedAt, updatedAt] = this.args;
      const current = this.db.calendarConnections.get(email);
      this.db.calendarConnections.set(email, { user_email: email, refresh_token_ciphertext: ciphertext, refresh_token_iv: iv, calendar_email: calendarEmail, connected_at: current?.connected_at || connectedAt, updated_at: updatedAt, last_sync_at: current?.last_sync_at || null });
      return { success: true };
    }
    if (sql.startsWith("INSERT INTO calendar_exam_events")) {
      const [email, examId, googleEventId, examHash, updatedAt] = this.args;
      this.db.calendarExamEvents.set(email + "\n" + examId, { user_email: email, exam_id: examId, google_event_id: googleEventId, exam_hash: examHash, updated_at: updatedAt });
      return { success: true };
    }
    if (sql.startsWith("UPDATE calendar_connections SET last_sync_at")) {
      const [lastSyncAt, updatedAt, email] = this.args;
      Object.assign(this.db.calendarConnections.get(email), { last_sync_at: lastSyncAt, updated_at: updatedAt });
      return { success: true };
    }
    if (sql.startsWith("DELETE FROM calendar_exam_events WHERE user_email = ? AND exam_id")) {
      this.db.calendarExamEvents.delete(this.args[0] + "\n" + this.args[1]);
      return { success: true };
    }
    if (sql.startsWith("DELETE FROM calendar_exam_events WHERE user_email")) {
      for (const [key, item] of this.db.calendarExamEvents) if (item.user_email === this.args[0]) this.db.calendarExamEvents.delete(key);
      return { success: true };
    }
    if (sql.startsWith("DELETE FROM calendar_connections")) {
      this.db.calendarConnections.delete(this.args[0]);
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
    if (sql.startsWith("SELECT refresh_token_ciphertext")) return this.db.calendarConnections.get(this.args[0]) || null;
    if (sql.startsWith("SELECT state_json, initialized")) return this.db.users.get(this.args[0]) || null;
    throw new Error("Unhandled first: " + sql);
  }
  async all() {
    if (this.sql.startsWith("SELECT id, name, size")) {
      const results = [...this.db.materials.values()].filter((item) => item.user_email === this.args[0]).map((item) => ({ id: item.id, name: item.name, size: item.size, type: item.type, mime: item.mime, createdAt: item.created_at }));
      return { results };
    }
    if (this.sql.startsWith("SELECT exam_id, google_event_id")) {
      return { results: [...this.db.calendarExamEvents.values()].filter((item) => item.user_email === this.args[0]) };
    }
    throw new Error("Unhandled all: " + this.sql);
  }
}

class MockDB {
  users = new Map();
  materials = new Map();
  authSessions = new Map();
  calendarConnections = new Map();
  calendarExamEvents = new Map();
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
const env = { DB: new MockDB(), BUCKET: new MockBucket(), GOOGLE_CLIENT_ID: clientId, GOOGLE_OAUTH_CLIENT_SECRET: "test-client-secret", CALENDAR_TOKEN_KEY: Buffer.alloc(32, 7).toString("base64url"), GEMINI_API_KEY: "test-gemini-key", GEMINI_MODEL: "gemini-3.1-flash-lite", GEMINI_SEARCH_MODEL: "gemini-3.1-flash-lite" };
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
const googleCalendarEvents = new Map();
let nextGoogleEventId = 1;
let oauthEmail = "ana@example.com";
let lastGeminiRequest = null;
globalThis.fetch = async (input, init) => {
  const url = String(input);
  if (url === "https://www.googleapis.com/oauth2/v3/certs") return new Response(JSON.stringify({ keys: [publicJwk] }), { headers: { "content-type": "application/json", "cache-control": "public, max-age=3600" } });
  if (url === "https://oauth2.googleapis.com/token") {
    const params = new URLSearchParams(String(init?.body || ""));
    if (params.get("grant_type") === "authorization_code") return new Response(JSON.stringify({ access_token: "calendar-access", refresh_token: "calendar-refresh-secret", id_token: await googleToken(oauthEmail, oauthEmail === "ana@example.com" ? "ანა სტუდენტი" : "ბექა") }), { headers: { "content-type": "application/json" } });
    if (params.get("grant_type") === "refresh_token") return new Response(JSON.stringify({ access_token: "calendar-access-refreshed", expires_in: 3600 }), { headers: { "content-type": "application/json" } });
  }
  if (url.startsWith("https://oauth2.googleapis.com/revoke")) return new Response("", { status: 200 });
  if (url.startsWith("https://www.googleapis.com/calendar/v3/calendars/primary/events")) {
    const method = init?.method || "GET";
    const eventId = decodeURIComponent(new URL(url).pathname.split("/").pop());
    if (method === "POST") { const id = "google-event-" + nextGoogleEventId++; googleCalendarEvents.set(id, JSON.parse(String(init.body))); return new Response(JSON.stringify({ id }), { status: 200, headers: { "content-type": "application/json" } }); }
    if (method === "PATCH") { if (!googleCalendarEvents.has(eventId)) return new Response(JSON.stringify({ error: "not found" }), { status: 404 }); googleCalendarEvents.set(eventId, JSON.parse(String(init.body))); return new Response(JSON.stringify({ id: eventId }), { status: 200, headers: { "content-type": "application/json" } }); }
    if (method === "DELETE") { if (!googleCalendarEvents.has(eventId)) return new Response("", { status: 404 }); googleCalendarEvents.delete(eventId); return new Response(null, { status: 204 }); }
  }
  if (url === "https://generativelanguage.googleapis.com/v1beta/interactions") {
    lastGeminiRequest = JSON.parse(String(init?.body || "{}"));
    return new Response(JSON.stringify({ output_text: "პირობაა $x² ≤ 4$. ამიტომ $$|x| ≤ 2$$." }), { headers: { "content-type": "application/json" } });
  }
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
const appHtml = await response.text();
assert.match(appHtml, /სწავლის ანალიტიკა/);
assert.match(appHtml, /normalizeMathText/);
assert.match(appHtml, /id="calendarCard" hidden/);
for (const match of appHtml.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
  if (match[1].trim()) new Function(match[1]);
}

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
assert.equal(payload.calendar.configured, true);
assert.equal(payload.calendar.connected, false);

response = await call("/api/calendar/oauth/code", { method: "POST", headers: { cookie: anaCookie, "content-type": "application/json" }, body: JSON.stringify({ code: "calendar-auth-code" }) });
assert.equal(response.status, 403);

response = await call("/api/calendar/oauth/code", { method: "POST", headers: { cookie: anaCookie, origin: "https://studia.test", "x-requested-with": "XmlHttpRequest", "content-type": "application/json" }, body: JSON.stringify({ code: "calendar-auth-code" }) });
assert.equal(response.status, 200);
payload = await response.json();
assert.equal(payload.calendar.connected, true);
assert.equal(googleCalendarEvents.size, 1);
let googleEventId = [...googleCalendarEvents.keys()][0];
assert.equal(googleCalendarEvents.get(googleEventId).summary, "გამოცდა — ისტორია");
assert.equal(googleCalendarEvents.get(googleEventId).reminders.overrides[0].minutes, 1440);
assert.notEqual(env.DB.calendarConnections.get("ana@example.com").refresh_token_ciphertext, "calendar-refresh-secret");

googleCalendarEvents.delete(googleEventId);
response = await call("/api/calendar/sync", { method: "POST", headers: { cookie: anaCookie } });
assert.equal(response.status, 200);
assert.equal(googleCalendarEvents.size, 1);
googleEventId = [...googleCalendarEvents.keys()][0];

const updatedAnaState = { ...anaState, exams: [{ id: "e1", subject: "საქართველოს ისტორია", date: "2026-08-01", time: "11:30", durationMinutes: 180, updatedAt: new Date().toISOString() }] };
response = await call("/api/state", { method: "PUT", headers: { cookie: anaCookie, "content-type": "application/json" }, body: JSON.stringify(updatedAnaState) });
assert.equal(response.status, 200);
assert.equal(googleCalendarEvents.size, 1);
assert.equal(googleCalendarEvents.get(googleEventId).summary, "გამოცდა — საქართველოს ისტორია");
assert.equal(googleCalendarEvents.get(googleEventId).extendedProperties.private.studiaExamId, "e1");

const bekaCookie = await signIn("beka@example.com", "ბექა");
response = await call("/api/bootstrap", { headers: { cookie: bekaCookie } });
payload = await response.json();
assert.equal(payload.isNew, true);
assert.equal(payload.state, null);
assert.deepEqual(payload.materials, []);

response = await call("/api/calendar/oauth/code", { method: "POST", headers: { cookie: bekaCookie, origin: "https://studia.test", "x-requested-with": "XmlHttpRequest", "content-type": "application/json" }, body: JSON.stringify({ code: "wrong-account-code" }) });
assert.equal(response.status, 409);
assert.equal(env.DB.calendarConnections.has("beka@example.com"), false);

const materialBody = { id: "m1", name: "notes.txt", type: "text/plain", data: "data:text/plain;base64," + Buffer.from("hello").toString("base64") };
response = await call("/api/materials", { method: "POST", headers: { cookie: anaCookie, "content-type": "application/json" }, body: JSON.stringify(materialBody) });
assert.equal(response.status, 201);

response = await call("/api/materials/m1", { headers: { cookie: bekaCookie } });
assert.equal(response.status, 404);
response = await call("/api/materials/m1", { headers: { cookie: anaCookie } });
assert.equal(await response.text(), "hello");

response = await call("/api/state", { method: "PUT", headers: { cookie: anaCookie, "content-type": "application/json" }, body: JSON.stringify({ ...updatedAnaState, exams: [] }) });
assert.equal(response.status, 200);
assert.equal(googleCalendarEvents.size, 0);

response = await call("/api/calendar/disconnect", { method: "POST", headers: { cookie: anaCookie } });
assert.equal(response.status, 200);
payload = await response.json();
assert.equal(payload.calendar.connected, false);
assert.equal(env.DB.calendarConnections.has("ana@example.com"), false);
assert.equal(env.DB.calendarExamEvents.size, 0);

response = await call("/api/auth/google", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ credential: await googleToken("mallory@example.com", "Mallory", { aud: "wrong-client.apps.googleusercontent.com" }) }) });
assert.equal(response.status, 401);

response = await call("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message: "ტესტი" }) });
assert.equal(response.status, 401);

const mathQuestion = "თუ x² ≤ 4 და y = √(1−x²), შეადარე x ≠ y და გამოთვალე ∫₀¹ y dx.";
response = await call("/api/chat", { method: "POST", headers: { cookie: anaCookie, "content-type": "application/json" }, body: JSON.stringify({ message: mathQuestion, mode: "explain", style: "deep" }) });
assert.equal(response.status, 200);
payload = await response.json();
assert.equal(payload.demo, false);
assert.match(payload.text, /x² ≤ 4/);
assert.equal(lastGeminiRequest.model, "gemini-3.1-flash-lite");
assert.equal(lastGeminiRequest.input[0].text.includes(mathQuestion), true);
assert.equal(lastGeminiRequest.system_instruction.includes("never confuse < with >, ≤ with ≥"), true);
assert.equal(lastGeminiRequest.system_instruction.includes("standalone formulas inside $$...$$"), true);

response = await call("/api/auth/logout", { method: "POST", headers: { cookie: anaCookie } });
assert.equal(response.status, 200);
assert.match(response.headers.get("set-cookie"), /Max-Age=0/);
response = await call("/api/bootstrap", { headers: { cookie: anaCookie } });
assert.equal(response.status, 401);

globalThis.fetch = originalFetch;

console.log("Google authentication, encrypted Calendar sync, exact math notation, secure sessions, and per-account isolation tests passed");
