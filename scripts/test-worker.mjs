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
  prepare(sql) { return new Statement(this, sql); }
  async batch(statements) { return Promise.all(statements.map((statement) => statement.run())); }
}

class MockBucket {
  objects = new Map();
  async put(key, bytes) { this.objects.set(key, new Uint8Array(bytes)); }
  async get(key) { const bytes = this.objects.get(key); return bytes ? { body: bytes } : null; }
  async delete(key) { this.objects.delete(key); }
}

const env = { DB: new MockDB(), BUCKET: new MockBucket() };
const identity = (email, name) => ({
  "oai-authenticated-user-email": email,
  "oai-authenticated-user-full-name": encodeURIComponent(name),
  "oai-authenticated-user-full-name-encoding": "percent-encoded-utf-8",
});
const call = (path, options = {}) => worker.fetch(new Request("https://studia.test" + path, options), env);

let response = await call("/");
assert.equal(response.status, 200);
assert.match(await response.text(), /გაგრძელება ChatGPT-ით/);

response = await call("/", { headers: identity("ana@example.com", "ანა სტუდენტი") });
assert.match(await response.text(), /სწავლის ანალიტიკა/);

response = await call("/api/bootstrap");
assert.equal(response.status, 401);

response = await call("/api/bootstrap", { headers: identity("ana@example.com", "ანა სტუდენტი") });
let payload = await response.json();
assert.equal(payload.isNew, true);
assert.equal(payload.user.name, "ანა სტუდენტი");

const anaState = { profile: { name: "ანა", goalMinutes: 720 }, tasks: [{ id: "t1", name: "ესე", subject: "ისტორია", date: "2026-07-22", minutes: 45 }], exams: [{ id: "e1", subject: "ისტორია", date: "2026-08-01", time: "10:00" }], studySeconds: { "2026-07-21": 42 } };
response = await call("/api/state", { method: "PUT", headers: { ...identity("ana@example.com", "ანა სტუდენტი"), "content-type": "application/json" }, body: JSON.stringify(anaState) });
assert.equal(response.status, 200);

response = await call("/api/bootstrap", { headers: identity("ana@example.com", "ანა სტუდენტი") });
payload = await response.json();
assert.equal(payload.isNew, false);
assert.equal(payload.state.studySeconds["2026-07-21"], 42);
assert.equal(payload.state.exams[0].subject, "ისტორია");

response = await call("/api/bootstrap", { headers: identity("beka@example.com", "ბექა") });
payload = await response.json();
assert.equal(payload.isNew, true);
assert.equal(payload.state, null);
assert.deepEqual(payload.materials, []);

const materialBody = { id: "m1", name: "notes.txt", type: "text/plain", data: "data:text/plain;base64," + Buffer.from("hello").toString("base64") };
response = await call("/api/materials", { method: "POST", headers: { ...identity("ana@example.com", "ანა"), "content-type": "application/json" }, body: JSON.stringify(materialBody) });
assert.equal(response.status, 201);

response = await call("/api/materials/m1", { headers: identity("beka@example.com", "ბექა") });
assert.equal(response.status, 404);
response = await call("/api/materials/m1", { headers: identity("ana@example.com", "ანა") });
assert.equal(await response.text(), "hello");

response = await call("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ message: "ტესტი" }) });
assert.equal(response.status, 401);

console.log("Authentication, per-account state, and material isolation tests passed");
