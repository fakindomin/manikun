// Manikun: wspólny manekin dla ekranu startowego i reżysera.
// Geometria z kątów stawów, proporcje ciała i materiały (drewno, biały).

const NS = "http://www.w3.org/2000/svg";

const rad = d => d * Math.PI / 180;
const dir = a => [Math.sin(rad(a)), Math.cos(rad(a))];
const add = (p, v, s = 1) => [p[0] + v[0] * s, p[1] + v[1] * s];
const f = n => (+n).toFixed(2);

function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}

function capsule(A, B, rA, rB) {
  const dx = B[0] - A[0], dy = B[1] - A[1], len = Math.hypot(dx, dy) || 1;
  const n = [-dy / len, dx / len];
  const p1 = add(A, n, rA), p2 = add(B, n, rB), p3 = add(B, n, -rB), p4 = add(A, n, -rA);
  return `M${f(p1[0])},${f(p1[1])} L${f(p2[0])},${f(p2[1])} A${rB},${rB} 0 0 0 ${f(p3[0])},${f(p3[1])} L${f(p4[0])},${f(p4[1])} A${rA},${rA} 0 0 0 ${f(p1[0])},${f(p1[1])} Z`;
}
const poly = pts => "M" + pts.map(p => f(p[0]) + "," + f(p[1])).join(" L") + " Z";

// Proporcje ciała. Strona bliższa widzowi jest szersza: widok 3/4.
const BODIES = {
  male: {
    pelvisDown: 6, pelvisUp: 14, waistTop: 20, chest: 45, neck: 9, headRx: 11, headRy: 15,
    upperArm: 36, forearm: 32, thigh: 46, shin: 44, foot: 16,
    shoulderNear: 17, shoulderFar: 12, hipNear: 9, hipFar: 7,
    chestTop: [19, 14], chestBottom: [11, 9], pelvisTop: [11, 9], pelvisBottom: [13, 10]
  },
  female: {
    pelvisDown: 6, pelvisUp: 14, waistTop: 19, chest: 41, neck: 9, headRx: 10, headRy: 14,
    upperArm: 33, forearm: 30, thigh: 44, shin: 42, foot: 14,
    shoulderNear: 14, shoulderFar: 10, hipNear: 10, hipFar: 8,
    chestTop: [16, 12], chestBottom: [9, 7], pelvisTop: [11, 9], pelvisBottom: [15, 12]
  }
};

// Liczy kształty manekina z kątów stawów (pose) i proporcji (RIG).
// Kąty bezwzględne: 0 = w dół, 90 = w prawo, 180 = w górę.
function computeFigure(pose, RIG) {
  const P = [0, 0], u = dir(pose.spine), r = [-u[1], u[0]];
  const shapes = [], pts = [];
  const push = (s, ...ps) => { shapes.push(s); pts.push(...ps); };
  const cap = (A, B, rA, rB) => ({ t: "cap", A, B, rA, rB, d: capsule(A, B, rA, rB) });
  const quad = q => ({ t: "poly", q, d: poly(q) });
  const Ct = add(P, u, RIG.waistTop + RIG.chest), Cb = add(P, u, RIG.waistTop);
  const shoulder = side => add(add(Ct, u, -6), r, side === "near" ? -RIG.shoulderNear : RIG.shoulderFar);
  const hip = side => add(P, r, side === "near" ? -RIG.hipNear : RIG.hipFar);

  function arm(side) {
    const S = shoulder(side);
    const E = add(S, dir(pose[side + "Upper"]), RIG.upperArm);
    const W = add(E, dir(pose[side + "Fore"]), RIG.forearm);
    const Hc = add(W, dir(pose[side + "Fore"]), 7);
    push(cap(S, E, 5, 4), [S, 6], [E, 5]);
    push(cap(E, W, 4, 3), [W, 4]);
    push({ t: "ellipse", cx: Hc[0], cy: Hc[1], rx: 4.5, ry: 8, rot: -pose[side + "Fore"] }, [Hc, 9]);
    push({ t: "circle", cx: E[0], cy: E[1], r: 3.5 });
    push({ t: "circle", cx: S[0], cy: S[1], r: 5.5 });
  }
  function leg(side) {
    const H = hip(side);
    // ThighLen < 1: udo skierowane do kamery wygląda na krótsze (skrót perspektywiczny)
    const K = add(H, dir(pose[side + "Thigh"]), RIG.thigh * (pose[side + "ThighLen"] ?? 1));
    const A = add(K, dir(pose[side + "Shin"]), RIG.shin);
    const T = add(A, dir(pose[side + "Foot"]), RIG.foot);
    push(cap(H, K, 7, 5), [H, 8], [K, 6]);
    push(cap(K, A, 5, 3.5), [A, 5]);
    push(cap(A, T, 4.5, 2.5), [T, 4]);
    push({ t: "circle", cx: A[0], cy: A[1], r: 3 });
    push({ t: "circle", cx: K[0], cy: K[1], r: 4.5 });
  }

  leg("far");
  arm("far");
  const pb = add(P, u, -RIG.pelvisDown), pt = add(P, u, RIG.pelvisUp);
  push(cap(pt, Cb, 7, 8));
  const [pbn, pbf] = RIG.pelvisBottom, [ptn, ptf] = RIG.pelvisTop, [ctn, ctf] = RIG.chestTop, [cbn, cbf] = RIG.chestBottom;
  // Rogi brył w kolejności: górny bliższy, górny dalszy, dolny dalszy, dolny bliższy
  push(quad([add(pt, r, -ptn), add(pt, r, ptf), add(pb, r, pbf), add(pb, r, -pbn)]), [add(pb, r, -pbn), 1], [add(pb, r, pbf), 1]);
  push(quad([add(Ct, r, -ctn), add(Ct, r, ctf), add(Cb, r, cbf), add(Cb, r, -cbn)]), [add(Ct, r, -ctn), 1], [add(Ct, r, ctf), 1]);
  const hd = dir(pose.head);
  const N1 = add(Ct, hd, RIG.neck);
  const Hc = add(N1, hd, RIG.headRy - 1);
  push(cap(Ct, N1, 3.5, 3.5));
  push({ t: "ellipse", cx: Hc[0], cy: Hc[1], rx: RIG.headRx, ry: RIG.headRy, rot: 180 - pose.head, head: true }, [Hc, RIG.headRy + 1]);
  leg("near");
  arm("near");

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  pts.forEach(([p, rr]) => {
    minX = Math.min(minX, p[0] - rr); maxX = Math.max(maxX, p[0] + rr);
    minY = Math.min(minY, p[1] - rr); maxY = Math.max(maxY, p[1] + rr);
  });
  return { shapes, head: Hc, box: { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY } };
}

// Materiały: light/mid/dark to cieniowanie w poprzek członu, line to kontur, grain to słoje.
const MATERIALS = [
  { id: "wood", name: "Drewno", light: "#F3D3A0", mid: "#DCA764", dark: "#9C6530", line: "#4E2E12", grain: "#7A4518" },
  { id: "white", name: "Biały", light: "#FFFFFF", mid: "#F5F4F1", dark: "#D3D0CA", line: "#3A3A3A" }
];

let gradSeq = 0;

// Rysuje kształty manekina do grupy g. Bez materiału rysuje zwykłe kształty (styl z CSS).
function paintFigure(g, shapes, m) {
  const shape = (tag, attrs, fill) => el(tag, m ? { ...attrs, style: `fill:${fill};stroke:${m.line}` } : attrs, g);
  if (!m) {
    shapes.forEach(s => {
      if (s.t === "cap" || s.t === "poly") shape("path", { d: s.d });
      else if (s.t === "circle") shape("circle", { cx: f(s.cx), cy: f(s.cy), r: s.r });
      else shape("ellipse", { cx: f(s.cx), cy: f(s.cy), rx: s.rx, ry: s.ry, transform: `rotate(${f(s.rot)} ${f(s.cx)} ${f(s.cy)})` });
    });
    return;
  }

  const defs = el("defs", {}, g);
  const pre = "mk" + (++gradSeq) + "-";
  const stops = (grad, list) => list.forEach(([o, c]) => el("stop", { offset: o, "stop-color": c }, grad));
  const ball = el("radialGradient", { id: pre + "ball", cx: "0.38", cy: "0.32", r: "0.72" }, defs);
  stops(ball, [[0, m.light], [0.55, m.mid], [1, m.dark]]);
  const grainLine = (d, w = 0.8, op = 0.6) => m.grain && el("path", { d, style: `fill:none;stroke:${m.grain};stroke-width:${w};opacity:${op}` }, g);
  let n = 0;

  shapes.forEach((s, idx) => {
    if (s.t === "cap") {
      // Cieniowanie w poprzek: walec zamiast płaskiego paska
      const id = pre + "c" + (++n);
      const dx = s.B[0] - s.A[0], dy = s.B[1] - s.A[1], len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len, r = Math.max(s.rA, s.rB);
      const mx = (s.A[0] + s.B[0]) / 2, my = (s.A[1] + s.B[1]) / 2;
      const lg = el("linearGradient", { id, gradientUnits: "userSpaceOnUse",
        x1: f(mx + nx * r), y1: f(my + ny * r), x2: f(mx - nx * r), y2: f(my - ny * r) }, defs);
      stops(lg, [[0, m.dark], [0.35, m.light], [0.6, m.mid], [1, m.dark]]);
      shape("path", { d: s.d }, `url(#${id})`);
      if (m.grain && len > 6) {
        // Słoje: kilka falistych linii wzdłuż członu, każda trochę inna
        [-0.55, -0.18, 0.2, 0.55].forEach((k, i) => {
          const at = (t, kk) => {
            const rr = s.rA + (s.rB - s.rA) * t;
            return [s.A[0] + dx * t + nx * rr * kk, s.A[1] + dy * t + ny * rr * kk];
          };
          const wob = ((idx + i) % 2 ? 1 : -1) * 0.18;
          const a = at(0.1, k), b = at(0.4, k + wob), c = at(0.65, k - wob), d = at(0.9, k);
          grainLine(`M${f(a[0])},${f(a[1])} C${f(b[0])},${f(b[1])} ${f(c[0])},${f(c[1])} ${f(d[0])},${f(d[1])}`, i % 2 ? 0.6 : 0.9, i % 2 ? 0.45 : 0.65);
        });
      }
    } else if (s.t === "poly") {
      // Bryła tułowia: cieniowanie wzdłuż szerokości, słoje z góry na dół
      const [tn, tf, bf, bn] = s.q;
      const id = pre + "b" + (++n);
      const lg = el("linearGradient", { id, gradientUnits: "userSpaceOnUse", x1: f(tn[0]), y1: f(tn[1]), x2: f(tf[0]), y2: f(tf[1]) }, defs);
      stops(lg, [[0, m.mid], [0.3, m.light], [1, m.dark]]);
      shape("path", { d: s.d }, `url(#${id})`);
      if (m.grain) {
        const lerp2 = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
        [0.18, 0.4, 0.62, 0.84].forEach((t, i) => {
          const top = lerp2(tn, tf, t), bot = lerp2(bn, bf, t + (i % 2 ? 0.04 : -0.04));
          const mid = lerp2(lerp2(tn, tf, t + (i % 2 ? -0.07 : 0.07)), lerp2(bn, bf, t), 0.5);
          const a = lerp2(top, bot, 0.08), b = lerp2(top, bot, 0.92);
          grainLine(`M${f(a[0])},${f(a[1])} Q${f(mid[0])},${f(mid[1])} ${f(b[0])},${f(b[1])}`, i % 2 ? 0.6 : 0.9, i % 2 ? 0.45 : 0.6);
        });
      }
    } else if (s.t === "circle") {
      shape("circle", { cx: f(s.cx), cy: f(s.cy), r: s.r }, `url(#${pre}ball)`);
      // Stawy z drewna: widoczny przekrój słojów
      if (m.grain && s.r > 3.2) {
        el("circle", { cx: f(s.cx), cy: f(s.cy), r: f(s.r * 0.45), style: `fill:none;stroke:${m.grain};stroke-width:0.6;opacity:0.55` }, g);
      }
    } else {
      const tr = `rotate(${f(s.rot)} ${f(s.cx)} ${f(s.cy)})`;
      shape("ellipse", { cx: f(s.cx), cy: f(s.cy), rx: s.rx, ry: s.ry, transform: tr }, `url(#${pre}ball)`);
      if (m.grain) {
        // Słoje na głowie i dłoniach: łuki wzdłuż dłuższej osi
        const gg = el("g", { transform: tr }, g);
        const lines = s.head ? [-0.5, -0.1, 0.35] : [0];
        lines.forEach((k, i) => {
          const x = s.cx + s.rx * k, y1 = s.cy - s.ry * 0.78, y2 = s.cy + s.ry * 0.78;
          el("path", { d: `M${f(x)},${f(y1)} Q${f(x + s.rx * (i % 2 ? -0.25 : 0.25))},${f(s.cy)} ${f(x)},${f(y2)}`,
            style: `fill:none;stroke:${m.grain};stroke-width:${s.head ? 0.8 : 0.6};opacity:0.55` }, gg);
        });
      }
    }
  });
}

// Próbka materiału do przycisku przełącznika
function swatchCss(m) {
  if (m.grain) {
    return `repeating-linear-gradient(100deg, transparent 0 3px, ${m.grain}55 3px 4px, transparent 4px 7px), radial-gradient(circle at 38% 32%, ${m.light}, ${m.mid} 55%, ${m.dark})`;
  }
  return `radial-gradient(circle at 38% 32%, ${m.light}, ${m.mid} 55%, ${m.dark})`;
}

// ---------- Ruch: płynne przejścia z opóźnieniem części ciała ----------
// Głowa rusza pierwsza, potem tułów i nogi, na końcu ręce: ruch się "przelewa", nie jest sztywny.
const easeInOut = t => 0.5 - Math.cos(Math.PI * t) / 2;
const STAGGER = {
  head: 0, spine: 0.04,
  nearThigh: 0.06, farThigh: 0.06, nearShin: 0.1, farShin: 0.1, nearFoot: 0.12, farFoot: 0.12,
  nearUpper: 0.1, farUpper: 0.1, nearFore: 0.2, farFore: 0.2
};
const STAGGER_MAX = 0.2;
// Długości członów (klucze *Len) są opcjonalne; brak oznacza pełną długość 1
function blendPose(a, b, t) {
  const o = {};
  for (const k in { ...a, ...b }) {
    const d = STAGGER[k] || 0;
    const lt = Math.min(1, Math.max(0, (t - d) / (1 - STAGGER_MAX)));
    const av = a[k] ?? 1, bv = b[k] ?? 1;
    o[k] = av + (bv - av) * easeInOut(lt);
  }
  return o;
}
function blendRig(a, b, t) {
  const e = easeInOut(t), o = {};
  for (const k in b) o[k] = Array.isArray(b[k]) ? b[k].map((v, i) => a[k][i] + (v - a[k][i]) * e) : a[k] + (b[k] - a[k]) * e;
  return o;
}
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// ---------- Maskotka: Manikun na ekranie startowym ----------
const MASCOT_BASE = {
  spine: 180, head: 180,
  nearUpper: -7, nearFore: -2, farUpper: 7, farFore: 3,
  nearThigh: -3, nearShin: 1, farThigh: 3, farShin: 0,
  nearFoot: 62, farFoot: 62
};
const HIP_REST = { spine: 177, nearUpper: -38, nearFore: 48, farUpper: 9, farFore: 4, nearThigh: -7, nearShin: 2, farThigh: 7, farShin: -3, farFoot: 70 };
const MASCOT_POSES = {
  stand: MASCOT_BASE,
  waveA: { ...MASCOT_BASE, head: 176, farUpper: 140, farFore: 160, nearUpper: -5 },
  waveB: { ...MASCOT_BASE, head: 176, farUpper: 140, farFore: 200, nearUpper: -5 },
  // Ręka na biodrze i ciężar na jednej nodze, jak drewniany model
  hip: { ...MASCOT_BASE, ...HIP_REST, head: 184 },
  hipTilt: { ...MASCOT_BASE, ...HIP_REST, head: 173 },
  // Wskazuje na wybrany kafelek
  pointLeft: { ...MASCOT_BASE, head: 188, nearUpper: -58, nearFore: -62, farUpper: 10, farFore: 5 },
  pointRight: { ...MASCOT_BASE, head: 172, farUpper: 58, farFore: 62, nearUpper: -10, nearFore: -5 },
  // Przygląda się swojej dłoni i ramieniu po zmianie materiału
  lookHand: { ...MASCOT_BASE, spine: 178, head: 160, farUpper: 28, farFore: 158, nearUpper: -8, nearFore: -3 },
  lookHand2: { ...MASCOT_BASE, spine: 178, head: 156, farUpper: 34, farFore: 192, nearUpper: -8, nearFore: -3 },
  lookArm: { ...MASCOT_BASE, spine: 181, head: 198, nearUpper: -52, nearFore: -30, farUpper: 9, farFore: 4 }
};

// Rysuje Manikuna w podanym <svg> i odtwarza jego sekwencje póz.
function createMascot(svg, getMaterial) {
  const RIG = BODIES.male;
  const W = 300, H = 300, GROUND = 280, SCALE = 1.05;
  const HIP_Y = GROUND - (RIG.shin + RIG.thigh + 5) * SCALE;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  let shown = MASCOT_POSES.stand, frame = null, idleTimer = null, runId = 0;

  function draw(pose) {
    svg.replaceChildren();
    const c = 16, i = 6;
    [[i, i, 1, 1], [W - i, i, -1, 1], [i, H - i, 1, -1], [W - i, H - i, -1, -1]].forEach(([x, y, sx, sy]) => {
      el("path", { d: `M${x},${y + sy * c} L${x},${y} L${x + sx * c},${y}`, class: "thin" }, svg);
    });
    el("line", { x1: 40, y1: GROUND, x2: W - 40, y2: GROUND, class: "thin" }, svg);
    const defs = el("defs", {}, svg);
    const shadow = el("radialGradient", { id: "mascot-shadow" }, defs);
    el("stop", { offset: "0", "stop-color": "#000", "stop-opacity": "0.28" }, shadow);
    el("stop", { offset: "1", "stop-color": "#000", "stop-opacity": "0" }, shadow);
    el("ellipse", { cx: W / 2 + 4, cy: GROUND, rx: 46, ry: 5, style: "fill:url(#mascot-shadow);stroke:none" }, svg);
    const g = el("g", { class: "fig", transform: `translate(${W / 2} ${f(HIP_Y)}) scale(${SCALE})` }, svg);
    paintFigure(g, computeFigure(pose, RIG).shapes, getMaterial());
  }

  // steps: [nazwa pozy, czas ms]
  function play(steps, done) {
    const id = ++runId;
    cancelAnimationFrame(frame);
    clearTimeout(idleTimer);
    if (reduceMotion.matches) {
      shown = MASCOT_POSES[steps[steps.length - 1][0]];
      draw(shown);
      if (done) done();
      return;
    }
    let k = 0;
    const next = () => {
      if (id !== runId) return;
      if (k >= steps.length) { if (done) done(); return; }
      const [name, dur] = steps[k++];
      const from = shown, to = MASCOT_POSES[name], start = performance.now();
      const step = now => {
        if (id !== runId) return;
        const t = Math.min(1, (now - start) / dur);
        shown = t < 1 ? blendPose(from, to, t) : to;
        draw(shown);
        if (t < 1) frame = requestAnimationFrame(step); else next();
      };
      frame = requestAnimationFrame(step);
    };
    next();
  }

  // Bezczynność: co kilka sekund spokojny przechył głowy
  function idle() {
    clearTimeout(idleTimer);
    if (reduceMotion.matches) return;
    idleTimer = setTimeout(() => play([["hipTilt", 1300], ["hip", 1400]], idle), 4500);
  }

  return {
    draw: () => draw(shown),
    greet: () => play([["waveA", 900], ["waveB", 480], ["waveA", 480], ["waveB", 480], ["waveA", 480], ["hip", 1100]], idle),
    point: mode => play([[mode === "photo" ? "pointLeft" : "pointRight", 800]]),
    admire: () => play([["lookHand", 850], ["lookHand2", 650], ["lookHand", 600], ["lookArm", 900], ["hip", 950]], idle),
    stop: () => { runId++; cancelAnimationFrame(frame); clearTimeout(idleTimer); }
  };
}
