CREATE TABLE IF NOT EXISTS users (
  email TEXT PRIMARY KEY NOT NULL,
  full_name TEXT,
  state_json TEXT NOT NULL DEFAULT '{}',
  initialized INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS materials (
  user_email TEXT NOT NULL,
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  size INTEGER NOT NULL,
  type TEXT NOT NULL,
  mime TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  created_at TEXT NOT NULL,
  PRIMARY KEY (user_email, id),
  FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS materials_user_created_idx ON materials(user_email, created_at DESC);
