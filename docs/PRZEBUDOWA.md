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
- Postprodukcja Próbnego kadru: głębia ostrości (tło rozmyte, mocniej przy portrecie i twarzy), poświata jasnych miejsc (neony, lampy, słońce) i miękkie smugi światła od lampy w stronę Manikuna (bez nich przy świetle z tyłu i przy Obiekcie).
- Rzeczy w Próbnym kadrze: bryła od strony światła (jak na Manikunie), miękki cień w miejscu styku z podłogą i naturalny materiał, gdy nie wybrano koloru (drewniane krzesło, stół i hoker, tapicerowana kanapa i fotel, kamień). W szkicu roboczym zostają szare.
- Manikun: dłoń z kciukiem zamiast „rękawicy”; stopa z piętą pod kostką, śródstopiem i palcami, podeszwa pozioma w typowych pozach. Buty mają profil z noskiem i podeszwą: sportowe pełniejsze z jasną grubą podeszwą, eleganckie smukłe z cienką ciemną.
- Tło w Próbnym kadrze jest żywsze niż w szkicu: mocniejsze nasycenie i kontrast, na zewnątrz niebo w kolorach pory dnia (dzień błękit, złota godzina pomarańcz i róż, noc granat z fioletem przy horyzoncie) i cienka mgiełka nad horyzontem.

## Kierunek postaci: lustro, zwrot i spojrzenie

- Lustro: kamera po lewej stronie postaci oznacza postać zwróconą w lewą stronę kadru (tak rozumieją to generatory), więc przy kamerach „Lewo” Manikun jest rysowany odbity. Odbijają się z nim rzeczy związane z postacią (siedzisko, rzecz za plecami, rzecz przed i za nią); rzeczy „z lewej / z prawej” zostają po swojej stronie kadru. Światło na odbitym Manikunie pada z prawdziwej strony lampy. Ekran startowy się nie odbija.
- Zwrot (kategoria w grupie Postać, tylko Ekspert): Do kamery, Bokiem, W głąb kadru (półtyłem), Tyłem. W głąb i Tyłem odwracają Manikuna od kamery i chowają twarz (włosy na tyle głowy). Wyłączony przy selfie i pozach leżących.
- Maniscrypt: zamiast stałego „facing the camera” w opisach póz zdanie o zwrocie, zawsze z kierunkiem w kadrze („facing the left side of the frame”). Przy kamerze na wprost i zwrocie Do kamery zostaje „facing the camera”. Tyłem pomija minę.
- Spojrzenie (Głowa): Naturalnie (bez opisu), W obiektyw, Przed siebie, W dal; w Ekspercie także W dół i Na rzecz ze sceny („looking at the wooden table”). W obiektyw przy postaci odwróconej: spojrzenie przez ramię. Na rysunku spojrzenie przechyla głowę.
- Kreator: po rękach „Jak stoi względem kamery?” (Ekspert) i „Gdzie patrzy?” (oba poziomy). Drzewko sceny pokazuje Spojrzenie i Zwrot (gdy inny niż Do kamery).
- Tutorial: po skopiowaniu Maniscryptu, zanim pokaże się zdjęcie, przez 1,5 s w kadrze kręci się logo generatora (jak kółko ładowania), zmieniając się co 250 ms: ChatGPT, Gemini, Midjourney, Leonardo, Ideogram, Kling. Manikun mówi „Ciekawe, co AI nam zaproponuje…” (przy Fantasy: „Zobaczmy, co AI zrobi z Fantasy…”). Widać, że obraz robi AI z zewnątrz.

## Tła w pełnej jakości (wszystkie miejsca)

- W Próbnym kadrze i tutorialu (szkic roboczy zostaje prosty): podłoże z perspektywą i fakturą, która gęstnieje ku horyzontowi, trzy plany (daleki jasny i zamglony, średni nasycony, bliski ciemniejszy).
- Plaża: morze ciemniejsze przy horyzoncie, fale coraz dłuższe ku brzegowi, odbicie słońca albo księżyca pod ciałem niebieskim, mokry piasek z pianą, suchy jasny piasek ze zmarszczkami i kamykami, trawa na wydmach w rogach.
- Las: trzy rzędy świerków albo koron liściastych z mgiełką między nimi, drzewa z bryłą (strona od słońca jaśniejsza), ściółka z plamami słońca, igliwiem i paprociami, promienie słońca między drzewami (nie nocą), ścieżka z kamykami.
- Łąka: wzgórza w trzech planach z kępami drzew, trawa ze źdźbłami w perspektywie, polne kwiatki, kępki w rogach.
- Pora dnia na podłożu (noc granatowo, złota godzina ciepło) nakłada się na końcu, razem z dodatkami tła. Nakładka nieba w Próbnym kadrze gaśnie ku horyzontowi, bez twardej krawędzi. Linia podłogi pod stopami zostaje tylko w szkicu.
- Góry: trzy pasma (dalekie jasne, średnie ciemniejsze) z cieniem zbocza od strony bez słońca i śniegiem na szczytach, pas lasu u stóp, hala z trawą albo kamienistym gruntem z głazami.
- Jezioro: dalszy brzeg ze wzgórzami i drzewami w mgiełce, tafla z odbiciem drzew, zmarszczkami i błyskiem słońca, pas mułu i trawiasty brzeg. Rzeka: nurt z ziemnymi brzegami, smugami prądu i błyskiem, łąka dookoła.
- Ulica: kamienice (albo szklane biurowce przy wariancie Nowoczesna) po obu stronach w perspektywie, zbiegające się do punktu na horyzoncie: gzymsy, okna (nocą część świeci), drzwi na parterze, chodniki z płytami i krawężnikiem, jezdnia z pasami, latarnie (nocą z poświatą), dalekie miasto w mgiełce.
- Dach: panorama w dwóch planach (bliższa z oknami, nocą świecącymi), murek z obróbką, posadzka z płyt w perspektywie, wywietrznik i zbiornik.
- Pokój: jasna ściana, listwa, podłoga z desek w perspektywie, okno z ramą, parapetem i zasłonami, smuga światła z okna na podłodze (nie nocą), obraz na ścianie, dywan pod postacią, roślina w donicy, jaśniejsze meble.
- Kawiarnia: ciepła ściana z boazerią, podłoga w szachownicę w perspektywie, lada z ekspresem, tablica z menu, półki z kubkami, lampy świecące na ścianę i stożki światła w dół.
- Studio: bezszwowe tło w kolorze wariantu (szare, białe, czarne, kolorowe), ściana łagodnie przechodzi w podłogę, plama światła za postacią i miękka winieta.

## Postać w Próbnym kadrze

- Bez kreskówkowego konturu: krawędź w odcieniu bryły, półprzezroczysta (drewno ciemniejszym drewnem, ubranie ciemniejszym kolorem materiału).
- Fałdy na ubraniu: po dwie na rękawie i nogawce (ciemny łuk z jasnym refleksem), na tułowiu dwie od ramion ku talii i zagniecenie nad paskiem.
- Kontra na krawędzi w kolorze miejsca i pory dnia (las zielonkawo, plaża i pokój ciepło, złota godzina pomarańczowo, noc niebiesko), wyraźniejsza niż w szkicu.
- Światło na bryle wygładzone (bez prążków przy dużym planie), słoje na twarzy przygaszone.
- Ekran startowy, tutorial i szkic roboczy zostają bez zmian.
- Krój góry (wszędzie, także w szkicu): gładki obrys z zaokrągloną klatką, materiał spada prosto od piersi do bioder i przylega do nich (bez rozkloszowania „klapką”), dekolt i lekko wygięty dół. Kurtka i płaszcz w tym samym kroju, szersze. Bluzy mają ściągacz na dole, bluza z kapturem kieszeń kangurkę (pomijaną przy zgiętych nogach, gdy chowa się pod udami).
- Cień bliższej ręki na reszcie ciała (Próbny kadr): rozmyta sylwetka ręki przesunięta od światła, przycięta do obrysu ciała (pada na tułów, udo, a przy dłoni nad oczami na twarz). Cień na podłodze ma ostrzejszy rdzeń pod miękkim brzegiem.
- Dłoń w zbliżeniu (portret, twarz w Próbnym kadrze): cztery palce z zaokrąglonymi końcami i linia kostek zamiast gładkiej dłoni ze słojami.
- Proporcje: mężczyzna ma szersze ramiona i węższą talię, kobieta węższą talię i szersze biodra.
- Łączenia rąk i nóg (Próbny kadr): ramię z przedramieniem i udo z łydką (także rękaw i nogawka) to jeden kształt bez szwu, z łukiem po zewnętrznej stronie zgięcia; drewniane kulki w łokciach i kolanach znikają. Na ubraniu fałda tuż nad i pod zgięciem. Szkic, start i tutorial bez zmian.
- Dłonie (Próbny kadr): jeden kształt dłoni z palcami i kciuk wyrastający z boku zamiast dwóch walców. Ułożenie z gestu rąk: luźna (palce lekko zgięte), płaska nad oczami, pięść pod brodą i przy telefonie, dłoń na biodrze z mocno zgiętymi palcami. Szczeliny między palcami, wyraźniejsze w zbliżeniach.

## Nowe miejsca: pustynia, park, góry zimą, kuchnia

- Pustynia (Natura): Wydmy albo Skalista (czerwone ostańce), dodatki Kaktusy i Oaza. Wydmy z cieniem po zawietrznej, zmarszczki piasku w perspektywie, drżące powietrze nad horyzontem.
- Park (Miasto): Aleja (żwirowa alejka z latarniami, nocą świecącymi) albo Trawnik (ścieżka z boku, miasto za drzewami), dodatki Fontanna i Ławki.
- Góry zimą (Natura): Szczyty albo Ośnieżony las, dodatki Chatka (okno świeci nocą) i Stok (ślady nart). Mocno ośnieżone pasma, świerki z czapami śniegu, zaspy i iskrzący śnieg.
- Kuchnia (Wnętrze): Nowoczesna (granatowe szafki, białe kafelki) albo Rustykalna (drewno, otwarte półki ze słojami, podłoga z terakoty), dodatek Zioła na parapecie. Okno z porą dnia, lodówka, blat z czajnikiem i miską, nocą ciepłe światło pod szafkami.
- Każde miejsce ma prostą wersję w szkicu roboczym i opis w Maniscrypcie (podstawa, wariant i dodatki).

## Nowe ubrania i dodatki

- Góra: Koszula w kratę (wzór kraty na tułowiu i rękawach, także w szkicu), Golf (wywinięty kołnierz wokół szyi), Top bez rękawów (węższe ramiączka, gołe ramiona).
- Okrycie: Kamizelka (bez rękawów, pikowana, rozpięta z przodu).
- Nowa część Dodatki (kafelek w Ubiorze, pytanie w Kreatorze „Jakieś dodatki?”, własny kolor): Szalik (owinięty wokół szyi, koniec na piersi) i Torba przez ramię (pasek przez pierś, torba przy biodrze).
- Maniscrypt: „with a navy baseball cap and a burgundy knit scarf”. Gotowe zestawy mają dodatki „Brak”.

## Cechy postaci

- Nowa kategoria Cechy w grupie Postać (po Sylwetce): Skóra, Wiek, Budowa, Wzrost, Piegi, Tatuaże, Kolczyki. Kafelki z miniaturą Manikuna (ta sama skala, więc dziecko i niski wzrost są mniejsze), w drzewku sceny gałąź Cechy z tym, co zmienione.
- Skóra: Bardzo jasna, Jasna, Oliwkowa, Śniada, Brązowa, Ciemna. Na Manikunie odcień drewna (od brzozy po heban) w szkicu, Próbnym kadrze i kafelkach; biały materiał zostaje biały. W Maniscrypcie „with olive skin” (pomijane przy zdjęciu własnej twarzy, bo skóra jest ze zdjęcia).
- Wiek: Dorosły albo Dziecko (krótsze ciało i kończyny, węższe barki, względnie duża głowa; „of a single young girl, about eight years old,”). Dziecko nie ma zarostu. Kreator pyta „Dorosły czy dziecko?” po wyborze postaci.
- Budowa: Przeciętna, Szczupła, Wysportowana (szersze barki, grubsze kończyny), Krępa (szersza talia i biodra). Wzrost: Niski, Średni, Wysoki („of a single tall adult man”).
- Piegi (kropki na policzkach i nosie), Tatuaże (motyw na przedramieniu albo rękawy na obu rękach, widoczne spod krótkich rękawów i bez rękawów), Kolczyki (wkrętki albo złote koła w płatku ucha).
- Kreator: „Jaki kolor skóry?” przy dopracowaniu twarzy.

## Zwierzaki: Manidog, Manicat, Manibun, Manidragon

- Nowa kategoria Zwierzaki w grupie Rzeczy. Zwierzak to rzecz z pozą (Siedzi, Stoi, Leży) i umaszczeniem: pies (złoty, czarny, czekoladowy, dalmatyńczyk), kot (rudy, czarny, pręgowany, biały), królik (biały, szary, brązowy), smok (zielony, czerwony, fioletowy, niebieski).
- Po wybraniu zwierzaka rząd pokazuje jego pozy, umaszczenie i Usuń. Podstawowy: jeden zwierzak; Ekspert: kilka. Zwierzaki nie zastępują rzeczy (krzesło zostaje) i nie są siedziskiem ani rzeczą, o którą się opiera.
- Rysunki: obłe bryły jak Manikun, w kolorze sierści już w szkicu; zwierzak patrzy w stronę postaci. Ustawiają się w punktach zaczepienia jak rzeczy (domyślnie obok z prawej).
- Maniscrypt: „with a golden retriever dog sitting next to them on the right”, „a small friendly green cartoon dragon standing…”.
- Kreator pyta „A może zwierzak? Pies, kot, królik albo smok.” (oba poziomy). Losowanie czasem dodaje zwierzaka. Wyszukiwarka zna „pies”, „kot”, „królik”, „smok”.


## Nowe gotowce (Gotowe)

- 16 nowych gotowych scen w `PRESETS.person`, razem 24.
- 8 bez zwierząt: Pustynny wędrowiec, Zima w górach, Gotowanie w kuchni, Jesień w parku, Ognisko w lesie, Wakacje nad morzem (dziecko), Tatuaż i neony, Portret w golfie. Korzystają z nowych miejsc (pustynia, park, zimowe góry, kuchnia), ubrań (koszula w kratę, golf, top, kamizelka, szalik, torba) i cech (skóra, wiek, budowa, piegi, tatuaż, kolczyki).
- 8 ze zwierzakami: Spacer z Manidogiem, Wieczór z Manicatem (fotel), Manibun na łące, Smok w lesie, Dalmatyńczyk w studiu, Pies na plaży, Lodowy smok, Manicat w kuchni. Każdy zwierzak ma ustaloną pozę i umaszczenie.
- `wearIn(setId, parts, colors)` składa zestaw z podmienionymi częściami (strój „custom”).
- `applyPreset` kopiuje gotowca głęboko i zeruje cechy (`TRAIT0`) oraz zwrot ciała, żeby scena nie dziedziczyła np. „dziecko, niski” z poprzednich ustawień. Miniatury gotowców rysują też rzeczy i zwierzaki.

- Szkic kuchni (podgląd roboczy) ma ten sam układ co próbny kadr: okno, szafki górne albo półki ze słojami, szafki dolne z blatem i kranem, lodówka, zioła na parapecie, w stonowanych barwach szkicu.

- Kręcone włosy na szkicu: zamiast prostego pasma za głową puszysta chmura loków do linii żuchwy, z brzegiem z okrągłych garbków (`hairCloud` w manikun.js).

## Magiczna różdżka przy otwarciu próbnego kadru

- Zamiast „zapalania świateł” (mrugnięcie szkicu) przez kadr przelatuje różdżka z gwiazdką, łukiem od lewego dołu do prawej góry (ok. 1,2 s).
- Szkic roboczy leży na pełnym kadrze w grupie z maską SVG; różdżka zostawia w masce miękkie, rosnące koła (gradient radialny), więc szkic rozpuszcza się tam, gdzie przeleciała. Za nią lecą iskierki-gwiazdki, na koniec krótki błysk i resztki szkicu gasną.
- Dźwięk `magia`: arpeggio sinusów w górę (`chime`) zamiast `klap`, z przyciskiem wyciszenia jak inne dźwięki.
- Przy ograniczeniu animacji w systemie kadr pokazuje się od razu. Zapis PNG bez zmian (to tylko warstwa `#trialDraft`).
- Uwaga: klasa `.ink` nadpisuje atrybuty fill/stroke, dlatego elementy różdżki mają style w atrybucie `style`.

## Losuj jak maszyna losująca + pełna klatka w podglądzie

- „Losuj” (`rollRandom`): 8 szkiców przelatuje coraz wolniej (60→220 ms, „tik” przy każdym), ostatni staje z „klap”, a po chwili nad szkicem pojawia się nieruchoma klatka w pełnej jakości (`#previewStill`, `showStill`).
- Klatka rysuje się raz (ok. 50 ms na wolnym telefonie), a nie co klatkę: szkic pod spodem dalej „oddycha”. Znika przy każdej zmianie sceny (odcisk `stillKey` bez stanu menu), przy chwyceniu kamery lub lampy i przy zmianie rozmiaru okna.
- Pośrednie szkice: `randomize(true)` bez odświeżania menu (`fixScene` + `sceneChanged`) i bez płynnych przejść (`snapScene`); jeden krok kosztuje ok. 16 ms zamiast ok. 260 ms przy CPU ×4.
- W klatce bez poświaty lampy (`.glow`), z miękkim materiałem postaci jak w próbnym kadrze.

## Poprawka: znikający Manikun w zbliżeniach z kamery z lewej

- Przy kamerze z lewej postać jest odbijana lustrzanie. Oś szła przez środek sylwetki, a w leżących i rozpartych pozach głowa jest daleko od niego, więc w zbliżeniu (portret, twarz) odbita postać wypadała poza kadr. Szkic był pusty, a Maniscrypt i tak opisywał twarz.
- Przy zbliżeniach oś odbicia przechodzi przez głowę. Test wszystkich póz × kamer × ujęć × formatów: 0 pustych kadrów (wcześniej 41).

## Losuj: szybszy przelot i losowanie ze wszystkich elementów

- Przelot 4 świeżo losowanych szkiców, odstępy 40, 50 i 65 ms (razem ok. 0,15 s; każdy szkic widać przez 2–4 klatki ekranu). Każdy szkic to pełne `randomize`, bez gotowej puli.
- Losowanie pokazuje całą aplikację: w połowie losowań strój z pojedynczych części (wszystkie góry, okrycia, doły, buty), dodatki (szalik, torba), spojrzenie, a w trybie eksperta także zwrot ciała. Test 800 losowań: wszystkie części, zwroty, spojrzenia i miejsca się pojawiają, 0 błędów.
- Wycofane: pełna klatka po losowaniu (`#previewStill`) psuła efekt przelotu. Losuj kończy się na zwykłym szkicu; pełna jakość zostaje tylko w próbnym kadrze.

## Losuj jako zmiana scenografii w teatrze

- Zamiast przelotu 4 szkiców jedno losowanie z teatralnym przejściem (ok. 1 s): Manikun z rzeczami i zwierzakiem odjeżdża w lewo jak na taśmie (0–380 ms), nowa dekoracja zjeżdża z góry, przyspiesza jak opuszczana i lekko podskakuje przy lądowaniu (120–720 ms, belka i cień na dolnej krawędzi), potem z prawej wjeżdża nowy Manikun i staje z małym przerzutem (470–990 ms).
- Dźwięki: skrzypienie przy starcie (`krrr`), stuknięcie przy lądowaniu dekoracji (`tuk`).
- Postać z rzeczami rysuje się w grupie `[data-part="subj"]`; stary Manikun to klon tej grupy z poprzedniej klatki (`belt.old`). Kamera, lampa i poza ustawiają się od razu, rusza się tylko dekoracja i taśma.
- Przy ograniczeniu animacji w systemie scena zmienia się od razu.
- Każda zmiana tła (menu, gotowce, Kreator), także zmiana podstawy w tym samym miejscu, to opuszczana z góry dekoracja ze stuknięciem przy lądowaniu. Manikun zostaje na miejscu i rozgląda się po nowym miejscu; taśma tylko przy Losuj. Dodatki tła zmieniają się od razu. Stare przejście (tło chowane w dół, nowe wysuwane od dołu) usunięte.

## Losuj z motywami

- `R_THEMES`: 21 motywów (spacer z psem, jesień w parku, zima, kawiarnia, bar nocą, plaża, smok w lesie, ognisko, neonowe miasto, deszczowa ulica, dach, pustynia, przytulny dom, biuro, kuchnia, nad wodą, wędrówka, dziecko na łące, sesja w studiu, sport w mieście, bajkowa łąka). Motyw zawęża miejsce z wariantami, porę, pogodę, zestaw i części stroju, rzeczy, zwierzaka (z umaszczeniem), pozy i ulubione style; reszta losuje się w pełnym zakresie. Co piąte losowanie bez motywu (dowolna scena).
- Bez powtórek: ostatnie 3 miejsca i motywy oraz 2 style nie wypadają ponownie (`rollRecent`).
- Zwierzak: ok. 39% losowań, zawsze ujęcie całej postaci i bez kamer z góry/drona, więc zawsze widoczny (wcześniej widoczny w ok. 13%).
- Rzecz losowana przed pozą, więc poza do niej pasuje (siedzi na krześle, opiera się o ladę).
- Ekspert: dwa efekty naraz (ok. 15%), do dwóch dodatków tła (ok. 50%), druga rzecz do wystroju, przedmioty na blacie częściej, zwrot ciała (ok. 22%), spojrzenie na zwierzaka lub rzecz (ok. 25%), częściej tatuaże i okulary.
- Test 2000 losowań (podstawowy i ekspert): 0 błędów, wszystkie 21 motywów i 15 miejsc.

## Stukanie w szkic

- Manikun: pierwsze stuknięcie zaznacza go (przerywana ramka) i otwiera w dolnym menu Postać; kolejne stuknięcie w jego część otwiera jej kategorię: głowa → Głowa, górna część głowy z nakryciem → Ubiór/Nakrycie głowy, tułów → Ubiór/Góra (Okrycie, gdy jest; Sukienka przy sukience), ręce → Ręce (gdy dostępne, inaczej Góra), nogi → Ubiór/Dół, stopy → Ubiór/Buty. Pierwszy raz Manikun podpowiada w dymku, w co stukać.
- Zwierzak → jego poza i umaszczenie; rzecz → Rzeczy (u eksperta drugie stuknięcie w zaznaczoną rzecz: przestawianie); tło → Miejsce; krótkie stuknięcie w kamerę → Kamera, w światło → Światło (przytrzymanie dalej przeciąga).
- Część postaci rozpoznawana po stawach z `computeFigure` (`fig.joints`: głowa, szyja, klatka, biodra, ręce, nogi ze stopami), z uwzględnieniem odbicia przy kamerze z lewej.
- Zaznaczenie widać, dopóki menu jest w grupie, którą otworzyło stuknięcie. Działa w Swobodzie; w Kreatorze i tutorialu stukanie w szkic nic nie robi.

## Punkty na szkicu ze zbliżeniem (zastępują stukanie w dowolne miejsce)

- Delikatne punkty (mała biała kropka z cienkim, wolno pulsującym pierścieniem, zawsze tej samej wielkości na ekranie): głowa, tułów, ręka (bliższa), noga (kolano), każda rzecz i zwierzak oraz jeden punkt tła w wolnym miejscu kadru (najdalej od postaci, rzeczy, kamery i światła). Rysowane w `sketchOverlay` na wierzchu podglądu; widoczne w Swobodzie, ukryte w trakcie przeciągania, przejść i wskazywania miejsca rzeczy.
- Stuknięcie w punkt postaci otwiera kategorię i płynnie przybliża podgląd (viewBox, 460 ms) na tę część: głowa → Głowa, tułów → Ubiór/Góra (Okrycie, Sukienka), ręka → Ręce (albo Góra), noga → Ubiór/Dół. Punkt aktywnej części świeci kolorem akcentu. Zbliżenie trwa, dopóki menu jest w tej kategorii; stuknięcie obok punktów, w punkt tła albo zmiana kategorii w menu oddala podgląd. Przy zbliżeniu narożniki i napis stylu są ukryte.
- Rzecz → Rzeczy (u eksperta drugie stuknięcie w jej punkt: przestawianie), zwierzak → jego poza i umaszczenie, tło → Miejsce. Krótkie stuknięcie w kamerę lub światło: ich kategorie; przytrzymanie dalej przeciąga.
- Usunięte: stukanie w całą sylwetkę, dwustopniowe zaznaczanie Manikuna i przerywana ramka.

## Poprawka: wszystkie zestawy zaznaczone

- Miniatury zestawów (`wearThumb`) na czas rysowania ubierały scenę w zestaw i przywracały tylko krój i kolory, a nazwa zestawu (`scene.outfit`) zostawała z ostatniej miniatury. Po otwarciu „Zestawów” scena miała zestaw Płaszcz, więc każdy kafelek pokazywał się jako wybrany (a Maniscrypt i podpis „Zestawy” mówiły „Płaszcz”). Teraz przywracane jest wszystko, co miniatura zmieniła.
- Test: otwarcie każdej kategorii i podkategorii (podstawowy i ekspert) nie zmienia sceny.

## Maniscrypt: powrót do pierwotnego układu

- Przy zwrocie przodem znowu samo „facing the camera” (także przy selfie), jak przed lustrem. Dopisek „body turned toward the camera, facing the left/right side of the frame” był sprzeczny z opisem kąta kamery na początku i obracał postać bokiem. Kierunek w kadrze zostaje tylko przy zwrocie bokiem, w głąb kadru i tyłem.
- Nakrycie głowy i dodatki na liście ubrań („…white sneakers and a white baseball cap”) zamiast osobnego „with …”; opis postaci ma najwyżej dwa „with” (wygląd, mina), jak w oryginale.
- Test: 16 scen (8 gotowców × kobieta/mężczyzna) daje Maniscrypt słowo w słowo taki jak wersja sprzed lustra (2ac7b43^).

## Poprawka: dźwięk w tutorialu

- W tutorialu wszystkie elementy aplikacji poza wskazanym są nieklikalne (`pointer-events: none`), także przycisk dźwięku. Przycisk dźwięku jest teraz wyjątkiem, jak dymek i „Pomiń”.

## Głos Manikuna (infrastruktura pod nagrania)

- Manikun mówi nagranymi zdaniami: `say()` dzieli tekst dymka na zdania (`voiceSentences`), dla każdego liczy `voiceId` (FNV-1a z treści) i gra `assets/voice/<id>.mp3` po kolei, tylko jeśli id jest w `assets/voice/manifest.json`. Zdanie bez nagrania zostaje tylko w dymku.
- W trakcie mówienia: zdanie, które słychać, jest wyraźne, pozostałe przygaszone; przycisk z głową Manikuna lekko się buja. Dymek z czasem znika dopiero po końcu wypowiedzi; nowy dymek, stuknięcie w dymek albo wyciszenie przerywa głos.
- Sterowanie: głośnik wycisza wszystko (domyślnie włączony, chyba że ktoś go wyłączył), menu → „Głos Manikuna” wyłącza sam głos.
- Lista do nagrania: `docs/voice/lines.csv` (237 zdań, warianty ze wstawkami rozpisane), zbierana przez `tools/voice/collect.cjs`; po dodaniu plików `tools/voice/manifest.cjs` odświeża manifest. Instrukcja dla lektora i format plików: `docs/voice/README.md`.
- Powitanie przed pierwszym dotknięciem (przeglądarka blokuje wtedy dźwięk) gra przy pierwszym dotknięciu ekranu, jeśli wciąż jest w dymku (`voiceBlocked`).
- Pierwsze nagrania: oba powitania głosem Fraser (Higgsfield, ElevenLabs), 5 zdań. W tutorialu pierwsze dotknięcie tylko odtwarza powitanie (nie przechodzi do kolejnego kroku); porównanie wypowiedzi z dymkiem pomija dopisek „Dotknij, aby kontynuować”.
- Cały tutorial nagrany głosem Fraser: 21 kolejnych zdań (razem 26 nagrań z powitaniami); każdy z 16 kroków ma nagrania wszystkich swoich zdań.
- Wymowa: „styl/stylu”, „cyberpunk” i „Ty” brzmiały po angielsku. Kroki 8, 9, 10, 12 i 16 tutorialu nagrane od nowa, a 8, 9 i 16 jako całe wypowiedzi (odtwarzacz gra najdłuższy kawałek wypowiedzi z nagraniem, potem pojedyncze zdania). Zapisy dla generatora: „stil”, „stilu”, „sajberpank”, „ty” (docs/voice/README.md).
- Tutorial przechodzi do następnego kroku dopiero, gdy Manikun skończy mówić (wcześniej „Ciekawe, co AI nam zaproponuje…” było ucinane). Zabezpieczenie: wypowiedź kończy się najpóźniej po długości nagrania + 1 s, więc tutorial nie utknie, gdy telefon nie zgłosi końca dźwięku.
- Kreator nagrany głosem Fraser: 125 wypowiedzi (pytania z wariantami, np. „Jaki kolor: rower?”, komentarze do wyborów, zakończenie), każda jednym plikiem jako cała wypowiedź. Test: każda z 125 wypowiedzi gra dokładnie swoje nagranie.

## Cloudflare: strona, konta i kredyty

- Strona działa też na Cloudflare: Worker `manikun` (https://manikun.fakindomin.workers.dev), wdrażany sam z gita po pushu na gałąź produkcyjną. `wrangler.jsonc` opisuje Workera; `.assetsignore` pilnuje, żeby `docs`, `tools`, `worker`, `server`, `migrations` i `.git` nie były publiczne. Vercel działa równolegle.
- Serwer `server/index.js` obsługuje tylko adresy `/api/*`, resztę podają statyczne pliki.
  - Logowanie przez Google (OAuth z PKCE): `/api/auth/google` → Google → `/api/auth/google/callback`. Sesja w ciasteczku HttpOnly `mk_s` na 30 dni; w bazie tylko skrót tokenu. Wylogowanie `POST /api/auth/logout` (tylko z tej samej strony).
  - `/api/me`: zalogowany użytkownik i saldo kredytów.
- Baza D1 `manikun` (`migrations/0001_konta.sql`): `users`, `sessions`, `credits`. Saldo to suma wpisów w `credits`; każdy wpis ma unikalne (`reason`, `ref`), więc kredyty na start (5) dostaje się raz na konto, a zakup z jednej płatności nie doda się dwa razy.
- W menu: „Zaloguj przez Google”, po zalogowaniu imię i saldo („5 kredytów”) oraz „Wyloguj”. Bez serwera (Vercel) albo bez skonfigurowanego Google te pozycje są ukryte. Po powrocie z logowania Manikun zamiast powitania mówi, czy się udało.
- Konfiguracja: `GOOGLE_CLIENT_ID` w `wrangler.jsonc` (jest publiczny), `GOOGLE_CLIENT_SECRET` jako sekret w panelu Cloudflare. Test lokalny: `wrangler dev` z plikiem `.dev.vars` (poza gitem).

## Zdjęcie od AI (Higgsfield) za kredyty

- W panelu Maniscryptu przycisk „Zrób zdjęcie tutaj” (pod Próbnym kadrem): bez logowania prowadzi do logowania Google, po zalogowaniu pokazuje koszt i saldo („1 kredyt za zdjęcie · masz 5”). Na Vercelu i w tutorialu ukryty.
- Okno „Zdjęcie od AI”: trzy kropki i komunikaty w trakcie, potem zdjęcie w formacie sceny, „Otwórz w pełnym rozmiarze” i „Jeszcze jedno”. Saldo w menu odświeża się na bieżąco.
- Serwer: `POST /api/generate` { prompt, aspect } i `GET /api/generate/<id>` (aplikacja odpytuje co 2,5 s).
  - Kredyt schodzi jednym zapytaniem tylko, gdy saldo wystarcza; jedno zlecenie naraz na konto.
  - Higgsfield: `POST https://api.higgsfield.ai/<model>` z nagłówkiem `Authorization: Key KEY_ID:KEY_SECRET`, potem `GET /requests/<request_id>/status` (queued → in_progress → completed / failed / nsfw).
  - Model domyślnie Soul 2 (`higgsfield-ai/soul/v2/standard`, potwierdzony adres API; Seedream pod `bytedance/seedream/v4/text-to-image` API nie zna). Gdy API odpowie `model_not_found`, serwer próbuje kolejnego z listy; przy 422 ponawia z samym promptem. 4:5 idzie jako 3:4. Zmienna `HF_MODEL` zmienia model, `GEN_COST` cenę w kredytach.
  - Przy odrzuconym zleceniu odpowiedź Higgsfield trafia do kolumny `detail` (diagnoza; przy 401 także kształt klucza, bez treści).
  - Błąd, odrzucenie treści albo brak wyniku po 10 minutach: kredyt wraca raz (wpis `refund`).
- Tabela `generations` (`migrations/0002_generowanie.sql`): zlecenia z promptem, statusem i adresem zdjęcia. Zdjęcie jest na razie pod adresem Higgsfield (nie kopiujemy go do siebie).
- Oczekiwanie (Soul 2 robi zdjęcie ok. 17–20 s): w kadrze szkic tej sceny „wywołuje się” (pulsuje), Manikun co ok. 3,5 s mówi kolejną kwestię w dymku (część o tej scenie: miejsce, styl), pasek postępu i licznik „12 s / ok. 20 s”. Serwer podaje `eta`: średni czas ostatnich 20 udanych zdjęć tym modelem. Po przyjściu zdjęcie przenika szkic, a napis mówi, ile trwało. Aplikacja pyta o stan co 1,5 s.
- Porównanie modeli (tylko właściciel, konto nr 1): `/api/admin/bench?start=1` wysyła ostatni udany Maniscrypt do kilku rodzin modeli Higgsfield (Soul 2, Z-Image Turbo, Nano Banana, Seedream, FLUX, Grok Imagine, Ideogram, Recraft), `/api/admin/bench` pokazuje zdjęcia z czasem każdego (strona odświeża się co 2 s). Dla rodzin bez znanego adresu próbuje kilku nazw; 404 `model_not_found` nic nie kosztuje, po pierwszym przyjętym zleceniu rodzina jest zamknięta. Sprawdza też, czy API ma katalog modeli. Nowe porównanie najwcześniej po 5 minutach. Tabela `bench` (`migrations/0004_porownanie.sql`).
- Wynik porównania (3.10.2026, ten sam Maniscrypt): Recraft 4.1 (`recraft/v4.1/text-to-image`) 10,3 s i lepsza jakość niż Soul 2 (20,4 s). Domyślny model to teraz Recraft 4.1, zapasowo Soul 2. Recraft przyjmuje 4:5 (bez zamiany na 3:4), 21:9 idzie jako 16:9. API ma katalog modeli pod `GET /models` (strona `/api/admin/models`); Nano Banana 2 jest w nim, ale dla kluczy API wyłączony (`model_disabled`).
- Decyzja po drugim porównaniu: wracamy do Soul 2 jako domyślnego (najładniejszy w stosunku do ceny; ok. 20 s maskuje oczekiwanie). Recraft 4.1 najszybszy (ok. 11 s), ale za drogi; Ideogram 4.0 ok. 30 s, Recraft Pro ok. 55 s, Qwen Image 3 ok. 84 s, Grok Imagine 2.0 najwolniejszy, Z-Image Turbo odrzuca długie prompty (400). Zapasowo tylko Soul Standard.
- Zdjęcie w tle: zamknięcie okna „Zdjęcie od AI” nie przerywa generowania (w oknie podpowiedź „Możesz zamknąć to okno i dalej reżyserować…”). Gdy zdjęcie jest gotowe, a okno zamknięte, na przycisku Manikuna pulsuje czerwona kropka, a Manikun mówi „Zdjęcie gotowe! Stuknij mnie, żeby je zobaczyć.”; stuknięcie otwiera zdjęcie. Przy błędzie mówi, co się stało. „Zrób zdjęcie tutaj” w trakcie albo z czekającym zdjęciem tylko otwiera okno.
- Kwestie Manikuna o scenie: na zmianę z kwestiami z planu filmowego komentuje to, co jest w scenie: zwierzaki („Manidragon zajmuje miejsce na planie. Grzecznie!”), miejsce, światło z tyłu, złotą godzinę, noc, drona, selfie, kamerę z dołu, dziecko, czapkę, pozę i styl.

## Zdjęcie od AI: anulowanie, powrót do zdjęcia, Moje ujęcia

- Naraz jedno zdjęcie: serwer odmawia drugiego (409), ale najpierw dopytuje Higgsfield, czy poprzednie się już nie skończyło.
- „Anuluj zdjęcie” w trakcie: Higgsfield zatrzymuje tylko zlecenia w kolejce, wtedy kredyt wraca („Anulowano. Kredyt wrócił na konto.”). Gdy zdjęcie już się robi, nie da się go przerwać: okno się zamyka, Manikun mówi, że zdjęcie trafi do Moich ujęć.
- Przycisk Maniscryptu w trakcie zdjęcia (albo gdy gotowe czeka) otwiera okno zdjęcia, jeśli scena się nie zmieniła (ten sam Maniscrypt i format); po zmianie otwiera zwykły panel Maniscryptu.
- Po odświeżeniu strony zlecenie w toku wraca do śledzenia (`/api/me` podaje `active`; scena z sessionStorage).
- Moje ujęcia (menu, po zalogowaniu): siatka zdjęć od AI, nowe z plakietką „Nowe”; stuknięcie otwiera zdjęcie w pełnym rozmiarze i oznacza je jako obejrzane. Nieobejrzane zdjęcia zapalają czerwoną kropkę na Manikunie (stuknięcie otwiera Moje ujęcia), a w menu licznik „2 nowych”.
- Zdjęcia zapisujemy u siebie (KV `manikun-zdjecia`, binding `PHOTOS`, klucz `gen/<id>`), bo adresy Higgsfield wygasają; podaje je `/api/photo/<id>` tylko właścicielowi. R2 wymaga włączenia w panelu Cloudflare, więc na razie KV.
- Serwer: `POST /api/generate/<id>/cancel`, `POST /api/generate/<id>/seen`, `GET /api/library` (dopytuje o zlecenia w toku z ostatnich 7 dni i zapisuje gotowe), `GET /api/photo/<id>`. Kolumny `stored`, `seen`, `cancelled` (`migrations/0005_biblioteka.sql`).
- Wybór modelu do testów (tylko właściciel, konto nr 1): w panelu Maniscryptu pod „Zrób zdjęcie tutaj” lista „Model (test)” z ceną za zdjęcie (cennik Higgsfield API, 3.10.2026): Soul 2 0,0032 $, Marketing Studio 2.5 Sunburst / 2.5 Flare / Marketing Studio 0,0107 $, Z-Image Turbo 0,015 $, Ideogram 4.0 0,03 $, Recraft 4.1 0,035 $, Qwen Image 3 0,04 $, Grok Imagine 2.0 0,04 $. Wybór zapamiętuje przeglądarka; serwer przyjmuje model tylko od właściciela i tylko z tej listy, inni zawsze dostają Soul 2. Napis po zdjęciu podaje model.
- Bez modelu zapasowego: Soul Standard kosztuje ok. 0,094 $ za zdjęcie, więc awaria Soul 2 kończy się zwrotem kredytu zamiast droższego zdjęcia.
- Decyzja po testach w aplikacji (3.10.2026): zostaje Soul 2. Najlepiej rozumie Maniscrypt i daje najlepszą jakość, przy najniższej cenie (0,0032 $). Lista „Model (test)” zostaje tylko dla właściciela, do porównań w przyszłości.
- Do testów doszły modele Cloudflare Workers AI (binding `AI`): FLUX.2 klein 4B (ok. 0,0012 $ za ok. 1 MP) i FLUX.2 klein 9B (ok. 0,015 $). Obraz wraca od razu w odpowiedzi (`multipart` z promptem i wymiarami ok. 1 MP w proporcjach kadru), trafia prosto do KV, a czas w ms zapisuje się w kolumnie `detail`. Przy błędzie kredyt wraca. Research (3.10.2026): szybkie i tanie API to też FLUX.1 schnell (Runware, Together, Cloudflare; ucina długie prompty), Z-Image Turbo (fal, ok. 0,005 $), Imagen 4 Fast (0,02 $), Nano Banana 2 Lite (0,034 $).
- Test FLUX.2 klein 4B na Workers AI (3.10.2026): dwa zlecenia nie oddały obrazu (zatrzymane na wywołaniu modelu, po 2 min kredyt wrócił). Na darmowym planie Workers to nie działa, więc model zdjęty z listy testowej; kod został w `server/index.js` na wypadek płatnego planu.

- Wywołanie zdjęcia w trakcie generowania: na start szkic sceny; w tempie paska postępu (od ok. 12% do 62% szacowanego czasu, tj. ok. 2–12 s przy Soul 2) szkic gaśnie, a pod nim pojawia się Próbny kadr tej sceny (kopia renderu z okna Próbnego kadru z własnymi id, bez napisu), który się wyostrza (rozmycie 7,6 → 0,6 px) i nabiera kolorów. Gotowe zdjęcie „wywołuje się” na wierzchu jak polaroid (z rozmycia, bladych kolorów i prześwietlenia do pełnej ostrości, ok. 2 s), potem Próbny kadr znika spod spodu.

## Płatności: plan na później (odłożone 3.10.2026, na razie nie ruszamy)

- Pakiety kredytów (ustalone 4.10.2026, 1 kredyt = 1 zdjęcie Soul 2):
  - 5 zł / 20 kredytów (0,25 zł za zdjęcie), pakiet na start;
  - 10 zł / 50 kredytów (0,20 zł za zdjęcie);
  - 20 zł / 120 kredytów (ok. 0,17 zł za zdjęcie);
  - do tego 5 darmowych kredytów na start dla każdego nowego konta (już działa).
  - Rachunek (bez VAT, BLIK w Stripe 1,6% + 1 zł, Soul 2 ok. 0,0032 $ ≈ 1,2 gr za zdjęcie): zostaje ok. 3,70 zł / 8,20 zł / 17,20 zł z pakietu. Z VAT 23% odpowiednio mniej. Mały pakiet traci ponad 20% na stałej opłacie 1 zł, więc większe pakiety mają wyraźnie niższą cenę za zdjęcie.
  - Tło (research 4.10.2026): abonamenty (Higgsfield, Midjourney, Krea, OpenArt) to ok. 0,03–0,18 zł za zdjęcie przy dużych ilościach, jednorazowe paczki w aplikacjach (np. Lensa) ok. 0,30 zł i więcej; Gemini daje ok. 20 zdjęć dziennie za darmo, ChatGPT ok. 2–3. Manikun wygrywa niskim progiem (BLIK, bez abonamentu) i wygodą (zdjęcie w aplikacji, z twarzą, Moje ujęcia), nie ceną za zdjęcie.
- Stripe Checkout (karty, BLIK 1,6% + 1 zł, Przelewy24 1,9% + 1 zł), najpierw tryb testowy. Serwer: `POST /api/buy` tworzy sesję płatności, `POST /api/stripe/webhook` (podpis HMAC) dopisuje kredyty wpisem `credits` (reason `buy`, ref = id sesji Stripe, więc jedna płatność nie doda się dwa razy).
- Przed startem: regulamin i polityka prywatności (strony `/regulamin`, `/prywatnosc`; potrzebne dane sprzedawcy: imię i nazwisko albo firma, NIP, adres, e-mail), zgoda na natychmiastowe dostarczenie treści cyfrowej (bez 14 dni na zwrot), zakup przez rodzica przy dzieciach, faktury przez Stripe. Te same strony odblokują publikację aplikacji w Google (ekran zgody OAuth).
- Domena manikun.pl (Hostinger): przeniesienie serwerów nazw do Cloudflare i podpięcie do Workera; przy okazji wysyłka maili (Email Service wymaga domeny na Cloudflare i płatnego planu Workers).

## Zdjęcie twarzy w „Zrób zdjęcie tutaj” (test, tylko właściciel)

- Rozpoznanie API (strona `/api/admin/schemas`): opisu parametrów API nie udostępnia, więc pola wyczytane z komunikatów walidacji (puste i celowo błędne zlecenia, odrzucane bez kosztów). Zdjęcie przyjmują: Soul 2 przez osobny wariant `higgsfield-ai/soul/v2/image-to-image` (pole `image_url`), Ideogram 4.0 (`image_url`), Qwen Image 3 przez `alibaba/qwen-image-3/edit` (`image_urls`, lista), Grok Imagine 2.0 i Marketing Studio (`image_urls`). Wysyłanie plików: `POST /files/generate-upload-url` → `upload_url` (PUT) i `public_url`; plik ma znacznik `retention=temporary`.
- Przełącznik „Dołączę zdjęcie swojej twarzy” + „Zrób zdjęcie tutaj”: wybór zdjęcia z telefonu (albo aparat), jednorazowa zgoda („to Twoje zdjęcie albo masz zgodę osoby / rodzica”), zmniejszenie w przeglądarce (dłuższy bok 1280 px, JPEG 0,9), `POST /api/upload-face` (serwer przekazuje plik do Higgsfield, u nas nic nie zostaje), potem zlecenie z Maniscryptem z akapitem o twarzy i polem zdjęcia według modelu (`faceRoute`). „Jeszcze jedno” używa tego samego zdjęcia.
- Na razie tylko właściciel (konto nr 1); innym przycisk mówi, że zdjęcie z twarzą zrobią w generatorze z listy. Serwer przyjmuje tylko adresy zdjęć z Higgsfield (cloudfront).
- Testy na prawdziwym API (3.10.2026): Soul 2 image-to-image 22–25 s (5 zdjęć), Ideogram 4.0 28 s, Qwen Image 3 edit 55 s. Decyzja: zostaje Soul 2. Zdjęcie twarzy włączone dla wszystkich zalogowanych (wysłanie zdjęcia wymaga kredytu na zdjęcie); lista modeli do testów nadal tylko dla właściciela.
- Okno „Zdjęcie od AI” ma przycisk „Kopiuj Maniscrypt” (w trakcie i po): kopiuje dokładnie ten tekst, który dostał generator (z akapitem o twarzy, jeśli było zdjęcie), żeby czekając wkleić go w innym generatorze.

## Uproszczony panel Maniscryptu

- Kolejność: „Z moją twarzą” (przełącznik; przy włączonym krótka podpowiedź zdjęcia z 3 punktami), „Zrób zdjęcie tutaj” jako główny przycisk (pełny kolor), potem podpis „Albo skopiuj i wklej w innym generatorze:”, ikony generatorów i „Kopiuj Maniscrypt” jako drugi przycisk (obrys), na dole linki „Próbny kadr” i „Drzewko sceny” (drzewko rozwija się pod spodem).
- Bez zdjęcia tutaj (Vercel, niezalogowany bez serwera) „Kopiuj Maniscrypt” zostaje głównym przyciskiem, a podpis brzmi „Skopiuj i wklej w generatorze:”. Przy zdjęciu twarzy podpis dodaje „…potem dołącz zdjęcie twarzy”.
- Usunięte: zdanie wyjaśniające na górze i kroki 1-2-3 (kroki zostały w kodzie jako ukryte). Tutorial bez zmian: pokazuje tylko „Skopiuj i wklej w generatorze AI.” i przycisk kopiowania. Wysokość panelu: 648 → 469 px (bez zdjęcia twarzy).
- Lista „Model (test)” usunięta (aplikacja i serwer): zawsze Soul 2, ze zdjęciem twarzy Soul 2 image-to-image. Strony porównań dla właściciela (`/api/admin/bench`, `/api/admin/models`, `/api/admin/schemas`) zostają na przyszłość.
- Kwestie Manikuna w trakcie zdjęcia: 62 uniwersalne (plan filmowy, ciekawostki o AI, Manikun, wskazówki, żarty) w `GEN_SAY`. Każde zdjęcie: stały start, potem na zmianę 5 uniwersalnych i do 2 losowych o scenie; ok. 85% szacowanego czasu jedna z kwestii „zaraz będzie” (`GEN_CLOSE`); przy dłuższym czekaniu dobierane kolejne. Historia ostatnich (ok. 43) w localStorage `manikun-gen-said`: przez kilkanaście zdjęć z rzędu kwestie uniwersalne się nie powtarzają (sprawdzone: 0 powtórek w 4 kolejnych zdjęciach).
- Manikun w oknie zdjęcia: ten sam przycisk z głową 3D (head3d.js) co na ekranie sceny jest na czas otwarcia okna przenoszony pod kadr (na jego miejscu w pasku zostaje niewidoczny zastępnik, pasek się nie przesuwa), a po zamknięciu wraca. Obok dymek z kwestiami (wynik i błędy też tu). Przy nowej kwestii przycisk chwilę „mówi” (bujanie), a głowa czasem kiwa albo przechyla się; stuknięcie w głowę w trakcie = następna kwestia. Po przeniesieniu płótno 3D rysuje się od nowa (`manikunHead.redraw`).

## Zdjęcie od AI: zapisz, udostępnij, porównaj, „Zrób podobne”
- Okno zdjęcia: przyciski **Zapisz** (plik JPG `manikun-RRRRMMDD-GGMM.jpg` ze znakiem „Manikun” w rogu), **Udostępnij** (systemowy panel udostępniania z plikiem — widoczny tylko tam, gdzie przeglądarka to umie, głównie telefony) i **Porównaj** (suwak szkic ↔ zdjęcie, przeciąganie palcem).
- Przy zleceniu zdjęcia aplikacja wysyła migawkę sceny (JSON, do 30 000 znaków) — serwer trzyma ją w kolumnie `scene` (migracja `0006_scena`).
- Moje ujęcia: dotknięcie kafelka otwiera przeglądarkę zdjęć (poprzednie/następne, przesuwanie palcem, data). Są w niej Zapisz, Udostępnij, **Zrób podobne** (przywraca scenę, z której powstało zdjęcie — tylko dla nowych zdjęć) i **Usuń** (z potwierdzeniem; `DELETE /api/generate/<id>` kasuje plik z KV i oznacza zlecenie jako usunięte).
- Lepsza jakość: sonda schematu pokazała, że Soul 2 przyjmuje tylko `resolution: '720p' | '1080p'` (2K nie ma). Wysyłamy `1080p`; gdy wariant odrzuci pole, serwer ponawia bez niego. Rozmiar każdego zdjęcia (WxH, KB) trafia do kolumny `detail`.

## Premium 2K (Recraft 4.1 Pro)
- Porównanie `/api/admin/bench?best=1` (4.10.2026): każdy model z najwyższymi ustawieniami jakości, jakie przyjmuje (wykrywane z komunikatów walidacji), a karty pokazują wymiary i wagę zdjęcia. Najlepszy stosunek jakości do czasu: **Recraft 4.1 Pro, `resolution: 2k`**, 1664×2560 px przy 2:3, ok. 15 s.
- W panelu Maniscryptu przełącznik **Premium 2K ★** (nad „Zrób zdjęcie tutaj”, zapamiętany w przeglądarce). Premium kosztuje `PREMIUM_COST` = 4 kredyty (można zmienić zmienną w Cloudflare), zwykłe zdjęcie (Soul 2, 1080p) 1 kredyt.
- Premium nie łączy się ze zdjęciem twarzy (Recraft nie przyjmuje obrazu): przy włączonym „Z moją twarzą” przełącznik Premium znika, a serwer odrzuca taką prośbę.
- Bez modelu zapasowego: gdy Recraft odrzuci zlecenie, kredyty wracają.
- **Wyłączone 4.10.2026:** Recraft Pro kosztuje ok. 0,41 $ (ok. 1,50 zł) za zdjęcie — opłacałoby się dopiero przy ok. 10 kredytach. Soul 2 w 1080p daje już 1344×2016 px (2:3) za ok. 0,003 $. Kod zostaje; przełącznik pojawi się po ustawieniu zmiennej `PREMIUM_COST` w Cloudflare.
- Wyniki porównania (2:3, najwyższe ustawienia): Soul 2 1080p 1344×2016, 21 s · Recraft 4.1 Pro 2k 1664×2560, 15 s, 0,41 $ · Recraft 4.1 1k 832×1280, 11 s · Ideogram 4 QUALITY 1664×2496, 27 s · Marketing Studio 4k/high 2336×3504, 106 s.

## Regulamin, Polityka prywatności, Polityka zwrotów
- Strony `/regulamin`, `/prywatnosc`, `/zwroty` (pliki `regulamin.html`, `prywatnosc.html`, `zwroty.html`, wspólny styl `prawne.css`), każda po polsku i angielsku (`#en`); wersja polska rozstrzyga.
- Usługodawca: twórca serwisu, kontakt kontakt@manikun.pl. Kredyty nie wygasają; darmowe 5 na start bez zwrotu; zwrot pełny w 14 dni tylko, gdy z pakietu nie powstało żadne zdjęcie (wariant „a”); nieudane zdjęcia — automatyczny zwrot Kredytów; Paddle jako Merchant of Record.
- W aplikacji: pozycja menu „Regulamin i prywatność” i notka „Logując się, akceptujesz…” pod „Zrób zdjęcie tutaj” (tylko niezalogowanym).
- Przy płatnościach (do zrobienia): przed przejściem do Paddle pole zgody **niezaznaczone domyślnie**, przycisk zakupu aktywny dopiero po zaznaczeniu: „Wyrażam zgodę na rozpoczęcie świadczenia usługi przed upływem terminu do odstąpienia od umowy i przyjmuję do wiadomości, że z chwilą wygenerowania pierwszego zdjęcia z pakietu tracę prawo do odstąpienia. Akceptuję Regulamin i Politykę zwrotów.” Zapisać w bazie czas zgody i pokazać ją w potwierdzeniu zakupu.
- Dane usługodawcy (imię, nazwisko, adres) usunięte ze stron 7.10.2026 na prośbę właściciela (bez płatności). Przed płatnościami: dopisać dane zgodne z kontem operatora płatności; rozważyć najmniejszy pakiet 10 zł (prowizja Paddle 5% + 0,50 $).

## Migracja na manikun.pl
- Kod gotowy: zmienna `CANONICAL_HOST` (np. `manikun.pl`) przekierowuje strony (/, /regulamin, /prywatnosc, /zwroty) i start logowania z innych adresów (workers.dev, www) na adres główny (301). API działa pod każdym adresem. Bez zmiennej nic się nie zmienia. `run_worker_first` obejmuje te strony, żeby przekierowanie działało.
- Kroki: (1) domena w Cloudflare (Add a domain, plan Free) i serwery nazw Cloudflare w Hostingerze; (2) w Google Cloud: źródło `https://manikun.pl` i adres powrotu `https://manikun.pl/api/auth/google/callback` (stare zostają), domena autoryzowana `manikun.pl`, linki do regulaminu i prywatności; (3) po aktywacji strefy: `routes` z `custom_domain` dla `manikun.pl` i `www.manikun.pl` oraz `CANONICAL_HOST` w `wrangler.jsonc`, adresy w meta tagach i dokumentach, przekierowanie z Vercela.
- **4.10.2026: przełączone.** Strefa manikun.pl aktywna w Cloudflare (serwery nazw david/kiki.ns.cloudflare.com, ustawione w Hostingerze). Worker ma `routes` (custom domain) dla `manikun.pl` i `www.manikun.pl` oraz `CANONICAL_HOST=manikun.pl` w `wrangler.jsonc`. Poczta: Cloudflare Email Routing, `kontakt@manikun.pl` → Gmail właściciela; ten adres jest na stronach prawnych. Meta tagi (og:url, og:image) wskazują manikun.pl. `vercel.json` przekierowuje manikun.vercel.app na manikun.pl (działa, gdy Vercel buduje gałąź z tym plikiem).

## Cennik i Paddle
- Strona `/cennik` (PL/EN, `cennik.html`): pakiety 20 kredytów / 5 zł, 50 / 10 zł, 120 / 20 zł (ceny brutto), 5 darmowych na start, kredyty nie wygasają, Paddle jako Merchant of Record, „zakup wkrótce”. Link w menu aplikacji i w nagłówku stron prawnych. Potrzebna do weryfikacji domeny w Paddle (pricing page).
- Konto Paddle założone 4.10.2026 (Sole Trader, Polska), w trakcie weryfikacji.
- **Zakup kredytów (Sandbox, 4.10.2026).** `server/paddle.js` + migracja `0007_zakupy` (tabele `checkouts` – zgoda przed kasą, `purchases` – transakcje). Przebieg: okno „Dokup kredyty” (menu, kliknięcie salda albo brak kredytów przy zdjęciu) → wybór pakietu + pole zgody (niezaznaczone; przycisk aktywny dopiero po zaznaczeniu) → `POST /api/checkout` zapisuje zgodę → kasa Paddle (nakładka, `customData.c` = id zgody, e-mail z konta) → `transaction.completed` na `/api/paddle/webhook` (podpis HMAC `Paddle-Signature`, tolerancja 15 min) → kredyty `reason='buy'`, `ref=txn_…` (raz). `adjustment.created/updated` (refund/chargeback, approved) zabiera kredyty (`refund-buy`). Transakcja bez znanej zgody/pakietu → `purchases.status='orphan'` do ręcznego wyjaśnienia.
- Konfiguracja: `PADDLE_ENV`, `PADDLE_PACKS` (pri_/pro_/credits/pln), `PADDLE_CLIENT_TOKEN` w `wrangler.jsonc`; sekret `PADDLE_WEBHOOK_SECRET` w panelu Cloudflare. Sklep pokazuje się dopiero, gdy są token, sekret i pakiety. Sandbox: produkty pro_01m43seawck34ezkjsckhnc8zg (20), pro_01m43skd7apx9kqz7f0dbdpph5 (50), pro_01m43spvz5hbx6n1c6x6qxjkf8 (120). Przy przejściu na produkcję: nowe pri_/pro_ z konta Live, token `live_…`, nowy sekret, `PADDLE_ENV=production`, domena zatwierdzona w Paddle.
- **Test Sandbox 4.10.2026: działa.** Zakup 20 kredytów / 5 zł dopisany automatycznie przez `transaction.completed` (txn_01m43vcb4qfxcr13yazd1agvhm). Wcześniejszy zakup 120 / 20 zł (txn_01m43tw2fp6b0726fzrysprm5c) dopisany ręcznie w D1, bo destynacja nie miała wtedy zaznaczonego `transaction.completed` (Paddle nie wysyła zdarzeń wstecz). Paddle w Sandbox: z 20 zł → VAT 3,74 zł, prowizja 2,94 zł, netto 13,32 zł.
- Przejście na Live (po weryfikacji konta Paddle): w koncie Live utworzyć te same 3 produkty (custom data `credits`) i ceny (One-time, PLN, Tax included, max 1), token `live_…`, destynację z 3 zdarzeniami i Default payment link; w `wrangler.jsonc` podmienić `PADDLE_ENV` na `production`, `PADDLE_CLIENT_TOKEN` i `PADDLE_PACKS`; sekret `PADDLE_WEBHOOK_SECRET` w Cloudflare na ten z Live; na `/cennik` usunąć „zakup wkrótce”.
- Metody płatności (Checkout settings, osobno w Sandbox i Live): BLIK, Google Pay, Apple Pay i karta (karty nie da się wyłączyć); reszta wyłączona.

## Uporządkowane menu (4.10.2026)
- Na górze „Manikun” i przycisk zamknięcia. Karta konta: awatar z inicjałem, imię i e-mail (albo „Zaloguj przez Google · 5 darmowych kredytów na start”), pod spodem saldo i przycisk „Dokup” (gdy sklep jest włączony).
- Grupy z nagłówkami: **Scena** (Nowa scena, Moje ujęcia z plakietką nowych – tylko po zalogowaniu, Poziom), **Ustawienia** (Głos Manikuna), **Pomoc** (tutorial, Jak używać Maniscryptu, O Manikunie). Wartości (poziom, głos) szarym tekstem po prawej.
- Stopka: Cennik, Regulamin, Prywatność i Wyloguj. Usunięte nieaktywne pozycje „Wkrótce” (Historia Maniscryptów, Ustawienia). Dymek Manikuna chowa się, gdy menu jest otwarte.

## Moje ujęcia: tylko 5 ostatnich zdjęć
- Serwer trzyma 5 najnowszych zdjęć na konto (`KEEP_PHOTOS`). Starsze (`prunePhotos`) są kasowane z KV i dostają status `expired` – przy zapisie nowego zdjęcia i przy otwarciu biblioteki.
- Informacja: w Moich ujęciach („N z 5… Trzymamy 5 ostatnich zdjęć – starsze znikają same, więc zapisz te, które chcesz zachować.”), pod gotowym zdjęciem („…Chcesz zachować to na dłużej? Stuknij „Zapisz”.”), w Regulaminie §2 i w Polityce prywatności (przechowywanie).

## Tematy na starcie: Obiekt odblokowany (4.10.2026)
- Kafelek **Obiekt** („produkt, podstawa, kolor”) działa: Swoboda (Obiekt, Podstawa, Kolor + wspólne Scena, Kamera, Styl), Gotowe (6 presetów produktowych), Losuj, Próbny kadr, Maniscrypt (zdjęcie produktowe) i Zdjęcie od AI (bez „Z moją twarzą”).
- Kreator: nowy rozdział **Obiekt** (Co fotografujemy? → W jakim kolorze? → Na czym stoi?), potem wspólne Miejsce, Kamera (bez Kadru – tylko dla postaci) i Styl. Rozdziały i pytania mają `subj`; pytanie pomija się, gdy jego kategoria nie pasuje do tematu.
- Poprawka: Maniscrypt obiektu zawiera teraz miejsce (tło, dodatki, pora dnia) – wcześniej je pomijał.
- Zostały: **Zwierzę** i **Dowolne** (nadal z kłódką).
- **Zwierzę odblokowane (4.10.2026).** Kafelek „pies, kot, królik, smok”. Kategorie Zwierzę (gatunek), Poza (siedzi, stoi, leży) i Umaszczenie (maści z `PET_COATS` danego gatunku), rysunek z `drawPet` w środku kadru z cieniem (`objectPlace` dla zwierzęcia). Maniscrypt: „Photograph of a single <umaszczenie> <poza>, the animal as the only main subject… whole animal visible” + światło, miejsce, pora dnia, zakończenie `ENDING_ANIMAL` (85 mm, sierść i oczy). Kreator: rozdział Zwierzę (Jakie zwierzę? → Jakie umaszczenie? → Co robi?) + wspólne. Gotowe: 6 presetów (pies na plaży, kot w salonie, królik na łące, smok we mgle, portret psa w studiu, kot nocą w mieście). Losuj, Próbny kadr i zdjęcie od AI działają.
- **Dowolne odblokowane (4.10.2026).** Kafelek „opisz własnymi słowami”. Kategoria **Temat**: kafelek „Własny opis…” (okno z polem tekstowym, do 200 znaków, Enter zapisuje) i 10 gotowych pomysłów (`ANY_IDEAS`: pl do kafelka i szkicu, en do Maniscryptu). Na start pierwszy pomysł (Zamek na wzgórzu). Szkic: karta na sztaludze z gwiazdką i tekstem (do 3 linijek). Maniscrypt: „Photograph of <pomysł po angielsku | the following subject: własny opis>, as the main subject in sharp focus” + światło, miejsce, pora dnia, `ENDING_ANY`. Kreator: rozdział Temat + wspólne. Gotowe: 6 presetów (zamek o zachodzie, samochód w deszczu, kwiaty w studiu, robot w lesie, latarnia nad morzem, tort na przyjęciu). Wszystkie 4 tematy na starcie są teraz aktywne.

## Rodzina Mani- na starcie (4.10.2026)
- Kafelki: **Manikun** (postać), **Manito** (przedmiot – dawniej Obiekt), **Manimal** (zwierzę), **Manitam** (krajobrazy i miejsca – zamiast Dowolnego, które usunięto). Grupy w Swobodzie i rozdziały Kreatora noszą te same nazwy; kategorie: Przedmiot (dawniej Obiekt), Gatunek (dawniej Zwierzę).
- **Manitam** (`subject: "place"`): bez bohatera w szkicu; Maniscrypt „Scenic photograph of the <miejsce bez „in the background, softly out of focus”>, the place itself is the main motif, everything in sharp focus, no people, no animals” + światło opisane względem sceny (`placeLight`), pora dnia, `ENDING_PLACE` (24 mm); w opisie kamery „the subject” → „the scene”. Start: góry o złotej godzinie. Kreator: Miejsce → Kamera → Styl. Gotowe: góry o zachodzie, las we mgle, miasto nocą w deszczu, jezioro o świcie, wydmy z drona, przytulna kawiarnia.
- Następny krok (uzgodniony kierunek): zapisywanie Manimali i Manito, żeby dodać je do sceny z Manikunem.
- **Poprawka 5.10.2026: scena przeżywa logowanie.** Każde przejście do logowania Google (`goLogin`) zapisuje w `sessionStorage` (`manikun-return`) scenę i poziom, jeśli trwa reżyserowanie. Po powrocie (`?konto=ok|blad`, do 30 min) `restoreAfterLogin` przywraca scenę, otwiera panel Maniscryptu z „Zrób zdjęcie tutaj” i pokazuje pasek „Jesteś zalogowany, scena czeka…” (dymek zasłaniałby przycisk). Wcześniej scena znikała, bo logowanie przeładowuje stronę.

## Ekipa na koncie (Manimale i Manito przy Manikunie)

- Tabela `crew` (migracja `0008_ekipa.sql`): `id, user_id, kind ('animal'|'object'), name, data (JSON ≤ 1000 znaków), created_at`; do 40 pozycji na konto.
- API: `GET /api/crew`, `POST /api/crew` (`{kind, name, data}`), `DELETE /api/crew/:id` – tylko zalogowani, zapis tylko z tej samej domeny.
- Manimal / Manito: kafelek „Do ekipy” zapisuje bieżący gatunek + umaszczenie + pozę albo przedmiot + kolor (bez konta → logowanie, scena wraca po zalogowaniu; duplikaty są pomijane).
- Manikun: Rzeczy › Ekipa – Manimal dołącza jako zwierzak obok postaci, Manito staje na stole (stół dodawany sam, gdy w scenie nie ma powierzchni). Tryb „Usuń z ekipy”.
- Polityka prywatności: dopisany punkt „Ekipa”.

## Konstruktor Manimala (własny stworek z części)

- Gatunek › **Własny**: przepis `scene.beast` z części (`BEAST`): tułów, wielkość, nogi (0–8), stopy, długość nóg, głowa, uszy, rogi, grzywa/kolce, oczy (liczba, wielkość, kolor, źrenice), pysk, zęby, wąsy/język, mina, ogon, skrzydła, pokrycie, dwa kolory, wzór, dodatki. Kategorie Ciało, Głowa, Twarz, Ogon i skrzydła, Pokrycie (`BEAST_CATS`) widać tylko przy Własnym.
- Start z bieżącego gotowca (`beastFrom`); gotowce zostają. Bez zmian względem gotowca Maniscrypt używa nazwy gatunku, po zmianach opis „fantasy creature” z listą części (`petDesc`).
- Rysunek `drawBeast` (obłe bryły jak zwierzaki), pozy: siedzi, stoi, leży, leci. Pudełko z części (`beastBox`), w scenie z Manikunem skala z wielkości.
- Zmutuj (1–2 części), Krzyżówka (głowa i twarz jednego gotowca, reszta drugiego); Losuj daje co trzeci raz własnego stworka.
- Kreator: po „Własny” pytania o najważniejsze części (tułów, nogi, stopy, uszy, rogi, oczy, pysk, ogon, skrzydła, pokrycie, kolor, wzór).
- Ekipa: własny stworek zapisuje cały przepis i dostaje imię; przy Manikunie rysowany i opisany tak samo (opis w nawiasie przed miejscem).

## Konstruktor Manito (bryła pod własny produkt)

- Przedmiot › **Własny**: przepis `scene.prod` (`PROD`): bryła (kostka, pudełko, walec, puszka, kula, stożek, ostrosłup, butelka, słoik, tubka, saszetka, krążek, płytka), proporcje, wielkość, materiał, wykończenie, kolor detali, zamknięcie (nakrętka, pokrywka, pompka, pipeta, atomizer, korek, uchwyt), etykieta. Kategorie Kształt, Materiał, Detale (`PROD_CATS`) widać tylko przy Własnym; Kolor i Podstawa wspólne.
- Etykieta „Pusta (do podmiany)” (domyślna): Maniscrypt prosi o czysty produkt bez napisów i logo – neutralną bryłę, w miejsce której wstawia się własny produkt. „Twój napis”: tekst w cudzysłowie na etykiecie.
- Bez wybranego koloru: naturalny kolor materiału (drewno, metal, szkło…), inaczej biały. Rysunek `prodParts` w polu 100×100 (te same części co ITEMS + accent, cork, thick).
- Kreator: po „Własny” pytania o kształt, proporcje, materiał, wykończenie, zamknięcie i etykietę. Losuj: losowa bryła z pustą etykietą.
- Ekipa: własny produkt zapisuje przepis i dostaje nazwę; przy Manikunie stoi na stole narysowany ze swojego przepisu.

## Manikun na Manimalu (wierzchowiec)

- Własny Manimal w scenie z Manikunem (z Ekipy) może być siedziskiem: Rzeczy › Zwierzaki › (Manimal) › **Wsiądź** / ponownie: zsiądź.
- Kto może usiąść (`rideWho`, `canRide`): wielkość „Jak koń” i „Olbrzym” – dorosły i dziecko; „Jak pies” – tylko dziecko (Cechy › Wiek); mniejsze i gotowce (pies, kot, królik, smoczek) – nikt, z wyjaśnieniem w dymku.
- Siedzisko (`rideSeat`): wysokie, wysokość = grzbiet Manimala × skala wielkości; punkt „Pod postacią” tylko z ręcznego wyboru (bez automatu). Maniscrypt: „riding on the back of … sitting astride…”.

## Studio fotograficzne: kolory, packshot i scenografia

- Tło Studio (wspólne dla Manikuna, Manimala i Manito): kolory szare, białe, czarne, beżowe, pudrowy róż, szałwia, błękit, terakota, musztarda, morskie oraz **Packshot** (czysta biel bez cieni, e-commerce). Nowe tony z jednego koloru (`STUDIO_TONE`, `studioShades`).
- Scenografia jako dodatki tła (kilka naraz, `studioSet`): łuk albo koło, bryły (postumenty, kostki, walce), cień liści albo żaluzji, rośliny w wazonach, tkanina, kolorowe światło. Rysowane w szkicu i w Próbnym kadrze; do Maniscryptu jako „with …”.
- Wnętrza: Pokój ma też Łazienkę i Butik.
- Gotowce Manito: „Kosmetyk pod łukiem” (beż, łuk, cień liści, rośliny) i „Packshot własnego” (własna bryła na białym).

## Tła sezonowe (tylko Manito)

- Tło **Sezon** (`subjects: ["object"]`, filtrowane przez `fitsBody`; przy zmianie tematu `fixScene` wraca do Studia, losowanie innych tematów go nie wybiera).
- Warianty (`BG_VARIANTS.season`, `tone` = kolor aranżacji): Wiosna, Lato, Jesień, Zima, Boże Narodzenie, Halloween, Walentynki, Wielkanoc, Sylwester, Dzień Matki, Black Friday; dodatki: Konfetti, Światełka, Prezenty.
- Rysunek `seasonSet` (szkic i Próbny kadr): tło w tonie okazji i motywy po bokach i u góry (kwitnące gałązki, słońce i muszle, liście i dynie, śnieg i choinki, bombki, nietoperze i lampiony z dyni, serca, pisanki i tulipany, serpentyny, torby z zakupami). Bez pory dnia (jak studio).
- Gotowce Manito: „Świąteczny prezent”, „Walentynkowy kosmetyk”.

## „Z moim produktem” (Manito) – jak „Z moją twarzą”

- Ten sam przełącznik w panelu Maniscryptu (`faceSwitch`): przy Manikunie „Z moją twarzą”, przy Manito „Z moim produktem” (`REF_UI`, `refSubject`); wskazówki i przykład zdjęcia (rysunek produktu w ramce) zależne od tematu.
- Maniscrypt: akapit „IMPORTANT – PRODUCT REFERENCE…” na początku (`productBlock`) i produkt opisany jako „the product from the attached reference photo…” zamiast gotowego przedmiotu; reszta (podstawa, tło, światło, kamera) z opisu.
- „Zrób zdjęcie tutaj”: ta sama wysyłka zdjęcia (`/api/upload-face`, plik tymczasowy u Higgsfield) i Soul 2 image-to-image; bez pytania o zgodę osoby; w bazie `detail = 'ze zdjęciem produktu'` (pole `ref: "product"`).
- Teksty przypomnień („dołącz zdjęcie produktu”) i polityka prywatności (PL/EN) uzupełnione.

## Paddle odrzucony – sklep wyłączony

- Paddle odmówił weryfikacji konta (decyzja ostateczna, bez podania przyczyny). Sklep na produkcji wyłączony: `PADDLE_PACKS: []` → `shopInfo` zwraca null, menu bez „Dokup”, przy braku kredytów komunikat „wkrótce”.
- Powód wyłączenia: sandbox na produkcji przyjmował karty testowe, więc dawał darmowe kredyty.
- Kod `server/paddle.js` i tabele `checkouts` / `purchases` zostają (można podmienić operatora). Pakiety sandbox do testów lokalnych:
  `[{ "price": "pri_01m43shstn6w3751x3ky4rjtxc", "credits": 20, "pln": 5 }, { "price": "pri_01m43snnd261c42h62q5ge32gz", "credits": 50, "pln": 10 }, { "price": "pri_01m43sr0adg83n3d3ymyc78yk8", "credits": 120, "pln": 20 }]`
- Do zmiany po wyborze nowego operatora: Regulamin, Zwroty, Cennik i Prywatność (wzmianki o Paddle jako sprzedawcy).

## Zdjęcia od AI wyłączone (bez kredytów)

- Serwer: `GEN_OPEN` (zmienna środowiska, domyślnie brak) – bez niej `/api/generate` i `/api/upload-face` odpowiadają 403 „Zdjęcia w Manikunie są chwilowo wyłączone.” dla wszystkich poza właścicielem (`isOwner`, user id 1 – testy). Nowe konta nie dostają kredytów na start (`genOpenAll`).
- `/api/me`: `gen` = HF_KEY i (GEN_OPEN albo właściciel); dla niezalogowanych też `gen`. Aplikacja chowa „Zrób zdjęcie tutaj”, saldo kredytów w menu i obietnicę „5 kredytów”. Logowanie zostaje (Ekipa).
- Włączenie z powrotem dla wszystkich: `"GEN_OPEN": "1"` w `vars` w wrangler.jsonc.
- Regulamin, Zwroty i Cennik (PL/EN): „Zdjęcie od AI” chwilowo wyłączone, nowe konta bez kredytów.

## Darmowe zdjęcia (FLUX.1 schnell), udostępnianie scen i galeria przykładów

- **Darmowe zdjęcia:** `POST /api/generate` z `free: true` → `generateFree`: Cloudflare Workers AI `@cf/black-forest-labs/flux-1-schnell` (6 kroków, kwadrat 1024×1024, prompt przycięty do 2000 znaków), wywołanie wprost w zapytaniu (bez `waitUntil`, które przy FLUX.2 klein wisiało na darmowym planie). Limit `FREE_DAILY` (domyślnie 2 na konto na dobę UTC) i wspólny `FREE_GLOBAL` (domyślnie 90 dziennie, w puli 10 000 neuronów ≈ 100 zdjęć). Nieudane nie liczą się do limitu. Bez zdjęcia twarzy/produktu. Zdjęcia trafiają do Moich ujęć.
- Aplikacja: gdy płatne zdjęcia są wyłączone (`gen: false`), a jest `free`, „Zrób zdjęcie tutaj” robi darmowe (podpis: ile zostało dziś); niezalogowani widzą „zaloguj się: 2 darmowe zdjęcia dziennie”.
- **Udostępnij scenę** (panel Maniscryptu): `POST /api/share` → krótki link `manikun.pl/s/<id>` (tabela `shares`, migracja `0009_udostepnianie.sql`, limit 40 linków dziennie z jednego IP, zapisany tylko skrót IP). `GET /s/<id>` podaje aplikację z tytułem sceny w podglądzie linku (HTMLRewriter, `<base href="/">`); aplikacja wczytuje scenę (`GET /api/share/<id>`) od razu w Swobodzie, bez tutorialu.
- **Galeria przykładów** (menu): `GET /api/gallery` (publiczne), zdjęcia `GET /api/pub/<id>` (kopia w KV `pub/<id>`, niezależna od 5 Moich ujęć). Właściciel dodaje zdjęcie z Moich ujęć przyciskiem „Do galerii” (z podpisem) i usuwa z galerii; każdy ma „Zrób podobne”.
- Regulamin, Prywatność (Cloudflare Workers AI, udostępnione sceny) i Cennik zaktualizowane.

## Manito › Własny = zdjęcie produktu domyślnie

- Przy przedmiocie „Własny” panel Maniscryptu otwiera się z włączonym „Z moim produktem” (`ownItem`, `ownPhoto`; gdy użytkownik go wyłączy, zostaje wyłączony do końca wizyty). Przy innych przedmiotach startuje wyłączony.
- Opis ze zdjęciem i Własnym: „the product from the attached reference photo (a hand-sized cylindrical product), keeping…” – bryła podpowiada skalę i kształt.
- Wybór „Własny” w Swobodzie: dymek z wyjaśnieniem (bryła w miejscu produktu, zdjęcie w panelu Maniscryptu).

## Manitam: wszystkie tła w Gotowych i konstruktor krajobrazu

- **Gotowe:** poza 6 dawnymi gotowcami Manitam ma osobny gotowiec dla każdego tła aplikacji (każda podstawa wariantów, np. „Ulica · kamienice”, „Pokój · łazienka”, „Studio · packshot”). Lista budowana w kodzie z `BG_VARIANTS`, więc nowe tło samo trafia do Gotowych. Wnętrza i studio w świetle lampy, plener w dzień albo o złotej godzinie. Do tego 12 gotowych własnych krajobrazów („Zorza nad fiordem”, „Latarnia w burzy”, „Rajska wyspa z drona”…).
- **Własny krajobraz** (tło `land`, tylko Manitam): przepis `scene.land` z 8 części (`LAND`): teren (góry, wzgórza, równina, wydmy, klify, kanion, wyspa, wulkan, lodowiec), woda, roślinność, zabudowa, niebo, pora roku, pogoda i ujęcie (długi czas, panorama, dron, tilt-shift, niebieska godzina). Nowa grupa menu **Manitam** z kategoriami Krajobraz, Niebo i pora, Ujęcie (`LAND_CATS`, `landTiles`); wybór dowolnej części włącza własny krajobraz. Manitam startuje od własnego krajobrazu.
- Maniscrypt: `landPhrase` („mountain landscape with jagged peaks in winter, covered in snow, with a calm mirror-like lake, pine forest and a small wooden cabin, under green northern lights…”), ujęcie dopisywane w `placeOf`. Gwiazdy i zorza ustawiają noc, kolorowe niebo złotą godzinę.
- Rysunek `drawLand` (szkic i Próbny kadr): warstwy od nieba do przodu; przepis trafia do rysunku przez `bgDraw` jako lista „część:wariant”. Elementy miejsca (fx) są ukryte przy własnym krajobrazie (pogoda jest w przepisie).
- Kreator: przy własnym krajobrazie pytania o teren, wodę, roślinność, zabudowę, niebo, porę roku (Ekspert także pogoda i ujęcie). Losowanie i „Zdaj się na mnie” w 60% składają losowy krajobraz. Wyszukiwarka zna nazwy części.
- **Kolory krajobrazu:** Kolor terenu, wody, roślin (Krajobraz) i nieba (Niebo i pora): Naturalny albo paleta ubrań + fiolet, turkus, złoto, limonka, magenta (`LAND_COLOR`, `LAND_EXTRA`). Rysunek liczy odcienie od wybranego koloru; Maniscrypt dopisuje „in surreal colours: red mountains, pink water…, a bold unnatural colour palette”. Kolor wody jest też przy klifach i wyspie (morze), kolor roślin znika przy „Bez roślin”. Losowanie raz na kilka razy barwi jedną część.
- **Punkty kolorów na szkicu:** przy własnym krajobrazie (Swoboda) zamiast jednego punktu tła są cztery: niebo, teren, woda, rośliny (`landHotPts`, położenie zależne od terenu, wody i roślinności; omijają kamerę i światło). Stuknięcie otwiera od razu rząd kolorów tej części; punkt otwartej części świeci.

## Punkty na szkicu w Manito i Manimalu

- `subjectHotPts`: **Manito** – punkt na produkcie (kolor; przy Własnym kształt), drugi przy Własnym (materiał), punkt na podstawie (Podstawa; bez punktu przy „W powietrzu”). **Manimal** – własny stworek: czubek głowy (Głowa), pysk (Twarz), tułów (Ciało), bok (Pokrycie), ogon (Ogon i skrzydła); gotowe zwierzę: punkt na zwierzęciu (Gatunek) i na sierści (Umaszczenie). Położenie z `objectPlace` i `beastGeom`.
- Punkt tła omija te punkty. Przy Manito na studiu i tle sezonowym otwiera od razu warianty tła.
- **Przybliżanie:** stuknięcie w głowę lub pysk własnego stworka przybliża jego głowę (`zoomPts`), w produkt Manito przybliża produkt; wyjście z kategorii oddala (zbliżenie pamięta grupę menu: `zoomTo(part, cat, group)`). Ciało, sierść i ogon zostają w pełnym kadrze (zwierzę i tak wypełnia kadr).

## Słowa w Maniscrypcie bez ryzyka odmowy

- Gemini odmówił promptu („interests of third-party content providers”) ze stworkiem „tiny mouse-sized…”. Wielkość Manimala bez nazw zwierząt: palm-sized, knee-high, medium-sized, chest-high, giant towering. Własny stworek to „original fantasy creature”. Bez „cartoonish” (głowa, oczy) i „round bear ears” (okrągłe uszy + kokarda = znana mysz).
- Uwagi z analizy promptu: strona rzeczy obok postaci jednoznacznie z kadru („next to them, on the right side of the frame”), lampa z przodu bez powtórzeń („softbox light”).
- **Malutki stworek przy całej sylwetce** (`tinyPetFar`): własny Manimal wielkości dłoni obok Manikuna w ujęciu całej postaci dostaje w Maniscrypcie tylko 3–4 cechy widoczne z daleka (sierść z wzorem, skrzydła, uszy albo rogi, kolor oczu). Gdy taki stworek trafia do kadru, Manikun raz mówi, że szczegóły zginą, i radzi większy rozmiar.

## Panel Maniscryptu: kopiowanie na pierwszym miejscu

- Kolejność: Z moją twarzą → **Kopiuj Maniscrypt** (zielony, główny) → generatory („Albo stuknij generator: skopiuje i otworzy jego stronę”) → Premium i **Zrób zdjęcie tutaj** (obramowany, drugi wybór) → Próbny kadr, Udostępnij, Drzewko. Usunięta zamiana kolorów `#copySheet.has-gen`.

## Kłódki: przytrzymanie kafelka blokuje go przed losowaniem

- Przytrzymanie (450 ms albo „contextmenu” z długiego dotyku na telefonie) kafelka kategorii albo grupy w Swobodzie przełącza kłódkę (żółta plakietka w rogu, pasek „Zablokowane: Poza. Losuj tego nie zmieni.”, wibracja). Grupa blokuje wszystkie swoje kategorie. Kliknięcie po przytrzymaniu nie otwiera kafelka; ruch palca (przewijanie rzędu) przerywa przytrzymanie.
- `LOCK_KEYS`: kategoria → pola sceny. `randomize` robi kopię zablokowanych pól na początku i przywraca je na końcu (potem `fixScene`); zablokowana postać i cechy (dziecko) są brane pod uwagę już przy losowaniu stroju i wyglądu.
- Kłódki znikają przy nowej scenie (powrót do startu). Po drugim losowaniu bez kłódek Manikun raz podpowiada przytrzymanie.
- **Kłódki na konkretne części** (`lockTargets`): kafelek części blokuje tylko ją – Cechy (np. Piegi `p:traits.freckles`), Wygląd (Mina, Włosy z kolorem, Zarost, Usta, Okulary, Spojrzenie), części stroju (góra, dół… z kolorem), części Manimala, Manito i krajobrazu. Przytrzymanie kafelka opcji (np. „Długie proste”) wybiera ją i blokuje; kłódka jest wtedy na tej opcji i na kafelku części. Losowanie przywraca zablokowane części (`p:obiekt.pole`), zablokowana część stroju robi zestaw „własny”.

## Układ domyślny tylko w bieżącym temacie

- Kafelek „Układ domyślny” (dwa stuknięcia) nie wraca już do ekranu startowego: `resetLayout` ustawia scenę początkową, ale zostawia temat (Manikun, Manito, Manimal, Manitam), tryb zdjęcie/wideo, poziom i Swobodę; zdejmuje kłódki. Manitam wraca do własnego krajobrazu. Nowa scena od startu: Menu › Nowa scena.

## Smok i stworki w stylu reszty obrazu

- Umaszczenia smoka miały w opisie „cartoon dragon”, więc generator rysował bajkowego smoka obok realistycznej postaci. Słowo usunięte.
- `creatureStyle`: przy smoku albo własnym stworku (obok Manikuna albo jako Manimal) Maniscrypt dopisuje w stylach fotograficznych (Realistyczny, Kino, Cyberpunk, Vintage, Noir) „the dragon looks like a real living animal photographed in the same scene: lifelike anatomy, realistic skin, scales or fur texture…, not a cartoon, plush toy or 3D figurine”, a w ilustracyjnych (Anime, Komiks, 3D, Akwarela, Fantasy) „drawn in exactly the same … style as the rest of the image”. Zwykłe zwierzęta bez dopisku.

## Moje sceny: zapis całej sceny na koncie

- Kafelek **Zapisz scenę** w Swobodzie (obok Losuj) zapisuje całą scenę (`sceneSnapshot`, jak przy udostępnianiu) z krótkim opisem; bez konta Manikun prosi o zalogowanie.
- Menu › **Moje sceny** (po zalogowaniu): siatka miniatur rysowanych z zapisanej sceny (`sceneThumb`), stuknięcie wczytuje scenę do edycji (`restoreScene`), krzyżyk usuwa (dwa stuknięcia).
- Serwer: tabela `scenes` (migracja `0010_sceny.sql`), `GET/POST /api/scenes`, `DELETE /api/scenes/<id>`, najwyżej 60 scen na konto, scena do 30 000 znaków.
- **Zakładka w górnym pasku** (`#saveTop`, obok dźwięku): stały przycisk Zapisz scenę (ikona zakładki, jak „zapisz” w Instagramie i Pintereście), po zapisie na chwilę wypełniona na zielono; ukryta na starcie i w tutorialu. Kafelek Zapisz scenę w Swobodzie zostaje.
