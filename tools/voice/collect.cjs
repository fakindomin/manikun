// Zbiera wszystkie zdania, które Manikun może powiedzieć, i zapisuje listę do nagrania:
// docs/voice/lines.csv (id;zdanie;skąd) i docs/voice/lines.json.
// Każde zdanie to osobne nagranie assets/voice/<id>.mp3; id liczy się z treści zdania tak samo jak w aplikacji (voiceId).
// Uruchomienie (potrzebny Playwright i lokalny serwer z aplikacją):
//   python3 -m http.server 8765 &   node tools/voice/collect.cjs [http://127.0.0.1:8765/index.html]
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");
const ROOT = path.join(__dirname, "..", "..");
const URL = process.argv[2] || "http://127.0.0.1:8765/index.html";

// Te same zasady co w aplikacji: normalizacja, podział na zdania, id
const norm = t => t.replace(/\s+/g, " ").trim();
function sentences(text) {
  const t = norm(text), out = [];
  let s = 0;
  for (let i = 0; i < t.length; i++) if (".!?…".includes(t[i]) && t[i + 1] === " " && /[A-ZĄĆĘŁŃÓŚŹŻ0-9]/.test(t[i + 2] || "")) { out.push(t.slice(s, i + 1)); s = i + 2; }
  if (s < t.length) out.push(t.slice(s));
  return out.map(x => x.trim()).filter(Boolean);
}
function voiceId(t) {
  let h = 0x811c9dc5;
  for (const ch of norm(t)) { h ^= ch.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
  return "v" + h.toString(16).padStart(8, "0");
}

(async () => {
  const texts = [];   // [tekst, skąd]
  // 1. Stałe teksty z kodu: literały w wywołaniach say/offer/wizSay, żarty, komentarze Kreatora, kolory
  const src = fs.readFileSync(path.join(ROOT, "index.html"), "utf8").split("\n");
  src.forEach((line, n) => {
    if (!/\bsay\(|\bsay: |offer\(|wizSay\(|joke: |toFmt\(|text = "|BOLD_COLORS = |const SOON|done: "/.test(line)) return;
    for (const m of line.matchAll(/"((?:[^"\\]|\\.)*)"|`([^`$]*)`/g)) {
      const t = (m[1] ?? m[2] ?? "").trim();
      if (t.length > 3 && / /.test(t) && /[a-ząćęłńóśźż]/i.test(t) && !/^[a-z-]+ [a-z-]+$/.test(t) && !/[{}<>=]/.test(t)) texts.push([t, "kod, linia " + (n + 1)]);
    }
  });
  // 2. Teksty liczone w aplikacji: tutorial, pytania Kreatora we wszystkich wariantach, szablony ze wstawkami
  const b = await chromium.launch(process.env.CHROMIUM ? { executablePath: process.env.CHROMIUM } : {});
  const p = await b.newPage();
  await p.route(/^https:/, r => r.abort());
  await p.goto(URL, { waitUntil: "domcontentloaded" });
  await p.evaluate(() => localStorage.setItem("manikun-tutorial", "done"));
  await p.goto(URL + "?intro", { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(2500);
  const dyn = await p.evaluate(() => {
    const seen = new Map(), add = (t, from) => { if (t && !seen.has(t)) seen.set(t, from); };
    TUT_STEPS.forEach((st, i) => add(st.say, "tutorial " + (i + 1)));
    CHAPTERS_ALL.forEach(c => add(c.done, "Kreator, koniec rozdziału"));
    const saved = JSON.parse(JSON.stringify(scene)), savedLevel = level;
    const things = THINGS.filter(t => !t.pet).map(t => t.id), surf = things.filter(id => THING[id].surf);
    for (const lv of ["basic", "expert"]) for (const body of ["male", "female"]) for (const mode of ["photo", "video"]) for (const pose of ["stand", "leanOn", "sit"]) for (const picked of [{}, { top: true }]) {
      level = lv;
      Object.assign(scene, { body, mode, pose, wcPicked: picked });
      const thingSets = [[], ...things.map(id => [{ id }])];
      for (const ts of thingSets) {
        scene.things = ts;
        for (const part of PARTS) {
          wiz = { ans: { colors: true, dress: "own" }, seen: {}, part, thingIdx: ts.length ? 0 : null, q: null };
          WIZ_Q.forEach(q => { if (typeof q.say !== "function") { add(q.say, "Kreator: " + q.id); return; } try { add(q.say(), "Kreator: " + q.id); } catch (e) {} });
        }
      }
    }
    level = savedLevel; wiz = null; Object.assign(scene, saved); render();
    // Szablony z say(): rzecz do wskazania, kolizja efektów, tłok
    THINGS.filter(t => !t.pet).forEach(t => add(`Wskaż w kadrze, gdzie ma stać: ${t.name.toLowerCase()}. Stuknij punkt.`, "wskazywanie miejsca rzeczy"));
    FX_LIST.forEach(x => (x.excl || []).forEach(y => add(`${x.name} i ${FX[y].name.toLowerCase()} naraz się nie da. Zostawiam: ${x.name.toLowerCase()}.`, "kolizja efektów")));
    for (let n = 7; n <= 14; n++) add(`Robi się tłoczno: ${n} rzeczy. Generator może coś zgubić, najważniejsze daję na początek Maniscryptu.`, "tłok w kadrze");
    add("Gotowe! Scena. Stuknij zielony przycisk i skopiuj Maniscrypt. Poprawki zrobisz tu, w Swobodzie.", "koniec Kreatora");
    add("Scena. Pasuje?", "Kreator: zdaj się na mnie");
    return [...seen.entries()];
  });
  await b.close();
  dyn.forEach(x => texts.push(x));
  // Zdania, dedup; zdania z podsumowaniem sceny („Scena.”) są tylko miejscem na tekst zmienny, nie nagrywa się ich
  const seen = new Map();
  texts.forEach(([t, from]) => sentences(t).forEach(s => {
    // Pomijane: miejsce na zmienne podsumowanie („Scena.”), warianty niemożliwe w aplikacji i napisy z przycisków (bez końca zdania)
    if (s === "Scena." || /undefined|null/.test(s) || !/[.!?…]$/.test(s)) return;
    const id = voiceId(s);
    if (!seen.has(id)) seen.set(id, { id, text: s, from: new Set() });
    seen.get(id).from.add(from.replace(/, linia \d+$/, ""));
  }));
  // Całe wypowiedzi (dymki) do nagrania jednym plikiem: lepsza intonacja i rozpoznanie polskiego
  const utt = new Map();
  texts.forEach(([t, from]) => {
    const n = norm(t), ss = sentences(n);
    if (ss.length < 2 || /undefined|null/.test(n) || ss.some(x => x === "Scena." || !/[.!?…]$/.test(x))) return;
    const id = voiceId(ss.join(" "));
    if (!utt.has(id)) utt.set(id, { id, text: ss.join(" "), from: from.replace(/, linia \d+$/, "") });
  });
  fs.writeFileSync(path.join(ROOT, "docs/voice/utterances.json"), JSON.stringify([...utt.values()], null, 1) + "\n");
  const list = [...seen.values()].sort((a, b) => a.text.localeCompare(b.text, "pl")).map(x => ({ id: x.id, text: x.text, from: [...x.from].slice(0, 3).join(", ") }));
  const csv = "id;zdanie;skąd\n" + list.map(x => [x.id, x.text, x.from].map(v => `"${v.replace(/"/g, '""')}"`).join(";")).join("\n") + "\n";
  fs.writeFileSync(path.join(ROOT, "docs/voice/lines.csv"), csv);
  fs.writeFileSync(path.join(ROOT, "docs/voice/lines.json"), JSON.stringify(list, null, 1) + "\n");
  console.log(list.length, "zdań do nagrania");
})();
