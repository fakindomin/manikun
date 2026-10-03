-- Techniczny powód błędu od generatora (status HTTP i początek odpowiedzi), tylko do diagnozy
ALTER TABLE generations ADD COLUMN detail TEXT;
