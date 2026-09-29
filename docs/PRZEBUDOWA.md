# Przebudowa Manikuna: ustalenia

Wzorem wyglądu i tutoriala jest przykładowy plik użytkownika (układ ekranu, położenie elementów, scenariusz). Nie jest to gotowy produkt, tylko kierunek. Silnik kadru, prompty i reguły scen zostają.

## Układ ekranu (od góry)

- **Nagłówek:** po lewej menu (3 kreski), na środku dyskretny napis MANIKUN (bez głowy), po prawej przycisk dźwięku. W czasie tutoriala obok dźwięku stoi „Pomiń”. Na ekranie startowym 2×2 jest menu, a w miejscu napisu znaczek „Ponad miliard ujęć”.
- **Kadr:** wizjer z narożnikami, ramka w kolorze stylu (jak dziś).
- **Pasek roboczy:** po lewej przycisk-narrator z głową Manikuna (jedyne miejsce z głową), na środku suwak Zdjęcie / Wideo, po prawej przycisk Maniscryptu.
- **Dwa rzędy nawigacji na dole.**
- Przycisku domu nie ma. Powrót do początku: „Nowa scena” w menu albo Układ domyślny. Powrót dzieje się bez przeładowania strony: rzędy zjeżdżają, scena płynnie wraca do domyślnej, wjeżdża siatka 2×2 (tak samo po końcu tutoriala).

## Nawigacja: dwa rzędy schodzące w głąb

- Dolny rząd to poziom wyżej (na starcie główne grupy), górny rząd to zawartość aktywnego kafelka z dołu.
- Klik w górnym rzędzie w element z dalszymi opcjami: dolny rząd zjeżdża pod krawędź ekranu, górny zjeżdża na jego miejsce, na górze wjeżdżają nowe opcje.
- Klik w element bez dalszych opcji po prostu go wybiera.
- Powrót poziom wyżej na dwa sposoby: strzałka „wstecz” przypięta po lewej w dolnym rzędzie (nie ma jej na najwyższym poziomie) oraz stuknięcie w aktywny kafelek dolnego rzędu.
- Linia łącząca aktywny kafelek z dołu z wybraną opcją na górze, na stałe w aplikacji (liczona z położenia kafelków).
- Brak stałej siatki: rzędy przewijają się w bok.
- Wygląd kafelków: kategorie (dolny rząd) mają ikonę i tekst. Konkretne opcje (górny rząd) mają miniaturę rysunku i podpis.

### Główne grupy (Swoboda)

| Dolny rząd | Górny rząd |
|---|---|
| Gotowe | gotowe sceny i zestawy |
| Postać | Sylwetka, Twarz, Ubiór, Poza, Ręce |
| Scena | Tło, Pora dnia, Światło |
| Kamera | Kadr, Kamera, Format, Ruch (tylko wideo) |
| Styl | od razu 10 stylów |
| Losuj | akcja, bez otwierania rzędu |
| Układ domyślny | akcja, reset |

W trybie Obiekt grupa Postać zamienia się na Obiekt (Rodzaj, Podstawa, Kolor), ale Obiekt jest na razie zablokowany (kod zostaje).

## Kolory

- Akcent: przygaszony szmaragd, bliżej szałwii.
- Tryb Wideo zmienia akcent na czerwony (jak dioda REC).
- Ciemne studio.

## Start po tutorialu

- Na dole 4 kafelki w siatce 2×2: Postać, Obiekt, Zwierzę, Dowolne. Aktywna jest tylko Postać.
- Klik w zablokowany kafelek: najpierw żart Manikuna, za drugim razem informacja „wkrótce”.
  - Obiekt: „Obiekty? Zgubiłem gdzieś rekwizyty… Szukam za kanapą.”
  - Zwierzę: „Kot miał tu być o dziewiątej. Szukamy go od rana.”
  - Dowolne: „Dowolne? Ambitnie. Najpierw muszę się nauczyć rysować.”
  - Drugi klik: „Ta opcja będzie dostępna wkrótce. Na razie zróbmy świetną postać!”
- Po wybraniu Postaci kafelki zmieniają się na **Kreator** i **Swoboda**.

### Kreator

Prowadzi krok po kroku: Sylwetka → Ubiór → Twarz → Poza → Ręce → Tło → Pora dnia → Światło → Kadr → Kamera → Styl → Format.

- Każdy krok można pominąć („Dalej”, zostaje ustawienie domyślne).
- Na górze widać postęp (krok X z 12).
- Na końcu Manikun proponuje skopiowanie Maniscryptu, potem wszystko przechodzi w Swobodę.
- W każdej chwili można przejść do Swobody z zachowaniem wyborów.

### Swoboda

Pełna nawigacja dwoma rzędami. Tylko tu są Gotowe.

## Ubiór

| Kategoria | Opcje |
|---|---|
| Zestawy | Codzienny, Elegancki, Sportowy, Streetwear, Płaszcz, Sukienka |
| Góra | T-shirt, Koszula, Bluza, Bluza z kapturem, Sweter, Marynarka |
| Okrycie | Brak, Kurtka, Płaszcz, Kurtka jeansowa |
| Dół | Jeansy, Dres, Chinosy, Garniturowe, Szorty, Spódnica (tylko kobieta) |
| Nakrycie głowy | Brak, Czapka z daszkiem, Beanie, Kapelusz |
| Buty | Sneakersy, Eleganckie, Botki |

- Każda część ma swój kolor.
- Zestaw ustawia wszystkie części naraz. Zmiana pojedynczej części odznacza zestaw.
- Sukienka zastępuje Górę i Dół (te kategorie są wtedy zablokowane).
- Nakrycie głowy chowa fryzurę tylko częściowo.
- Z czasem dojdą kolejne opcje.
- Kolor wybrany ręcznie kafelkiem „Kolor” zostaje przy każdej zmianie kroju danej części (czerwone jeansy → czerwone chinosy). Kolor niewybrany ręcznie przechodzi na naturalny dla nowego kroju. Zestaw, gotowa scena i Losuj zaczynają kolory od nowa.
- Sukienka jest tylko w zestawach. Wybór dowolnej góry albo dołu zdejmuje sukienkę.
- Maniscrypt opisuje ubiór z części i ich kolorów, tak jak widać na Manikunie (np. „wearing a caramel long wool coat over a cream knit sweater, charcoal grey chinos and brown ankle boots, with a mustard yellow beanie”).

### Kolory (20)

- Neutralne: Czarny, Grafit, Szary, Biały, Kremowy, Beż
- Ziemiste: Brąz, Karmel, Oliwka, Khaki
- Chłodne: Granat, Dżins, Błękit, Butelkowa zieleń, Miętowy
- Ciepłe: Bordo, Czerwony, Pomarańczowy, Musztardowy, Różowy

## Maniscrypt (dawniej „prompt”)

- Nazwa „Maniscrypt” konsekwentnie wszędzie. Przycisk: **„Kopiuj Maniscrypt”** (aplikacja niczego nie generuje, tylko kopiuje).
- Panel, od góry:
  1. Jedno zdanie: „Maniscrypt to gotowy opis ujęcia (prompt) dla generatora AI.”
  2. Przełącznik „Dołączę zdjęcie swojej twarzy” z przykładem zdjęcia (działa jak dziś: zmienia tylko kopiowany tekst).
  3. Kroki: Skopiuj → Otwórz generator → Wklej.
  4. Przycisk „Kopiuj Maniscrypt”.
- Generatory z linkami i ikoną (na razie litera w kolorze marki, prawdziwe logo podmienione później):
  - zdjęcia: ChatGPT, Gemini, Midjourney, Leonardo, Ideogram
  - wideo: Sora, Veo, Kling, Runway, Hailuo
- W tutorialu wersja uproszczona: „Skopiuj i wklej w generatorze AI” i duży przycisk.

## Narrator (przycisk z głową Manikuna)

- Manikun żyje: głowa reaguje ruchem (kiwnięcie, przechył) na każdy wybór, bez dymków.
- Dymki wychodzą z przycisku.
- Stuknięcie otwiera małe okienko wyszukiwania:
  - szuka kategorii i konkretnych opcji (np. „dres” otwiera Postać › Ubiór › Dół i podświetla Dres),
  - wynik pokazuje ścieżkę,
  - stuknięcie w wynik przeskakuje rzędami do miejsca,
  - przykładowe hasła pod rozwijaną podpowiedzią.

Dopasowanie wyszukiwarki: każde wpisane słowo musi zaczynać słowo nazwy, ścieżki albo synonimu (np. „kucanie” → Kuca, „spodnie” → Dół). Okno wyszukiwania stoi pod nagłówkiem, żeby klawiatura telefonu nie zasłaniała wyników. Wynik z wariantem tła (np. „+ Mgła” w lesie) od razu wybiera to tło.

## Menu

| Pozycja | Stan |
|---|---|
| Obejrzyj tutorial | działa |
| Nowa scena | działa |
| Jak używać Maniscryptu | działa |
| O Manikunie (w tym podpis autorów) | działa |
| Moje ujęcia | wkrótce |
| Historia Maniscryptów | wkrótce |
| Ustawienia (język, dźwięk) | wkrótce |

## Dźwięk

Odgłosy drewna (tik, krrr-ik, puk, TUK!, KLAP!) syntezowane w przeglądarce, w całej aplikacji, domyślnie wyciszone.

## Tutorial

Tylko przy pierwszej wizycie, z powtórką z menu. „Pomiń” widoczny cały czas. Stuknięcie w dymek przewija dalej (nie w dowolne miejsce ekranu). Suwak Zdjęcie/Wideo jest zablokowany do końca.

Scena startowa: mężczyzna, bluza z kapturem, jeansy, w pół kroku, las ze ścieżką i mgłą, noc, styl Cyberpunk, format 4:5. Rzędy otwarte na Postać › Ubiór.

1. „Cześć, jestem Manikun. Ustawiasz scenę, a ja piszę dla niej opis dla generatora AI.”
2. „Zmieńmy mu spodnie na dres.” Pulsuje **Dół**, potem **Dres**. Figura przebiera się w kadrze.
3. Pulsuje **Maniscrypt**, uproszczony panel, „Kopiuj Maniscrypt”. Pojawia się zdjęcie Cyberpunk z podpisem „Tak to może wyjść w generatorze”. „Hmm… cyberpunk w lesie? Chyba nie mój klimat.”
4. „Przełączmy styl.” Manikun pokazuje strzałkę wstecz, a użytkownik cofa się do głównych grup.
5. Pulsuje **Styl**, potem **Fantasy**. Zmienia się ramka kadru.
6. Maniscrypt jeszcze raz i zdjęcie Fantasy. „No, teraz to gra. Klimat siedzi.”
7. „A Ty? Zrobisz lepszy kadr?” Pojawia się siatka 2×2 i napis „Ponad miliard ujęć”.

Zdjęcia do tutoriala: generowane po etapie ubrań z linku `?intro` (scena w stanie końcowym, z dresem), w wersjach Cyberpunk i Fantasy.

Pliki zdjęć: `tutorial/cyberpunk.jpg` i `tutorial/fantasy.jpg`. Dopóki ich nie ma, w kadrze stoi zastępcza plansza z nazwą stylu. Po przejściu albo pominięciu tutoriala Manikun zapamiętuje to w przeglądarce i przy następnej wizycie zaczyna od siatki 2×2.

## Kolejność prac

Każdy etap powstaje na gałęzi `claude/manikun-przebudowa` i jest pokazywany do akceptacji. Produkcja (`claude/visual-scene-director-ai-a6485j`) zmienia się dopiero po scaleniu.

1. Nowy wygląd i nawigacja na obecnych kategoriach.
2. Panel Maniscryptu.
3. Ubrania.
4. Start 2×2, Kreator, Swoboda.
5. Narrator: reakcje, wyszukiwarka, dźwięki.
6. Menu.
7. Tutorial.
