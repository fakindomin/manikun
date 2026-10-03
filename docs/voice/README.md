# Głos Manikuna: nagrania

Manikun mówi nagranymi zdaniami. Każde zdanie z dymka to osobny plik `assets/voice/<id>.mp3`.
Aplikacja dzieli tekst dymka na zdania, dla każdego liczy `id` z treści i gra pliki po kolei.
Zdanie bez nagrania (np. zmienne podsumowanie sceny w Kreatorze) zostaje tylko w dymku.

## Lista do nagrania

- `lines.csv`: kolumny `id;zdanie;skąd`. Plik nazywa się tak jak `id` (np. `v896814fc.mp3`).
- `lines.json`: to samo w JSON.
- Zdania są posortowane alfabetycznie. Kolumna „skąd” mówi, gdzie zdanie pada (tutorial, pytanie Kreatora, podpowiedź), co pomaga dobrać intonację.

Zdania ze wstawkami są nagrywane w każdym wariancie, np. „Jaki kolor: krzesło?”, „Jaki kolor: rower?”.

## Charakter głosu

- Manikun to drewniany manekin, który jest reżyserem. Jest ciepły, życzliwy, z uśmiechem w głosie, lekko zabawny i nigdy nie krzyczy.
- Mówi do dzieci i dorosłych: wyraźnie, spokojnym tempem, z pauzą po przecinku.
- Pytania czytamy z naturalną intonacją pytającą, a żarty („Kot miał tu być o dziewiątej.”) z lekkim przymrużeniem oka.
- Zdania z jednej wypowiedzi grają jedno po drugim, np. „Cześć, jestem Manikun.” i „Reżyseruję sceny filmowe.”. Każde musi więc brzmieć dobrze samo i w ciągu, bez opadającej „końcowej” intonacji na wszystkim.
- Ten sam głos, mikrofon i odległość we wszystkich nagraniach. Przy generatorze głosu: ten sam głos i te same ustawienia dla całej listy.

## Głos i wymowa (generator Higgsfield)

- Głos: **Fraser** (preset `6705e465-7b52-5915-a1d8-b1222885e01d`), silnik ElevenLabs (`text2speech_v2`, wariant `elevenlabs`).
- Słowa, których generator nie zna, zapisujemy fonetycznie tylko w tekście dla generatora (nagranie i tak należy do zdania z dymka):
  - „Maniscrypt” → „maniskrypt” (małą literą). Pisane „Maniscrypt” albo „Maniskrypt” dawało długą pauzę przed słowem.
- Każde zdanie generujemy osobno. Generator przyjmuje 2 zlecenia naraz.

## Format plików

- MP3, mono, 44,1 kHz, 64–96 kb/s.
- Cisza na początku i końcu przycięta do ok. 50 ms.
- Głośność wyrównana (ok. −16 LUFS), bez przesterów.
- Nazwa pliku: dokładnie `id` z listy + `.mp3`, w folderze `assets/voice/`.

## Dodanie nagrań

1. Wrzuć pliki do `assets/voice/`.
2. `node tools/voice/manifest.cjs`: zapisuje `assets/voice/manifest.json` i pokazuje, ilu zdań jeszcze brakuje.
3. Zatwierdź pliki i manifest. Aplikacja gra tylko zdania z manifestu, więc można dokładać nagrania partiami.

## Gdy zmienią się teksty

Zmieniony tekst ma nowe `id`, a stare nagranie przestaje grać. Nową listę robi
`node tools/voice/collect.cjs` (potrzebny Playwright i lokalny serwer z aplikacją, opis w pliku). Potem nagrywa się tylko nowe zdania.

## Sterowanie w aplikacji

- Głośnik w pasku górnym wycisza wszystko: efekty i głos. Dźwięk jest domyślnie włączony; wyłączony zostaje, jeśli ktoś go wyłączył.
- Menu → „Głos Manikuna” wyłącza sam głos, a efekty zostają.
- Przeglądarki pozwalają grać dźwięk dopiero po pierwszym dotknięciu ekranu, więc pierwsze powitanie przed dotknięciem jest ciche.
