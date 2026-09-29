# Manikun Reżyser

Mobilna aplikacja do ustawiania sceny zdjęcia lub wideo na drewnianym manekinie Manikunie.
Scenę buduje się kafelkami (postać, ubiór, twarz, poza, ręce, rzeczy, miejsce, światło, kamera, format, styl),
a przycisk Maniscryptu kopiuje gotowy angielski opis ujęcia (prompt) do generatora obrazu lub wideo.

- Start: Postać → poziom (Podstawowy / Ekspert) → Kreator (Manikun pyta krok po kroku) albo Swoboda (dwa rzędy kafelków).
- Przy pierwszej wizycie tutorial; powtórka z menu.
- Szczegóły ustaleń i kolejne etapy: `docs/PRZEBUDOWA.md`.

## Pliki

- `index.html` – cała aplikacja: interfejs, sceny, rzeczy, Kreator, tutorial, Maniscrypt
- `manikun.js` – manekin: proporcje ciała, geometria z kątów stawów, ubrania, materiały
- `head3d.js` – trójwymiarowa głowa Manikuna na przycisku narratora (three.js z CDN jsDelivr; bez WebGL zostaje rysowana głowa)
- `assets/manikun3d.glb` – model głowy: „Wooden Mannequin (Rigged)”, zionmuoria, CC BY 4.0
- `worker/podglad.js` – Worker Cloudflare do szybkiego podglądu kadru: przyjmuje Maniscrypt i zwraca obraz z Workers AI (FLUX schnell).
  Działa pod https://manikun-podglad.fakindomin.workers.dev, wdrażany ręcznie w panelu Cloudflare (powiązanie Workers AI o nazwie `AI`).
  Aplikacja pozwala na 10 podglądów dziennie na urządzenie; darmowy plan Cloudflare daje wspólną dzienną pulę bez opłat
- `tutorial/cyberpunk.jpg`, `tutorial/fantasy.jpg` – zdjęcia do tutoriala, wygenerowane ze sceny pod linkiem `?intro`
  (Cyberpunk, potem przełączenie na Fantasy). Brak pliku: tutorial pokazuje planszę zastępczą

## Wdrożenie

Strona działa pod adresem https://manikun.vercel.app. Projekt na Vercelu jest połączony z tym repozytorium:
każde wypchnięcie na gałąź domyślną wdraża się automatycznie na produkcję, bez budowania (czysty HTML i JS).
