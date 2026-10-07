-- Moje sceny: całe sceny zapisane na koncie (do dalszej edycji), miniaturę rysuje aplikacja z zapisanej sceny.
-- scene: JSON sceny (jak przy udostępnianiu), title: krótki opis, subject: person | object | animal | place.
CREATE TABLE IF NOT EXISTS scenes (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  title TEXT,
  subject TEXT NOT NULL,
  scene TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS scenes_user ON scenes(user_id, created_at);
