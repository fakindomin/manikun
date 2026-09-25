# Manikun Reżyser

Mobilna aplikacja do ustawiania sceny zdjęcia lub wideo na drewnianym manekinie Manikunie.
Kafelkami wybierasz format, postać, ubiór, pozę, ręce, kadr, kamerę, światło, tło i porę dnia,
a przycisk „Kopiuj” kopiuje gotowy angielski prompt do generatora obrazu lub wideo.

- `index.html` – cała aplikacja (interfejs, sceny, prompt)
- `manikun.js` – manekin: proporcje ciała, geometria z kątów stawów, materiały, płynne przejścia póz

## Wdrożenie

Strona działa pod adresem https://manikun.vercel.app. Projekt na Vercelu jest połączony z tym repozytorium:
każde wypchnięcie na gałąź domyślną wdraża się automatycznie na produkcję, bez budowania (czysty HTML i JS).
