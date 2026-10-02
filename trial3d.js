// Próbny kadr 3D: ta sama scena co szkic, jako jeden nieruchomy kadr z ubranym Manikunem (three.js, render na żądanie).
// Dane idą tylko w jedną stronę: aplikacja podaje pozę (kąty 2D), ubiór (clothOf), kamerę, światło, rzeczy i tło,
// a moduł oddaje gotowy obraz. Nic tu nie zmienia sceny.
// Ubiór bez osobnych modeli: każdy fragment ciała manekina dostaje kolor i grubość materiału według kości,
// do której należy (góra, rękawy, spodnie, buty), a włosy, czapki, kaptur, kołnierz, krawat i spódnica to proste bryły.
// Model: „Wooden Mannequin (Rigged)” – zionmuoria, CC BY 4.0.
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const D = Math.PI / 180, Y = new THREE.Vector3(0, 1, 0);
const WOOD = new THREE.Color(0xd9b58a);

// ---------- Materiały i bryły ----------
const matCache = new Map();
const mat = (c, r = 0.75, extra) => {
  const k = c + "/" + r + (extra ? JSON.stringify(extra) : "");
  if (!matCache.has(k)) matCache.set(k, new THREE.MeshStandardMaterial({ color: c, roughness: r, ...(extra || {}) }));
  return matCache.get(k);
};
function part(geo, color, parent, pos = [0, 0, 0], rot = null, r) {
  const m = new THREE.Mesh(geo, typeof color === "object" ? color : mat(color, r));
  m.position.set(...pos); if (rot) m.rotation.set(...rot);
  m.castShadow = true; m.receiveShadow = true;
  parent.add(m);
  return m;
}
const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const cyl = (r1, r2, h, n = 16) => new THREE.CylinderGeometry(r1, r2, h, n);
const legs4 = (g, w, d, h, c, r = 0.025) => [[-w, -d], [w, -d], [-w, d], [w, d]].forEach(([x, z]) => part(cyl(r, r, h, 8), c, g, [x, h / 2, z]));

// ---------- Rzeczy (metry; przód w stronę +Z). seat: wysokość siedziska, top: wysokość blatu ----------
const OAK = 0x9a6b43, FABRIC = 0x61748a, METAL = 0x9aa0a6;
const THINGS3D = {
  chair: { seat: 0.47, r: 0.35, build(g, c) { part(box(0.46, 0.05, 0.46), c || OAK, g, [0, 0.45, 0]); part(box(0.46, 0.5, 0.05), c || OAK, g, [0, 0.72, -0.21]); legs4(g, 0.2, 0.2, 0.45, c || OAK); } },
  armchair: { seat: 0.45, r: 0.5, build(g, c) { const k = c || 0x8a6552; part(box(0.8, 0.4, 0.75), k, g, [0, 0.2, 0], 0, 0.95); part(box(0.8, 0.5, 0.18), k, g, [0, 0.62, -0.3], 0, 0.95); part(box(0.16, 0.26, 0.75), k, g, [-0.36, 0.52, 0], 0, 0.95); part(box(0.16, 0.26, 0.75), k, g, [0.36, 0.52, 0], 0, 0.95); } },
  sofa: { seat: 0.45, r: 0.95, build(g, c) { const k = c || FABRIC; part(box(1.8, 0.42, 0.85), k, g, [0, 0.21, 0], 0, 0.95); part(box(1.8, 0.5, 0.2), k, g, [0, 0.62, -0.33], 0, 0.95); part(box(0.2, 0.3, 0.85), k, g, [-0.8, 0.55, 0], 0, 0.95); part(box(0.2, 0.3, 0.85), k, g, [0.8, 0.55, 0], 0, 0.95); } },
  stool: { seat: 0.8, r: 0.3, build(g, c) { part(cyl(0.19, 0.19, 0.06, 20), c || 0x4a3a30, g, [0, 0.78, 0]); [0, 1, 2].forEach(i => { const a = i * 2.09; part(cyl(0.018, 0.022, 0.78, 8), METAL, g, [Math.sin(a) * 0.13, 0.39, Math.cos(a) * 0.13], [Math.cos(a) * -0.12, 0, Math.sin(a) * 0.12], 0.35); }); } },
  bench: { seat: 0.46, r: 0.9, build(g, c) { const k = c || OAK; part(box(1.6, 0.06, 0.42), k, g, [0, 0.44, 0]); part(box(1.6, 0.35, 0.05), k, g, [0, 0.7, -0.19]); legs4(g, 0.7, 0.16, 0.44, 0x3c4148, 0.03); } },
  pouf: { seat: 0.4, r: 0.35, build(g, c) { part(cyl(0.28, 0.3, 0.4, 24), c || 0xb4876a, g, [0, 0.2, 0], 0, 0.95); } },
  rock: { seat: 0.42, r: 0.45, build(g, c) { const m = part(new THREE.DodecahedronGeometry(0.42, 1), c || 0x8c8a86, g, [0, 0.22, 0], 0, 0.95); m.scale.set(1.1, 0.55, 0.9); } },
  stump: { seat: 0.42, r: 0.35, build(g, c) { part(cyl(0.28, 0.33, 0.42, 18), c || 0x6a4b33, g, [0, 0.21, 0], 0, 0.95); part(cyl(0.27, 0.27, 0.01, 18), 0xc8a477, g, [0, 0.425, 0]); } },
  stairs: { seat: 0.36, r: 1.1, build(g, c) { const k = c || 0x9a9790; [0, 1, 2, 3].forEach(i => part(box(1.8, 0.18, 0.34), k, g, [0, 0.09 + i * 0.18, -i * 0.34])); } },
  crate: { seat: 0.5, r: 0.4, build(g, c) { part(box(0.55, 0.5, 0.55), c || 0xb08352, g, [0, 0.25, 0]); } },
  table: { top: 0.78, r: 0.6, build(g, c) { part(box(1.1, 0.05, 0.7), c || OAK, g, [0, 0.755, 0]); legs4(g, 0.48, 0.28, 0.73, c || OAK, 0.03); } },
  coffeeTable: { top: 0.38, r: 0.6, build(g, c) { part(box(1.0, 0.05, 0.55), c || OAK, g, [0, 0.355, 0]); legs4(g, 0.44, 0.22, 0.33, c || OAK, 0.025); } },
  bar: { top: 1.12, r: 0.9, build(g, c) { part(box(1.8, 1.08, 0.55), c || 0x5a3e2b, g, [0, 0.54, 0]); part(box(1.9, 0.05, 0.65), 0x3a2a20, g, [0, 1.1, 0]); } },
  desk: { top: 0.76, r: 0.7, build(g, c) { const k = c || 0x6b4a33; part(box(1.3, 0.05, 0.65), k, g, [0, 0.735, 0]); part(box(0.45, 0.7, 0.6), k, g, [0.4, 0.35, 0]); legs4(g, 0.6, 0.27, 0.71, k, 0.025); } },
  floorLamp: { r: 0.3, build(g, c) { part(cyl(0.16, 0.18, 0.04, 20), 0x2a2a2e, g, [0, 0.02, 0], 0, 0.4); part(cyl(0.015, 0.015, 1.5, 8), 0x2a2a2e, g, [0, 0.77, 0], 0, 0.4); part(cyl(0.16, 0.24, 0.3, 24), mat(c || 0xf3e6c4, 0.9, { emissive: 0xffd9a0, emissiveIntensity: 0.6 }), g, [0, 1.58, 0]); } },
  shelf: { r: 0.6, build(g, c) { const k = c || 0x6e4b30; part(box(1.0, 1.9, 0.35), k, g, [0, 0.95, 0]); [0.35, 0.8, 1.25, 1.7].forEach((y, i) => part(box(0.86, 0.26, 0.26), [0x8a3b3b, 0x3b5a8a, 0x5a8a3b, 0xb58a3b][i], g, [0, y, 0.06])); } },
  plant: { r: 0.4, build(g, c) { part(cyl(0.2, 0.15, 0.4, 18), c || 0xb5654a, g, [0, 0.2, 0]); part(new THREE.IcosahedronGeometry(0.42, 1), 0x4f8a57, g, [0, 0.85, 0], 0, 0.9); part(new THREE.IcosahedronGeometry(0.28, 1), 0x5f9c66, g, [0.18, 1.2, 0.05], 0, 0.9); } },
  umbrella: { r: 0.5, build(g, c) { part(cyl(0.025, 0.025, 2.2, 8), 0xe8e2d6, g, [0, 1.1, 0]); part(new THREE.ConeGeometry(1.1, 0.45, 16), c || 0xd8574a, g, [0, 2.2, 0], 0, 0.85); } },
  bike: { r: 0.8, build(g, c) { const k = c || 0x2f6fa8; [-0.5, 0.5].forEach(z => part(new THREE.TorusGeometry(0.33, 0.03, 8, 28), 0x2a2622, g, [0, 0.35, z], [0, Math.PI / 2, 0])); part(cyl(0.025, 0.025, 1.0, 8), k, g, [0, 0.62, 0], [Math.PI / 2 - 0.15, 0, 0], 0.4); part(cyl(0.025, 0.025, 0.5, 8), k, g, [0, 0.5, -0.2], [0.5, 0, 0], 0.4); part(box(0.08, 0.05, 0.22), 0x2a2622, g, [0, 0.9, -0.15]); part(box(0.5, 0.03, 0.03), 0x2a2622, g, [0, 1.0, 0.42]); } },
  car: { r: 2.3, build(g, c) { const k = c || 0x9c3b3b; part(box(1.8, 0.6, 4.2), k, g, [0, 0.55, 0], 0, 0.35); part(box(1.6, 0.5, 2.2), k, g, [0, 1.1, -0.2], 0, 0.35); part(box(1.62, 0.36, 2.0), mat(0x2f3b48, 0.15, { metalness: 0.3 }), g, [0, 1.12, -0.2]); [[-0.85, 1.3], [0.85, 1.3], [-0.85, -1.3], [0.85, -1.3]].forEach(([x, z]) => part(cyl(0.34, 0.34, 0.25, 20), 0x1e1e22, g, [x, 0.34, z], [0, 0, Math.PI / 2])); } }
};
// Drobiazgi na blacie: proste bryły według rodzaju
function buildItem(g, id) {
  const cols = { mug: 0xe8e2d6, cup: 0xf1ede6, glass: 0xbcd7e6, bottle: 0x3f7a4d, wine: 0x6e2233, book: 0x8a3b3b, laptop: 0x3c4148, phone: 0x1e1e22, vase: 0x6fa3b5, flowers: 0xd8574a, apple: 0xc0392b, banana: 0xf1cf45, plate: 0xf1ede6, candle: 0xf3e6c4, lamp: 0xf2d27a, cake: 0xf0d2c8 };
  if (id === "banana") { const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-0.1, 0.03, 0), new THREE.Vector3(0, -0.01, 0.06), new THREE.Vector3(0.1, 0.03, 0)); part(new THREE.TubeGeometry(curve, 12, 0.022, 8), cols.banana, g, [0, 0.01, 0]); return; }
  if (id === "book" || id === "laptop" || id === "phone" || id === "plate") { part(box(id === "phone" ? 0.08 : 0.24, 0.03, id === "phone" ? 0.15 : 0.17), cols[id], g, [0, 0.015, 0], [0, 0.3, 0]); return; }
  if (id === "apple") { part(new THREE.SphereGeometry(0.045, 14, 10), cols.apple, g, [0, 0.045, 0]); return; }
  const h = { bottle: 0.3, wine: 0.3, vase: 0.24, flowers: 0.32, candle: 0.16, lamp: 0.4 }[id] || 0.1;
  part(cyl(0.045, 0.045, h, 16), cols[id] || 0xc9a24a, g, [0, h / 2, 0], 0, id === "glass" ? 0.1 : 0.6);
}

// ---------- Tła: proste bryły w świetle; niebo jako kopuła z gradientem pory dnia ----------
let seed = 3;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
function ground(g, c, size = 160, r = 0.95) { const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat(c, r)); m.rotation.x = -Math.PI / 2; m.receiveShadow = true; g.add(m); return m; }
function pines(g, n, rMin, rMax, avoid) {
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2, d = rMin + rnd() * (rMax - rMin), x = Math.cos(a) * d, z = Math.sin(a) * d - 3;
    // Wolny pas przed kamerą (kamera stoi na +Z)
    if (z > -4 && Math.abs(x) < 7) continue;
    if (avoid && avoid(x, z)) continue;
    const h = 4 + rnd() * 4, t = new THREE.Group(); t.position.set(x, 0, z); g.add(t);
    part(cyl(0.12, 0.18, h * 0.5, 7), 0x5a4030, t, [0, h * 0.25, 0]);
    part(new THREE.ConeGeometry(h * 0.18, h * 0.75, 9), [0x2f5a44, 0x2a5040, 0x36644a][i % 3], t, [0, h * 0.62, 0], 0, 0.9);
  }
}
const BGS3D = {
  studio(g, v) {
    const c = { grey: [0x8d8d93, 0xa3a3a9], white: [0xd6d4cf, 0xe8e6e1], black: [0x2a2a2e, 0x34343a], color: [0x3e5a5e, 0x557a80] }[v] || [0x8d8d93, 0xa3a3a9];
    ground(g, c[0]);
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 12, 48, 1, true, -1.3, 2.6), mat(c[1], 1, { side: THREE.BackSide }));
    wall.position.set(0, 6, 1.5); wall.rotation.y = Math.PI; wall.receiveShadow = true; g.add(wall);
    return { indoor: true, sky: c[1] };
  },
  street(g) {
    ground(g, 0x55585e);
    [-1, 1].forEach(s => { const w = new THREE.Mesh(new THREE.PlaneGeometry(3, 160), mat(0x8a8a86, 0.9)); w.rotation.x = -Math.PI / 2; w.position.set(s * 5.5, 0.01, 0); w.receiveShadow = true; g.add(w); });
    for (let i = 0; i < 20; i++) {
      const s = i % 2 ? -1 : 1, h = 6 + rnd() * 12, z = -34 + Math.floor(i / 2) * 6, b = new THREE.Group(); b.position.set(s * 9.5, 0, z); g.add(b);
      part(box(4.5, h, 5), [0x8a6f5a, 0x6f7a86, 0x9a8a72, 0x5f6a74][i % 4], b, [0, h / 2, 0], 0, 0.9);
      for (let f = 1; f < h / 3; f++) [-1, 1].forEach(k => part(box(0.05, 1.1, 1.2), mat(0x2f3b48, 0.2, { emissive: 0xffc070, emissiveIntensity: rnd() < 0.35 ? 0.5 : 0 }), b, [-s * 2.27, f * 3, k * 1.2]));
    }
  },
  rooftop(g) {
    ground(g, 0x6f6f72, 12);
    [[0, -6, 12, 0.9, 0.3], [-6, 0, 0.3, 0.9, 12], [6, 0, 0.3, 0.9, 12]].forEach(([x, z, w, h, d]) => part(box(w, h, d), 0x8a8a8e, g, [x, h / 2, z]));
    for (let i = 0; i < 26; i++) { const h = 8 + rnd() * 30, x = -40 + rnd() * 80, z = -20 - rnd() * 40; part(box(4 + rnd() * 5, h, 4 + rnd() * 5), mat([0x6f7a86, 0x5f6a74, 0x7a8590][i % 3], 0.8, { emissive: 0xffc070, emissiveIntensity: 0.06 }), g, [x, h / 2 - 20, z]); }
    ground(g, 0x3c4148, 300).position.y = -20;
  },
  mountains(g) {
    ground(g, 0x6f8a5a);
    [[-18, -40, 16, 22], [8, -45, 20, 26], [30, -38, 14, 18], [-40, -30, 12, 16]].forEach(([x, z, r, h]) => { part(new THREE.ConeGeometry(r, h, 9), 0x7a7f8a, g, [x, h / 2, z], 0, 1); part(new THREE.ConeGeometry(r * 0.3, h * 0.3, 9), 0xf0f2f4, g, [x, h * 0.86, z], 0, 0.8); });
    pines(g, 10, 12, 26);
  },
  forest(g) { ground(g, 0x46523f); const p = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 40), mat(0x7b6a58)); p.rotation.x = -Math.PI / 2; p.rotation.z = 0.2; p.position.set(-0.3, 0.004, -12); p.receiveShadow = true; g.add(p); pines(g, 80, 5, 24, (x, z) => Math.abs(x + 0.3 + z * 0.2) < 2); },
  beach(g) {
    ground(g, 0xd9c396);
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(400, 120), mat(0x3f7fb0, 0.25, { metalness: 0.1 })); sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0.02, -66); g.add(sea);
    const foam = new THREE.Mesh(new THREE.PlaneGeometry(400, 0.5), mat(0xeef4f6, 0.8)); foam.rotation.x = -Math.PI / 2; foam.position.set(0, 0.025, -6.1); g.add(foam);
  },
  meadow(g) { ground(g, 0x7fa05a); [[-14, -30, 9], [10, -34, 12], [30, -28, 8]].forEach(([x, z, r]) => { const h = part(new THREE.SphereGeometry(r, 24, 12), 0x6f9450, g, [x, -r * 0.55, z], 0, 1); h.scale.y = 0.6; }); pines(g, 6, 10, 18); },
  lake(g) { ground(g, 0x6f9450); const w = new THREE.Mesh(new THREE.CircleGeometry(16, 48), mat(0x4f86b0, 0.2)); w.rotation.x = -Math.PI / 2; w.position.set(0, 0.02, -22); g.add(w); pines(g, 40, 22, 34); },
  river(g) { ground(g, 0x6f9450); const w = new THREE.Mesh(new THREE.PlaneGeometry(200, 5), mat(0x4f86b0, 0.2)); w.rotation.x = -Math.PI / 2; w.rotation.z = 0.12; w.position.set(0, 0.02, -9); g.add(w); pines(g, 30, 16, 30); },
  room(g) {
    ground(g, 0x9a7654, 12, 0.7);
    part(box(12, 3, 0.2), 0xd8d0c2, g, [0, 1.5, -4], 0, 1); part(box(0.2, 3, 12), 0xcfc6b6, g, [-5, 1.5, 0], 0, 1);
    part(box(1.6, 1.3, 0.05), mat(0xdcecf6, 0.3, { emissive: 0xdcecf6, emissiveIntensity: 0.5 }), g, [1.5, 1.6, -3.88]);
    return { indoor: true, sky: 0x3a3632 };
  },
  cafe(g) {
    ground(g, 0x6b4a33, 14, 0.6);
    part(box(14, 3.2, 0.2), 0x8a5a3c, g, [0, 1.6, -4.5], 0, 0.9); part(box(0.2, 3.2, 14), 0x7a5038, g, [-5.5, 1.6, 0], 0, 0.9);
    part(box(3, 1.05, 0.6), 0x5a3e2b, g, [2.5, 0.52, -3.6]);
    [-1.5, 0, 1.5].forEach(x => { part(cyl(0.01, 0.01, 1, 4), 0x1c1712, g, [x, 2.7, -2]); part(new THREE.ConeGeometry(0.22, 0.2, 16), mat(0xf2d27a, 0.6, { emissive: 0xffcf80, emissiveIntensity: 0.9 }), g, [x, 2.15, -2]); });
    return { indoor: true, sky: 0x2e2420 };
  }
};
const SKY = { day: ["#2F6FD0", "#9FD4F2", "#DDEFF7"], golden: ["#3A3470", "#E0785A", "#FFC27A"], night: ["#060A2A", "#2B2F78", "#6A5AA8"] };
function skyDome(cols) {
  const geo = new THREE.SphereGeometry(400, 32, 16), pos = geo.attributes.position, c = [], top = new THREE.Color(cols[0]), mid = new THREE.Color(cols[1]), hor = new THREE.Color(cols[2]), t = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / 400;
    if (y <= 0) t.copy(hor); else if (y < 0.25) t.copy(hor).lerp(mid, y / 0.25); else t.copy(mid).lerp(top, Math.min(1, (y - 0.25) / 0.5));
    c.push(t.r, t.g, t.b);
  }
  geo.setAttribute("color", new THREE.Float32BufferAttribute(c, 3));
  return new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false }));
}

// ---------- Manekin: kości z modelu, pozy z kątów 2D ----------
const qa = new THREE.Quaternion(), qb = new THREE.Quaternion(), qc = new THREE.Quaternion();
function rotW(bone, axis, rad) {
  bone.updateWorldMatrix(true, false);
  bone.getWorldQuaternion(qa); bone.parent.getWorldQuaternion(qb);
  qc.setFromAxisAngle(axis, rad);
  bone.quaternion.copy(qb.invert().multiply(qc.multiply(qa)));
  bone.updateWorldMatrix(false, true);
}
const LOW_BONES = ["LeftToe_End", "RightToe_End", "LeftToeBase", "RightToeBase", "LeftFoot", "RightFoot", "LeftHand", "RightHand", "Hips", "Head", "HeadTop_End", "Spine2", "LeftLeg", "RightLeg", "LeftForeArm", "RightForeArm"];
const TOP_BONES = ["Spine", "Spine1", "Spine2", "LeftShoulder", "RightShoulder", "LeftArm", "RightArm"], TORSO = ["Spine", "Spine1", "Spine2", "LeftShoulder", "RightShoulder"];
const FORE = ["LeftForeArm", "RightForeArm"], THIGH = ["LeftUpLeg", "RightUpLeg"], SHIN = ["LeftLeg", "RightLeg"];
const FEET = ["LeftFoot", "RightFoot", "LeftToeBase", "RightToeBase", "LeftToe_End", "RightToe_End"];

function faceTexture(look) {
  const cv = document.createElement("canvas"); cv.width = cv.height = 256; const g = cv.getContext("2d"), e = look.expr || "neutral";
  const ink = "#3b2616";
  g.lineCap = "round"; g.lineJoin = "round";
  // Zarost: delikatny cień na żuchwie
  if (look.beard === "stubble") { g.fillStyle = look.beardColor; g.globalAlpha = 0.32; g.beginPath(); g.ellipse(128, 196, 70, 42, 0, 0, Math.PI * 2); g.fill(); g.globalAlpha = 1; }
  g.strokeStyle = g.fillStyle = ink; g.lineWidth = 9;
  // Oczy
  const EY = 112, EX = [88, 168];
  EX.forEach(x => {
    g.beginPath();
    if (e === "joy") { g.moveTo(x - 13, EY + 5); g.quadraticCurveTo(x, EY - 12, x + 13, EY + 5); g.stroke(); }
    else if (e === "deep" || e === "thought") { g.moveTo(x - 12, EY + 2); g.lineTo(x + 12, EY + 2); g.stroke(); }
    else { g.arc(x, EY, e === "surprise" || e === "shock" ? 15 : 11, 0, Math.PI * 2); g.fill(); }
  });
  if (e === "cry") { g.strokeStyle = "#6aa8d8"; g.lineWidth = 6; g.beginPath(); g.moveTo(EX[0] - 4, EY + 18); g.lineTo(EX[0] - 7, EY + 52); g.stroke(); g.strokeStyle = ink; g.lineWidth = 9; }
  // Brwi: złość opada do środka, smutek się unosi, zdziwienie wysoko
  const BR = { anger: [70, 96, 70], fury: [64, 98, 64], sad: [86, 70, 86], cry: [86, 68, 86], surprise: [64, 56, 64], shock: [56, 48, 56] }[e] || [78, 68, 76];
  g.beginPath();
  g.moveTo(66, BR[0]); g.quadraticCurveTo(88, BR[1] - (BR[1] > BR[0] ? 0 : 6), 110, BR[1] > BR[0] ? BR[1] : BR[2]);
  g.moveTo(146, BR[1] > BR[0] ? BR[1] : BR[2]); g.quadraticCurveTo(168, BR[1] - (BR[1] > BR[0] ? 0 : 6), 190, BR[0]);
  g.stroke();
  // Usta (kolor szminki, gdy wybrana)
  const lip = look.lips || ink;
  g.strokeStyle = g.fillStyle = lip; g.lineWidth = look.lips ? 11 : 9;
  g.beginPath();
  if (e === "smile") { g.moveTo(92, 178); g.quadraticCurveTo(128, 210, 164, 178); g.stroke(); }
  else if (e === "joy") { g.moveTo(90, 176); g.quadraticCurveTo(128, 232, 166, 176); g.closePath(); g.fillStyle = "#5a2a22"; g.fill(); g.stroke(); }
  else if (e === "fury" || e === "shock") { g.ellipse(128, 192, e === "fury" ? 30 : 18, e === "fury" ? 18 : 24, 0, 0, Math.PI * 2); g.fillStyle = "#3a1a14"; g.fill(); g.stroke(); }
  else if (e === "surprise") { g.ellipse(128, 190, 11, 14, 0, 0, Math.PI * 2); g.stroke(); }
  else if (e === "sad" || e === "cry") { g.moveTo(98, 196); g.quadraticCurveTo(128, 174, 158, 196); g.stroke(); }
  else if (e === "thought" || e === "deep") { g.moveTo(108, 188); g.lineTo(150, 184); g.stroke(); }
  else if (e === "anger") { g.moveTo(98, 190); g.lineTo(158, 190); g.stroke(); }
  else { g.moveTo(100, 186); g.lineTo(156, 186); g.stroke(); }
  // Okulary
  if (look.glasses && look.glasses !== "none") {
    g.strokeStyle = look.glassesColor; g.lineWidth = 6;
    const dark = look.glasses === "sun" || look.glasses === "aviator";
    EX.forEach(x => {
      g.beginPath();
      if (look.glasses === "rect") g.roundRect(x - 27, EY - 19, 54, 38, 7);
      else if (look.glasses === "aviator") { g.moveTo(x - 28, EY - 16); g.lineTo(x + 28, EY - 16); g.quadraticCurveTo(x + 28, EY + 30, x, EY + 26); g.quadraticCurveTo(x - 28, EY + 24, x - 28, EY - 16); }
      else g.arc(x, EY, 25, 0, Math.PI * 2);
      if (dark) { g.fillStyle = "rgba(20,22,26,0.92)"; g.fill(); }
      g.stroke();
    });
    g.beginPath(); g.moveTo(EX[0] + 25, EY - 4); g.quadraticCurveTo(128, EY - 14, EX[1] - 25, EY - 4); g.stroke();
  }
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}

let loading = null;
function loadModel() {
  if (!loading) loading = new Promise((res, rej) => new GLTFLoader().load(new URL("assets/manikun3d.glb", document.baseURI).href, res, undefined, rej));
  return loading;
}

export async function createTrial3d() {
  const gltf = await loadModel();
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 0.8, 0.05, 900);
  const hemi = new THREE.HemisphereLight(0xffffff, 0x404040, 1); scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 3); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.5, far: 40 });
  key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02;
  scene.add(key, key.target);
  const fill = new THREE.DirectionalLight(0xffffff, 0.5); scene.add(fill, fill.target);
  const rim = new THREE.DirectionalLight(0xc8d8ff, 1); scene.add(rim, rim.target);
  const setGroup = new THREE.Group(), thingGroup = new THREE.Group(), extras = new THREE.Group();
  scene.add(setGroup, thingGroup, extras);

  // ----- Manekin: jedna postać, przód w stronę +Z -----
  const model = gltf.scene, bones = {}, rest = {};
  let mesh = null;
  scene.add(model);
  model.traverse(o => {
    if (o.isLight || o.isCamera) o.visible = false;
    if (o.isBone) { const n = o.name.replace(/^mixamorig:?/, "").replace(/_\d+$/, ""); bones[n] = o; }
    if (o.isSkinnedMesh) mesh = o;
  });
  model.updateMatrixWorld(true);
  const bx = new THREE.Box3().setFromObject(model), baseScale = 1.8 / (bx.max.y - bx.min.y);
  model.scale.setScalar(baseScale); model.updateMatrixWorld(true);
  const wp = n => bones[n].getWorldPosition(new THREE.Vector3());
  const fwd0 = wp("LeftToeBase").sub(wp("LeftFoot")).setY(0).normalize();
  model.rotation.y = -Math.atan2(fwd0.x, fwd0.z); model.updateMatrixWorld(true);
  for (const n in bones) rest[n] = bones[n].quaternion.clone();
  const ws = mesh.getWorldScale(new THREE.Vector3()).x;

  // Kość dominująca każdego wierzchołka i jego położenie w pozycji spoczynkowej (góra/dół, przód, wysokość na nodze)
  const geo = mesh.geometry, si = geo.attributes.skinIndex, sw = geo.attributes.skinWeight, P = geo.attributes.position;
  const names = mesh.skeleton.bones.map(b => b.name.replace(/^mixamorig:?/, "").replace(/_\d+$/, ""));
  const dom = new Array(P.count);
  for (let i = 0; i < P.count; i++) { let best = 0, bw = -1; for (let k = 0; k < 4; k++) { const w = sw.getComponent(i, k); if (w > bw) { bw = w; best = si.getComponent(i, k); } } dom[i] = names[best]; }
  const bindPos = n => { const k = names.indexOf(n); return new THREE.Vector3().setFromMatrixPosition(new THREE.Matrix4().copy(mesh.skeleton.boneInverses[k]).invert()); };
  const B = { hips: bindPos("Hips"), spine: bindPos("Spine1"), head: bindPos("Head"), knee: bindPos("LeftLeg"), hipJ: bindPos("LeftUpLeg"), ankle: bindPos("LeftFoot"), toe: bindPos("LeftToeBase") };
  const upB = B.head.clone().sub(B.hips).normalize(), fwB = B.toe.clone().sub(B.ankle); fwB.sub(upB.clone().multiplyScalar(fwB.dot(upB))).normalize();
  const latB = new THREE.Vector3().crossVectors(upB, fwB), unit = B.head.clone().sub(B.hips).dot(upB) / 0.75;   // ~1 m w jednostkach modelu
  const hOf = (i, v = new THREE.Vector3()) => v.fromBufferAttribute(P, i).applyMatrix4(mesh.bindMatrix);
  // Czubek głowy z wierzchołków (koniec kości głowy nie należy do szkieletu skóry)
  let headTopY = -Infinity;
  for (let i = 0; i < P.count; i++) if (dom[i] === "Head") headTopY = Math.max(headTopY, hOf(i).dot(upB));
  const headH = headTopY - B.head.dot(upB), headC = B.head.clone().add(upB.clone().multiplyScalar(headH * 0.5));
  const hy = { hips: B.hips.dot(upB), spine: B.spine.dot(upB), knee: B.knee.dot(upB), hipJ: B.hipJ.dot(upB), ankle: B.ankle.dot(upB) };
  const colorAttr = new THREE.BufferAttribute(new Float32Array(P.count * 3), 3), inflateAttr = new THREE.BufferAttribute(new Float32Array(P.count), 1);
  geo.setAttribute("color", colorAttr); geo.setAttribute("inflate", inflateAttr);
  const bodyMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.72 });
  bodyMat.onBeforeCompile = sh => { sh.vertexShader = "attribute float inflate;\n" + sh.vertexShader.replace("#include <skinning_vertex>", "#include <skinning_vertex>\n transformed += normalize(objectNormal) * inflate;"); };
  mesh.material = bodyMat; mesh.castShadow = true; mesh.receiveShadow = true; mesh.frustumCulled = false;

  function dress(c) {
    const col = colorAttr.array, inf = inflateAttr.array, k = new THREE.Color(), v = new THREE.Vector3();
    const top = new THREE.Color(c.top), pants = c.pants && new THREE.Color(c.pants), skirt = c.skirt && new THREE.Color(c.skirt);
    const outer = c.outer && new THREE.Color(c.outer.color), shoes = new THREE.Color(c.shoes.color), cuffs = c.cuffs && new THREE.Color(c.cuffs);
    const lk = c.look || {}, hair = lk.hair && new THREE.Color(lk.hairColor), hairBack = { long: 0.12, wavy: 0.12, medium: 0.16, ponytail: 0.2, bun: 0.2, curly: 0.2 }[lk.hair] ?? 0.3;
    const topLine = c.topLen === "hip" || c.outer ? hy.hips - (hy.spine - hy.hips) * 0.6 : hy.hips + (hy.spine - hy.hips) * 0.15;
    const thighLen = hy.hipJ - hy.knee, shinLen = hy.knee - hy.ankle;
    for (let i = 0; i < P.count; i++) {
      const b = dom[i], h = hOf(i, v).dot(upB);
      let colr = WOOD, th = 0;
      const sleeve = b === "LeftArm" || b === "RightArm" || (FORE.includes(b) && (c.sleeve === "long" || c.outer));
      const torso = TORSO.includes(b) || (b === "Hips" && h > topLine);
      if (torso || sleeve) {
        colr = k.copy(top); th = c.loose ? 0.016 : 0.011;
        if (outer) {
          // Okrycie rozpięte z przodu: pas koszulki/bluzy widać pośrodku
          const rel = v.clone().sub(B.spine), open = torso && rel.dot(fwB) > 0 && Math.abs(rel.dot(latB)) < 0.045 * unit && h > topLine + 0.02 * unit;
          if (!open) { colr = k.copy(outer); th = c.outer.coat ? 0.024 : 0.02; }
        }
      } else if (b === "Hips" || THIGH.includes(b) || SHIN.includes(b)) {
        if (pants) {
          const shorts = c.shorts && (SHIN.includes(b) || (THIGH.includes(b) && h < hy.knee + thighLen * 0.45));
          if (!shorts) { colr = k.copy(pants); th = 0.009; if (cuffs && SHIN.includes(b) && h < hy.ankle + shinLen * 0.14) { colr = k.copy(cuffs); th = 0.013; } }
        } else if (skirt && (b === "Hips" || (THIGH.includes(b) && h > hy.knee + thighLen * 0.3))) { colr = k.copy(skirt); th = 0.006; }
        if (c.shoes.kind === "boots" && SHIN.includes(b) && h < hy.ankle + shinLen * 0.33) { colr = k.copy(shoes); th = 0.016; }
      } else if (FEET.includes(b)) { colr = k.copy(shoes); th = c.shoes.kind === "formal" ? 0.008 : 0.014; }
      else if (hair && (b === "Head" || b === "HeadTop_End")) {
        // Włosy malowane na głowie: linia czoła z przodu wysoko, z tyłu nisko (długie schodzą do karku)
        const rel = v.clone().sub(headC), t = v.clone().sub(B.head).dot(upB) / headH, fz = rel.dot(fwB) / headH;
        const line = fz > 0.12 ? 0.86 : fz < -0.12 ? hairBack : hairBack + (0.86 - hairBack) * (fz + 0.12) / 0.24;
        if (t > line) { colr = k.copy(hair); th = lk.hair === "buzz" ? 0.002 : 0.006; }
      }
      col[i * 3] = colr.r; col[i * 3 + 1] = colr.g; col[i * 3 + 2] = colr.b;
      inf[i] = th / ws;
    }
    colorAttr.needsUpdate = true; inflateAttr.needsUpdate = true;
  }

  // Kąty 2D (0 = w dół, 90 = do przodu, 180 = w górę) na kierunki w płaszczyźnie postaci; bliższa strona to prawa
  const F = new THREE.Vector3(0, 0, 1), L = new THREE.Vector3(1, 0, 0);
  function aim(name, child, dir) {
    if (!bones[name] || !bones[child]) return;
    const a = wp(name), cur = wp(child).sub(a).normalize(), want = dir.clone().normalize();
    const axis = new THREE.Vector3().crossVectors(cur, want);
    if (axis.lengthSq() < 1e-10) return;
    rotW(bones[name], axis.normalize(), Math.acos(THREE.MathUtils.clamp(cur.dot(want), -1, 1)));
  }
  const dirA = (a, lat = 0, len = 1) => {
    const v = F.clone().multiplyScalar(Math.sin(a * D) * len).add(Y.clone().multiplyScalar(-Math.cos(a * D) * len));
    return v.add(L.clone().multiplyScalar(lat + (len < 1 ? -Math.sqrt(1 - len * len) : 0)));
  };
  // Dłoń przy twarzy (nad oczami, przy brodzie): w 2D ręka leży w płaszczyźnie boku, w 3D dłoń musi dojść do środka twarzy.
  // Łokieć idzie w bok, przedramię do środka, dłoń płasko przed czołem albo pod brodą (dwa odcinki, prosta IK).
  function handToFace(s, l) {
    const S = wp(s + "Arm"), E0 = wp(s + "ForeArm"), H0 = wp(s + "Hand"), lu = E0.distanceTo(S), lf = H0.distanceTo(E0);
    const hb = wp("Head"), ht = wp("HeadTop_End"), hc = hb.clone().lerp(ht, 0.5), rx = ht.distanceTo(hb) * 0.4, ry = ht.distanceTo(hb) * 0.56;
    const rel = H0.clone().sub(hc), dF = rel.dot(F), dY = rel.dot(Y);
    if (dY < -0.32 || dY > 0.26 || dF < -0.06 || Math.hypot(dF, dY) > 0.3) return;
    const shade = dY > -0.04;
    // Nadgarstek: nad oczami przed czołem albo tuż pod brodą (proporcje ręki 3D są inne niż w szkicu, więc według głowy)
    const T = shade
      ? hc.clone().add(F.clone().multiplyScalar(Math.max(dF, rx + 0.06))).add(Y.clone().multiplyScalar(THREE.MathUtils.clamp(dY, rx * 0.45, rx * 0.9))).add(L.clone().multiplyScalar(l * 0.05))
      : hc.clone().add(F.clone().multiplyScalar(rx * 0.75)).add(Y.clone().multiplyScalar(-ry * 1.05)).add(L.clone().multiplyScalar(l * 0.02));
    const pole = shade ? L.clone().multiplyScalar(l).add(F.clone().multiplyScalar(0.45)).add(Y.clone().multiplyScalar(-0.1)) : Y.clone().multiplyScalar(-1).add(F.clone().multiplyScalar(0.35)).add(L.clone().multiplyScalar(l * 0.45));
    const d = Math.min(T.distanceTo(S), (lu + lf) * 0.995), u = T.clone().sub(S).normalize();
    const a = (lu * lu - lf * lf + d * d) / (2 * d), hgt = Math.sqrt(Math.max(0, lu * lu - a * a));
    const pp = pole.clone().sub(u.clone().multiplyScalar(pole.dot(u))).normalize();
    const E = S.clone().add(u.clone().multiplyScalar(a)).add(pp.multiplyScalar(hgt));
    aim(s + "Arm", s + "ForeArm", E.clone().sub(S));
    const E1 = wp(s + "ForeArm"), Tt = S.clone().add(u.clone().multiplyScalar(d));
    aim(s + "ForeArm", s + "Hand", Tt.clone().sub(E1));
    // Dłoń: nad oczami płasko w stronę środka twarzy, przy brodzie w górę
    const hd = shade ? Tt.clone().sub(E1).setY(0).normalize().add(F.clone().multiplyScalar(0.25)).add(Y.clone().multiplyScalar(-0.12)) : Y.clone().multiplyScalar(0.55).add(F.clone().multiplyScalar(0.8)).add(L.clone().multiplyScalar(-l * 0.3));
    aim(s + "Hand", s + "HandIndex1", hd);
  }
  function pose(A, seatH) {
    for (const n in bones) bones[n].quaternion.copy(rest[n]);
    model.position.set(0, 0, 0); model.updateMatrixWorld(true);
    aim("Hips", "Spine", dirA(A.spine));
    aim("Spine", "Spine1", dirA(A.spine)); aim("Spine1", "Spine2", dirA(A.spine)); aim("Spine2", "Neck", dirA(A.spine));
    aim("Neck", "Head", dirA(A.head)); aim("Head", "HeadTop_End", dirA(A.head));
    [["Right", "near", -1], ["Left", "far", 1]].forEach(([s, n, l]) => {
      aim(s + "UpLeg", s + "Leg", dirA(A[n + "Thigh"], 0.07 * l, A[n + "ThighLen"] ?? 1));
      aim(s + "Leg", s + "Foot", dirA(A[n + "Shin"], 0.035 * l));
      aim(s + "Foot", s + "ToeBase", dirA(A[n + "Foot"] ?? 70, 0.04 * l));
      aim(s + "Arm", s + "ForeArm", dirA(A[n + "Upper"], 0.18 * l));
      aim(s + "ForeArm", s + "Hand", dirA(A[n + "Fore"], 0.07 * l));
      aim(s + "Hand", s + "HandIndex1", dirA(A[n + "Fore"], 0.03 * l));
      handToFace(s, l);
    });
    model.updateMatrixWorld(true);
    if (seatH != null) model.position.y += seatH + 0.09 - wp("Hips").y;
    else model.position.y += 0.035 - Math.min(...LOW_BONES.filter(n => bones[n]).map(n => wp(n).y));
    model.updateMatrixWorld(true);
    const hip = wp("Hips");
    model.position.x -= hip.x; model.position.z -= hip.z - (seatH != null ? 0.1 : 0);
    model.updateMatrixWorld(true);
  }

  // ----- Dodatki przypięte do pozy: twarz, włosy, nakrycie głowy, kaptur, kołnierz z krawatem, spódnica, poły płaszcza, podeszwy -----
  function headFrame() {
    const head = wp("Head"), top = wp("HeadTop_End"), up = top.clone().sub(head).normalize(), h = top.distanceTo(head);
    const fwd = F.clone().sub(up.clone().multiplyScalar(F.dot(up))).normalize(), side = new THREE.Vector3().crossVectors(up, fwd);
    const g = new THREE.Group();
    g.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(side, up, fwd));
    g.position.copy(head).add(up.clone().multiplyScalar(h * 0.5));
    extras.add(g);
    return { g, h, rx: h * 0.4, ry: h * 0.56 };
  }
  function addExtras(c) {
    extras.clear();
    const lk = c.look || {}, { g, h, rx, ry } = headFrame();
    // Twarz: oczy, brwi i usta jak w 2D, na przodzie głowy
    const face = new THREE.Mesh(new THREE.PlaneGeometry(rx * 1.5, rx * 1.5), new THREE.MeshStandardMaterial({ map: faceTexture(lk), transparent: true, depthWrite: false, roughness: 0.8, polygonOffset: true, polygonOffsetFactor: -4 }));
    face.position.set(0, -ry * 0.05, rx * 0.98); g.add(face);
    // Broda: bryła na żuchwie
    if (lk.beard === "short" || lk.beard === "full") {
      const full = lk.beard === "full", bd = part(new THREE.SphereGeometry(1, 24, 16, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55), lk.beardColor, g, [0, -ry * 0.12, rx * 0.12], [0.25, 0, 0], 0.95);
      bd.scale.set(rx * 0.98, ry * (full ? 1.02 : 0.9), rx * (full ? 1.08 : 1));
    }
    // Włosy: czapka na czubku i tyle głowy; długie dodatkowo opadają na plecy
    const hc = lk.hairColor, hair = lk.hair, hat = c.hat;
    if (hair) {
      const curly = hair === "curly", buzz = hair === "buzz";
      // Czapka włosów na czubku i tyle głowy (głowa pod nią też ma kolor włosów, więc drewno nie prześwituje)
      const cap = part(curly ? new THREE.IcosahedronGeometry(1, 2) : new THREE.SphereGeometry(1, 32, 20, 0, Math.PI * 2, 0, Math.PI * (buzz ? 0.5 : 0.56)), curly ? mat(hc, 0.9, { flatShading: true }) : hc, g, [0, ry * (curly ? 0.12 : 0.08), -rx * 0.06], [-0.38, 0, 0], 0.85);
      cap.scale.set(rx * (curly ? 1.22 : buzz ? 1.04 : 1.1), ry * (curly ? 0.95 : buzz ? 1.02 : 1.06), rx * (curly ? 1.2 : buzz ? 1.05 : 1.12));
      const back = len => { const b = part(new THREE.CapsuleGeometry(rx * (hair === "wavy" ? 1.05 : 0.95), len, 6, 18), hc, g, [0, -len * 0.5 + ry * 0.1, -rx * 0.62], 0, 0.85); b.scale.z = hair === "wavy" ? 0.55 : 0.45; };
      if (hair === "long" || hair === "wavy") back(h * 1.1);
      if (hair === "medium") back(h * 0.5);
      if (hair === "ponytail") { const p = part(new THREE.CapsuleGeometry(rx * 0.28, h * 0.6, 6, 12), hc, g, [0, -ry * 0.2, -rx * 1.15], [0.35, 0, 0], 0.85); p.castShadow = true; }
      if (hair === "bun" && !hat) part(new THREE.SphereGeometry(rx * 0.45, 18, 14), hc, g, [0, ry * 0.75, -rx * 0.7], 0, 0.85);
    }
    // Nakrycie głowy
    if (hat) {
      if (hat.kind === "cap") {
        const d = part(new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5), hat.color, g, [0, ry * 0.18, -rx * 0.04], [-0.12, 0, 0], 0.8); d.scale.set(rx * 1.14, ry * 0.92, rx * 1.16);
        part(new THREE.CylinderGeometry(rx * 0.95, rx * 0.95, 0.008, 24, 1, false, -Math.PI / 2, Math.PI), hat.color, g, [0, ry * 0.22, rx * 0.95], [0.12, 0, 0], 0.8);
      } else if (hat.kind === "beanie") {
        const d = part(new THREE.SphereGeometry(1, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5), hat.color, g, [0, ry * 0.2, -rx * 0.04], [-0.2, 0, 0], 0.95); d.scale.set(rx * 1.16, ry * 1.25, rx * 1.18);
        part(new THREE.TorusGeometry(rx * 1.12, rx * 0.16, 10, 32), hat.color, g, [0, ry * 0.22, -rx * 0.04], [Math.PI / 2 - 0.2, 0, 0], 0.95);
      } else {
        part(cyl(rx * 0.92, rx * 1.05, ry * 0.75, 28), hat.color, g, [0, ry * 0.68, -rx * 0.04], [-0.12, 0, 0], 0.85);
        part(cyl(rx * 2.0, rx * 2.0, 0.012, 32), hat.color, g, [0, ry * 0.36, -rx * 0.0], [-0.12, 0, 0], 0.85);
        part(cyl(rx * 1.06, rx * 1.06, ry * 0.14, 28), 0x1d1d20, g, [0, ry * 0.42, -rx * 0.04], [-0.12, 0, 0], 0.6);
      }
    }
    // Tułów: góra kręgosłupa, kierunek „do góry” i „do przodu” klatki
    const neck = wp("Neck"), chest = wp("Spine2"), spineUp = neck.clone().sub(chest).normalize();
    const bodyF = F.clone().sub(spineUp.clone().multiplyScalar(F.dot(spineUp))).normalize();
    if (c.hood) {
      const hood = part(new THREE.TorusGeometry(0.085, 0.04, 12, 28, Math.PI * 1.3), c.outer ? c.outer.color : c.top, extras, [0, 0, 0], 0, 0.9);
      hood.position.copy(neck).add(bodyF.clone().multiplyScalar(-0.045)).add(spineUp.clone().multiplyScalar(-0.035));
      hood.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), spineUp); hood.rotateZ(-Math.PI * 0.15 - Math.PI / 2);
    }
    // Kołnierz koszuli (kolor kołnierzyka albo biała koszula pod marynarką) i krawat
    if (c.collar || c.tie) {
      const front = neck.clone().add(bodyF.clone().multiplyScalar(0.075)).add(spineUp.clone().multiplyScalar(-0.03));
      const collar = part(new THREE.ConeGeometry(0.06, 0.14, 3, 1, true), mat(c.collar || "#E9E6DF", 0.6, { side: THREE.DoubleSide }), extras);
      collar.position.copy(front).add(spineUp.clone().multiplyScalar(-0.05)); collar.quaternion.setFromUnitVectors(Y, spineUp.clone().negate());
      if (c.tie) {
        const tie = part(box(0.035, 0.32, 0.012), c.tie, extras, [0, 0, 0], 0, 0.5);
        tie.position.copy(front).add(spineUp.clone().multiplyScalar(-0.18)).add(bodyF.clone().multiplyScalar(0.012)); tie.quaternion.setFromUnitVectors(Y, spineUp);
      }
    }
    // Spódnica albo dół sukienki, poły płaszcza: stożek od talii w stronę kolan (przy siedzeniu do przodu)
    const hip = wp("Hips"), knee = wp("LeftLeg").add(wp("RightLeg")).multiplyScalar(0.5);
    const cone = (color, r0, r1, extra, startUp) => {
      const axis = knee.clone().sub(hip), len = axis.length() + extra, dir = axis.normalize();
      const m = part(new THREE.CylinderGeometry(r0, r1, len, 32, 1, true), mat(color, 0.8, { side: THREE.DoubleSide }), extras);
      m.quaternion.setFromUnitVectors(Y, dir.clone().negate());
      m.position.copy(hip).add(Y.clone().multiplyScalar(startUp)).add(dir.multiplyScalar(len / 2 - startUp));
      return m;
    };
    if (c.skirt) cone(c.skirt, 0.165, c.skirtLen ? 0.3 : 0.27, c.skirtLen ? 0.24 : 0.1, 0.06);
    if (c.outer && c.outer.coat) cone(c.outer.color, 0.19, 0.27, 0.12, 0.02);
    // Podeszwy butów
    ["Left", "Right"].forEach(s => {
      const a = wp(s + "Foot"), t = wp(s + "ToeBase"), e = bones[s + "Toe_End"] ? wp(s + "Toe_End") : t;
      const dirv = e.clone().sub(a), flat = dirv.clone().setY(0), len = flat.length() + 0.08;
      if (flat.lengthSq() < 1e-6) return;
      const sole = part(box(0.1, 0.025, len), c.shoes.kind === "sneakers" ? "#E9E6DF" : "#1a1a1c", extras, [0, 0, 0], 0, 0.6);
      sole.position.copy(a.clone().add(e).multiplyScalar(0.5)).setY(Math.max(0.012, Math.min(a.y, e.y) - 0.035));
      sole.lookAt(sole.position.clone().add(flat));
      // Stopa w powietrzu (siedzenie, krok): podeszwa idzie za stopą
      if (Math.min(a.y, e.y) > 0.12) { sole.position.copy(a.clone().add(e).multiplyScalar(0.5)).add(new THREE.Vector3(0, -0.035, 0)); sole.lookAt(sole.position.clone().add(dirv)); }
    });
  }

  // ----- Rzeczy w punktach zaczepienia (w słowach kadru, jak w 2D) -----
  const FRAME_ANCHORS = {
    left: { side: -1.05, depth: 0 }, right: { side: 1.05, depth: 0 }, front: { side: 0.2, depth: 1.0 }, behind: { side: 0.3, depth: -1.0 },
    leftFar: { side: -2.3, depth: -0.8 }, rightFar: { side: 2.3, depth: -0.8 }, background: { side: 0.8, depth: -2.8 }, foreground: { side: -0.7, depth: 1.9 }
  };
  function placeThings(d) {
    thingGroup.clear();
    const toCam = camera.position.clone().setY(0).normalize(), right = new THREE.Vector3().crossVectors(Y, toCam).normalize();
    d.things.forEach(it => {
      const def = THINGS3D[it.id]; if (!def) return;
      const g = new THREE.Group();
      if (it.anchor === "under") g.position.set(0, 0, -0.1);
      else if (it.anchor === "lean") g.position.set(0, 0, -0.45 - def.r * 0.5);
      else {
        const fa = FRAME_ANCHORS[it.anchor] || FRAME_ANCHORS.right, sp = Math.max(1, def.r / 0.7);
        g.position.copy(right.clone().multiplyScalar(fa.side * (fa.side ? sp : 1))).add(toCam.clone().multiplyScalar(fa.depth * (fa.depth > 0 ? Math.max(1, def.r / 0.6) : sp)));
        // Rzecz zwrócona przodem do kamery (siedzisko z boku: bokiem do postaci, jak w szkicu)
        g.rotation.y = Math.atan2(toCam.x, toCam.z) + (def.seat ? (fa.side < 0 ? 0.5 : -0.5) : 0);
      }
      def.build(g, it.color || null);
      if (def.top) it.items.forEach((id, j, all) => { const ig = new THREE.Group(); ig.position.set((j - (all.length - 1) / 2) * 0.26, def.top, 0.04); buildItem(ig, id); g.add(ig); });
      thingGroup.add(g);
    });
  }

  // ----- Kamera: strefa, zwrot i kadr ze sceny; skala jak w szkicu (stojąca postać zawsze tej samej wielkości) -----
  function setCamera(d, aspect) {
    const turn = d.turn, cam = d.camera, selfie = d.selfie;
    let az = /^L/.test(cam) ? -42 : /^R/.test(cam) ? 42 : 0, el = /1$/.test(cam) ? 26 : /3$/.test(cam) ? -12 : 5, far = 1;
    if (cam === "T") el = 42; if (cam === "B") el = -22;
    if (cam === "D") { el = 55; far = 1.9; }
    const sign = az < 0 ? -1 : 1;
    if (turn === "side") az = 90 * sign; else if (turn === "away") az = 138 * sign; else if (turn === "back") az = 180;
    const hb = wp("Head"), ht = wp("HeadTop_End"), hcen = hb.clone().lerp(ht, 0.5), top = ht.y + 0.05;
    let t, ext;
    if (selfie) { az = d.camera === "SR" ? -18 : 18; el = 12; t = hcen.clone().add(new THREE.Vector3(0, -0.06, 0)); ext = 0.75; camera.fov = 52; }
    else if (d.shot === "face") { t = hcen.clone().add(new THREE.Vector3(0, -0.01, 0)); ext = 0.56; camera.fov = 26; }
    else if (d.shot === "portrait") { ext = 1.0; t = new THREE.Vector3(hcen.x, top - ext * 0.42, hcen.z); camera.fov = 28; }
    else { ext = 2.5; t = new THREE.Vector3(0, 0.9, 0); camera.fov = 30; }
    const dist = ext / 2 / Math.tan(camera.fov * D / 2) * far;
    const hor = F.clone().multiplyScalar(Math.cos(az * D)).add(L.clone().multiplyScalar(Math.sin(az * D)));
    camera.position.copy(t).add(hor.multiplyScalar(Math.cos(el * D) * dist)).add(new THREE.Vector3(0, Math.sin(el * D) * dist, 0));
    if (camera.position.y < 0.12) camera.position.y = 0.12;
    camera.aspect = aspect; camera.updateProjectionMatrix();
    camera.lookAt(t);
    // Tło zawsze za postacią, jak w szkicu: plan zwrócony przodem do kamery
    setGroup.rotation.y = Math.atan2(camera.position.x, camera.position.z);
    return t;
  }

  // ----- Światło: strefa lampy w kadrze (lewo/prawo, góra/dół), przód albo kontra; pora dnia na zewnątrz -----
  function setLight(d, t, info) {
    camera.updateMatrixWorld();
    const R = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0), U = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1);
    const C = camera.position.clone().sub(t).setY(0).normalize();
    const lz = d.light, back = lz.back, outdoor = !info.indoor, time = d.time;
    const dir = R.clone().multiplyScalar((lz.x - 0.5) * 2.2).add(U.clone().multiplyScalar((0.55 - lz.y) * 2.4)).add(C.clone().multiplyScalar(back ? -1.1 : 0.9)).normalize();
    if (dir.y < 0.12 && !(lz.y > 0.8 && !lz.natural)) dir.y = 0.12;
    if (lz.natural && time === "golden") dir.y = Math.min(dir.y, 0.32);
    dir.normalize();
    key.position.copy(t).add(dir.clone().multiplyScalar(10)); key.target.position.copy(t);
    const night = time === "night" && (outdoor || lz.natural), golden = time === "golden" && (outdoor || lz.natural);
    key.color.set(lz.natural ? (golden ? 0xffb070 : night ? 0x9fb4ff : 0xfff1dc) : back ? 0xe6eeff : 0xfff0dc);
    key.intensity = night ? 1.5 : back ? 3.4 : 3.1;
    // Przy kontrze miękkie światło od kamery, żeby twarz nie zniknęła w cieniu; zawsze lekka kontra od tyłu
    fill.position.copy(t).add(C.clone().multiplyScalar(6)).add(new THREE.Vector3(0, 3, 0)); fill.target.position.copy(t);
    fill.intensity = back ? 0.9 : 0.35; fill.color.set(night ? 0x8090c0 : 0xffffff);
    rim.position.copy(t).add(C.clone().multiplyScalar(-6)).add(R.clone().multiplyScalar(-(lz.x - 0.5) * 6)).add(new THREE.Vector3(0, 3.5, 0)); rim.target.position.copy(t);
    rim.intensity = back ? 0.6 : 1.1; rim.color.set(golden ? 0xffc890 : night ? 0x7a8cff : 0xc8d8ff);
    if (info.indoor) { hemi.color.set(0xf0ece4); hemi.groundColor.set(0x403830); hemi.intensity = night ? 0.45 : 0.95; }
    else if (night) { hemi.color.set(0x34407a); hemi.groundColor.set(0x101018); hemi.intensity = 0.55; }
    else if (golden) { hemi.color.set(0xffd0a0); hemi.groundColor.set(0x50403a); hemi.intensity = 0.95; }
    else { hemi.color.set(0xcfe3ff); hemi.groundColor.set(0x6a6050); hemi.intensity = 1.15; }
    renderer.toneMappingExposure = night ? 1.3 : 1.2;
  }

  let lastBg = "";
  let info = {};
  function setBackground(d) {
    const k = [d.background, d.variant, d.time, d.fog].join("/");
    if (k === lastBg) return;
    lastBg = k; setGroup.clear(); seed = 3;
    info = (BGS3D[d.background] || BGS3D.studio)(setGroup, d.variant) || {};
    if (info.indoor) {
      scene.background = new THREE.Color(info.sky);
      scene.fog = new THREE.Fog(info.sky, 14, d.background === "studio" ? 60 : 40);
    } else {
      const cols = SKY[d.time] || SKY.day;
      setGroup.add(skyDome(cols));
      scene.background = new THREE.Color(cols[2]);
      scene.fog = new THREE.Fog(cols[2], d.fog ? 5 : 30, d.fog ? 40 : 170);
    }
  }

  return {
    // d: dane sceny z aplikacji; zwraca płótno WebGL z gotowym kadrem W×H
    render(d, W, H) {
      setBackground(d);
      model.scale.setScalar(baseScale * (d.body === "female" ? 0.95 : 1)); model.updateMatrixWorld(true);
      const seat = d.things.find(it => it.anchor === "under");
      pose(d.pose, seat && THINGS3D[seat.id] ? THINGS3D[seat.id].seat : null);
      dress(d.cloth); addExtras(d.cloth);
      renderer.setSize(W, H, false);
      const t = setCamera(d, W / H);
      placeThings(d);
      setLight(d, t, info);
      renderer.render(scene, camera);
      return renderer.domElement;
    },
    dispose() { renderer.dispose(); }
  };
}
