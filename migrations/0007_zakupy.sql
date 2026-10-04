-- Zakup kredytów przez Paddle.
-- checkouts: zgoda na rozpoczęcie usługi (prawo odstąpienia) zapisana przed otwarciem kasy; jej id idzie do Paddle w custom_data.
-- purchases: zakończone transakcje Paddle (txn_…), kredyty dopisane w tabeli credits (reason 'buy', ref = txn_…).
CREATE TABLE IF NOT EXISTS checkouts (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  price_id TEXT NOT NULL,
  consent_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS checkouts_user ON checkouts(user_id);
CREATE TABLE IF NOT EXISTS purchases (
  txn_id TEXT PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  checkout_id TEXT,
  price_id TEXT,
  credits INTEGER NOT NULL,
  total INTEGER,
  currency TEXT,
  status TEXT NOT NULL,
  refunded INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS purchases_user ON purchases(user_id);
