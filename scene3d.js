// Widok 3D sceny (Ekspert, Swoboda): ta sama scena co rysunek 2D, w wyglądzie szkicu (płaskie tony i kontury).
// Pozy nie są ustawiane ręcznie: kąty stawów z rysunku 2D (poseOf) przekładają się na kości modelu manekina.
// Kamera palcem, punkty zaczepienia do wstawiania rzeczy, przestawianie, obracanie i druga postać.
// Model: „Wooden Mannequin (Rigged)” – zionmuoria, CC BY 4.0. Most do aplikacji: obiekt api z index.html.
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

const D = Math.PI / 180, Y = new THREE.Vector3(0, 1, 0);
const reduce = matchMedia("(prefers-reduced-motion: reduce)");

// ---------- Wygląd szkicu ----------
const grad = new THREE.DataTexture(new Uint8Array([120, 120, 120, 255, 190, 190, 190, 255, 255, 255, 255, 255]), 3, 1);
grad.minFilter = grad.magFilter = THREE.NearestFilter; grad.needsUpdate = true;
const matCache = new Map();
const toon = (c, side) => { const k = c + "/" + (side || 0); if (!matCache.has(k)) matCache.set(k, new THREE.MeshToonMaterial({ color: c, gradientMap: grad, side: side || THREE.FrontSide })); return matCache.get(k); };
const INK = 0x1c1712;
const lineMat = new THREE.LineBasicMaterial({ color: INK });
function part(geo, color, parent, pos = [0, 0, 0], rot = [0, 0, 0], edges = true) {
  const m = new THREE.Mesh(geo, toon(color));
  m.position.set(...pos); m.rotation.set(...rot);
  if (edges) m.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 40), lineMat));
  parent.add(m);
  return m;
}
const box = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const cyl = (r1, r2, h, n = 12) => new THREE.CylinderGeometry(r1, r2, h, n);
const blobMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.2, depthWrite: false });
const blob = (r, parent) => { const m = new THREE.Mesh(new THREE.CircleGeometry(r, 24), blobMat); m.rotation.x = -Math.PI / 2; m.position.y = 0.006; parent.add(m); return m; };
const legs4 = (g, w, d, h, c, r = 0.025) => [[-w, -d], [w, -d], [-w, d], [w, d]].forEach(([x, z]) => part(cyl(r, r, h, 8), c, g, [x, h / 2, z]));

// ---------- Rzeczy (metry; przód w stronę +Z). seat: wysokość siedziska, top: wysokość blatu ----------
const WOOD = 0x9a6b43, FABRIC = 0x61748a, METAL = 0x9aa0a6;
const THINGS3D = {
  chair: { seat: 0.47, r: 0.35, build(g, c) { part(box(0.46, 0.05, 0.46), c || WOOD, g, [0, 0.45, 0]); part(box(0.46, 0.5, 0.05), c || WOOD, g, [0, 0.72, -0.21]); legs4(g, 0.2, 0.2, 0.45, c || WOOD); } },
  armchair: { seat: 0.45, r: 0.5, build(g, c) { const k = c || 0x8a6552; part(box(0.8, 0.4, 0.75), k, g, [0, 0.2, 0]); part(box(0.8, 0.5, 0.18), k, g, [0, 0.62, -0.3]); part(box(0.16, 0.26, 0.75), k, g, [-0.36, 0.52, 0]); part(box(0.16, 0.26, 0.75), k, g, [0.36, 0.52, 0]); } },
  sofa: { seat: 0.45, r: 0.95, build(g, c) { const k = c || FABRIC; part(box(1.8, 0.42, 0.85), k, g, [0, 0.21, 0]); part(box(1.8, 0.5, 0.2), k, g, [0, 0.62, -0.33]); part(box(0.2, 0.3, 0.85), k, g, [-0.8, 0.55, 0]); part(box(0.2, 0.3, 0.85), k, g, [0.8, 0.55, 0]); } },
  stool: { seat: 0.8, r: 0.3, build(g, c) { part(cyl(0.19, 0.19, 0.06, 16), c || 0x4a3a30, g, [0, 0.78, 0]); [0, 1, 2].forEach(i => { const a = i * 2.09; part(cyl(0.018, 0.022, 0.78, 6), METAL, g, [Math.sin(a) * 0.13, 0.39, Math.cos(a) * 0.13], [Math.cos(a) * -0.12, 0, Math.sin(a) * 0.12]); }); } },
  bench: { seat: 0.46, r: 0.9, build(g, c) { const k = c || WOOD; part(box(1.6, 0.06, 0.42), k, g, [0, 0.44, 0]); part(box(1.6, 0.35, 0.05), k, g, [0, 0.7, -0.19]); legs4(g, 0.7, 0.16, 0.44, 0x3c4148, 0.03); } },
  pouf: { seat: 0.4, r: 0.35, build(g, c) { part(cyl(0.28, 0.3, 0.4, 20), c || 0xb4876a, g, [0, 0.2, 0]); } },
  rock: { seat: 0.42, r: 0.45, build(g, c) { const m = part(new THREE.DodecahedronGeometry(0.42, 0), c || 0x8c8a86, g, [0, 0.22, 0]); m.scale.set(1.1, 0.55, 0.9); } },
  stump: { seat: 0.42, r: 0.35, build(g, c) { part(cyl(0.28, 0.33, 0.42, 14), c || 0x6a4b33, g, [0, 0.21, 0]); } },
  stairs: { seat: 0.36, r: 1.1, build(g, c) { const k = c || 0x9a9790; [0, 1, 2, 3].forEach(i => part(box(1.8, 0.18, 0.34), k, g, [0, 0.09 + i * 0.18, -i * 0.34], [0, 0, 0])); } },
  crate: { seat: 0.5, r: 0.4, build(g, c) { part(box(0.55, 0.5, 0.55), c || 0xb08352, g, [0, 0.25, 0]); } },
  table: { top: 0.78, r: 0.6, build(g, c) { part(box(1.1, 0.05, 0.7), c || WOOD, g, [0, 0.755, 0]); legs4(g, 0.48, 0.28, 0.73, c || WOOD, 0.03); } },
  bar: { top: 1.12, r: 0.9, build(g, c) { part(box(1.8, 1.08, 0.55), c || 0x5a3e2b, g, [0, 0.54, 0]); part(box(1.9, 0.05, 0.65), 0x3a2a20, g, [0, 1.1, 0]); } },
  desk: { top: 0.76, r: 0.7, build(g, c) { const k = c || 0x6b4a33; part(box(1.3, 0.05, 0.65), k, g, [0, 0.735, 0]); part(box(0.45, 0.7, 0.6), k, g, [0.4, 0.35, 0]); legs4(g, 0.6, 0.27, 0.71, k, 0.025); } },
  shelf: { r: 0.6, build(g, c) { const k = c || 0x6e4b30; part(box(1.0, 1.9, 0.35), k, g, [0, 0.95, 0]); [0.35, 0.8, 1.25, 1.7].forEach((y, i) => part(box(0.86, 0.26, 0.26), [0x8a3b3b, 0x3b5a8a, 0x5a8a3b, 0xb58a3b][i], g, [0, y, 0.06])); } },
  plant: { r: 0.4, build(g, c) { part(cyl(0.2, 0.15, 0.4, 14), c || 0xb5654a, g, [0, 0.2, 0]); part(new THREE.IcosahedronGeometry(0.42, 0), 0x4f8a57, g, [0, 0.85, 0]); part(new THREE.IcosahedronGeometry(0.28, 0), 0x5f9c66, g, [0.18, 1.2, 0.05]); } },
  umbrella: { r: 0.5, build(g, c) { part(cyl(0.025, 0.025, 2.2, 8), 0xe8e2d6, g, [0, 1.1, 0]); part(new THREE.ConeGeometry(1.1, 0.45, 12), c || 0xd8574a, g, [0, 2.2, 0]); } },
  bike: { r: 0.8, build(g, c) { const k = c || 0x2f6fa8; [-0.5, 0.5].forEach(z => part(new THREE.TorusGeometry(0.33, 0.03, 6, 20), 0x2a2622, g, [0, 0.35, z], [0, Math.PI / 2, 0])); part(cyl(0.025, 0.025, 1.0, 6), k, g, [0, 0.62, 0], [Math.PI / 2 - 0.15, 0, 0]); part(cyl(0.025, 0.025, 0.5, 6), k, g, [0, 0.5, -0.2], [0.5, 0, 0]); part(box(0.08, 0.05, 0.22), 0x2a2622, g, [0, 0.9, -0.15]); part(box(0.5, 0.03, 0.03), 0x2a2622, g, [0, 1.0, 0.42]); } },
  car: { r: 2.3, build(g, c) { const k = c || 0x9c3b3b; part(box(1.8, 0.6, 4.2), k, g, [0, 0.55, 0]); part(box(1.6, 0.5, 2.2), k, g, [0, 1.1, -0.2]); part(box(1.62, 0.36, 2.0), 0x2f3b48, g, [0, 1.12, -0.2]); [[-0.85, 1.3], [0.85, 1.3], [-0.85, -1.3], [0.85, -1.3]].forEach(([x, z]) => part(cyl(0.34, 0.34, 0.25, 16), 0x1e1e22, g, [x, 0.34, z], [0, 0, Math.PI / 2])); } }
};
// Drobiazgi na blacie: proste bryły według rodzaju (napisy i reszta jako mała kostka)
function buildItem(g, id) {
  const cols = { mug: 0xe8e2d6, cup: 0xf1ede6, glass: 0xbcd7e6, bottle: 0x3f7a4d, wine: 0x6e2233, book: 0x8a3b3b, laptop: 0x3c4148, phone: 0x1e1e22, vase: 0x6fa3b5, flowers: 0xd8574a, apple: 0xc0392b, banana: 0xf1cf45, plate: 0xf1ede6, candle: 0xf3e6c4, lamp: 0xf2d27a, cake: 0xf0d2c8 };
  if (id === "banana") { const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-0.1, 0.03, 0), new THREE.Vector3(0, -0.01, 0.06), new THREE.Vector3(0.1, 0.03, 0)); part(new THREE.TubeGeometry(curve, 12, 0.022, 8), cols.banana, g, [0, 0.01, 0]); return; }
  if (id === "book" || id === "laptop" || id === "phone" || id === "plate") { part(box(id === "phone" ? 0.08 : 0.24, 0.03, id === "phone" ? 0.15 : 0.17), cols[id], g, [0, 0.015, 0], [0, 0.3, 0]); return; }
  if (id === "apple") { part(new THREE.SphereGeometry(0.045, 10, 8), cols.apple, g, [0, 0.045, 0]); return; }
  const h = { bottle: 0.3, wine: 0.3, vase: 0.24, flowers: 0.32, candle: 0.16, lamp: 0.4 }[id] || 0.1;
  part(cyl(0.045, 0.045, h, 14), cols[id] || 0xc9a24a, g, [0, h / 2, 0]);
}

// ---------- Tła: proste bryły; pora dnia zmienia niebo i światło ----------
const SKY = { day: 0x9fcbe6, golden: 0xe8a878, night: 0x2a3050 };
function ground(g, c, size = 90) { const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), toon(c)); m.rotation.x = -Math.PI / 2; g.add(m); return m; }
let seed = 3;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
function pines(g, n, rMin, rMax, avoid) {
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2, d = rMin + rnd() * (rMax - rMin), x = Math.cos(a) * d, z = Math.sin(a) * d - 3;
    if (avoid && avoid(x, z)) continue;
    const h = 4 + rnd() * 4, t = new THREE.Group(); t.position.set(x, 0, z); g.add(t);
    part(cyl(0.12, 0.18, h * 0.5, 7), 0x5a4030, t, [0, h * 0.25, 0]);
    part(new THREE.ConeGeometry(h * 0.18, h * 0.75, 7), 0x2f5a44, t, [0, h * 0.62, 0]);
  }
}
const BGS3D = {
  studio(g, v) {
    const c = { grey: [0x8d8d93, 0xb3b3b9], white: [0xd6d4cf, 0xe8e6e1], black: [0x2a2a2e, 0x3a3a40], color: [0x3e5a5e, 0x557a80] }[v] || [0x8d8d93, 0xb3b3b9];
    ground(g, c[0]);
    const wall = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 9, 40, 1, true, -1.2, 2.4), toon(c[1], THREE.BackSide));
    wall.position.set(0, 4.5, 1.5); wall.rotation.y = Math.PI; g.add(wall);
    return { sky: c[1], indoor: true };
  },
  street(g) {
    ground(g, 0x55585e);
    [-1, 1].forEach(s => { const w = new THREE.Mesh(new THREE.PlaneGeometry(3, 90), toon(0x8a8a86)); w.rotation.x = -Math.PI / 2; w.position.set(s * 5.5, 0.01, 0); g.add(w); });
    for (let i = 0; i < 16; i++) { const s = i % 2 ? -1 : 1, h = 6 + rnd() * 12, z = -24 + Math.floor(i / 2) * 6; part(box(4.5, h, 5), [0x8a6f5a, 0x6f7a86, 0x9a8a72, 0x5f6a74][i % 4], g, [s * 9.5, h / 2, z]); }
  },
  rooftop(g) {
    ground(g, 0x6f6f72, 12);
    [[0, -6, 12, 0.9, 0.3], [-6, 0, 0.3, 0.9, 12], [6, 0, 0.3, 0.9, 12]].forEach(([x, z, w, h, d]) => part(box(w, h, d), 0x8a8a8e, g, [x, h / 2, z]));
    for (let i = 0; i < 22; i++) { const h = 8 + rnd() * 30, x = -40 + rnd() * 80, z = -20 - rnd() * 40; part(box(4 + rnd() * 5, h, 4 + rnd() * 5), [0x6f7a86, 0x5f6a74, 0x7a8590][i % 3], g, [x, h / 2 - 20, z], [0, 0, 0], false); }
    ground(g, 0x3c4148, 300).position.y = -20;
  },
  mountains(g) {
    ground(g, 0x6f8a5a);
    [[-18, -40, 16, 22], [8, -45, 20, 26], [30, -38, 14, 18], [-40, -30, 12, 16]].forEach(([x, z, r, h]) => { part(new THREE.ConeGeometry(r, h, 7), 0x7a7f8a, g, [x, h / 2, z]); part(new THREE.ConeGeometry(r * 0.3, h * 0.3, 7), 0xf0f2f4, g, [x, h * 0.86, z]); });
  },
  forest(g) { ground(g, 0x46523f); const p = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 40), toon(0x7b6a58)); p.rotation.x = -Math.PI / 2; p.rotation.z = 0.2; p.position.set(-0.3, 0.004, -12); g.add(p); pines(g, 70, 5, 21, (x, z) => Math.abs(x + 0.3 + z * 0.2) < 2); },
  beach(g) {
    ground(g, 0xd9c396);
    const sea = new THREE.Mesh(new THREE.PlaneGeometry(200, 80), toon(0x4f86b0)); sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0.02, -46); g.add(sea);
    const foam = new THREE.Mesh(new THREE.PlaneGeometry(200, 0.5), toon(0xeef4f6)); foam.rotation.x = -Math.PI / 2; foam.position.set(0, 0.025, -6.1); g.add(foam);
  },
  meadow(g) { ground(g, 0x7fa05a); [[-14, -30, 9], [10, -34, 12], [30, -28, 8]].forEach(([x, z, r]) => { const h = part(new THREE.SphereGeometry(r, 16, 8), 0x6f9450, g, [x, -r * 0.55, z], [0, 0, 0], false); h.scale.y = 0.6; }); pines(g, 6, 10, 18); },
  lake(g) { ground(g, 0x6f9450); const w = new THREE.Mesh(new THREE.CircleGeometry(16, 40), toon(0x5f8fb0)); w.rotation.x = -Math.PI / 2; w.position.set(0, 0.02, -22); g.add(w); pines(g, 40, 22, 34); },
  river(g) { ground(g, 0x6f9450); const w = new THREE.Mesh(new THREE.PlaneGeometry(200, 5), toon(0x5f8fb0)); w.rotation.x = -Math.PI / 2; w.rotation.z = 0.12; w.position.set(0, 0.02, -9); g.add(w); pines(g, 30, 16, 30); },
  room(g) {
    ground(g, 0x9a7654, 12);
    part(box(12, 3, 0.2), 0xd8d0c2, g, [0, 1.5, -4]); part(box(0.2, 3, 12), 0xcfc6b6, g, [-5, 1.5, 0]);
    part(box(1.6, 1.3, 0.05), 0xbcd7e6, g, [1.5, 1.6, -3.88]);
    return { indoor: true, sky: 0x3a3632 };
  },
  cafe(g) {
    ground(g, 0x6b4a33, 14);
    part(box(14, 3.2, 0.2), 0x8a5a3c, g, [0, 1.6, -4.5]); part(box(0.2, 3.2, 14), 0x7a5038, g, [-5.5, 1.6, 0]);
    part(box(3, 1.05, 0.6), 0x5a3e2b, g, [2.5, 0.52, -3.6]);
    [-1.5, 0, 1.5].forEach(x => { part(cyl(0.01, 0.01, 1, 4), INK, g, [x, 2.7, -2]); part(new THREE.ConeGeometry(0.22, 0.2, 12), 0xf2d27a, g, [x, 2.15, -2]); });
    return { indoor: true, sky: 0x2e2420 };
  }
};

// ---------- Manekin: kości z modelu, pozy z kątów 2D ----------
const qa = new THREE.Quaternion(), qb = new THREE.Quaternion(), qc = new THREE.Quaternion();
function rotW(bone, axis, rad) {
  bone.updateWorldMatrix(true, false);
  bone.getWorldQuaternion(qa); bone.parent.getWorldQuaternion(qb);
  qc.setFromAxisAngle(axis, rad);
  bone.quaternion.copy(qb.invert().multiply(qc.multiply(qa)));
  bone.updateWorldMatrix(false, true);
}
const wp = (p, n) => p.bones[n].getWorldPosition(new THREE.Vector3());
function aim(p, name, child, dir) {
  if (!p.bones[name] || !p.bones[child]) return;
  const a = wp(p, name), cur = wp(p, child).sub(a).normalize(), want = dir.clone().normalize();
  const axis = new THREE.Vector3().crossVectors(cur, want);
  if (axis.lengthSq() < 1e-10) return;
  rotW(p.bones[name], axis.normalize(), Math.acos(THREE.MathUtils.clamp(cur.dot(want), -1, 1)));
}
const LOW_BONES = ["LeftToe_End", "RightToe_End", "LeftToeBase", "RightToeBase", "LeftFoot", "RightFoot", "LeftHand", "RightHand", "Hips", "Head", "HeadTop_End", "Spine2", "LeftLeg", "RightLeg", "LeftForeArm", "RightForeArm"];

export function mount(host, api) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const canvasBox = document.createElement("div"); canvasBox.className = "v3-canvas";
  canvasBox.appendChild(renderer.domElement);
  host.appendChild(canvasBox);
  const bar = document.createElement("div"); bar.className = "v3-bar"; host.appendChild(bar);
  const camTag = document.createElement("div"); camTag.className = "v3-tag"; host.appendChild(camTag);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 0.8, 0.05, 400);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.enablePan = false;
  controls.minDistance = 0.7; controls.maxDistance = 12; controls.maxPolarAngle = 89 * D;
  const hemi = new THREE.HemisphereLight(0xffffff, 0x8a8a8a, 1.2); scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 1.6); sun.position.set(3, 6, 4); scene.add(sun);
  const setGroup = new THREE.Group(); scene.add(setGroup);
  const thingGroup = new THREE.Group(); scene.add(thingGroup);
  const anchorGroup = new THREE.Group(); scene.add(anchorGroup);

  let base = null, baseScale = 1, baseYaw = 0, dirty = true, alive = true;
  const people = [];   // [0] postać główna, [1] druga postać (Ekspert)
  let sel = null, pending = null, moving = null, lastBg = "", lastCamKey = "";
  const thingObjs = [];

  // ----- Postacie -----
  function outlineMat(width) {
    const m = new THREE.MeshBasicMaterial({ color: INK, side: THREE.BackSide });
    m.onBeforeCompile = sh => { sh.vertexShader = sh.vertexShader.replace("#include <skinning_vertex>", `#include <skinning_vertex>\n transformed += normalize(objectNormal) * ${width.toFixed(5)};`); };
    return m;
  }
  function makePerson(k) {
    const model = SkeletonUtils.clone(base), holder = new THREE.Group(), bones = {}, rest = {};
    model.rotation.y = baseYaw; holder.add(model); scene.add(holder);
    model.traverse(o => {
      if (o.isLight || o.isCamera) o.visible = false;
      if (o.isBone) { const n = o.name.replace(/^mixamorig:?/, "").replace(/_\d+$/, ""); bones[n] = o; rest[n] = o.quaternion.clone(); }
    });
    const meshes = []; model.traverse(o => { if (o.isSkinnedMesh) meshes.push(o); });
    const p = { k, holder, model, bones, rest, meshes, lines: [] };
    meshes.forEach(o => { o.material = toon(k ? 0xc9956a : 0xdcb68a); o.frustumCulled = false; });
    const proxy = new THREE.Mesh(cyl(0.34, 0.34, 1.8, 10), new THREE.MeshBasicMaterial({ visible: false }));
    proxy.position.y = 0.9; proxy.userData.pick = { kind: "person", k }; holder.add(proxy); p.proxy = proxy;
    blob(0.38, holder);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.47, 40), new THREE.MeshBasicMaterial({ color: 0x7db896, transparent: true, opacity: 0.9, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.012; ring.visible = false; holder.add(ring); p.ring = ring;
    return p;
  }
  function setScale(p, s) {
    if (p.scale === s) return;
    p.scale = s; p.model.scale.setScalar(baseScale * s); p.model.updateMatrixWorld(true);
    p.lines.forEach(l => l.parent.remove(l)); p.lines = [];
    p.meshes.forEach(o => {
      const ws = o.getWorldScale(new THREE.Vector3()).x;
      const line = new THREE.SkinnedMesh(o.geometry, outlineMat(0.011 / ws));
      line.bind(o.skeleton, o.bindMatrix); line.frustumCulled = false; o.parent.add(line); p.lines.push(line);
    });
  }
  // Kąty 2D (0 = w dół, 90 = do przodu, 180 = w górę) na kierunki w płaszczyźnie postaci; bliższa strona to prawa
  function pose(p, A, seatH) {
    for (const n in p.bones) p.bones[n].quaternion.copy(p.rest[n]);
    p.model.position.set(0, 0, 0);
    p.holder.updateMatrixWorld(true);
    const F = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y, p.holder.rotation.y), L = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y, p.holder.rotation.y);
    const dirA = (a, lat = 0, len = 1) => {
      const v = F.clone().multiplyScalar(Math.sin(a * D) * len).add(Y.clone().multiplyScalar(-Math.cos(a * D) * len));
      return v.add(L.clone().multiplyScalar(lat + (len < 1 ? -Math.sqrt(1 - len * len) : 0)));
    };
    aim(p, "Hips", "Spine", dirA(A.spine));
    aim(p, "Spine", "Spine1", dirA(A.spine)); aim(p, "Spine1", "Spine2", dirA(A.spine)); aim(p, "Spine2", "Neck", dirA(A.spine));
    aim(p, "Neck", "Head", dirA(A.head)); aim(p, "Head", "HeadTop_End", dirA(A.head));
    [["Right", "near", -1], ["Left", "far", 1]].forEach(([s, n, l]) => {
      aim(p, s + "UpLeg", s + "Leg", dirA(A[n + "Thigh"], 0.07 * l, A[n + "ThighLen"] ?? 1));
      aim(p, s + "Leg", s + "Foot", dirA(A[n + "Shin"], 0.035 * l));
      aim(p, s + "Foot", s + "ToeBase", dirA(A[n + "Foot"] ?? 70, 0.04 * l));
      aim(p, s + "Arm", s + "ForeArm", dirA(A[n + "Upper"], 0.18 * l));
      aim(p, s + "ForeArm", s + "Hand", dirA(A[n + "Fore"], 0.07 * l));
      aim(p, s + "Hand", s + "HandIndex1", dirA(A[n + "Fore"], 0.03 * l));
    });
    p.holder.updateMatrixWorld(true);
    // Siedzisko: biodra nad nim; inaczej najniższy punkt ciała na ziemi
    if (seatH != null) p.model.position.y += seatH + 0.09 - wp(p, "Hips").y;
    else p.model.position.y += 0.035 - Math.min(...LOW_BONES.filter(n => p.bones[n]).map(n => wp(p, n).y));
    p.holder.updateMatrixWorld(true);
    // Biodra nad punktem postaci (przy siedzeniu lekko do przodu, nad siedziskiem)
    const hip = wp(p, "Hips"), off = new THREE.Vector3(p.holder.position.x - hip.x, 0, p.holder.position.z - hip.z);
    if (seatH != null) off.add(F.clone().multiplyScalar(0.1));
    p.model.position.add(off.applyAxisAngle(Y, -p.holder.rotation.y));
    p.holder.updateMatrixWorld(true);
  }
  const axes = p => ({ F: new THREE.Vector3(0, 0, 1).applyAxisAngle(Y, p.holder.rotation.y), L: new THREE.Vector3(1, 0, 0).applyAxisAngle(Y, p.holder.rotation.y) });

  // ----- Kamera ↔ strefa kamery, zwrot i kadr w scenie -----
  const main = () => people[0];
  function relCam() {
    const p = main(), { F, L } = axes(p), t = controls.target;
    const v = camera.position.clone().sub(p.holder.position);
    const az = Math.atan2(v.dot(L), v.dot(F)) / D;
    const el = Math.atan2(camera.position.y - t.y, Math.hypot(camera.position.x - t.x, camera.position.z - t.z)) / D;
    return { az, el, dist: camera.position.distanceTo(t) };
  }
  function headY() { const p = main(); return p && p.bones.Head ? wp(p, "Head").y + 0.08 : 1.62; }
  function targetFor(shot) {
    const p = main().holder.position, hy = headY();
    return new THREE.Vector3(p.x, shot === "face" ? hy : shot === "portrait" ? hy - 0.22 : Math.min(0.95, hy * 0.55), p.z);
  }
  function camFromScene(st, animate) {
    const cam = st.camera, turn = api.turnOf(st);
    let az = /^L/.test(cam) ? 42 : /^R/.test(cam) ? -42 : 0, el = /1$/.test(cam) ? 28 : /3$/.test(cam) ? -12 : 5, dist = { full: 3.9, portrait: 1.7, face: 0.95 }[st.shot] || 3.9;
    if (cam === "T") el = 45; if (cam === "B") el = -22;
    if (cam === "D") { el = 55; dist = 9; }
    const sign = az < 0 ? -1 : 1;
    if (turn === "side") az = 90 * sign; else if (turn === "away") az = 138 * sign; else if (turn === "back") az = 180;
    if (api.isSelfie(cam)) { az = 0; el = 0; dist = 0.75; }
    const p = main(), { F, L } = axes(p), t = targetFor(api.isSelfie(cam) ? "face" : st.shot);
    const hor = F.clone().multiplyScalar(Math.cos(az * D)).add(L.clone().multiplyScalar(Math.sin(az * D)));
    const pos = t.clone().add(hor.multiplyScalar(Math.cos(el * D) * dist)).add(new THREE.Vector3(0, Math.sin(el * D) * dist, 0));
    flyTo(pos, t, animate);
  }
  let fly = null;
  function flyTo(pos, target, animate) {
    if (!animate || reduce.matches) { camera.position.copy(pos); controls.target.copy(target); controls.update(); dirty = true; return; }
    fly = { p0: camera.position.clone(), t0: controls.target.clone(), p1: pos, t1: target, s: performance.now(), dur: 600 };
  }
  // Po obrocie palcem: strefa kamery, zwrot i kadr w scenie wynikają z kąta i odległości
  function sceneFromCam() {
    const st = api.scene(), { az, el, dist } = relCam(), a = Math.abs(az), side = az >= 0 ? "L" : "R";
    const patch = {};
    if (!api.isSelfie(st.camera)) {
      const row = el > 20 ? "1" : el < -7 ? "3" : "2";
      let cam = side + row;
      if (a < 20 && row !== "2") cam = row === "1" ? "T" : "B";
      if (st.camera === "D" && el > 40 && dist > 6) cam = "D";
      patch.camera = cam;
      patch.turn = a < 70 ? "camera" : a < 115 ? "side" : a < 155 ? "away" : "back";
      patch.shot = dist > 2.7 ? "full" : dist > 1.3 ? "portrait" : "face";
    }
    patch.cam3d = { x: +camera.position.x.toFixed(3), y: +camera.position.y.toFixed(3), z: +camera.position.z.toFixed(3), tx: +controls.target.x.toFixed(3), ty: +controls.target.y.toFixed(3), tz: +controls.target.z.toFixed(3) };
    lastCamKey = camKey({ ...st, ...patch });
    relayout(patch);
  }
  const camKey = st => [st.camera, api.turnOf(st), st.shot, st.subject].join("|");

  // ----- Rzeczy: położenie z pos3d albo z punktu zaczepienia w obecnym kadrze -----
  const FRAME_ANCHORS = {
    left: { side: -1.05, depth: 0 }, right: { side: 1.05, depth: 0 }, front: { side: 0.2, depth: 1.0 }, behind: { side: 0.3, depth: -1.0 },
    leftFar: { side: -2.3, depth: -0.8 }, rightFar: { side: 2.3, depth: -0.8 }, background: { side: 0.8, depth: -2.8 }, foreground: { side: -0.7, depth: 1.9 }
  };
  // Osi kadru w miejscu postaci: prawo kadru i kierunek do kamery (poziomo)
  function frameAxes() {
    const p = main().holder.position, toCam = camera.position.clone().sub(p).setY(0).normalize();
    return { p, toCam, right: new THREE.Vector3().crossVectors(Y, toCam).normalize() };
  }
  function anchorPos(a) {
    const { p, toCam, right } = frameAxes(), fa = FRAME_ANCHORS[a] || FRAME_ANCHORS.right;
    return p.clone().add(right.clone().multiplyScalar(fa.side)).add(toCam.clone().multiplyScalar(fa.depth)).setY(0);
  }
  // Najbliższy punkt zaczepienia (w słowach kadru) dla miejsca w scenie
  function anchorOf(pos, t) {
    const st = api.scene();
    let best = null, bd = 1e9;
    for (const a in FRAME_ANCHORS) {
      if (!api.anchorOK(st, a, t)) continue;
      const d = anchorPos(a).distanceTo(pos.clone().setY(0));
      if (d < bd) { bd = d; best = a; }
    }
    return best || "right";
  }
  function seatInfo(st) {
    const res = api.resolveAnchors(st), i = res.indexOf("under");
    return i >= 0 ? { i, t: THINGS3D[st.things[i].id] } : null;
  }
  function placeThings(st) {
    thingGroup.clear(); thingObjs.length = 0;
    const res = api.resolveAnchors(st), p = main(), { F } = axes(p);
    let changed = false;
    (st.things || []).forEach((it, i) => {
      const def = THINGS3D[it.id]; if (!def) return;
      const g = new THREE.Group(), a = res[i];
      if (a === "under") { g.position.copy(p.holder.position).add(F.clone().multiplyScalar(-0.1)); g.rotation.y = p.holder.rotation.y; }
      else if (a === "lean") { g.position.copy(p.holder.position).add(F.clone().multiplyScalar(-0.45 - def.r * 0.5)); g.rotation.y = p.holder.rotation.y; }
      else {
        if (!it.pos3d) { const q = anchorPos(a); it.pos3d = { x: +q.x.toFixed(3), z: +q.z.toFixed(3), yaw: +(p.holder.rotation.y + (a === "front" ? Math.PI : 0)).toFixed(3) }; changed = true; }
        g.position.set(it.pos3d.x, 0, it.pos3d.z); g.rotation.y = it.pos3d.yaw || 0;
      }
      def.build(g, it.color ? api.colorHex(it.color) : null); blob(def.r, g);
      if (def.top) api.itemsOn(st, i).forEach((item, j, all) => { const ig = new THREE.Group(); ig.position.set((j - (all.length - 1) / 2) * 0.26, def.top, 0.04); buildItem(ig, item.id); g.add(ig); });
      g.traverse(o => { if (o.isMesh) o.userData.pick = { kind: "thing", i }; });
      thingGroup.add(g); thingObjs[i] = g;
    });
    return changed;
  }

  // ----- Budowanie całej sceny z danych aplikacji -----
  function rebuild() {
    const st = api.scene();
    // Tło i pora dnia
    const bgKey = st.background + "/" + api.bgVariant(st) + "/" + st.time;
    if (bgKey !== lastBg) {
      lastBg = bgKey; setGroup.clear(); seed = 3;
      const fn = BGS3D[st.background] || BGS3D.studio, info = fn(setGroup, api.bgVariant(st)) || {};
      const sky = info.indoor ? (info.sky || 0x3a3632) : SKY[st.time] || SKY.day;
      scene.background = new THREE.Color(st.background === "studio" ? info.sky : sky);
      scene.fog = new THREE.Fog(scene.background.getHex(), 16, info.indoor ? 40 : 70);
      const night = !info.indoor && st.time === "night";
      hemi.intensity = night ? 0.75 : 1.2; sun.intensity = night ? 0.9 : 1.6;
      sun.color.set(st.time === "golden" && !info.indoor ? 0xffd2a0 : night ? 0xaec4ff : 0xffffff);
    }
    // Postać główna
    const P = main(), pos = st.pos3d || { x: 0, z: 0, yaw: 0 };
    P.holder.position.set(pos.x, 0, pos.z); P.holder.rotation.y = pos.yaw || 0;
    setScale(P, st.body === "female" ? 0.95 : 1);
    P.holder.visible = st.subject === "person";
    const seat = seatInfo(st);
    pose(P, api.poseAngles(st), seat ? seat.t.seat : null);
    // Druga postać (Ekspert)
    const cast = api.level() === "expert" ? (st.cast || []) : [];
    while (people.length > 1 + cast.length) { const q = people.pop(); scene.remove(q.holder); }
    cast.forEach((c, k) => {
      if (!people[k + 1]) people[k + 1] = makePerson(k + 1);
      const q = people[k + 1]; q.holder.position.set(c.pos3d.x, 0, c.pos3d.z); q.holder.rotation.y = c.pos3d.yaw || 0;
      setScale(q, c.body === "female" ? 0.95 : 1);
      pose(q, api.poseAngles({ ...st, pose: c.pose, arms: c.arms || "down", things: [], camera: "L2", look: { ...st.look, expr: "neutral", gaze: "auto" } }), null);
    });
    if (placeThings(st)) api.commit();
    // Kamera: przy zmianie strefy, zwrotu albo kadru z kafelków
    const key = camKey(st);
    if (key !== lastCamKey) { lastCamKey = key; camFromScene(st, true); }
    people.forEach(q => { q.ring.visible = !!sel && sel.kind === "person" && sel.k === q.k; });
    refreshAnchors();
    describe();
    toolbar();
    dirty = true;
  }

  // Zapis do sceny: nowe punkty zaczepienia rzeczy (z kadru), opis drugiej postaci; potem przerysowanie aplikacji
  function relayout(patch = {}) {
    const st = api.scene();
    (st.things || []).forEach(it => { if (it.pos3d) { const t = api.thing(it.id); it.anchor = anchorOf(new THREE.Vector3(it.pos3d.x, 0, it.pos3d.z), t); } });
    Object.assign(st, patch);
    describe();
    api.commit();
  }
  // Opis w słowach kadru: po której stronie jest każda postać i dokąd patrzy druga postać
  function describe() {
    const st = api.scene();
    if (!(st.cast || []).length || api.level() !== "expert") { delete st.mainSide; return; }
    const sx = v => v.clone().setY(1.2).project(camera).x;
    const side = x => x < -0.2 ? "on the left side of the frame" : x > 0.2 ? "on the right side of the frame" : "in the centre of the frame";
    st.mainSide = side(sx(main().holder.position));
    st.cast.forEach((c, k) => {
      const q = people[k + 1]; if (!q) return;
      c.side = side(sx(q.holder.position));
      const { F } = axes(q), toMain = main().holder.position.clone().sub(q.holder.position).setY(0).normalize();
      const toCam = camera.position.clone().sub(q.holder.position).setY(0).normalize();
      if (F.dot(toMain) > 0.85) c.facing = "facing " + (st.body === "female" ? "the woman" : "the man");
      else if (F.dot(toCam) > 0.85) c.facing = "facing the camera";
      else if (F.dot(toCam) < -0.5) c.facing = "turned away from the camera";
      else c.facing = `facing the ${sx(q.holder.position.clone().add(F.clone().multiplyScalar(0.6))) < sx(q.holder.position) ? "left" : "right"} side of the frame`;
    });
  }

  // ----- Punkty zaczepienia (zielone: wstaw) i punkty przestawiania (niebieskie) -----
  const ringGeo = new THREE.RingGeometry(0.16, 0.24, 32), dotGeo = new THREE.CircleGeometry(0.16, 32);
  function mark(pos, data, color = 0x7db896) {
    const g = new THREE.Group(); g.position.copy(pos);
    [[ringGeo, 0.95], [dotGeo, 0.28]].forEach(([geo, op]) => {
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op, depthWrite: false, side: THREE.DoubleSide }));
      m.rotation.x = -Math.PI / 2; m.userData.pick = data; g.add(m);
    });
    anchorGroup.add(g);
  }
  const occupiedAt = (p, except = []) => [...thingObjs.filter(Boolean).filter(g => !except.includes(g)).map(g => g.position), ...people.filter(q => !except.includes(q.holder)).map(q => q.holder.position)]
    .some(q => q.distanceTo(new THREE.Vector3(p.x, 0, p.z)) < 0.55);
  function refreshAnchors() {
    anchorGroup.clear();
    if (moving) return moveMarks();
    const st = api.scene();
    if (st.subject !== "person" || !sel || sel.kind !== "person" || sel.k !== 0) {
      addTopMarks(st); return;
    }
    const res = api.resolveAnchors(st), used = new Set(res);
    for (const a in FRAME_ANCHORS) {
      if (used.has(a)) continue;
      const p = anchorPos(a).setY(0.02);
      if (!occupiedAt(p)) mark(p, { kind: "anchor", a });
    }
    // Pod postacią: siedzisko, gdy postać siedzi i nic pod nią nie ma
    if (!api.standing(st) && !api.lying(st) && !res.includes("under")) mark(main().holder.position.clone().add(axes(main()).F.multiplyScalar(-0.1)).setY(0.02), { kind: "anchor", a: "under" });
    addTopMarks(st);
  }
  function addTopMarks(st) {
    (st.things || []).forEach((it, i) => {
      const def = THINGS3D[it.id], g = thingObjs[i];
      if (!def || !def.top || !g || api.itemsOn(st, i).length >= 3) return;
      mark(g.localToWorld(new THREE.Vector3(0.3, def.top + 0.01, 0.1)), { kind: "top", i });
    });
  }
  function moveMarks() {
    const self = moving.kind === "person" ? people[moving.k].holder : thingObjs[moving.i];
    const c = controls.target;
    for (let x = -4; x <= 4; x++) for (let z = -4; z <= 4; z++) {
      const p = new THREE.Vector3(Math.round(c.x / 0.8) * 0.8 + x * 0.8, 0.02, Math.round(c.z / 0.8) * 0.8 + z * 0.8);
      if (Math.hypot(p.x - c.x, p.z - c.z) > 3.3 || occupiedAt(p, [self]) || self.position.distanceTo(new THREE.Vector3(p.x, 0, p.z)) < 0.3) continue;
      mark(p, { kind: "move", pos: p.clone().setY(0) }, 0xa9d4ff);
    }
  }

  // ----- Pasek akcji w kadrze 3D -----
  const btn = (label, fn, cls = "") => { const b = document.createElement("button"); b.type = "button"; b.className = "chip" + (cls ? " " + cls : ""); b.textContent = label; b.addEventListener("click", e => { e.stopPropagation(); api.sfx("tik"); fn(); }); return b; };
  function toolbar() {
    bar.replaceChildren();
    const st = api.scene();
    if (moving) { bar.append(btn("Anuluj", () => { moving = null; rebuild(); }, "ghost")); return; }
    if (pending) {
      if (pending.kind === "top") api.itemChoices().forEach(o => bar.append(btn(o.name, () => { api.addItem(pending.i, o.id); pending = null; api.say("Leży na blacie."); })));
      else {
        if (pending.a !== "under" && api.level() === "expert" && !(st.cast || []).length) bar.append(btn("Postać", () => addCast(pending.a)));
        api.thingChoices(pending.a).forEach(o => bar.append(btn(o.name, () => {
          const q = pending.a === "under" ? null : anchorPos(pending.a);
          api.addThing(o.id, pending.a, q && { x: +q.x.toFixed(3), z: +q.z.toFixed(3), yaw: +(main().holder.rotation.y + (pending.a === "front" ? Math.PI : 0)).toFixed(3) });
          pending = null; api.say(`${o.name}: stoi w scenie. Stuknij rzecz, żeby ją obrócić albo przestawić.`);
        })));
      }
      bar.append(btn("Anuluj", () => { pending = null; rebuild(); }, "ghost"));
      return;
    }
    if (!sel) return;
    if (sel.kind === "person") {
      const k = sel.k;
      bar.append(btn("↺", () => turnPerson(k, 30)), btn("↻", () => turnPerson(k, -30)), btn("Przestaw", () => startMove({ kind: "person", k })));
      if (k > 0) {
        const c = st.cast[k - 1];
        bar.append(btn(c.body === "female" ? "Kobieta" : "Mężczyzna", () => { c.body = c.body === "female" ? "male" : "female"; relayout(); }));
        api.castPoses().forEach(o => bar.append(btn(o.name, () => { c.pose = o.id; relayout(); }, c.pose === o.id ? "on" : "")));
        bar.append(btn("Usuń", () => { st.cast.splice(k - 1, 1); sel = null; relayout(); }, "danger"));
      }
    } else if (sel.kind === "thing") {
      const it = st.things[sel.i], res = api.resolveAnchors(st)[sel.i], free = res !== "under" && res !== "lean";
      if (free) bar.append(btn("↺", () => turnThing(sel.i, 30)), btn("↻", () => turnThing(sel.i, -30)), btn("Przestaw", () => startMove({ kind: "thing", i: sel.i })));
      bar.append(btn("Usuń", () => { api.removeThing(sel.i); sel = null; }, "danger"));
    }
  }
  function addCast(a) {
    const st = api.scene(), q = anchorPos(a === "under" ? "right" : a), d = main().holder.position.clone().sub(q);
    st.cast = [{ body: st.body === "female" ? "male" : "female", pose: "stand", arms: "down", pos3d: { x: +q.x.toFixed(3), z: +q.z.toFixed(3), yaw: +Math.atan2(d.x, d.z).toFixed(3) } }];
    pending = null; sel = { kind: "person", k: 1 };
    api.say("Druga postać patrzy na pierwszą. Stuknij ją, żeby zmienić pozę.");
    relayout();
  }
  function turnPerson(k, deg) {
    const st = api.scene();
    if (k === 0) { st.pos3d = { ...(st.pos3d || { x: 0, z: 0, yaw: 0 }) }; st.pos3d.yaw = +((st.pos3d.yaw || 0) + deg * D).toFixed(3); }
    else st.cast[k - 1].pos3d.yaw = +(st.cast[k - 1].pos3d.yaw + deg * D).toFixed(3);
    main().holder.rotation.y = (st.pos3d || {}).yaw || 0;
    if (k === 0) { sceneFromCamKeep(); return; }
    relayout();
  }
  // Obrót postaci głównej zmienia kąt kamery względem niej: strefa i zwrot liczone od nowa, kamera stoi w miejscu
  function sceneFromCamKeep() { main().holder.rotation.y = api.scene().pos3d.yaw; sceneFromCam(); }
  function turnThing(i, deg) { const it = api.scene().things[i]; it.pos3d = { ...it.pos3d, yaw: +((it.pos3d.yaw || 0) + deg * D).toFixed(3) }; relayout(); }
  function startMove(m) { moving = m; api.say("Stuknij niebieski punkt, gdzie ma stanąć."); refreshAnchors(); toolbar(); dirty = true; }
  const tweens = [];
  function slide(obj, to, done) { tweens.push({ obj, from: obj.position.clone(), to, s: performance.now(), dur: reduce.matches ? 1 : 420, done }); }
  function ripple(p) {
    const m = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.36, 40), new THREE.MeshBasicMaterial({ color: 0xa9d4ff, transparent: true, opacity: 0.9, depthWrite: false, side: THREE.DoubleSide }));
    m.rotation.x = -Math.PI / 2; m.position.set(p.x, 0.02, p.z); scene.add(m);
    tweens.push({ ripple: m, s: performance.now(), dur: 650 });
  }
  function moveTo(p) {
    const st = api.scene(), m = moving;
    moving = null; anchorGroup.clear(); ripple(p);
    if (m.kind === "person") {
      const q = people[m.k];
      slide(q.holder, new THREE.Vector3(p.x, 0, p.z), () => {
        if (m.k === 0) { st.pos3d = { x: +p.x.toFixed(3), z: +p.z.toFixed(3), yaw: (st.pos3d || {}).yaw || 0 }; recenter(); }
        else st.cast[m.k - 1].pos3d = { ...st.cast[m.k - 1].pos3d, x: +p.x.toFixed(3), z: +p.z.toFixed(3) };
        relayout();
      });
    } else {
      const it = st.things[m.i];
      slide(thingObjs[m.i], new THREE.Vector3(p.x, 0, p.z), () => { it.pos3d = { ...(it.pos3d || {}), x: +p.x.toFixed(3), z: +p.z.toFixed(3), yaw: it.pos3d ? it.pos3d.yaw : 0 }; relayout(); });
    }
    api.say("Przestawione.");
    toolbar();
  }
  function recenter() { const t = targetFor(api.scene().shot); controls.target.lerp(t, 1); controls.update(); }

  // ----- Stuknięcia -----
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(), plane = new THREE.Plane(Y, 0);
  let down = null;
  renderer.domElement.addEventListener("pointerdown", e => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; });
  renderer.domElement.addEventListener("pointerup", e => {
    if (!down || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 8 || performance.now() - down.t > 500) return;
    const r = renderer.domElement.getBoundingClientRect();
    ptr.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    if (moving) {
      const mh = ray.intersectObject(anchorGroup, true).find(h => h.object.userData.pick && h.object.userData.pick.kind === "move");
      const p = mh ? mh.object.userData.pick.pos : ray.ray.intersectPlane(plane, new THREE.Vector3());
      if (!p || p.distanceTo(controls.target.clone().setY(0)) > 5) { api.say("Za daleko. Stuknij niebieski punkt bliżej środka sceny."); return; }
      moveTo(p); return;
    }
    const hit = ray.intersectObjects([anchorGroup, ...people.map(q => q.proxy), thingGroup], true).find(h => h.object.userData.pick);
    const pick = hit && hit.object.userData.pick;
    pending = null;
    if (!pick) sel = null;
    else if (pick.kind === "anchor") { pending = pick; api.say(pick.a === "under" ? "Na czym ma siedzieć?" : `Co wstawić: ${api.anchorName(pick.a).toLowerCase()}?`); }
    else if (pick.kind === "top") { pending = pick; api.say("Co położyć na blacie?"); }
    else if (pick.kind === "person") { sel = { kind: "person", k: pick.k }; api.say(pick.k ? "Druga postać: poza, obrót albo przestawienie." : "Stuknij zielone kółko, żeby coś wstawić obok. Postać możesz obrócić i przestawić."); }
    else if (pick.kind === "thing") { sel = { kind: "thing", i: pick.i }; api.say(`${api.thing(api.scene().things[pick.i].id).name}: obróć, przestaw albo usuń.`); }
    api.sfx("tok");
    people.forEach(q => { q.ring.visible = !!sel && sel.kind === "person" && sel.k === q.k; });
    refreshAnchors(); toolbar(); dirty = true;
  });
  // Po puszczeniu palca kamera jeszcze chwilę wyhamowuje: zapis do sceny, gdy stanie
  let lastMove = 0, syncAfterStop = false;
  controls.addEventListener("change", () => { dirty = true; lastMove = performance.now(); });
  controls.addEventListener("end", () => { if (!fly) syncAfterStop = true; });

  // ----- Rozmiar w formacie kadru i pętla -----
  function size() {
    const st = api.scene(), f = api.format(), W = host.clientWidth, H = host.clientHeight;
    let w = W, h = W * f.h / f.w; if (h > H) { h = H; w = H * f.w / f.h; }
    canvasBox.style.width = w + "px"; canvasBox.style.height = h + "px";
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); dirty = true;
  }
  const ro = new ResizeObserver(size); ro.observe(host);
  function loop(now) {
    if (!alive) return;
    if (fly) {
      const t = Math.min(1, (now - fly.s) / fly.dur), e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      camera.position.lerpVectors(fly.p0, fly.p1, e); controls.target.lerpVectors(fly.t0, fly.t1, e); dirty = true;
      if (t >= 1) { fly = null; describe(); refreshAnchors(); }
    }
    for (let k = tweens.length - 1; k >= 0; k--) {
      const tw = tweens[k], t = Math.min(1, (now - tw.s) / tw.dur), e = 1 - Math.pow(1 - t, 3);
      if (tw.ripple) { const s = 1 + 1.6 * t; tw.ripple.scale.set(s, s, s); tw.ripple.material.opacity = 0.9 * (1 - t); if (t >= 1) scene.remove(tw.ripple); }
      else tw.obj.position.lerpVectors(tw.from, tw.to, e);
      dirty = true;
      if (t >= 1) { tweens.splice(k, 1); if (tw.done) tw.done(); }
    }
    controls.update();
    if (syncAfterStop && now - lastMove > 220) { syncAfterStop = false; sceneFromCam(); refreshAnchors(); }
    if (!reduce.matches && anchorGroup.children.length) { anchorGroup.children.forEach((g, k) => { const s = 1 + 0.12 * Math.sin(now / 260 + k); g.scale.set(s, 1, s); }); dirty = true; }
    if (dirty) {
      renderer.render(scene, camera); dirty = false;
      const { az, el } = relCam();
      camTag.textContent = api.camLabel(api.scene());
    }
    requestAnimationFrame(loop);
  }

  // ----- Start: model manekina z plików aplikacji -----
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(new URL("assets/manikun3d.glb", document.baseURI).href, gltf => {
      base = gltf.scene; base.updateMatrixWorld(true);
      const bx = new THREE.Box3().setFromObject(base);
      baseScale = 1.8 / (bx.max.y - bx.min.y);
      const tmp = SkeletonUtils.clone(base); tmp.scale.setScalar(baseScale); tmp.updateMatrixWorld(true);
      const b = {}; tmp.traverse(o => { if (o.isBone) b[o.name.replace(/^mixamorig:?/, "").replace(/_\d+$/, "")] = o; });
      const fwd = b.LeftToeBase.getWorldPosition(new THREE.Vector3()).sub(b.LeftFoot.getWorldPosition(new THREE.Vector3())).setY(0).normalize();
      baseYaw = -Math.atan2(fwd.x, fwd.z);
      people.push(makePerson(0));
      const st = api.scene();
      size();
      rebuild();
      // Zapamiętane ujęcie z poprzedniego razu (gdy strefa się zgadza), inaczej ujęcie ze strefy
      if (st.cam3d && camKey(st) === lastCamKey) flyTo(new THREE.Vector3(st.cam3d.x, st.cam3d.y, st.cam3d.z), new THREE.Vector3(st.cam3d.tx, st.cam3d.ty, st.cam3d.tz), false);
      else camFromScene(st, false);
      describe();
      requestAnimationFrame(loop);
      resolve({
        update: () => { rebuild(); },
        resize: size,
        show(on) { if (on) { size(); dirty = true; } },
        // Do testów: kółka na ekranie (x, y w pikselach strony) i ich znaczenie
        marks: () => { const r = renderer.domElement.getBoundingClientRect(); return anchorGroup.children.map(g => { const v = g.position.clone().project(camera); return { pick: g.children[0].userData.pick, x: r.left + (v.x + 1) / 2 * r.width, y: r.top + (1 - v.y) / 2 * r.height }; }); },
        snapshot: () => { renderer.render(scene, camera); return renderer.domElement.toDataURL("image/png"); },
        destroy() { alive = false; ro.disconnect(); renderer.dispose(); host.replaceChildren(); }
      });
    }, undefined, reject);
  });
}
