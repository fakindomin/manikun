// Głowa Manikuna w 3D na przycisku narratora.
// Model: „Wooden Mannequin (Rigged)” – zionmuoria, CC BY 4.0 (podpis w menu).
// Gdy WebGL albo model nie są dostępne, przycisk zostaje z rysowaną głową.
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const btn = document.getElementById("narrator");
const canvas = document.getElementById("head3d");
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const D = Math.PI / 180;

function start() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 3));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(24, 1, 0.01, 100);
  // Światło: miękkie wypełnienie, ciepłe główne z przodu, chłodna kontra z tyłu rysująca kontur
  scene.add(new THREE.HemisphereLight(0xf2efe6, 0x2a2419, 0.9));
  const key = new THREE.DirectionalLight(0xfff0d8, 2.2);
  key.position.set(1.4, 1.6, 2.4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 1.6);
  rim.position.set(-1.8, 1.2, -1.6);
  scene.add(rim);

  const wood = new THREE.MeshStandardMaterial({ color: 0xe2bf93, roughness: 0.5, metalness: 0 });
  const bones = {}, rest = {};
  let head = null, neck = null;

  function size() {
    const w = canvas.clientWidth || 44, h = canvas.clientHeight || 44;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  new GLTFLoader().load(new URL("assets/manikun3d.glb", document.baseURI).href, gltf => {
    const root = gltf.scene;
    root.traverse(o => {
      if (o.isMesh) { o.material = wood; o.frustumCulled = false; }
      if (o.isLight || o.isCamera) o.visible = false;
      if (o.isBone) {
        const name = o.name.replace(/^mixamorig:?/, "").replace(/_\d+$/, "");
        bones[name] = o;
        rest[name] = o.quaternion.clone();
      }
    });
    scene.add(root);
    root.updateMatrixWorld(true);
    head = bones.Head;
    neck = bones.Neck;
    if (!head || !neck || !bones.HeadTop_End) return;
    // Kadr: od przegubu szyi do czubka głowy, lekko z boku i z góry
    const top = new THREE.Vector3(), low = new THREE.Vector3();
    bones.HeadTop_End.getWorldPosition(top);
    neck.getWorldPosition(low);
    const h = top.y - low.y, target = new THREE.Vector3(low.x, low.y + h * 0.5, low.z);
    const dist = (h * 1.28) / 2 / Math.tan(camera.fov * D / 2);
    camera.position.copy(target).add(new THREE.Vector3(0.42, 0.1, 1).normalize().multiplyScalar(dist));
    camera.lookAt(target);
    camera.near = dist / 20;
    camera.far = dist * 20;
    size();
    apply();
    renderer.render(scene, camera);
    btn.classList.add("is3d");
    window.manikunHead = { nod, tilt, look };
    if (!reduce.matches) idle();
  }, undefined, () => {});

  // Odchylenie głowy od pozycji spoczynkowej: x w dół/w górę, y obrót, z przechył (stopnie)
  const cur = { x: 0, y: 0, z: 0 };
  let queue = [], seg = null, frame = null;
  const q = new THREE.Quaternion(), e = new THREE.Euler();
  function apply() {
    e.set(cur.x * D, cur.y * D, cur.z * D, "XYZ");
    head.quaternion.copy(rest.Head).multiply(q.setFromEuler(e));
    e.set(cur.x * 0.35 * D, cur.y * 0.3 * D, 0, "XYZ");
    neck.quaternion.copy(rest.Neck).multiply(q.setFromEuler(e));
  }
  const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  function tick(now) {
    frame = null;
    if (!seg) {
      const next = queue.shift();
      if (!next) return;
      seg = { from: { ...cur }, to: next.to, dur: next.dur, t0: now };
    }
    const k = Math.min(1, (now - seg.t0) / seg.dur), w = ease(k);
    for (const a of ["x", "y", "z"]) cur[a] = seg.from[a] + (seg.to[a] - seg.from[a]) * w;
    apply();
    renderer.render(scene, camera);
    if (k >= 1) seg = null;
    frame = requestAnimationFrame(tick);
  }
  function play(keys) {
    if (!head) return;
    if (reduce.matches) { Object.assign(cur, keys[keys.length - 1].to); apply(); renderer.render(scene, camera); return; }
    queue = keys.map(([x, y, z, dur]) => ({ to: { x, y, z }, dur }));
    seg = null;
    if (!frame) frame = requestAnimationFrame(tick);
    lastMove = performance.now();
  }
  // Kiwnięcie z uznaniem, przechył z zaciekawieniem, rozejrzenie się
  function nod() { play([[14, 0, 0, 150], [-6, 0, 0, 170], [10, 0, 0, 150], [0, 0, 0, 220]]); }
  function tilt(dir = Math.random() < 0.5 ? 1 : -1) { play([[-3, 10 * dir, 16 * dir, 260], [-3, 10 * dir, 16 * dir, 520], [0, 0, 0, 380]]); }
  function look(yaw = (Math.random() < 0.5 ? -1 : 1) * 24) { play([[-4, yaw, yaw * 0.15, 420], [-4, yaw, yaw * 0.15, 700], [0, 0, 0, 480]]); }

  // Gdy nic się nie dzieje, co kilka sekund lekko się rozgląda
  let lastMove = performance.now();
  function idle() {
    setTimeout(() => {
      if (!document.hidden && performance.now() - lastMove > 5000 && !document.body.classList.contains("sheet-open")) look();
      idle();
    }, 6500 + Math.random() * 3000);
  }
  addEventListener("resize", () => { if (head) { size(); renderer.render(scene, camera); } });
}

try { start(); } catch (err) { /* bez WebGL zostaje rysowana głowa */ }
