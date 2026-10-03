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
