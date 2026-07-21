// Logical D1 schema for Studia AI. The buildless Worker uses the generated
// migration in drizzle/ and prepared statements in worker/index.js.
export const tables = {
  users: ["email", "full_name", "state_json", "initialized", "created_at", "updated_at"],
  materials: ["user_email", "id", "name", "size", "type", "mime", "r2_key", "created_at"],
  authSessions: ["token_hash", "email", "google_sub", "full_name", "created_at", "expires_at"],
  calendarConnections: ["user_email", "refresh_token_ciphertext", "refresh_token_iv", "calendar_email", "connected_at", "updated_at", "last_sync_at"],
  calendarExamEvents: ["user_email", "exam_id", "google_event_id", "exam_hash", "updated_at"],
} as const;
