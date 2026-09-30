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
- `scene3d.js` – widok 3D sceny (Ekspert, Swoboda, przełącznik 2D | 3D nad kadrem, domyślnie 2D): szkic z modelu manekina,
  pozy przeliczane z kątów stawów rysunku 2D, kamera palcem, punkty zaczepienia, przestawianie, druga postać; wczytywany przy pierwszym przełączeniu
- `head3d.js` – trójwymiarowa głowa Manikuna na przycisku narratora (three.js z CDN jsDelivr; bez WebGL zostaje rysowana głowa)
- `assets/manikun3d.glb` – model głowy: „Wooden Mannequin (Rigged)”, zionmuoria, CC BY 4.0
- `worker/podglad.js` – nieużywany Worker Cloudflare z dawnego podglądu FLUX. Zastąpił go Próbny kadr (makieta ujęcia
  rysowana w aplikacji, bez AI), żeby ładne zdjęcie powstawało dopiero w generatorze. Kod zostaje na wypadek powrotu;
  Workera `manikun-podglad` można wyłączyć albo usunąć w panelu Cloudflare
- `tutorial/cyberpunk.jpg`, `tutorial/fantasy.jpg` – zdjęcia do tutoriala, wygenerowane ze sceny pod linkiem `?intro`
  (Cyberpunk, potem przełączenie na Fantasy). Brak pliku: tutorial pokazuje planszę zastępczą

## Wdrożenie

Strona działa pod adresem https://manikun.vercel.app. Projekt na Vercelu jest połączony z tym repozytorium:
każde wypchnięcie na gałąź domyślną wdraża się automatycznie na produkcję, bez budowania (czysty HTML i JS).
