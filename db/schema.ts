// Logical D1 schema for Studia AI. The buildless Worker uses the generated
// migration in drizzle/ and prepared statements in worker/index.js.
export const tables = {
  users: ["email", "full_name", "state_json", "initialized", "created_at", "updated_at"],
  materials: ["user_email", "id", "name", "size", "type", "mime", "r2_key", "created_at"],
} as const;
