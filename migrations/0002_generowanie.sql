-- Generowanie obrazów przez Higgsfield: jedno zlecenie = jeden wpis.
-- Kredyty schodzą wpisem 'gen' (ref = id zlecenia), zwrot przy błędzie wpisem 'refund' z tym samym ref.
CREATE TABLE IF NOT EXISTS generations (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  model TEXT NOT NULL,
  aspect TEXT NOT NULL,
  cost INTEGER NOT NULL,
  prompt TEXT NOT NULL,
  request_id TEXT,
  status TEXT NOT NULL,
  image_url TEXT,
  error TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS generations_user ON generations(user_id, created_at);
