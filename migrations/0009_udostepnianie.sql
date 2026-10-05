-- Udostępnione sceny (krótki link /s/<id>) i publiczna galeria przykładów (zdjęcia wybrane przez właściciela)
CREATE TABLE IF NOT EXISTS shares (
  id TEXT PRIMARY KEY,
  scene TEXT NOT NULL,
  title TEXT,
  user_id INTEGER,
  ip_hash TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS shares_ip ON shares(ip_hash, created_at);
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  title TEXT,
  scene TEXT,
  aspect TEXT,
  created_at INTEGER NOT NULL
);
