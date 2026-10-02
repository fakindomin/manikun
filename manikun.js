// Manikun: manekin reżysera i jego pozy powitalne.
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
// Otoczka wypukła punktów (łańcuch monotoniczny)
function hull(points) {
  const p = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const half = list => {
    const h = [];
    list.forEach(q => { while (h.length >= 2 && cross(h[h.length - 2], h[h.length - 1], q) <= 0) h.pop(); h.push(q); });
    h.pop();
    return h;
  };
  return half(p).concat(half(p.slice().reverse()));
}

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

// Fryzury w układzie głowy (x w prawo ku twarzy, y w górę; 1 = promień głowy).
// cap: włosy na czubku głowy, rysowane na niej; back: pasma za głową i szyją.
function hairCap({ L, E, arc }, s = 1.1, bump = 0) {
  // Linia włosów: gładka krzywa przez kilka punktów (Catmull-Rom), z tyłu niżej, nad czołem wyżej
  const ctrl = [[-0.92, -0.62], [-0.72, -0.05], [-0.35, 0.45], [0.15, 0.62], [0.6, 0.55], [0.95, 0.25]];
  const line = [];
  for (let i = 0; i < ctrl.length - 1; i++) {
    const p0 = ctrl[Math.max(0, i - 1)], p1 = ctrl[i], p2 = ctrl[i + 1], p3 = ctrl[Math.min(ctrl.length - 1, i + 2)];
    for (let k = 0; k < 5; k++) {
      const t = k / 5, t2 = t * t, t3 = t2 * t;
      const c = j => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t3);
      line.push(L(c(0), c(1)));
    }
  }
  return arc(12, 215, 26, a => E(a, s + bump * Math.sin(rad(a) * 9), (s + bump * Math.sin(rad(a) * 9)) * 0.98, 0.02)).concat(line);
}
function hairBack({ L, E, arc }, depth, wave = 0) {
  const n = 10, side = (x0, x1, dir) => Array.from({ length: n + 1 }, (_, k) => {
    const t = k / n, y = -0.2 + (depth + 0.2) * -t;
    return L((dir > 0 ? x0 + (x1 - x0) * t : x1 + (x0 - x1) * (1 - t)) + wave * Math.sin(t * Math.PI * 4) * 0.12, y);
  });
  return arc(40, 200, 12, a => E(a, 1.13, 1.06)).concat(side(-1.15, -1.28, 1), side(0.82, 0.78, -1).reverse());
}
// Pasmo z przodu po stronie twarzy: od skroni w dół, przed ramieniem
function hairFront({ L }, depth, wave = 0) {
  const n = 12, pts = [];
  for (let k = 0; k <= n; k++) { const t = k / n; pts.push(L(1.02 + wave * Math.sin(t * Math.PI * 4) * 0.1 + t * 0.15, 0.35 - (depth + 0.35) * t)); }
  for (let k = n; k >= 0; k--) { const t = k / n; pts.push(L(0.66 + wave * Math.sin(t * Math.PI * 4 + 0.6) * 0.1 + t * 0.32, 0.1 - (depth + 0.1) * t)); }
  return pts;
}
const HAIR_SHAPES = {
  buzz: h => ({ cap: hairCap(h, 1.03) }),
  short: h => ({ cap: hairCap(h, 1.1) }),
  medium: h => ({ cap: hairCap(h, 1.1), back: [hairBack(h, 1.5)], front: hairFront(h, 1.3) }),
  long: h => ({ cap: hairCap(h, 1.1), back: [hairBack(h, 3.0)], front: hairFront(h, 2.8) }),
  wavy: h => ({ cap: hairCap(h, 1.12, 0.03), back: [hairBack(h, 2.8, 1)], front: hairFront(h, 2.6, 1) }),
  curly: h => ({ cap: hairCap(h, 1.2, 0.07), back: [hairBack(h, 1.2, 1.5)] }),
  ponytail: h => ({ cap: hairCap(h, 1.08), back: [h.arc(0, 360, 16, a => h.L(-1.15 + Math.cos(rad(a)) * 0.28, -0.55 + Math.sin(rad(a)) * 0.95))] }),
  bun: h => ({ cap: hairCap(h, 1.08), back: [h.arc(0, 360, 16, a => h.L(-0.55 + Math.cos(rad(a)) * 0.45, 1.02 + Math.sin(rad(a)) * 0.36))] })
};

// Liczy kształty manekina z kątów stawów (pose) i proporcji (RIG).
// Kąty bezwzględne: 0 = w dół, 90 = w prawo, 180 = w górę.
// cloth (opcjonalnie): ubranko przypięte do tych samych stawów, więc porusza się razem z pozą.
//   top: kolor góry, sleeve: "long" | "short" | "none", topLen: "waist" | "hip", loose: luźniejszy krój,
//   pants: kolor spodni, shorts: krótkie nogawki, skirt: kolor spódnicy/poły, skirtLen: ułamek podudzia,
//   collar: kolor koszuli w dekolcie, tie: kolor krawata, hood: kaptur,
//   skirtTo: "knee" = krótka spódnica do kolan, cuffs: kolor ściągaczy nogawek (dres),
//   outer: { color, coat } okrycie na wierzchu (kurtka; coat = płaszcz z połami),
//   hat: { kind: "cap" | "beanie" | "hat", color }, shoes: { kind: "sneakers" | "formal" | "boots", color }
function computeFigure(pose, RIG, cloth = null) {
  const P = [0, 0], u = dir(pose.spine), r = [-u[1], u[0]];
  const shapes = [], pts = [];
  const push = (s, ...ps) => { shapes.push(s); pts.push(...ps); };
  const cap = (A, B, rA, rB) => ({ t: "cap", A, B, rA, rB, d: capsule(A, B, rA, rB) });
  const quad = q => ({ t: "poly", q, d: poly(q) });
  const Ct = add(P, u, RIG.waistTop + RIG.chest), Cb = add(P, u, RIG.waistTop);
  const shoulder = side => add(add(Ct, u, -6), r, side === "near" ? -RIG.shoulderNear : RIG.shoulderFar);
  const hip = side => add(P, r, side === "near" ? -RIG.hipNear : RIG.hipFar);

  const lerpP = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const wear = (shape, color) => { shape.cloth = color; shapes.push(shape); };
  const clothPoly = (pts, color) => wear({ t: "poly", q: pts, d: poly(pts) }, color);
  const loose = cloth && cloth.loose ? 1.2 : 1;

  const hands = {};
  function arm(side) {
    const S = shoulder(side);
    const E = add(S, dir(pose[side + "Upper"]), RIG.upperArm);
    const W = add(E, dir(pose[side + "Fore"]), RIG.forearm);
    const Hc = add(W, dir(pose[side + "Fore"]), 7);
    push(cap(S, E, 5, 4), [S, 6], [E, 5]);
    push(cap(E, W, 4, 3), [W, 4]);
    push({ t: "circle", cx: E[0], cy: E[1], r: 3.5 });
    push({ t: "circle", cx: S[0], cy: S[1], r: 5.5 });
    // Rękaw na ramieniu, dłoń zostaje drewniana i wychodzi spod mankietu
    if (cloth && cloth.top && cloth.sleeve === "long") {
      wear(cap(S, E, 6.6 * loose, 5.6 * loose), cloth.top);
      wear(cap(E, lerpP(E, W, 0.92), 5.6 * loose, 4.6 * loose), cloth.top);
    } else if (cloth && cloth.top && cloth.sleeve === "short") {
      wear(cap(S, lerpP(S, E, 0.45), 6.8, 6.2), cloth.top);
    }
    // Okrycie na wierzchu: szersze rękawy niż góra, kończą się tuż nad dłonią
    if (cloth && cloth.outer) {
      wear(cap(S, E, 7.6, 6.6), cloth.outer.color);
      wear(cap(E, lerpP(E, W, 0.88), 6.6, 5.6), cloth.outer.color);
    }
    // Dłoń jak u manekina rysownika: kciuk z boku, śródręcze i nieco węższe palce (widać stopień przy kostkach)
    const fd = dir(pose[side + "Fore"]), fp = [fd[1], -fd[0]];
    push(cap(add(add(W, fd, 3), fp, 2.4), add(add(W, fd, 9), fp, 4.4), 1.8, 1.4));
    push(cap(add(W, fd, 0.5), add(W, fd, 12.5), 3.7, 2.7), [Hc, 9]);
    hands[side] = Hc;
  }
  const knees = {};
  function leg(side) {
    const H = hip(side);
    // ThighLen < 1: udo skierowane do kamery wygląda na krótsze (skrót perspektywiczny)
    const K = add(H, dir(pose[side + "Thigh"]), RIG.thigh * (pose[side + "ThighLen"] ?? 1));
    const A = add(K, dir(pose[side + "Shin"]), RIG.shin);
    const T = add(A, dir(pose[side + "Foot"]), RIG.foot);
    knees[side] = { H, K, A };
    push(cap(H, K, 7, 5), [H, 8], [K, 6]);
    push(cap(K, A, 5, 3.5), [A, 5]);
    push({ t: "circle", cx: A[0], cy: A[1], r: 3 });
    push({ t: "circle", cx: K[0], cy: K[1], r: 4.5 });
    // Nogawki: długie do kostki albo krótkie do połowy uda; stopa wychodzi spod nogawki
    if (cloth && cloth.pants) {
      if (cloth.shorts) wear(cap(H, lerpP(H, K, 0.6), 8.6, 7.6), cloth.pants);
      else {
        wear(cap(H, K, 8.4 * loose, 6.6 * loose), cloth.pants);
        wear(cap(K, lerpP(K, A, 0.94), 6.6 * loose, 5.2 * loose), cloth.pants);
        // Dres: ściągacz nad kostką
        if (cloth.cuffs) wear(cap(lerpP(K, A, 0.82), lerpP(K, A, 0.96), 5.4, 5), cloth.cuffs);
      }
    }
    // Stopa w układzie podeszwy: kostka leży nad piętą, linia kostka–palce opada, więc podeszwa jest obrócona
    // o ~20° w górę względem niej (przy typowych pozach wychodzi pozioma). sd: wzdłuż podeszwy, sn: w stronę podłoża.
    const fl = Math.hypot(T[0] - A[0], T[1] - A[1]) || 1, fdv = [(T[0] - A[0]) / fl, (T[1] - A[1]) / fl];
    let fn = [-fdv[1], fdv[0]];
    if (fn[0] * (K[0] - A[0]) + fn[1] * (K[1] - A[1]) > 0) fn = [-fn[0], -fn[1]];
    const cs = Math.cos(rad(20)), sn20 = Math.sin(rad(20));
    const sd = [fdv[0] * cs - fn[0] * sn20, fdv[1] * cs - fn[1] * sn20], sn = [fn[0] * cs + fdv[0] * sn20, fn[1] * cs + fdv[1] * sn20];
    const F = (x, y) => [A[0] + sd[0] * x + sn[0] * y, A[1] + sd[1] * x + sn[1] * y];
    const X = fl * cs, Y = fl * sn20 + 2.4;
    // Drewniana stopa: pięta pod kostką, śródstopie i palce
    push(cap(A, F(-0.6, Y - 3.2), 3.3, 3.2));
    push(cap(F(-0.6, Y - 3.2), F(X * 0.62, Y - 3), 3.2, 2.9), [F(-3.8, Y), 1]);
    push(cap(F(X * 0.6, Y - 2.6), F(X + 1, Y - 2.1), 2.6, 2.1), [F(X + 3, Y), 1]);
    // Buty: profil z piętą, noskiem i podeszwą. Sportowe pełniejsze z grubą jasną podeszwą,
    // eleganckie smukłe z cienką ciemną, botki z cholewką za kostkę
    if (cloth && cloth.shoes) {
      const sh = cloth.shoes, sport = sh.kind === "sneakers", soleH = sport ? 2.2 : 1.1;
      if (sh.kind === "boots") wear(cap(lerpP(K, A, 0.74), A, 5.8, 5.2), sh.color);
      // Obrys buta krzywymi: kołnierz, podbicie, zaokrąglony nosek, płaska podeszwa, zaokrąglona pięta
      const tip = X + (sport ? 3 : 4.2), hTop = F(-4.4, sport ? -1.8 : -0.8), col = F(2.6, sport ? -2.6 : -1.6);
      const toeTop = F(X - 1, Y - (sport ? 5 : 4)), toeBot = F(tip - 1.4, Y), heelBot = F(-4.2, Y);
      const P = p => `${p[0].toFixed(2)},${p[1].toFixed(2)}`;
      const d = `M${P(hTop)} L${P(col)} Q${P(F(X * 0.45, Y * 0.2 - (sport ? 1.6 : 0.8)))} ${P(toeTop)} Q${P(F(tip + 0.4, Y - 4))} ${P(F(tip, Y - 1.6))}` +
        ` Q${P(F(tip, Y))} ${P(toeBot)} L${P(heelBot)} Q${P(F(-6, Y))} ${P(F(-5.8, Y - 2.5))} Q${P(F(-5.6, 0))} ${P(hTop)} Z`;
      wear({ t: "poly", q: [hTop, col, toeTop, F(tip, Y - 1.6), toeBot, heelBot], d }, sh.color);
      const sq = [F(-5.4, Y - 0.3), F(tip - 1, Y - 0.3), F(tip - 1.6, Y + soleH), F(-5, Y + soleH)];
      wear({ t: "poly", q: sq, d: poly(sq) }, sport ? (sh.sole || "#EEEAE2") : "#2A2622");
      pts.push([F(-5.6, Y + soleH), 1], [F(tip, Y), 1]);
    }
  }

  leg("far");
  // farFront: dalsza ręka przed tułowiem i głową (np. dłoń przy twarzy, gdy bliższa trzyma telefon)
  const farFront = (pose.farFront || 0) > 0.5;
  if (!farFront) arm("far");
  const hd = dir(pose.head);
  const N1 = add(Ct, hd, RIG.neck);
  const Hc = add(N1, hd, RIG.headRy - 1);
  const look = cloth && cloth.look;
  // Układ głowy: x w prawo (strona twarzy w widoku 3/4), y w górę, w jednostkach promieni głowy
  const hr = [-hd[1], hd[0]], hx = RIG.headRx, hy = RIG.headRy;
  const L = (x, y) => [Hc[0] + hr[0] * x * hx + hd[0] * y * hy, Hc[1] + hr[1] * x * hx + hd[1] * y * hy];
  const E = (deg, sx, sy = sx, dy = 0) => L(sx * Math.cos(rad(deg)), sy * Math.sin(rad(deg)) + dy);
  const arc = (a0, a1, n, fn) => Array.from({ length: n + 1 }, (_, k) => fn(a0 + (a1 - a0) * k / n));
  const hair = look && look.hair && HAIR_SHAPES[look.hair] ? HAIR_SHAPES[look.hair]({ L, E, arc }) : null;
  // Włosy z tyłu (długie, kucyk, kok) leżą za tułowiem, szyją i głową: widać je nad ramionami i przy szyi
  if (hair && hair.back) hair.back.forEach(pts => clothPoly(pts, look.hairColor));
  const pb = add(P, u, -RIG.pelvisDown), pt = add(P, u, RIG.pelvisUp);
  push(cap(pt, Cb, 7, 8));
  const [pbn, pbf] = RIG.pelvisBottom, [ptn, ptf] = RIG.pelvisTop, [ctn, ctf] = RIG.chestTop, [cbn, cbf] = RIG.chestBottom;
  // Rogi brył w kolejności: górny bliższy, górny dalszy, dolny dalszy, dolny bliższy
  push(quad([add(pt, r, -ptn), add(pt, r, ptf), add(pb, r, pbf), add(pb, r, -pbn)]), [add(pb, r, -pbn), 1], [add(pb, r, pbf), 1]);
  push(quad([add(Ct, r, -ctn), add(Ct, r, ctf), add(Cb, r, cbf), add(Cb, r, -cbn)]), [add(Ct, r, -ctn), 1], [add(Ct, r, ctf), 1]);
  if (cloth) {
    // Spodnie na miednicy, potem góra: dopasowana do talii albo dłuższa, do bioder
    if (cloth.pants) clothPoly([add(pt, r, -ptn - 1.5), add(pt, r, ptf + 1.5), add(pb, r, pbf + 1.5), add(pb, r, -pbn - 1.5)], cloth.pants);
    if (cloth.top) {
      const e = 1.5 * loose, low = cloth.topLen === "hip" ? add(pb, u, -1) : add(P, u, RIG.pelvisUp * 0.4);
      const [lw, rw] = cloth.topLen === "hip" ? [pbn + 2.5, pbf + 2.5] : [ptn + 1.5, ptf + 1.5];
      clothPoly([add(Ct, r, -ctn - e), add(Ct, r, ctf + e), add(Cb, r, cbf + e), add(low, r, rw), add(low, r, -lw), add(Cb, r, -cbn - e)], cloth.top);
      // Dekolt z koszulą i krawat (elegancki)
      const mid = add(Ct, r, -(ctn - ctf) / 2);
      if (cloth.collar) clothPoly([add(mid, r, -5), add(mid, r, 5), add(mid, u, -17)], cloth.collar);
      if (cloth.tie) clothPoly([add(add(mid, u, -2), r, -1.4), add(add(mid, u, -2), r, 1.4), add(add(mid, u, -20), r, 2.2), add(mid, u, -23), add(add(mid, u, -20), r, -2.2)], cloth.tie);
      // Kaptur zsunięty na plecy: zgrubienie wokół szyi
      if (cloth.hood) wear({ t: "ellipse", cx: add(Ct, u, 2)[0], cy: add(Ct, u, 2)[1], rx: ctn * 0.75, ry: 5, rot: 180 - pose.spine }, cloth.top);
    }
    // Okrycie: tułów do bioder, rozpięte (pas góry widoczny pośrodku), z kołnierzem przy szyi
    if (cloth.outer) {
      const oc = cloth.outer.color, e = 2.6, low = add(pb, u, -2);
      clothPoly([add(Ct, r, -ctn - e), add(Ct, r, ctf + e), add(Cb, r, cbf + e), add(low, r, pbf + 4), add(low, r, -pbn - 4), add(Cb, r, -cbn - e)], oc);
      const mid = add(Ct, r, -(ctn - ctf) / 2), mlow = add(low, r, -(pbn - pbf) / 2);
      if (cloth.top) clothPoly([add(mid, r, -3), add(mid, r, 3), add(mlow, r, 2.2), add(mlow, r, -2.2)], cloth.top);
      clothPoly([add(mid, r, -ctn * 0.55), add(mid, r, -2.5), add(add(mid, u, -14), r, -2)], oc);
      clothPoly([add(mid, r, 2.5), add(mid, r, ctf * 0.55), add(add(mid, u, -14), r, 2)], oc);
    }
  }
  // Pasmo długich włosów opadające z przodu po stronie twarzy
  if (hair && hair.front) clothPoly(hair.front, look.hairColor);
  push(cap(Ct, N1, 3.5, 3.5));
  push({ t: "ellipse", cx: Hc[0], cy: Hc[1], rx: RIG.headRx, ry: RIG.headRy, rot: 180 - pose.head, head: true }, [Hc, RIG.headRy + 1]);
  if (hair && hair.cap) clothPoly(hair.cap, look.hairColor);
  // Zwrot ciała: tyłem widać tył głowy (włosy na całej głowie), półtyłem włosy zakrywają większość głowy; twarzy nie rysujemy
  const turned = look && (look.view === "back" || look.view === "away");
  if (turned && hair) clothPoly(arc(0, 360, 28, a => look.view === "back" ? E(a, 1.07, 1.06, 0.02) : L(-0.26 + Math.cos(rad(a)) * 0.86, 0.04 + Math.sin(rad(a)) * 1.04)), look.hairColor);
  if (look && !turned) {
    // Zarost: pełna i krótka broda jako materiał, kilkudniowy jako półprzezroczysty cień
    if (look.beard && look.beard !== "none") {
      const low = look.beard === "full" ? -0.3 : -0.42;
      const pts = arc(-8, -150, 14, a => E(a, look.beard === "full" ? 1.06 : 1.02)).concat([L(-0.55, -0.5), L(-0.1, low - 0.05), L(0.35, low), L(0.8, low + 0.12)]);
      const bc = look.beardColor || look.hairColor;
      if (look.beard === "stubble") shapes.push({ t: "deco", d: poly(pts), style: `fill:${bc};stroke:none;opacity:0.38` });
      else clothPoly(pts, bc);
    }
    // Szminka: usta po stronie twarzy
    if (look.lips) {
      const m = L(0.46, -0.6);
      shapes.push({ t: "deco", d: `M${f(L(0.26, -0.6)[0])},${f(L(0.26, -0.6)[1])} Q${f(L(0.46, -0.52)[0])},${f(L(0.46, -0.52)[1])} ${f(L(0.66, -0.6)[0])},${f(L(0.66, -0.6)[1])} Q${f(L(0.46, -0.7)[0])},${f(L(0.46, -0.7)[1])} ${f(L(0.26, -0.6)[0])},${f(L(0.26, -0.6)[1])} Z`,
        style: `fill:${look.lips};stroke:${shadeHex(look.lips, -0.35)};stroke-width:0.8;opacity:0.95`, at: m });
    }
    // Mina (tylko w zbliżeniu na twarz): przerysowane oczy, brwi i usta w stylu szkicu
    if (look.expr) {
      const P = (x, y) => { const q = L(x, y); return `${f(q[0])},${f(q[1])}`; };
      const ink = "stroke:#3B2616;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round";
      const line = d => shapes.push({ t: "deco", d, style: `fill:none;${ink}` });
      const fill = (d, c) => shapes.push({ t: "deco", d, style: `fill:${c};${ink}` });
      const blob = (x, y, r, c) => fill(`M${P(x - r, y)} A${f(r * hx)},${f(r * hx)} 0 1 1 ${P(x + r, y)} A${f(r * hx)},${f(r * hx)} 0 1 1 ${P(x - r, y)} Z`, c);
      const dot = (x, y, r) => blob(x, y, r, "#3B2616");
      // Owal od (x0, y0) do (x1, y1): otwarte usta
      const oval = (x0, y0, x1, y1, c) => { const mx = (x0 + x1) / 2, my = (y0 + y1) / 2;
        fill(`M${P(x0, my)} Q${P(x0, y0)} ${P(mx, y0)} Q${P(x1, y0)} ${P(x1, my)} Q${P(x1, y1)} ${P(mx, y1)} Q${P(x0, y1)} ${P(x0, my)} Z`, c); };
      const brows = (nearIn, nearOut, farIn, farOut) => { line(`M${P(0.04, nearOut)} L${P(0.34, nearIn)}`); line(`M${P(0.6, farIn)} L${P(0.86, farOut)}`); };
      // Brwi uniesione łukiem (zaskoczenie): h = wysokość
      const arches = h => { line(`M${P(0.06, h)} Q${P(0.2, h + 0.12)} ${P(0.34, h + 0.02)}`); line(`M${P(0.6, h + 0.02)} Q${P(0.72, h + 0.12)} ${P(0.86, h)}`); };
      const e = look.expr;
      if (e === "smile") {
        // Uśmiech: spokojne oczy, łagodne brwi, zamknięte usta w łuk
        dot(0.2, 0.1, 0.065); dot(0.72, 0.1, 0.05);
        line(`M${P(0.06, 0.36)} Q${P(0.2, 0.42)} ${P(0.34, 0.37)}`); line(`M${P(0.6, 0.37)} Q${P(0.72, 0.42)} ${P(0.86, 0.36)}`);
        line(`M${P(0.24, -0.52)} Q${P(0.47, -0.78)} ${P(0.7, -0.52)}`);
      } else if (e === "joy") {
        // Śmiech: oczy zmrużone w łuki, szeroko otwarte usta
        line(`M${P(0.08, 0.06)} Q${P(0.2, 0.24)} ${P(0.32, 0.06)}`); line(`M${P(0.63, 0.06)} Q${P(0.72, 0.21)} ${P(0.81, 0.06)}`);
        line(`M${P(0.04, 0.38)} Q${P(0.2, 0.48)} ${P(0.34, 0.4)}`); line(`M${P(0.6, 0.4)} Q${P(0.72, 0.48)} ${P(0.86, 0.38)}`);
        fill(`M${P(0.24, -0.42)} Q${P(0.47, -0.95)} ${P(0.72, -0.42)} Z`, "#6A2222");
      } else if (e === "anger") {
        // Irytacja: brwi ściągnięte, usta zaciśnięte w kreskę
        dot(0.2, 0.1, 0.07); dot(0.72, 0.1, 0.055);
        brows(0.24, 0.42, 0.24, 0.42);
        line(`M${P(0.3, -0.64)} Q${P(0.47, -0.6)} ${P(0.66, -0.66)}`);
      } else if (e === "fury") {
        // Wściekłość: brwi mocno w „V”, usta otwarte do krzyku, widać zęby
        dot(0.2, 0.08, 0.06); dot(0.72, 0.08, 0.048);
        brows(0.16, 0.46, 0.16, 0.46);
        oval(0.28, -0.46, 0.68, -0.9, "#6A2222");
        shapes.push({ t: "deco", d: `M${P(0.33, -0.53)} L${P(0.63, -0.53)}`, style: "fill:none;stroke:#F2EDE4;stroke-width:2.2;stroke-linecap:round" });
      } else if (e === "sad" || e === "cry") {
        if (e === "sad") { dot(0.2, 0.06, 0.07); dot(0.72, 0.06, 0.055); }
        else { line(`M${P(0.08, 0.1)} Q${P(0.2, -0.02)} ${P(0.32, 0.1)}`); line(`M${P(0.63, 0.1)} Q${P(0.72, 0.0)} ${P(0.81, 0.1)}`); }
        brows(0.44, 0.28, 0.44, 0.28);
        if (e === "sad") line(`M${P(0.28, -0.7)} Q${P(0.47, -0.5)} ${P(0.68, -0.7)}`);
        else {
          fill(`M${P(0.28, -0.66)} Q${P(0.47, -0.46)} ${P(0.68, -0.66)} Q${P(0.47, -0.8)} ${P(0.28, -0.66)} Z`, "#6A2222");
          // Łzy: kropla pod każdym okiem i strużka
          [[0.2, -0.08], [0.72, -0.1]].forEach(([x, y]) => {
            shapes.push({ t: "deco", d: `M${P(x, y)} Q${P(x + 0.09, y - 0.2)} ${P(x, y - 0.26)} Q${P(x - 0.09, y - 0.2)} ${P(x, y)} Z`, style: "fill:#8FC3E8;stroke:#4A86B5;stroke-width:1.4" });
            shapes.push({ t: "deco", d: `M${P(x + 0.02, y - 0.3)} L${P(x + 0.04, y - 0.5)}`, style: "fill:none;stroke:#8FC3E8;stroke-width:2;stroke-linecap:round" });
          });
        }
      } else if (e === "neutral") {
        dot(0.2, 0.1, 0.065); dot(0.72, 0.1, 0.05);
        line(`M${P(0.06, 0.34)} L${P(0.34, 0.36)}`); line(`M${P(0.6, 0.36)} L${P(0.86, 0.34)}`);
        line(`M${P(0.32, -0.62)} L${P(0.64, -0.62)}`);
      } else if (e === "thought") {
        dot(0.26, 0.14, 0.065); dot(0.78, 0.14, 0.05);
        line(`M${P(0.04, 0.36)} L${P(0.34, 0.36)}`); line(`M${P(0.6, 0.44)} Q${P(0.72, 0.56)} ${P(0.86, 0.46)}`);
        line(`M${P(0.36, -0.6)} L${P(0.62, -0.66)}`);
      } else if (e === "deep") {
        // Głębokie zamyślenie: oczy przymknięte, brwi nierówno, usta w małą kreskę
        line(`M${P(0.1, 0.1)} Q${P(0.22, 0.03)} ${P(0.34, 0.1)}`); line(`M${P(0.64, 0.1)} Q${P(0.74, 0.04)} ${P(0.84, 0.1)}`);
        line(`M${P(0.04, 0.34)} L${P(0.34, 0.37)}`); line(`M${P(0.6, 0.46)} Q${P(0.72, 0.6)} ${P(0.86, 0.5)}`);
        line(`M${P(0.38, -0.62)} L${P(0.58, -0.66)}`);
      } else if (e === "surprise") {
        // Zdziwienie: większe oczy, brwi uniesione łukiem, małe „o”
        dot(0.2, 0.12, 0.08); dot(0.72, 0.12, 0.062);
        arches(0.42);
        oval(0.4, -0.54, 0.55, -0.72, "#6A2222");
      } else if (e === "shock") {
        // Szok: szeroko otwarte oczy z małymi źrenicami, brwi wysoko, usta szeroko otwarte
        blob(0.2, 0.12, 0.13, "#F4EFE6"); blob(0.72, 0.12, 0.1, "#F4EFE6");
        dot(0.2, 0.12, 0.04); dot(0.72, 0.12, 0.032);
        arches(0.54);
        oval(0.34, -0.46, 0.6, -0.92, "#6A2222");
      }
    }
    // Okulary: dwie oprawki (dalsza węższa, bo widok 3/4), mostek i zausznik
    if (look.glasses && look.glasses !== "none") {
      const g = look.glasses, fc = look.glassesColor;
      const lens = g === "sun" || g === "aviator" ? "fill:#1B1C21;fill-opacity:0.88" : "fill:#DDE6EE;fill-opacity:0.18";
      const frame = `stroke:${fc};stroke-width:1.6;stroke-linejoin:round`;
      const lensPath = (cx, w) => {
        let pts;
        if (g === "rect") pts = [[-1, 0.7], [1, 0.7], [1, -0.7], [-1, -0.7]].map(([x, y]) => L(cx + x * w, 0.08 + y * 0.17));
        else if (g === "aviator") pts = arc(0, 360, 20, a => L(cx + Math.cos(rad(a)) * w, 0.04 + Math.sin(rad(a)) * (a > 180 ? 0.24 : 0.16)));
        else pts = arc(0, 360, 20, a => L(cx + Math.cos(rad(a)) * w, 0.08 + Math.sin(rad(a)) * 0.19));
        return poly(pts);
      };
      shapes.push({ t: "deco", d: lensPath(0.2, 0.27), style: `${lens};${frame}` });
      shapes.push({ t: "deco", d: lensPath(0.78, 0.19), style: `${lens};${frame}` });
      const b1 = L(0.47, 0.12), b2 = L(0.59, 0.12), t1 = L(-0.07, 0.12), t2 = L(-0.78, 0.18);
      shapes.push({ t: "deco", d: `M${f(b1[0])},${f(b1[1])} L${f(b2[0])},${f(b2[1])} M${f(t1[0])},${f(t1[1])} L${f(t2[0])},${f(t2[1])}`, style: `fill:none;${frame}` });
    }
  }
  // Nakrycie głowy: na włosach, które częściowo spod niego wystają
  if (cloth && cloth.hat) {
    const hc = cloth.hat.color, band = shadeHex(hc, -0.22);
    if (cloth.hat.kind === "beanie") {
      clothPoly(arc(6, 174, 18, a => E(a, 1.1, 1.06, 0.14)), hc);
      clothPoly([L(-1.1, 0.26), L(1.1, 0.26), L(1.05, 0.5), L(-1.05, 0.5)], band);
    } else if (cloth.hat.kind === "cap") {
      clothPoly(arc(8, 172, 18, a => E(a, 1.07, 1.02, 0.12)), hc);
      clothPoly([L(0.5, 0.2), L(1.62, 0.1), L(1.66, 0.2), L(0.55, 0.36)], band);
    } else {
      clothPoly(arc(0, 360, 24, a => L(Math.cos(rad(a)) * 1.6, 0.46 + Math.sin(rad(a)) * 0.15)), band);
      clothPoly([L(-0.8, 0.46), L(-0.72, 1.36), L(-0.22, 1.3), L(0, 1.2), L(0.22, 1.3), L(0.72, 1.36), L(0.8, 0.46)], hc);
      clothPoly([L(-0.79, 0.5), L(0.79, 0.5), L(0.77, 0.7), L(-0.77, 0.7)], band);
    }
  }
  if (farFront) arm("far");
  leg("near");
  // Spódnica sukienki albo poły płaszcza: jedna tkanina rozpięta od bioder do obu kolan i trochę niżej.
  // To otoczka wypukła bioder i brzegów przy kolanach, więc w każdej pozie zakrywa uda bez prześwitów.
  const ring = (c, rr) => Array.from({ length: 12 }, (_, k) => [c[0] + Math.cos(k * Math.PI / 6) * rr, c[1] + Math.sin(k * Math.PI / 6) * rr]);
  const drape = (len, toKnee, extra = 0) => {
    const pts = [add(pt, r, -ptn - 2 - extra), add(pt, r, ptf + 2 + extra), add(pb, r, pbf + 3 + extra), add(pb, r, -pbn - 3 - extra)];
    ["near", "far"].forEach(side => {
      const { H, K, A } = knees[side];
      pts.push(...ring(H, 9 + extra));
      if (toKnee) pts.push(...ring(lerpP(H, K, 0.92), 8.5 + extra));
      else pts.push(...ring(lerpP(K, A, len), 8.5 + extra), ...ring(K, 8.5 + extra));
    });
    return hull(pts);
  };
  if (cloth && cloth.skirt) clothPoly(drape(cloth.skirtLen || 0.2, cloth.skirtTo === "knee"), cloth.skirt);
  // Poły płaszcza na wierzchu wszystkiego poniżej pasa
  if (cloth && cloth.outer && cloth.outer.coat) clothPoly(drape(0.28, false, 1.5), cloth.outer.color);
  arm("near");

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  pts.forEach(([p, rr]) => {
    minX = Math.min(minX, p[0] - rr); maxX = Math.max(maxX, p[0] + rr);
    minY = Math.min(minY, p[1] - rr); maxY = Math.max(maxY, p[1] + rr);
  });
  return { shapes, head: Hc, hands, box: { minX, minY, maxX, maxY, w: maxX - minX, h: maxY - minY } };
}

// Materiały: light/mid/dark to cieniowanie w poprzek członu, line to kontur, grain to słoje.
const MATERIALS = [
  { id: "wood", name: "Drewno", light: "#F3D3A0", mid: "#DCA764", dark: "#9C6530", line: "#4E2E12", grain: "#7A4518" },
  { id: "white", name: "Biały", light: "#FFFFFF", mid: "#F5F4F1", dark: "#D3D0CA", line: "#3A3A3A" }
];

let gradSeq = 0;

// Rysuje kształty manekina do grupy g. Bez materiału rysuje zwykłe kształty (styl z CSS).
// Materiał z flat: true rysuje uproszczonego Manikuna (szkic roboczy podczas ustawiania sceny).
// Materiał z soft: true (Próbny kadr): miękki kontur w odcieniu bryły zamiast kreski i fałdy na ubraniu.
function paintFigure(g, shapes, m) {
  const shape = (tag, attrs, fill, line) => el(tag, m ? { ...attrs, style: m.soft
    ? `fill:${fill};stroke:${line || m.line};stroke-opacity:${line ? 0.45 : 0.3};stroke-width:0.7`
    : `fill:${fill};stroke:${m.line}` } : attrs, g);
  const fold = (d, c, w, op) => el("path", { d, style: `fill:none;stroke:${c};stroke-width:${w};stroke-linecap:round;opacity:${op}` }, g);
  if (!m) {
    shapes.forEach(s => {
      if (s.t === "deco") return;
      if (s.t === "cap" || s.t === "poly") shape("path", { d: s.d });
      else if (s.t === "circle") shape("circle", { cx: f(s.cx), cy: f(s.cy), r: s.r });
      else shape("ellipse", { cx: f(s.cx), cy: f(s.cy), rx: s.rx, ry: s.ry, transform: `rotate(${f(s.rot)} ${f(s.cx)} ${f(s.cy)})` });
    });
    return;
  }
  // Szkic roboczy: płaskie drewno z konturem, stawy odrobinę jaśniejsze, ubranie w płaskim kolorze, bez słojów
  if (m.flat) {
    shapes.forEach(s => {
      if (s.t === "deco") { el("path", { d: s.d, style: s.style }, g); return; }
      const fill = s.cloth || (s.t === "circle" ? m.light : m.mid);
      if (s.t === "cap" || s.t === "poly") shape("path", { d: s.d }, fill);
      else if (s.t === "circle") shape("circle", { cx: f(s.cx), cy: f(s.cy), r: s.r }, fill);
      else shape("ellipse", { cx: f(s.cx), cy: f(s.cy), rx: s.rx, ry: s.ry, transform: `rotate(${f(s.rot)} ${f(s.cx)} ${f(s.cy)})` }, fill);
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
    // Detale twarzy (okulary, szminka, cień zarostu) mają własny styl
    if (s.t === "deco") { el("path", { d: s.d, style: s.style }, g); return; }
    if (s.cloth) {
      // Materiał ubranka: kolor z lekkim cieniowaniem, bez słojów
      const id = pre + "t" + (++n);
      // Bryły materiału cieniowane od lewej do prawej krawędzi, rękawy i nogawki w poprzek
      const xs = s.t === "poly" ? s.q.map(q => q[0]) : [0], my0 = s.t === "poly" ? s.q.reduce((acc, q) => acc + q[1], 0) / s.q.length : 0;
      const [a, b] = s.t === "cap" ? [s.A, s.B] : [[Math.min(...xs), my0], [Math.max(...xs), my0]];
      let x1 = a[0], y1 = a[1], x2 = b[0], y2 = b[1];
      if (s.t === "cap") {
        const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1, rr = Math.max(s.rA, s.rB);
        const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
        x1 = mx - dy / len * rr; y1 = my + dx / len * rr; x2 = mx + dy / len * rr; y2 = my - dx / len * rr;
      }
      const cl = m.soft ? shadeHex(s.cloth, -0.5) : null;
      if (s.t === "ellipse") shape("ellipse", { cx: f(s.cx), cy: f(s.cy), rx: s.rx, ry: s.ry, transform: `rotate(${f(s.rot)} ${f(s.cx)} ${f(s.cy)})` }, shadeHex(s.cloth, -0.12), cl);
      else {
        const lg = el("linearGradient", { id, gradientUnits: "userSpaceOnUse", x1: f(x1), y1: f(y1), x2: f(x2), y2: f(y2) }, defs);
        stops(lg, [[0, shadeHex(s.cloth, -0.22)], [0.35, shadeHex(s.cloth, 0.12)], [0.65, s.cloth], [1, shadeHex(s.cloth, -0.25)]]);
        shape("path", { d: s.d }, `url(#${id})`, cl);
      }
      if (m.soft) {
        const dk = shadeHex(s.cloth, -0.38), lt = shadeHex(s.cloth, 0.28);
        if (s.t === "cap") {
          // Fałdy w poprzek rękawa albo nogawki: łuki wygięte raz w jedną, raz w drugą stronę, nad nimi jasny refleks
          const dx = s.B[0] - s.A[0], dy = s.B[1] - s.A[1], len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
          if (len > 8) [0.38, 0.72].forEach((t, i) => {
            const r = (s.rA + (s.rB - s.rA) * t) * 0.8, cx = s.A[0] + dx * t, cy = s.A[1] + dy * t, bow = len * 0.05 * (i % 2 ? 1 : -1);
            const a = [cx + nx * r, cy + ny * r], b = [cx - nx * r * 0.6, cy - ny * r * 0.6], c = [cx + nx * r * 0.2 + ux * bow, cy + ny * r * 0.2 + uy * bow];
            fold(`M${f(a[0])},${f(a[1])} Q${f(c[0])},${f(c[1])} ${f(b[0])},${f(b[1])}`, dk, 0.9, 0.36);
            fold(`M${f(a[0] - ux * 1.1)},${f(a[1] - uy * 1.1)} Q${f(c[0] - ux * 1.1)},${f(c[1] - uy * 1.1)} ${f(b[0] - ux * 1.1)},${f(b[1] - uy * 1.1)}`, lt, 0.6, 0.35);
          });
        } else if (s.t === "poly" && s.q && s.q.length === 4) {
          // Tułów: dwie fałdy od ramion ku talii i zagniecenie nad paskiem
          const [tn, tf, bf, bn] = s.q, L = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
          [[0.3, 0.42], [0.62, 0.55]].forEach(([a, b], i) => {
            const p0 = L(L(tn, tf, a), L(bn, bf, a), 0.12), p1 = L(L(tn, tf, b), L(bn, bf, b), 0.7), c = L(L(tn, tf, (a + b) / 2 + 0.06), L(bn, bf, (a + b) / 2), 0.45);
            fold(`M${f(p0[0])},${f(p0[1])} Q${f(c[0])},${f(c[1])} ${f(p1[0])},${f(p1[1])}`, dk, 0.9, 0.35);
          });
          const w0 = L(L(tn, bn, 0.86), L(tf, bf, 0.86), 0.15), w1 = L(L(tn, bn, 0.86), L(tf, bf, 0.86), 0.85), wc = L(L(tn, bn, 0.9), L(tf, bf, 0.9), 0.5);
          fold(`M${f(w0[0])},${f(w0[1])} Q${f(wc[0])},${f(wc[1])} ${f(w1[0])},${f(w1[1])}`, dk, 0.9, 0.4);
        }
      }
      return;
    }
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
            style: `fill:none;stroke:${m.grain};stroke-width:${s.head ? 0.8 : 0.6};opacity:${m.soft && s.head ? 0.22 : 0.55}` }, gg);
        });
      }
    }
  });
}

// Rozjaśnia (k > 0) albo przyciemnia (k < 0) kolor #RRGGBB
function shadeHex(hex, k) {
  const n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255];
  return "#" + c.map(v => Math.round(k > 0 ? v + (255 - v) * k : v * (1 + k)).toString(16).padStart(2, "0")).join("");
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
    const def = k.endsWith("Len") ? 1 : 0, av = a[k] ?? def, bv = b[k] ?? def;
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
