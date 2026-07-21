CREATE TABLE IF NOT EXISTS calendar_connections (
  user_email TEXT PRIMARY KEY NOT NULL,
  refresh_token_ciphertext TEXT NOT NULL,
  refresh_token_iv TEXT NOT NULL,
  calendar_email TEXT NOT NULL,
  connected_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  last_sync_at TEXT,
  FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS calendar_exam_events (
  user_email TEXT NOT NULL,
  exam_id TEXT NOT NULL,
  google_event_id TEXT NOT NULL,
  exam_hash TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (user_email, exam_id),
  FOREIGN KEY (user_email) REFERENCES calendar_connections(user_email) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS calendar_exam_events_google_idx ON calendar_exam_events(user_email, google_event_id);
