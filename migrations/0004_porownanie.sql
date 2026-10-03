-- Porównanie modeli Higgsfield (strona /api/admin/bench, tylko właściciel): ten sam Maniscrypt, czas i wynik każdego modelu
CREATE TABLE IF NOT EXISTS bench (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  run TEXT NOT NULL,
  family TEXT NOT NULL,
  model TEXT NOT NULL,
  http INTEGER,
  status TEXT NOT NULL,
  request_id TEXT,
  image_url TEXT,
  detail TEXT,
  started_ms INTEGER NOT NULL,
  done_ms INTEGER
);
CREATE INDEX IF NOT EXISTS bench_run ON bench(run);
