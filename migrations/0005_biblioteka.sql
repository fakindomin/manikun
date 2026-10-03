-- Moje ujęcia: zdjęcie zapisane u nas (KV PHOTOS, klucz gen/<id>), obejrzane albo nie, anulowane przez użytkownika
ALTER TABLE generations ADD COLUMN stored INTEGER NOT NULL DEFAULT 0;
ALTER TABLE generations ADD COLUMN seen INTEGER NOT NULL DEFAULT 0;
ALTER TABLE generations ADD COLUMN cancelled INTEGER NOT NULL DEFAULT 0;
