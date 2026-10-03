// Po dodaniu nagrań: zapisuje listę dostępnych plików assets/voice/*.mp3 do assets/voice/manifest.json.
// Aplikacja gra tylko zdania z tej listy. Uruchomienie: node tools/voice/manifest.cjs
const fs = require("fs"), path = require("path");
const dir = path.join(__dirname, "..", "..", "assets", "voice");
const ids = fs.readdirSync(dir).filter(f => /^v[0-9a-f]{8}\.mp3$/.test(f)).map(f => f.slice(0, -4)).sort();
fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(ids) + "\n");
const lines = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "docs", "voice", "lines.json"), "utf8"));
const missing = lines.filter(l => !ids.includes(l.id));
console.log(ids.length, "nagrań w manifeście;", missing.length, "zdań z listy jeszcze bez nagrania");
