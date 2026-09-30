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
| Postać | Sylwetka, Głowa, Ubiór, Poza, Ręce |
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
- Po wybraniu Postaci kafelki zmieniają się na **Podstawowy** i **Ekspert** (poziom), a potem na **Kreator** i **Swoboda**.
- Poziom obowiązuje w Kreatorze i w Swobodzie naraz. Ostatni wybór jest zapamiętany (podświetlony na starcie) i można go zmienić w menu (Poziom) w każdej chwili, bez utraty wyborów.

### Kreator

Manikun prowadzi rozmową: jedno pytanie w dymku, odpowiedzi w górnym rzędzie. Figura zmienia się w kadrze na bieżąco.

- **Dolny rząd:** strzałka wstecz, 5 rozdziałów (Postać › Poza › Miejsce › Kamera › Styl), Swoboda. Bieżący rozdział ma nazwę i numer, ukończone mają ptaszek, przyszłe są wygaszone. Stuknięcie w ukończony rozdział wraca do jego pierwszego pytania (odpowiedzi zostają), stuknięcie w najdalszy rozdział wraca tam, gdzie się skończyło.
- **Przejście dalej:** pytania Tak / Nie i wybór drogi (zestaw czy składam sam, która część) przechodzą dalej same. Pytania zmieniające wygląd mają przypięty po prawej przycisk: „Zostaw” przed wyborem, „Dalej” po wyborze (na końcu „Gotowe”).
- **Bramki Tak / Nie** tylko przy długich gałęziach: kolory ubioru i twarz.
- **„Zdaj się na mnie”** w pierwszym pytaniu każdego rozdziału: Manikun ustawia cały rozdział z sensem i pyta „Pasuje?” (Pasuje / Inaczej).
- **Komentarze** tylko przy wyborach wartych uwagi: mocny kolor, nietypowe zestawienie (cyberpunk w naturze, elegancko na plaży, słoneczne okulary w nocy, dron), zamknięcie rozdziału. Poza tym tylko ruch głowy.
- Pytania bez sensu w danej scenie znikają (broda tylko u mężczyzny, usta tylko u kobiety, kolor włosów nie przy łysej głowie, pora dnia nie w studiu, ręce nie na siedząco, ruch kamery tylko w wideo i nie przy selfie).
- Na końcu Manikun podsumowuje scenę jednym zdaniem, pulsuje Maniscrypt, wszystko przechodzi w Swobodę.
- W każdej chwili można przejść do Swobody z zachowaniem wyborów.

Pytania:

1. **Postać:** Kogo ustawiamy? → Jak go/ją ubierzemy? (Gotowy zestaw / Składam sam) → zestaw albo po kolei Góra, Okrycie, Dół, Buty, Nakrycie głowy → Zmieniamy kolory? (Którą część? → kolor → znowu wybór części, aż do „Kolory gotowe”) → Dopracujemy twarz? (fryzura, kolor włosów, mina i jej poziom, zarost i jego kolor, usta, okulary i oprawki)
2. **Poza:** Co robi? (wszystkie pozy naraz, stojące i siedzące) → A ręce?
3. **Miejsce:** Gdzie jesteśmy? (wszystkie tła naraz) → A dokładniej? (wariant i dodatki, np. mgła) → Pora dnia? → Jakie światło?
4. **Kamera:** Jak blisko? → Z której strony patrzymy? → Jak rusza się kamera? → Format?
5. **Styl:** W jakim klimacie?

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
- Generatory z linkami i ikoną: prawdziwa ikona serwisu ładowana z jego strony (przez usługę ikon stron Google); gdy się nie wczyta (brak sieci, blokada), zostaje litera w kolorze marki. Otwarta biblioteka ikon marek (simple-icons) nie ma większości tych logo.
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
| Poziom (Podstawowy / Ekspert) | działa |
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

# Rozbudowa: scena z klocków

Cel: Kreator i Swoboda „nieograniczone”. Da się np. posadzić kogoś w lesie nad rzeką, na kanapie, przed stołem, na którym leży banan.

## Warstwy sceny

| Warstwa | Przykłady | Ile naraz |
|---|---|---|
| Miejsce | las, góry, plaża, kawiarnia, studio | jedno |
| Elementy miejsca | rzeka, mgła, deszcz, ognisko | kilka |
| Obiekty (siedziska, meble) | krzesło, kanapa, stół, lada | kilka |
| Drobiazgi na blacie | kubek, laptop, banan | kilka na mebel |

- Najpierw poza, potem obiekt (dowolny z katalogu, bez filtrowania). Położenie wobec obiektu: w Podstawowym automatyczne, w Ekspercie do wyboru.
- Pozy siedzące tracą siedzisko w nazwie: Siedzi prosto, Pochylony, Po turecku, Kolano pod brodą. Bez obiektu Manikun siedzi na ziemi, z obiektem na nim (jeśli da się usiąść) albo obok.
- Maniscrypt składa zdanie z warstw według gramatyki („…sitting on a sofa in a forest by a river, in front of a table with a banana on it”).

## Ustalenia

1. **Rysunek małych rzeczy:** 15–20 popularnych drobiazgów ma pełny rysunek, reszta dostaje wspólny znak z podpisem.
2. **Poziomy:** Postać → Podstawowy / Ekspert → Kreator / Swoboda.
3. **Elementy miejsca:** wolno wszystko poza fizycznymi sprzecznościami (deszcz i śnieg się wykluczają, Manikun krótko wyjaśnia).
4. **Limit:** miękki. Od 7. rzeczy Manikun ostrzega, że generator może coś zgubić; najważniejsze rzeczy idą na początek Maniscryptu.
5. **Brak w katalogu (Ekspert):** kafelek „Dodaj: …”, wbudowany słownik pl → en; nieznane słowo idzie w oryginale, a Manikun podpowiada wpisanie po angielsku.
6. **Podstawowy a Ekspert:**

| | Podstawowy | Ekspert |
|---|---|---|
| Obiekty | jeden główny („Przy czym?”) | wiele, pętla „Coś jeszcze?” |
| Położenie | automatyczne | wskazywane w kadrze |
| Drobiazgi na blacie | jeden („Co na nim leży?”) | wiele, z wyszukiwarką |
| Elementy miejsca | jeden | kilka |
| Kolory rzeczy | domyślne | do wyboru |

Kreator Ekspert ma rozdział „Rzeczy” (Postać › Poza › Rzeczy › Miejsce › Kamera › Styl) z bramką i pętlą, jak przy kolorach. Kreator Podstawowy zostaje przy 5 rozdziałach: w Pozie dochodzi „Przy czym?” (pierwszy kafelek „Nic”), przy meblu z blatem „Co na nim leży?”.

7. **Punkty zaczepienia w kadrze:** pod postacią, przed, za, obok z lewej (blisko, dalej), obok z prawej (blisko, dalej), w tle, na blacie. Każdy punkt ma swoje słowa w Maniscrypcie. Zajęte punkty są wygaszone. Podstawowy zajmuje punkty sam; w Ekspercie użytkownik wskazuje punkt w kadrze, a Kreator pyta: „Wskaż na ekranie, gdzie chcesz umieścić ten obiekt”.
8. **Propozycja zmiany kadru:** gdy obie strony są zajęte, Manikun proponuje szerszy kadr (3:2, w wideo 16:9); gdy rzeczy są nad sobą, wyższy (4:5, w wideo 9:16). Szerszy kadr daje dodatkowe punkty po bokach, wyższy dodatkowe punkty w tle i przed.

## Katalog startowy

- **Obiekty do siedzenia i opierania (10):** Krzesło, Fotel, Kanapa, Hoker barowy, Ławka, Pufa, Kamień, Pień drzewa, Schody, Skrzynia
- **Meble i duże obiekty (10):** Stół, Stolik kawowy, Lada barowa, Biurko, Lampa stojąca, Regał z książkami, Roślina w donicy, Parasol plażowy, Rower, Samochód
- **Drobiazgi z rysunkiem (18):** Kubek, Filiżanka, Szklanka, Butelka wina, Kieliszek, Talerz z jedzeniem, Misa owoców, Laptop, Telefon, Książka, Gazeta, Wazon z kwiatami, Świeca, Aparat fotograficzny, Słuchawki, Gitara, Torba, Parasolka
- **Drobiazgi ze znakiem:** bez ograniczeń (banan, ananas, zegarek, klucze…)
- **Elementy miejsca (10):** Rzeka, Staw, Mgła, Deszcz, Śnieg, Ognisko, Kałuże, Spadające liście, Neony, Latarnia uliczna

## Etapy

1. Poziomy: Podstawowy / Ekspert na starcie i w menu (fundament, oba działają jeszcze tak samo). **Gotowe.**
2. Obiekty i meble z rysunkiem, przerobione pozy siedzące, grupa „Rzeczy” w Swobodzie, „Przy czym?” w Kreatorze, automatyczne punkty zaczepienia, gramatyka Maniscryptu. **Gotowe.**
   - Pozy siedzące: Siedzi prosto, Pochylony, Po turecku, Kolano pod brodą. Bez rzeczy siedzi na ziemi.
   - Na siedzisku wysokim (krzesło, fotel, kanapa, ławka, hoker) prosto i pochylony siedzi jak na krześle; na niskim (pufa, kamień, pień, schody, skrzynia) z kolanami w górze. Po turecku i z kolanem pod brodą siedzi na wierzchu siedziska. Na hokerze stopy są na podnóżku.
   - Automat: siedząca postać siada na tym, na czym się da; inne rzeczy stają w swoim zwykłym miejscu (stół i biurko przed stojącą, obok siedzącej; kanapa, ławka, schody, regał i parasol za postacią; samochód w tle; reszta obok). Rzecz obok przesuwa kompozycję, żeby razem stały w środku kadru.
   - Swoboda: grupa „Rzeczy” w dolnym rzędzie (Nic + 20 rzeczy). Kreator: w rozdziale Poza pytanie „Na czym siedzi? Albo co ma obok?” / „Coś obok?”.
   - Maniscrypt: „sitting upright on a comfortable sofa…”, „…with a wooden table in front of them”.
3. Drobiazgi (rysunek i znak), „Co na nim leży?”, słownik pl → en, własne rzeczy, wyszukiwarka. **Gotowe.**
   - Blat mają: Stół, Stolik kawowy, Lada barowa, Biurko. Drobiazgi leżą na środku blatu, rysowane 1,6× większe niż w rzeczywistości, żeby były czytelne.
   - 18 drobiazgów z rysunkiem, ok. 200 w słowniku ze znakiem z podpisem (pastylka z nazwą i kropką w kolorze rodzaju: jedzenie, napój, naczynie, elektronika, papier, dekoracja, narzędzie, akcesoria, inne). Nowe rzeczy dopisuje się w TEXT_ITEMS.
   - Swoboda: Rzeczy › Obiekty / Na blacie. „Na blacie” jest wygaszone bez blatu. W rzędzie: Nic, ostatnio znaleziony drobiazg spoza rysunków, 18 z rysunkiem i „Szukaj…”.
   - Wyszukiwarka zna cały słownik, także po angielsku. Drobiazg bez blatu: pusta scena dostaje stół, a przy innej rzeczy Manikun prosi o blat.
   - Ekspert: „Dodaj: „…”” w wynikach. Słowo ze słownika dostaje angielski opis, nieznane idzie jako „an object described as "…"”, a Manikun podpowiada wpisanie po angielsku. Podstawowy: w pustych wynikach informacja o trybie Ekspert.
   - Kreator: po pytaniu o rzecz, gdy ma blat: „Co leży na stole?”.
   - Maniscrypt: „…with a wooden table with a banana on it in front of them”.
4. Elementy miejsca (10, kilka naraz, deszcz/śnieg się wykluczają). **Gotowe.**
   - Elementy: Rzeka, Staw, Mgła, Deszcz, Śnieg, Ognisko, Kałuże, Spadające liście, Neony, Latarnia uliczna. Pasują do każdego tła (także studia i wnętrz). Dotychczasowa „+ Mgła” z wariantów tła przeszła do elementów.
   - Podstawowy: jeden element (wybór zastępuje poprzedni, ponowne stuknięcie zdejmuje). Ekspert: kilka naraz; Deszcz i Śnieg zdejmują się nawzajem z krótkim komentarzem Manikuna.
   - W kadrze: woda, śnieg na ziemi, kałuże, ognisko, neony, latarnia i mgła za postacią; deszcz, płatki śniegu i liście przed nią.
   - Swoboda: Scena › Elementy (Brak + 10). Kreator: w rozdziale Miejsce po „A dokładniej?” pytanie „Dodać coś do miejsca?” (w Ekspercie „Coś jeszcze w miejscu? Możesz wybrać kilka.”).
   - Maniscrypt: „quiet pine forest in the background…, with a river flowing past, soft mist drifting over the scene and autumn leaves falling through the air”.
5. Ekspert: rozdział „Rzeczy”, wskazywanie punktu w kadrze, propozycje zmiany kadru, kolory rzeczy, ostrzeżenie przy więcej niż 6 rzeczach. **Gotowe.**
   - Punkty: Pod postacią (tylko siedzisko przy siedzącej), Przed, Za, Obok z lewej, Obok z prawej, W tle; w kadrze co najmniej kwadratowym dodatkowo Dalej z lewej / z prawej, w wyraźnie pionowym Na pierwszym planie. Dalej po bokach stoi za rzeczą z miejsca „obok”.
   - Położenie: wskazane ręcznie ma pierwszeństwo, reszta automatem w pierwszym wolnym punkcie. Wskazanie zajętego punktu przestawia tamtą rzecz z powrotem na automat.
   - Swoboda (Ekspert): Rzeczy › Obiekty włączają i wyłączają rzeczy (kilka naraz); nowa rzecz od razu czeka na wskazanie punktu w kadrze. Stuknięcie w rzecz w kadrze pozwala ją przestawić. Na blacie: kilka drobiazgów. Nowa kategoria Kolory: rzecz → paleta (Domyślny + 20).
   - Kreator (Ekspert): rozdział Rzeczy: „Dodajemy coś do sceny?” → „Co dodajemy?” → „Wskaż na ekranie, gdzie ma stać” (stuknięcie w punkt przechodzi dalej; są też kafelki z punktami) → „Co leży na stole?” (gdy blat) → „Jaki kolor?” → znowu „Co dodajemy?”, aż do „Rzeczy gotowe”. W Podstawowym pytania o rzeczy zostają w rozdziale Poza.
   - Propozycje Manikuna (raz na scenę): obie strony zajęte → szerszy kadr (3:2, w wideo 16:9); rzeczy nad sobą (za postacią albo w tle, a do tego drobiazgi albo coś przed) → wyższy kadr (4:5, w wideo 9:16). Propozycję wykonuje stuknięcie w dymek. Powyżej 6 rzeczy (obiekty, drobiazgi, elementy miejsca) ostrzeżenie.
   - Maniscrypt: kolor przed nazwą („a red comfortable sofa”), położenie z punktu („further away on the right”, „in the foreground, close to the camera”).
6. Nowe pozy: Rozparty, Na brzegu, Noga na nogę, grupa Leży, Oparty. **Gotowe.**
   - Siedzi: Rozparty, Na brzegu, Noga na nogę. Na wysokim siedzisku siedzą „jak na krześle”, na niskim z kolanami w górze. Bez siedziska: Rozparty i Noga na nogę odchylają się na rękach z nogami skrzyżowanymi w kostkach, Na brzegu siada zwyczajnie.
   - Leży (nowa grupa): Na plecach (głowa po lewej, twarz w górę), Na boku (głowa wsparta na dłoni), Na brzuchu (głowa na dłoniach, łydki w górze). Na ziemi albo na wierzchu siedziska (kanapa, ławka).
   - Stoi: Oparty, tylko gdy w scenie jest rzecz. Postać opiera się plecami o pierwszą rzecz, która staje tuż za nią (działa dla lady, samochodu, regału, stołu). Bez rzeczy kafelek znika, a postać stoi prosto.
   - Mina przechyla głowę i tułów względem pozy, więc działa też na leżąco.
   - Ręce na leżąco: Na plecach: Wzdłuż ciała, Pod głową, Na brzuchu. Na brzuchu: Pod brodą, Pod głową (głowa na złożonych przedramionach). Na boku: Podpiera głowę, Głowa na ramieniu (leżąc płasko). Leżąca postać jest wyśrodkowana razem z rękami.
   - Na brzuchu: biodra na ziemi, tułów uniesiony na łokciach pod barkami, łydki w górze.

## Poprawki po rozbudowie

- Drobiazgi leżą na swoim blacie: każdy ma numer mebla. W Ekspercie przy kilku blatach „Na blacie” najpierw pyta, który blat; w Kreatorze trafiają na blat, który właśnie ustawiamy. Usunięcie mebla usuwa jego drobiazgi.
- Kreator: „Oparty” jest zawsze w pytaniu o pozę; gdy w scenie nic nie ma, następne pytanie brzmi „O co się opiera?” (w Ekspercie „Oparty potrzebuje czegoś za plecami. Dodajemy?”).
- Gdy rzecz nie mieści się w kadrze, Manikun proponuje szerszy kadr (raz na scenę, na obu poziomach; stuknięcie w dymek zmienia format).

## Manikun w kadrze: światło, ruch i miny

- Postać w kadrze oświetla lampa ze sceny: jasna strona i odbłysk od lampy, przy świetle z tyłu jasna krawędź sylwetki (ciepła przy naturalnym, chłodna przy lampie). W kadrze na całą postać cień pod stopami i cień rzucany od lampy.
- Ruch: kąty stawów dochodzą do pozy jak sprężyna (lekki przerzut), a w bezruchu Manikun ledwo widocznie oddycha. Przy ograniczeniu ruchu w systemie jedno i drugie jest wyłączone.
- Na starcie Manikun jest uśmiechnięty (Radość · uśmiech).
- Kategoria Twarz nazywa się teraz Głowa.
- Mina ma emocje, a każda (poza Neutralną) dwa poziomy: Radość (Uśmiech, Śmiech), Złość (Irytacja, Wściekłość), Smutek (Smutek, Płacz), Zamyślenie (Zaduma, Głębokie zamyślenie), Zaskoczenie (Zdziwienie, Szok). W Swobodzie emocja otwiera drugi rząd z poziomami, w Kreatorze po „Jaka mina?” jest „Jak mocno?”. Poziom mocny mocniej przechyla głowę i tułów i ma własny opis w Maniscrypcie. Losowanie częściej wybiera poziom łagodny.
- Komputer: rzędy kafelków przewija kółko myszy i przeciąganie.
- Warianty tła dzielą się na rodzaj (jeden do wyboru) i dodatki (kilka naraz, kafelek z podpisem „dodatek”). Dodatki trafiają do Maniscryptu po podstawie („…, with a small wooden footbridge across the river and …”), razem z elementami miejsca.

  | Tło | Rodzaj (jeden) | Dodatki (kilka naraz) |
  |---|---|---|
  | Studio | Szare, Białe, Czarne, Kolorowe | – |
  | Ulica | Kamienice, Nowoczesna | Neony, Po deszczu |
  | Dach | Panorama, Wieżowce | Taras |
  | Góry | Szczyty | Jezioro, Hala |
  | Jezioro | Spokojne | Pomost, Trzciny |
  | Rzeka | Spokojna, Kamienista | Mostek |
  | Las | Iglasty, Liściasty | Polana, Rzeczka albo Ścieżka (wykluczają się: rysunki leżą w tym samym miejscu) |
  | Plaża | Piaszczysta | Skały, Palmy, Molo |
  | Łąka | Zielona, Zboże | Kwiaty, Samotne drzewo |
  | Pokój | Salon, Sypialnia, Biuro | Loft (ceglane ściany) |
  | Kawiarnia | Kawiarnia, Bar, Restauracja, Piekarnia | – |

## Próbny kadr zamiast podglądu FLUX

- Cel: podgląd w aplikacji nie może zastąpić generatora. Szkic z FLUX był „prawie gotowym zdjęciem”, więc część osób na nim poprzestawała.
- Przycisk „Próbny kadr” w panelu Maniscryptu otwiera makietę ujęcia rysowaną silnikiem Manikuna: wybrany format, plan, poza, rzeczy, tło, pora dnia i cień od lampy, bez ikon aparatu i lampy.
- Styl daje tylko klimat: gradacja koloru (Noir czarno-biały, Vintage sepia, Komiks mniej odcieni, Akwarela lekko rozmyta), poświata w kolorach stylu (Cyberpunk magenta i cyjan, Fantasy złoto i fiolet), przy Filmowym w poziomie pasy kinowe. Do tego blask od strony światła, winieta, ziarno i podpis „PRÓBNY KADR · MANIKUN · format”.
- Działa od razu, bez internetu i bez limitu. „Zapisz kadr” zapisuje PNG (1600 px na dłuższym boku), który można dołączyć w generatorze jako szkic kompozycji.
- Worker `manikun-podglad` na Cloudflare nie jest już wywoływany; kod w `worker/podglad.js` zostaje.

## Szkic roboczy i włączenie świateł

- Podczas ustawiania sceny (Kreator i Swoboda) kadr jest szkicem roboczym: Manikun w płaskim drewnie z konturem (stawy odrobinę jaśniejsze, ubranie w płaskim kolorze, bez słojów i cieniowania), bez światła lampy na postaci i kontry, bez cienia rzucanego; zostaje tylko płaski owal pod stopami. Tło w płaskich kolorach, bez poświat słońca, księżyca, latarni i plamy światła w studiu. Pora dnia dalej zmienia kolory. Mina i kolory ubrań są czytelne.
- Pełna jakość zostaje na ekranie startowym, w tutorialu i w Próbnym kadrze.
- Otwarcie Próbnego kadru: najpierw szkic roboczy, potem po krótkim mrugnięciu, jak lampy na planie, pełny kadr z cieniem, światłem i klimatem stylu. Przy ograniczeniu ruchu w systemie od razu pełny kadr.
- Trzy stopnie: szkic przy pracy, Próbny kadr jako sprawdzenie kompozycji, prawdziwe ujęcie z generatora.
