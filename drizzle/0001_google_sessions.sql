CREATE TABLE IF NOT EXISTS auth_sessions (
  token_hash TEXT PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  google_sub TEXT NOT NULL,
  full_name TEXT,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS auth_sessions_email_idx ON auth_sessions(email);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS auth_sessions_expiry_idx ON auth_sessions(expires_at);
