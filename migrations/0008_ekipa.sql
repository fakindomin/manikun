-- Ekipa: Manimale i Manito zapisane na koncie, do użycia w scenie z Manikunem (Rzeczy › Ekipa).
-- kind: 'animal' | 'object'; data: JSON z ustawieniami (gatunek/umaszczenie/poza albo przedmiot/kolor).
CREATE TABLE IF NOT EXISTS crew (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  kind TEXT NOT NULL,
  name TEXT NOT NULL,
  data TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS crew_user ON crew(user_id);
