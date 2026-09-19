import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js";

const $ = (id) => document.getElementById(id);
const svg = (body, view = "0 0 32 32") =>
  `<svg viewBox="${view}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
const icons = {
  fish: svg('<path d="M7 16C13 4 24 8 28 16c-4 8-15 12-21 0L2 9v14z" fill="#528c91"/><circle cx="23" cy="14" r="1.4" fill="#173d38"/>'),
  sprout: svg(
    '<path d="M16 28V14C7 14 5 5 5 5s12-2 12 13C17 9 27 8 27 8s1 11-11 12" fill="currentColor"/><path d="M9 28h15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  ),
  grass: svg(
    '<path d="M15 27C14 15 4 9 4 9s2 14 8 18M16 27C10 14 17 3 17 3s6 13 1 24M19 27c0-11 10-16 10-16s-2 14-7 16" fill="#87a967"/><path d="m17 25 1-15" stroke="#688d4d" stroke-width="1.5"/>',
  ),
  wood: svg(
    '<path d="m7 24 12-18 8 6-12 18z" fill="#bd8b60"/><ellipse cx="11" cy="25" rx="6" ry="4.5" transform="rotate(31 11 25)" fill="#e4bb87"/><ellipse cx="11" cy="25" rx="3" ry="2" transform="rotate(31 11 25)" stroke="#bd8b60"/><path d="m16 19 7-10M12 19l7-11" stroke="#946442" stroke-width="1.2"/>',
  ),
  stone: svg(
    '<path d="m4 23 2-12 9-6 10 5 4 13-11 6z" fill="#a4aca5"/><path d="m6 11 12 5 7-6-10-5z" fill="#cbd0c4"/><path d="m18 16 11 7-11 6z" fill="#858f8b"/>',
  ),
  coin: svg(
    '<circle cx="16" cy="16" r="13" fill="#eec975"/><circle cx="16" cy="16" r="9" stroke="#c49a47" stroke-width="1.5"/><path d="M18.5 10.5c-5-2-8 4-2 5.5s3 7-2 5M16 8v16" stroke="#b99040" stroke-width="1.5" stroke-linecap="round"/>',
  ),
  egg: svg(
    '<path d="M25 20C25 26 21 29 16 29S7 26 7 20 12 3 16 3s9 11 9 17Z" fill="#e8d9b9"/><path d="M16 5C12 7 9 15 9 20c0 4 2 6 5 7-8-6 1-18 2-22" fill="#f8efda"/>',
  ),
  tomato: svg(
    '<path d="M29 19c0 7-6 11-13 11S3 25 3 18 10 8 16 11 28 11 29 19" fill="#d7745f"/><path d="m16 13-8-4 6 1-2-6 5 5 6-5-2 6 7 2-10 2z" fill="#729560"/><path d="M8 19c0-3 2-5 4-5" stroke="#eda28a" stroke-width="2" stroke-linecap="round"/>',
  ),
  meat: svg(
    '<path d="M10 8C4 10 1 17 5 23s10 8 14 2 12-7 10-14S18 3 10 8Z" fill="#d98078" stroke="#e9b7a6" stroke-width="2"/><path d="M12 11c-5 2-5 9-1 11 4 3 4-4 9-6 5-2 5-6 1-6" stroke="#efbbab" stroke-width="1.5"/><ellipse cx="13" cy="17" rx="3" ry="4" fill="#f0d6b8"/>',
  ),
  milk: svg(
    '<path d="m10 3 12 1 1 6 3 3-2 16-17-1 1-17 3-3z" fill="#eaece3"/><path d="m10 3 12 1-1 5-10-1z" fill="#8eb6bc"/><path d="m8 15 17 1-1 9-17-1z" fill="#9bc3c6"/><path d="m16 17-3 5c0 3 6 3 6 0z" fill="#fffef4"/>',
  ),
  candy: svg(
    '<path d="M8 13 1 9l2 8-1 7 8-4M24 12l7-4-1 9 1 6-8-3" fill="#d6b8c9"/><rect x="7" y="10" width="18" height="13" rx="6" fill="#c991ad" transform="rotate(-12 16 16)"/><path d="m11 11 3 11m3-13 3 12" stroke="#edd4df" stroke-width="3"/>',
  ),
  bag: svg(
    '<path d="M7 11h18l2 17H5zM11 12V9a5 5 0 0 1 10 0v3" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m12 19 3 3 6-7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  ),
  backpack: svg(
    '<rect x="7" y="8" width="18" height="22" rx="6" stroke="currentColor" stroke-width="1.5"/><path d="M12 8V5h8v3M7 16h18M11 21h10v5H11zM10 16v3m12-3v3" stroke="currentColor" stroke-width="1.5"/>',
  ),
  sun: svg(
    '<circle cx="16" cy="16" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M16 3v3m0 20v3M3 16h3m20 0h3M7 7l2 2m14 14 2 2M7 25l2-2M23 9l2-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  ),
  settings: svg(
    '<path d="m13 3-.8 4-3 1.7-3.8-1.3-3 5.2 3 2.7v3.4l-3 2.7 3 5.2 3.8-1.3 3 1.7.8 4h6l.8-4 3-1.7 3.8 1.3 3-5.2-3-2.7v-3.4l3-2.7-3-5.2-3.8 1.3-3-1.7-.8-4z" transform="translate(2 0) scale(.88)" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="16" cy="15" r="4" stroke="currentColor" stroke-width="2"/>',
  ),
  help: svg(
    '<circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="1.8"/><path d="M12 12a4 4 0 0 1 8 0c0 3-4 3-4 6m0 3v1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  ),
  arrow: svg(
    '<path d="M6 16h20m-8-8 8 8-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  ),
  chevron: svg(
    '<path d="m9 18 7-7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  ),
  compass: svg(
    '<circle cx="16" cy="16" r="12" stroke="currentColor" stroke-width="1.5"/><path d="m21 10-3 10-8 3 4-10z" fill="currentColor"/>',
  ),
  soundOff: svg(
    '<path d="m5 12 5 0 7-6v20l-7-6H5zM23 12l6 8m0-8-6 8" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>',
  ),
  soundOn: svg(
    '<path d="m4 12 5 0 7-6v20l-7-6H4zM21 11c4 3 4 7 0 10m4-14c7 5 7 13 0 18" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>',
  ),
};
function hydrateIcons(root = document) {
  root
    .querySelectorAll("[data-icon]")
    .forEach((e) => (e.innerHTML = icons[e.dataset.icon] || ""));
}
hydrateIcons();
const esc = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const ITEMS = {
  egg: { name: "Eggs", shop: "produce", cost: { grass: 2 }, value: 12 },
  tomato: {
    name: "Tomato",
    shop: "produce",
    cost: { grass: 1, wood: 1 },
    value: 14,
  },
  meat: {
    name: "Meat",
    shop: "pantry",
    cost: { wood: 2, stone: 1 },
    value: 22,
  },
  milk: {
    name: "Milk",
    shop: "dairy",
    cost: { grass: 2, stone: 1 },
    value: 17,
  },
  candy: {
    name: "Candy",
    shop: "dairy",
    cost: { wood: 1, stone: 1 },
    value: 15,
  },
};
const SHOPS = {
  produce: {
    name: "Farm & Field",
    tag: "FRESH FROM THE GOOD EARTH",
    color: 0x8d9f65,
    x: -10,
    z: -8.5,
  },
  pantry: {
    name: "Butcher's Corner",
    tag: "SOMETHING HEARTY",
    color: 0xb47765,
    x: -1,
    z: -8.5,
  },
  dairy: {
    name: "Milk & Honey",
    tag: "THE SWEETER SIDE OF LIFE",
    color: 0x7faaaa,
    x: 8,
    z: -8.5,
  },
};
const PLOTS = [
  {
    id: "orchard",
    name: "The little orchard",
    x: -9,
    z: 9.5,
    w: 12,
    d: 5.5,
    cost: 65,
  },
  {
    id: "highland",
    name: "Sunstone garden",
    x: 10,
    z: 10,
    w: 10,
    d: 4.5,
    cost: 120,
  },
];
PLOTS.push({ id: "lake", name: "Willow Lake", x: 23, z: 5, w: 12, d: 12, cost: 200, requires: ["orchard", "highland"] });
const CARRY_LIMIT = 5;
const ITEM_KEYS = ["grass", "wood", "stone", ...Object.keys(ITEMS), "fish"];
const emptyBag = () => Object.fromEntries(ITEM_KEYS.map(k => [k, 0]));
const countBag = bag => Object.values(bag).reduce((sum, n) => sum + n, 0);
const plotUnlocked = plot => !plot.requires || plot.requires.every(id => G.land.includes(id));
const NAMES = [
  "Milo",
  "Hazel",
  "Otis",
  "Juniper",
  "Luna",
  "Theo",
  "Poppy",
  "Cleo",
  "Arlo",
  "Sage",
  "Nora",
  "Basil",
];
let seed = 37147;
function random() {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
}
const choose = (a) => a[Math.floor(random() * a.length)];
const SAVE = "market-meadow-save-v1";
function fresh() {
  return {
    version: 1,
    coins: 24,
    inventory: {
      grass: 0,
      wood: 0,
      stone: 0,
      egg: 0,
      tomato: 0,
      meat: 0,
      milk: 0,
      candy: 0,
    },
    storage: emptyBag(),
    botInventory: emptyBag(),
    nodeRemaining: {},
    land: [],
    served: 0,
    harvested: 0,
    traded: 0,
    time: 0,
    orders: [],
    journal: [],
    player: { x: -1, z: 3 },
    cooldowns: {},
  };
}
let G = fresh(),
  saveAvailable = true;
try {
  const saved = JSON.parse(localStorage.getItem(SAVE) || "null");
  if (
    saved?.version === 1 &&
    saved.inventory &&
    Object.keys(G.inventory).every(
      (k) => Number.isInteger(saved.inventory[k]) && saved.inventory[k] >= 0,
    ) &&
    Number.isFinite(saved.coins) &&
    saved.coins >= 0 &&
    Array.isArray(saved.land) &&
    Array.isArray(saved.orders)
  ) {
    G = { ...G, ...saved };
    G.land = G.land.filter((id) => PLOTS.some((p) => p.id === id));
    G.journal = Array.isArray(G.journal) ? G.journal.slice(-60) : [];
    G.orders = G.orders
      .filter(
        (o) =>
          Number.isFinite(o.id) &&
          NAMES.includes(o.name) &&
          o.needs &&
          Object.entries(o.needs).every(
            ([k, v]) => ITEMS[k] && Number.isInteger(v) && v > 0 && v <= 5,
          ) &&
          Number.isFinite(o.reward) &&
          o.reward > 0,
      )
      .slice(0, 3);
    G.cooldowns = G.cooldowns || {};
    for (const k of ["time", "served", "harvested", "traded"])
      if (!Number.isFinite(G[k]) || G[k] < 0) G[k] = 0;
  }
} catch {
  saveAvailable = false;
}
G.inventory = { ...emptyBag(), ...G.inventory };
for (const field of ["inventory", "storage", "botInventory"]) {
  const source = G[field];
  G[field] = Object.fromEntries(ITEM_KEYS.map(k => [k, Number.isSafeInteger(source?.[k]) && source[k] >= 0 ? source[k] : 0]));
}
// Preserve legacy shared-bag stock by moving excess to the market, never discarding it.
for (const bag of [G.inventory, G.botInventory]) {
  let room = CARRY_LIMIT;
  for (const k of ITEM_KEYS) {
    const keep = Math.min(room, bag[k]);
    G.storage[k] += bag[k] - keep;
    bag[k] = keep;
    room -= keep;
  }
}
G.nodeRemaining = G.nodeRemaining && typeof G.nodeRemaining === "object" ? G.nodeRemaining : {};
let orderID = Math.max(Date.now(), ...G.orders.map((o) => o.id));
function newOrder(initial = false) {
  const count = G.orders.length;
  const items = initial
    ? [{ egg: 1, tomato: 1 }, { milk: 1, candy: 1 }, { meat: 1 }][count]
    : null;
  const needs = items || {
    [choose(Object.keys(ITEMS))]: 1 + (G.served > 5 && random() > 0.65 ? 1 : 0),
  };
  if (!items && G.served > 1 && random() > 0.4) {
    const item = choose(Object.keys(ITEMS));
    needs[item] = 1;
  }
  return {
    id: ++orderID,
    name: initial ? NAMES[count] : choose(NAMES),
    needs,
    reward: Object.entries(needs).reduce(
      (a, [k, v]) => a + ITEMS[k].value * v,
      0,
    ),
    color: Math.floor(random() * 5),
  };
}
while (G.orders.length < 3) G.orders.push(newOrder(G.served === 0));
let renderer,
  scene,
  camera,
  player,
  bot,
  clock,
  started = false,
  paused = false;
let ai,
  autoFollow = true,
  botGeneration = 0,
  botTask = "Ready when you are",
  activeShop = null,
  activeCustomer = null,
  activePlot = null;
let tick = 0,
  lastUI = 0,
  lastSave = 0,
  lastTrail = 0,
  movementKeys = {},
  joystickVector = { x: 0, z: 0 },
  hovered = null,
  mouseDown = null,
  preview = false;
let speechUntil = 0;
const fishSpots = [];
let fishing = null, captureHeld = false;
const cameraPan = new THREE.Vector3();
const nodes = [],
  interactables = [],
  npcs = new Map(),
  effects = [],
  labels = [],
  obstacles = [],
  trail = [];
let replay = null;
const raycaster = new THREE.Raycaster(),
  pointer = new THREE.Vector2(),
  groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
  groundHit = new THREE.Vector3();
const materials = new Map(),
  geometries = new Map();
const mat = (color) => {
  if (!materials.has(color))
    materials.set(
      color,
      new THREE.MeshStandardMaterial({
        color,
        roughness: 1,
        flatShading: true,
      }),
    );
  return materials.get(color);
};
function mesh(geometry, color, parent, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(
    geometry,
    typeof color === "number" ? mat(color) : color,
  );
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}
function box(w, h, d, color, parent, x = 0, y = 0, z = 0) {
  const key = `b${w},${h},${d}`;
  if (!geometries.has(key)) geometries.set(key, new THREE.BoxGeometry(w, h, d));
  return mesh(geometries.get(key), color, parent, x, y, z);
}
function ball(r, color, parent, x = 0, y = 0, z = 0, detail = 1) {
  const key = `i${r},${detail}`;
  if (!geometries.has(key))
    geometries.set(key, new THREE.IcosahedronGeometry(r, detail));
  return mesh(geometries.get(key), color, parent, x, y, z);
}
function cylinder(rt, rb, h, color, parent, x = 0, y = 0, z = 0, sides = 8) {
  const key = `c${rt},${rb},${h},${sides}`;
  if (!geometries.has(key))
    geometries.set(key, new THREE.CylinderGeometry(rt, rb, h, sides));
  return mesh(geometries.get(key), color, parent, x, y, z);
}
function rounded(w, h, d, r, color, parent, x = 0, y = 0, z = 0) {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 + r, -d / 2);
  shape.lineTo(w / 2 - r, -d / 2);
  shape.quadraticCurveTo(w / 2, -d / 2, w / 2, -d / 2 + r);
  shape.lineTo(w / 2, d / 2 - r);
  shape.quadraticCurveTo(w / 2, d / 2, w / 2 - r, d / 2);
  shape.lineTo(-w / 2 + r, d / 2);
  shape.quadraticCurveTo(-w / 2, d / 2, -w / 2, d / 2 - r);
  shape.lineTo(-w / 2, -d / 2 + r);
  shape.quadraticCurveTo(-w / 2, -d / 2, -w / 2 + r, -d / 2);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: h,
    bevelEnabled: false,
    curveSegments: 4,
  });
  geo.rotateX(-Math.PI / 2);
  return mesh(geo, color, parent, x, y, z);
}
// Static art is vertex-colored and merged to keep the village light on mobile GPUs.
function bake(group) {
  group.updateMatrixWorld(true);
  const inv = group.matrixWorld.clone().invert(),
    pos = [],
    norm = [],
    colors = [],
    remove = [];
  group.traverse((m) => {
    if (!m.isMesh || m.material.transparent) return;
    let g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
    g.applyMatrix4(inv.clone().multiply(m.matrixWorld));
    const p = g.getAttribute("position"),
      n = g.getAttribute("normal"),
      c = m.material.color;
    for (let i = 0; i < p.count; i++) {
      pos.push(p.getX(i), p.getY(i), p.getZ(i));
      norm.push(n.getX(i), n.getY(i), n.getZ(i));
      colors.push(c.r, c.g, c.b);
    }
    g.dispose();
    remove.push(m);
  });
  for (const m of remove) m.parent.remove(m);
  if (!pos.length) return;
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(norm, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const m = new THREE.Mesh(
    g,
    new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 1,
      flatShading: true,
    }),
  );
  m.castShadow = true;
  m.receiveShadow = true;
  group.add(m);
}
function textSprite(
  text,
  {
    color = "#173c2b",
    bg = "#fffff3",
    width = 5,
    scale = 1,
    small = false,
  } = {},
) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = small ? 100 : 120;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bg;
  ctx.beginPath();
  ctx.roundRect(4, 4, 504, canvas.height - 8, 22);
  ctx.fill();
  ctx.font = `${small ? "600" : "700"} ${small ? 41 : 44}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 256, canvas.height / 2, 470);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.SpriteMaterial({
    map: texture,
    depthTest: true,
    toneMapped: false,
  });
  const s = new THREE.Sprite(material);
  s.scale.set(width * scale, width * (canvas.height / 512) * scale, 1);
  return s;
}
function flowers(parent, x, z, color = 0xf3e5bb, n = 5) {
  for (let i = 0; i < n; i++) {
    const xx = x + (random() - 0.5) * 1.1,
      zz = z + (random() - 0.5) * 1.1;
    box(0.035, 0.25, 0.035, 0x829956, parent, xx, 0.13, zz);
    ball(0.09, color, parent, xx, 0.3, zz, 0);
  }
}
function fence(parent, x, z, length, alongX = true) {
  const count = Math.ceil(length / 1.6);
  for (let i = 0; i <= count; i++) {
    const a = (i / count - 0.5) * length;
    box(
      0.14,
      0.86,
      0.14,
      0xd4c5a1,
      parent,
      x + (alongX ? a : 0),
      0.43,
      z + (alongX ? 0 : a),
    );
  }
  for (const h of [0.31, 0.67])
    box(
      alongX ? length : 0.095,
      0.09,
      alongX ? 0.095 : length,
      0xdecfb0,
      parent,
      x,
      h,
      z,
    );
}
function tree(parent, x = 0, z = 0, scale = 1, type = 0) {
  const g = new THREE.Group();
  parent.add(g);
  g.position.set(x, 0, z);
  g.scale.setScalar(scale);
  cylinder(0.14, 0.22, 1.6, 0x99704e, g, 0, 0.8, 0, 7);
  const branch = cylinder(0.08, 0.12, 0.8, 0x99704e, g, 0.25, 1.4, 0, 6);
  branch.rotation.z = -0.6;
  if (type) {
    for (let i = 0; i < 3; i++)
      cylinder(
        0.05,
        1.15 - i * 0.25,
        1.6,
        [0x768d59, 0x859b60, 0x94a96d][i],
        g,
        0,
        1.4 + i * 0.65,
        0,
        7,
      );
  } else {
    ball(1.2, 0x9cb16d, g, 0, 2.35, 0, 1).scale.set(1, 0.95, 0.95);
    ball(0.8, 0xb0bd7a, g, -0.5, 2.9, 0.15, 0);
    ball(0.75, 0x8ba365, g, 0.65, 2.4, -0.2, 0);
  }
  return g;
}
function grass(parent, x = 0, z = 0, scale = 1) {
  const g = new THREE.Group();
  parent.add(g);
  g.position.set(x, 0, z);
  g.scale.setScalar(scale);
  const p = [],
    c = [];
  for (let i = 0; i < 13; i++) {
    const a = random() * Math.PI * 2,
      r = random() * 0.55,
      h = 0.35 + random() * 0.55,
      bx = Math.cos(a) * r,
      bz = Math.sin(a) * r;
    const verts = [
      bx - 0.08,
      0,
      bz,
      bx + 0.08,
      0,
      bz,
      bx + Math.cos(a) * 0.24,
      h,
      bz + Math.sin(a) * 0.24,
    ];
    p.push(
      ...verts,
      ...[...verts.slice(3, 6), ...verts.slice(0, 3), ...verts.slice(6, 9)],
    );
    const co = new THREE.Color(choose([0x9dac65, 0xb3ba73, 0x839954]));
    for (let k = 0; k < 6; k++) c.push(co.r, co.g, co.b);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(c, 3));
  geo.computeVertexNormals();
  mesh(
    geo,
    new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 1,
      side: THREE.DoubleSide,
    }),
    g,
  );
  return g;
}
function rock(parent, x = 0, z = 0, scale = 1) {
  const g = new THREE.Group();
  parent.add(g);
  g.position.set(x, 0, z);
  g.scale.setScalar(scale);
  const r = ball(0.63, 0xa5afa2, g, 0, 0.37, 0, 0);
  r.scale.set(1.2, 0.82, 1);
  r.rotation.set(0.3, 0.4, 0.1);
  ball(0.33, 0xbdc4b3, g, 0.57, 0.18, 0.17, 0);
  ball(0.2, 0x939f91, g, -0.49, 0.12, 0.4, 0);
  return g;
}
function itemMesh(item, parent, x, y, z, s = 1) {
  const g = new THREE.Group();
  parent.add(g);
  g.position.set(x, y, z);
  g.scale.setScalar(s);
  if (item === "egg") {
    ball(0.15, 0xf6e6c5, g, 0, 0.15, 0, 1).scale.set(0.9, 1.35, 0.9);
  } else if (item === "tomato") {
    ball(0.19, 0xcd7560, g, 0, 0.15, 0, 1);
    cylinder(0.02, 0.06, 0.14, 0x78974e, g, 0, 0.36, 0, 5);
  } else if (item === "meat") {
    ball(0.22, 0xc58075, g, 0, 0.12, 0, 1).scale.set(1.4, 0.55, 1);
    ball(0.07, 0xe8c9aa, g, 0.08, 0.25, 0);
  } else if (item === "milk") {
    box(0.23, 0.39, 0.23, 0xf3eade, g, 0, 0.2, 0);
    box(0.24, 0.14, 0.24, 0x93b3b7, g, 0, 0.21, 0);
    cylinder(0.07, 0.1, 0.11, 0x769fa8, g, 0, 0.46, 0);
  } else {
    ball(0.15, 0xc98ba8, g, 0, 0.16, 0, 0);
    cylinder(0.13, 0.01, 0.15, 0xe8b4c8, g, 0.2, 0.16, 0, 4).rotation.z =
      Math.PI / 2;
    cylinder(0.01, 0.13, 0.15, 0xe8b4c8, g, -0.2, 0.16, 0, 4).rotation.z =
      Math.PI / 2;
  }
  return g;
}
function crate(parent, x, y, z, item) {
  box(0.95, 0.5, 0.7, 0xbb9368, parent, x, y + 0.25, z);
  box(0.98, 0.08, 0.73, 0xd8b183, parent, x, y + 0.52, z);
  for (let j = 0; j < 3; j++)
    box(0.98, 0.035, 0.025, 0xa58058, parent, x, y + 0.1 + j * 0.14, z + 0.36);
  for (let i = 0; i < 4; i++)
    itemMesh(
      item,
      parent,
      x + ((i % 2) - 0.5) * 0.35,
      y + 0.56,
      z + (Math.floor(i / 2) - 0.5) * 0.26,
    );
}
function building(key) {
  const s = SHOPS[key],
    g = new THREE.Group();
  scene.add(g);
  g.position.set(s.x, 0, s.z);
  rounded(6.8, 0.16, 5.5, 0.25, 0xd8c9aa, g, 0, 0.01, 0.1);
  box(5.8, 2.7, 3.8, 0xf0e3c7, g, 0, 1.5, -0.45);
  for (const x of [-2.85, 2.85]) {
    box(0.18, 2.9, 0.18, 0xbba483, g, x, 1.5, 1.4);
    box(0.18, 2.9, 0.18, 0xbba483, g, x, 1.5, -2.3);
  }
  for (let i = 0; i < 5; i++)
    box(5.5, 0.035, 0.035, 0xe1d1b4, g, 0, 0.4 + i * 0.46, 1.47);
  const roofGeo = new THREE.CylinderGeometry(0, 4.45, 1.85, 4);
  roofGeo.rotateY(Math.PI / 4);
  const roof = mesh(roofGeo, s.color, g, 0, 3.53, -0.45);
  roof.scale.z = 0.78;
  box(6.6, 0.15, 4.8, s.color, g, 0, 2.91, -0.45);
  box(0.9, 0.85, 0.8, 0xc4b392, g, 1.7, 3.9, -1.2);
  box(1.05, 0.17, 0.95, 0xbca985, g, 1.7, 4.36, -1.2);
  for (let i = 0; i < 9; i++) {
    const awning = box(
      0.61,
      0.1,
      1.9,
      i % 2 ? 0xf4ead2 : s.color,
      g,
      -2.44 + i * 0.61,
      2.43,
      2.08,
    );
    awning.rotation.x = 0.17;
    box(
      0.61,
      0.25,
      0.11,
      i % 2 ? 0xf4ead2 : s.color,
      g,
      -2.44 + i * 0.61,
      2.12,
      3.01,
    );
  }
  for (const x of [-2.64, 2.64])
    box(0.12, 2.2, 0.12, 0xc5ab7a, g, x, 1.13, 2.9);
  box(5.2, 0.9, 0.9, 0xc9ad7b, g, 0, 0.63, 2.35);
  box(5.4, 0.12, 1.05, 0xe3cca1, g, 0, 1.13, 2.35);
  for (let i = 0; i < 7; i++)
    box(0.035, 0.79, 0.02, 0xbaa074, g, -2.35 + i * 0.78, 0.62, 2.81);
  const items = Object.keys(ITEMS).filter((k) => ITEMS[k].shop === key);
  for (let i = 0; i < 4; i++)
    crate(g, -1.9 + i * 1.24, 1.2, 2.28, items[i % items.length]);
  box(1.6, 1.25, 0.11, 0x667c65, g, 0, 1.72, 1.5);
  box(0.11, 1.27, 0.14, 0xe3c9a0, g, 0, 1.72, 1.58);
  box(1.63, 0.1, 0.14, 0xe3c9a0, g, 0, 1.74, 1.58);
  crate(g, 3, 0.18, 1.4, items[0]);
  flowers(g, -3.1, 2.3, 0xe4c88d, 6);
  const sign = textSprite(s.name, { width: 5.4 });
  sign.position.set(0, 3.37, 2.6);
  g.add(sign);
  bake(g);
  g.userData.target = {
    type: "shop",
    key,
    label: `${s.name} · Trade resources`,
    x: s.x,
    z: -4.6,
  };
  interactables.push(g);
  obstacles.push({ x: s.x, z: s.z - 0.2, w: 6.3, d: 6.4 });
  return g;
}
function character(color = 0xc18e5b, isBot = false) {
  const g = new THREE.Group(),
    body = new THREE.Group();
  g.add(body);
  let leftLeg, rightLeg, leftArm, rightArm;
  if (isBot) {
    rounded(0.78, 0.72, 0.63, 0.14, 0xd9e0bc, body, 0, 0.59, 0);
    box(0.61, 0.27, 0.04, 0x355c4a, body, 0, 1.08, 0.33);
    for (const x of [-0.16, 0.16]) ball(0.047, 0xc2e397, body, x, 1.11, 0.37);
    cylinder(0.018, 0.018, 0.3, 0x6f8f66, body, 0, 1.6, 0);
    ball(0.07, 0xc0d58b, body, 0, 1.78, 0);
    rounded(0.92, 0.17, 0.72, 0.1, 0x839d70, body, 0, 1.35, 0);
    leftLeg = cylinder(0.12, 0.12, 0.28, 0x6d8260, body, -0.24, 0.37, 0);
    rightLeg = cylinder(0.12, 0.12, 0.28, 0x6d8260, body, 0.24, 0.37, 0);
    leftArm = box(0.16, 0.44, 0.17, 0x9daf86, body, -0.5, 0.84, 0);
    rightArm = box(0.16, 0.44, 0.17, 0x9daf86, body, 0.5, 0.84, 0);
    box(0.35, 0.37, 0.16, 0xb69565, body, 0, 0.91, -0.4);
  } else {
    cylinder(0.29, 0.35, 0.65, color, body, 0, 0.91, 0, 8);
    box(0.46, 0.37, 0.22, 0xf0dfb9, body, 0, 0.87, 0.24);
    ball(0.31, 0xeac9a1, body, 0, 1.53, 0, 2).scale.set(0.9, 1.1, 0.9);
    ball(0.32, 0x795b44, body, 0, 1.66, -0.04, 1).scale.set(0.96, 0.65, 0.95);
    for (const x of [-0.1, 0.1]) ball(0.025, 0x3a4135, body, x, 1.55, 0.277);
    cylinder(0.4, 0.43, 0.08, 0xd8b880, body, 0, 1.88, 0, 12);
    cylinder(0.25, 0.29, 0.22, 0xe7c991, body, 0, 2.02, 0, 10);
    cylinder(0.258, 0.28, 0.06, 0x8b9861, body, 0, 1.94, 0, 10);
    leftLeg = box(0.19, 0.48, 0.2, 0x626e59, body, -0.17, 0.4, 0);
    rightLeg = box(0.19, 0.48, 0.2, 0.0 + 0x626e59, body, 0.17, 0.4, 0);
    box(0.21, 0.14, 0.3, 0x735e43, leftLeg, 0, -0.2, 0.05);
    box(0.21, 0.14, 0.3, 0x735e43, rightLeg, 0, -0.2, 0.05);
    leftArm = cylinder(0.1, 0.1, 0.51, color, body, -0.37, 1.03, 0, 7);
    rightArm = cylinder(0.1, 0.1, 0.51, color, body, 0.37, 1.03, 0, 7);
    ball(0.1, 0xeac9a1, leftArm, 0, -0.26, 0);
    ball(0.1, 0xeac9a1, rightArm, 0, -0.26, 0);
    box(0.4, 0.45, 0.18, 0x9c7d52, body, 0, 1, -0.32);
  }
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.5, 20),
    new THREE.MeshBasicMaterial({
      color: 0x3d583e,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.025;
  g.add(shadow);
  g.userData = {
    body,
    leftLeg,
    rightLeg,
    leftArm,
    rightArm,
    path: [],
    speed: isBot ? 4.7 : 5.2,
    phase: 0,
    job: null,
    working: 0,
    resolve: null,
    isBot,
  };
  g.traverse((part) => { if (part.isMesh) part.castShadow = false; });
  scene.add(g);
  return g;
}

function createNode(type, x, z, plot = null) {
  const id = `${type}:${x}:${z}`,
    root = new THREE.Group();
  root.position.set(x, 0, z);
  scene.add(root);
  const art =
    type === "wood"
      ? tree(root, 0, 0, 0.9 + random() * 0.18, random() > 0.65)
      : type === "stone"
        ? rock(root)
        : grass(root, 0, 0, 1.1);
  if (type !== "grass") bake(art);
  const node = {
    id,
    type,
    x,
    z,
    plot,
    root,
    art,
    remaining: Number.isInteger(G.nodeRemaining[id]) && G.nodeRemaining[id] > 0 && G.nodeRemaining[id] <= 3 ? G.nodeRemaining[id] : 3,
    cooldown: Math.max(0, Number(G.cooldowns[id]) || 0),
    reserved: null,
  };
  if (node.cooldown > 0) art.scale.setScalar(0.12);
  const hitArea = new THREE.Mesh(
    new THREE.BoxGeometry(1.15, type === 'wood' ? 2.7 : 0.9, 1.15),
    new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),
  );
  hitArea.position.y = type === 'wood' ? 1.35 : 0.45;
  root.add(hitArea);
  root.userData.target = {
    type: "resource",
    node,
    label: `${type === "wood" ? "Tree" : type === "grass" ? "Wild grass" : "Stone"} · Gather +3 ${type}`,
    x,
    z,
  };
  nodes.push(node);
  interactables.push(root);
  if (type === "wood") obstacles.push({ x, z, w: 0.65, d: 0.65, node });
  return node;
}
function buildPlot(plot) {
  const g = new THREE.Group();
  scene.add(g);
  plot.group = g;
  if (plot.id === "lake") {
    rounded(14, 1.35, 17, 1, 0xc1b495, g, 23, -1.48, 4.5);
    rounded(14, 0.22, 17, 1, 0xa7b780, g, 23, -0.2, 4.5);
    rounded(14, 0.12, 17, 1, 0xbac991, g, 23, -0.09, 4.5);
    const water = new THREE.Mesh(new THREE.CircleGeometry(1, 40), new THREE.MeshBasicMaterial({ color: 0x80b8b7 }));
    water.rotation.x = -Math.PI / 2;
    water.scale.set(4.5, 3.6, 1);
    water.position.set(23, 0.07, 5);
    g.add(water);
    for (const [dx, dz] of [[-2, 0], [1, -1.4], [2, 1.4]]) {
      const art = new THREE.Group();
      g.add(art);
      art.position.set(23 + dx, 0.16, 5 + dz);
      ball(0.23, 0x365e62, art).scale.set(1.8, 0.25, 0.8);
      cylinder(0, 0.2, 0.35, 0x365e62, art, -0.4, 0, 0, 3).rotation.z = Math.PI / 2;
      const spot = { x: 23 + dx, z: 5 + dz, art, cooldown: 0 };
      fishSpots.push(spot);
      art.userData.target = { type: "fish", spot, label: "Fish · Wade close, then hold Capture", x: spot.x, z: spot.z };
      interactables.push(art);
      bake(art);
    }
  } else rounded(plot.w, 0.018, plot.d, 0.35, 0xc3cbaa, g, plot.x, 0.027, plot.z);
  fence(g, plot.x, plot.z + plot.d / 2, plot.w);
  fence(g, plot.x - plot.w / 2, plot.z, plot.d, false);
  fence(g, plot.x + plot.w / 2, plot.z, plot.d, false);
  for (let i = 0; i < 16; i++)
    flowers(
      g,
      plot.x + (random() - 0.5) * (plot.w - 1),
      plot.z + (random() - 0.5) * (plot.d - 1),
      0xe1dab4,
      2,
    );
  const signGroup = new THREE.Group();
  g.add(signGroup);
  box(
    0.12,
    1.1,
    0.12,
    0xb4976e,
    signGroup,
    plot.x,
    0.55,
    plot.z - plot.d / 2 + 0.2,
  );
  const sign = textSprite(`${plot.cost} coins · Grow here`, {
    width: 4.6,
    color: "#354c2c",
    bg: "#faf5df",
    small: true,
  });
  sign.position.set(plot.x, 1.55, plot.z - plot.d / 2 + 0.2);
  signGroup.add(sign);
  plot.sign = signGroup;
  g.userData.target = {
    type: "plot",
    plot,
    label: `${plot.name} · ${plot.cost} coins`,
    x: plot.x,
    z: plot.z - plot.d / 2 - 0.65,
  };
  interactables.push(g);
  if (plot.id !== "lake") bake(g);
  for (const [type, dx, dz] of (plot.id === "lake" ? [["wood", -5, 2], ["grass", 5, -2], ["stone", -5, -2]] : [
    ["wood", -3, 0],
    ["wood", 2.8, 0.3],
    ["grass", -0.8, -0.8],
    ["grass", 1.3, 0.9],
    ["stone", -2, 1.1],
    ["stone", 3, -1],
  ]))
    createNode(type, plot.x + dx, plot.z + dz, plot.id);
  updatePlot(plot);
}
function updatePlot(plot) {
  const owned = G.land.includes(plot.id);
  plot.group.visible = plotUnlocked(plot);
  plot.sign.visible = !owned;
  if (plot.id === "lake") fishSpots.forEach(f => { f.art.visible = owned && f.cooldown <= 0; });
  plot.group.userData.target.disabled = owned;
  nodes
    .filter((n) => n.plot === plot.id)
    .forEach((n) => (n.root.visible = owned));
}
function buildWorld() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeef1e5);
  scene.fog = new THREE.Fog(0xeef1e5, 75, 145);
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  $("world").appendChild(renderer.domElement);
  renderer.domElement.setAttribute(
    "aria-label",
    "3D Market Meadow. Click to move and interact.",
  );
  const hemi = new THREE.HemisphereLight(0xfff9e8, 0x859b71, 2.1);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffefcc, 2.7);
  sun.position.set(-20, 35, 16);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, {
    left: -27,
    right: 27,
    top: 24,
    bottom: -24,
    near: 1,
    far: 95,
  });
  sun.shadow.normalBias = 0.035;
  sun.shadow.bias = -0.0004;
  sun.shadow.radius = 3;
  scene.add(sun);
  camera = new THREE.OrthographicCamera();
  camera.position.set(30, 38, 42);
  camera.lookAt(0, 0, 0);
  camera.zoom = 1.06;
  resize();
  const land = new THREE.Group();
  scene.add(land);
  rounded(34, 1.35, 28, 1.7, 0xc1b495, land, 0, -1.48, 0);
  rounded(34.1, 0.22, 28.1, 1.7, 0xa7b780, land, 0, -0.2, 0);
  rounded(33.7, 0.12, 27.7, 1.6, 0xbac991, land, 0, -0.09, 0);
  rounded(160, 0.1, 160, 5, 0xeef1e5, land, 0, -1.63, 0);
  for (let i = 0; i < 50; i++) {
    const x = (random() - 0.5) * 32,
      z = (random() - 0.5) * 26;
    const p = ball(
      0.1 + random() * 0.12,
      choose([0xc9d49e, 0xacbd88, 0xd3d8aa]),
      land,
      x,
      0.025,
      z,
      0,
    );
    p.scale.set(2.5, 0.05, 1.8);
  }
  rounded(30, 0.024, 2.3, 0.9, 0xe4ddbd, land, 0, 0.03, -3.5);
  rounded(2.3, 0.025, 16, 0.75, 0xe4ddbd, land, 1, 0.03, 4.3);
  rounded(8.7, 0.026, 2.2, 0.65, 0xe4ddbd, land, 5, 0.04, 3.3);
  for (let i = 0; i < 26; i++)
    rounded(
      0.7 + random() * 0.3,
      0.016,
      0.55,
      0.1,
      choose([0xeae4ca, 0xe8e0c3, 0xddd6b5]),
      land,
      -13.7 + i * 1.07,
      0.062,
      -3.5 + (random() - 0.5),
    );
  for (let i = 0; i < 13; i++)
    rounded(
      0.68,
      0.016,
      0.7,
      0.13,
      0xeee5ca,
      land,
      1 + (random() - 0.5) * 0.4,
      0.065,
      -2 + i * 1.07,
    );
  for (let i = 0; i < 15; i++)
    flowers(
      land,
      -15.3 + i * 2.1,
      -12.5,
      choose([0xebe1b0, 0xead0a5, 0xffffff]),
      4,
    );
  fence(land, -0.8, -13, 30);
  fence(land, -16.2, -6.8, 11, false);
  fence(land, 16.2, -2, 21, false);
  for (const x of [-15, 15]) tree(land, x, -11.5, 1.1, 1);
  for (const [x, z] of [
    [-15, 6],
    [15, 6],
    [-4, 12.5],
    [4, 12.5],
  ]) {
    cylinder(0.22, 0.33, 0.45, 0xc09570, land, x, 0.22, z);
    ball(0.43, 0x8fa367, land, x, 0.74, z, 1);
    flowers(land, x + 0.1, z + 0.1, 0xf0d799, 3);
  }
  bake(land);
  for (const key of Object.keys(SHOPS)) building(key);
  const checkout = new THREE.Group();
  scene.add(checkout);
  checkout.position.set(8, 0, 2);
  rounded(6.6, 0.15, 4.1, 0.35, 0xdad0aa, checkout, 0, 0.04, 0);
  box(4.1, 0.95, 1.5, 0x7d9869, checkout, 0, 0.66, 0);
  box(4.3, 0.16, 1.7, 0xe5ce9e, checkout, 0, 1.22, 0);
  for (let i = 0; i < 5; i++)
    box(0.04, 0.76, 0.025, 0x9faf7b, checkout, -1.7 + i * 0.85, 0.65, 0.77);
  for (const x of [-2.1, 2.1])
    box(0.13, 2.8, 0.13, 0xb89c70, checkout, x, 1.43, 0);
  for (let i = 0; i < 8; i++) {
    const a = box(
      0.58,
      0.11,
      2.7,
      i % 2 ? 0xece4c4 : 0x779467,
      checkout,
      -2.03 + i * 0.58,
      2.98,
      0,
    );
    a.rotation.x = 0.05;
    box(
      0.58,
      0.27,
      0.13,
      i % 2 ? 0xece4c4 : 0x779467,
      checkout,
      -2.03 + i * 0.58,
      2.83,
      1.3,
    );
  }
  box(0.55, 0.35, 0.45, 0x566c57, checkout, 0.9, 1.46, 0.1);
  box(0.5, 0.04, 0.2, 0xbed1a0, checkout, 0.9, 1.65, 0.23);
  crate(checkout, -1.3, 1.3, 0, "tomato");
  const sign = textSprite("Your little market", {
    width: 5.2,
    color: "#173c2b",
  });
  sign.position.set(0, 3.42, 0);
  checkout.add(sign);
  bake(checkout);
  checkout.userData.target = {
    type: "checkout",
    label: "Your market · Serve customers",
    x: 8,
    z: 4.1,
  };
  interactables.push(checkout);
  obstacles.push({ x: 8, z: 2, w: 4.8, d: 2.5 });
  const decor = new THREE.Group();
  scene.add(decor);
  for (const [x, z] of [
    [-3.5, -2],
    [13, -3.5],
    [-3.5, 5],
  ]) {
    cylinder(0.05, 0.075, 3, 0x7e8160, decor, x, 1.5, z);
    box(0.38, 0.54, 0.38, 0xe3d5a4, decor, x, 3, z);
    cylinder(0, 0.35, 0.3, 0x72866c, decor, x, 3.39, z, 4);
  }
  box(2, 0.13, 0.65, 0xc2a579, decor, -2.8, 0.67, 5.5);
  box(2, 0.48, 0.12, 0xc2a579, decor, -2.8, 1.06, 5.23);
  for (const x of [-3.5, -2.1])
    box(0.12, 0.62, 0.52, 0x7f8863, decor, x, 0.33, 5.5);
  const meadowSign = textSprite("THE MEADOW", {
    width: 3.3,
    small: true,
    color: "#354c2c",
    bg: "#f8f5dc",
  });
  meadowSign.position.set(-9, 0.72, 5.9);
  decor.add(meadowSign);
  bake(decor);
  for (const [type, x, z] of [
    ["wood", -13, -0.4],
    ["wood", -9, 1],
    ["wood", -14, 3.5],
    ["wood", -6, 4.5],
    ["wood", 14, -0.5],
    ["grass", -11, -0.1],
    ["grass", -7, -0.2],
    ["grass", -12, 2.3],
    ["grass", -8, 3.7],
    ["grass", -5, 1],
    ["grass", -10, 4.5],
    ["grass", 13, 4],
    ["stone", -14, 1.3],
    ["stone", -10, 3],
    ["stone", -5, -0.4],
    ["stone", -4, 4],
    ["stone", 14, 2],
  ])
    createNode(type, x, z);
  for (const plot of PLOTS) buildPlot(plot);
  player = character();
  player.position.set(
    Number.isFinite(G.player?.x) ? G.player.x : -1,
    0,
    Number.isFinite(G.player?.z) ? G.player.z : 3,
  );
  if (!canWalk(player.position.x, player.position.z))
    player.position.set(-1, 0, 3);
  bot = character(0, true);
  bot.position.copy(player.position).add(new THREE.Vector3(1.5, 0, 1));
  if (!canWalk(bot.position.x, bot.position.z)) bot.position.copy(player.position);
  const pipLabel = textSprite("PIP", {
    width: 1.12,
    small: true,
    color: "#5f7651",
    bg: "#f7f8e7",
  });
  pipLabel.position.y = 2.08;
  bot.add(pipLabel);
  const playerRing = new THREE.Mesh(
    new THREE.RingGeometry(0.54, 0.59, 32),
    new THREE.MeshBasicMaterial({
      color: 0xfff3c3,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    }),
  );
  playerRing.rotation.x = -Math.PI / 2;
  playerRing.position.y = 0.035;
  player.add(playerRing);
  for (const order of G.orders) spawnNPC(order, true);
}
function resize() {
  if (!renderer) return;
  const w = innerWidth,
    h = innerHeight,
    aspect = w / h,
    half = w < 850 ? 19.5 : 16.4;
  renderer.setSize(w, h);
  camera.left = -half * aspect;
  camera.right = half * aspect;
  camera.top = half;
  camera.bottom = -half;
  camera.near = 0.1;
  camera.far = 200;
  camera.setViewOffset(
    w,
    h,
    Math.round(w * (w > 850 ? 0.105 : 0)),
    Math.round(h * (w > 850 ? -0.025 : -0.012)),
    w,
    h,
  );
  if (w <= 850) {
    camera.left = -19.5;
    camera.right = 19.5;
    camera.top = 19.5 / aspect;
    camera.bottom = -19.5 / aspect;
  }
  camera.updateProjectionMatrix();
}
function canWalk(x, z) {
  const original = x >= -16 && x <= 16 && z >= -12.8 && z <= 13;
  const extension = plotUnlocked(PLOTS.find(p => p.id === "lake")) && x >= 16 && x <= 29.5 && z >= -3.5 && z <= 12.5;
  if (!original && !extension) return false;
  if (
    PLOTS.some(
      (p) =>
        !G.land.includes(p.id) &&
        x > p.x - p.w / 2 - 0.1 &&
        x < p.x + p.w / 2 + 0.1 &&
        z > p.z - p.d / 2 - 0.1 &&
        z < p.z + p.d / 2 + 0.1,
    )
  )
    return false;
  return !obstacles.some(
    (o) =>
      (!o.node || o.node.root.visible) &&
      Math.abs(x - o.x) < o.w / 2 + 0.22 &&
      Math.abs(z - o.z) < o.d / 2 + 0.22,
  );
}
function findPath(from, to) {
  if (![from.x, from.z, to.x, to.z].every(Number.isFinite)) return null;
  const step = 0.65,
    xmin = -16.25,
    zmin = -13,
    cols = 72,
    rows = 41;
  const cell = (x, z) => [
    Math.round((x - xmin) / step),
    Math.round((z - zmin) / step),
  ];
  const coords = (x, z) => ({ x: xmin + x * step, z: zmin + z * step });
  const [sx, sz] = cell(from.x, from.z);
  if (sx < 0 || sx >= cols || sz < 0 || sz >= rows) return null;
  let [tx, tz] = cell(to.x, to.z);
  let endpoint = coords(tx, tz);
  if (!canWalk(endpoint.x, endpoint.z)) {
    let best = null,
      dist = Infinity;
    for (let dx = -3; dx <= 3; dx++)
      for (let dz = -3; dz <= 3; dz++) {
        const p = coords(tx + dx, tz + dz),
          d = Math.hypot(p.x - to.x, p.z - to.z);
        if (canWalk(p.x, p.z) && d < dist) {
          dist = d;
          best = [tx + dx, tz + dz];
        }
      }
    if (!best) return null;
    [tx, tz] = best;
  }
  const key = (x, z) => z * cols + x,
    start = key(sx, sz),
    goal = key(tx, tz),
    open = [start],
    scores = new Map([[start, 0]]),
    prev = new Map(),
    done = new Set();
  let count = 0;
  while (open.length && count++ < 2300) {
    let bi = 0,
      bscore = Infinity;
    for (let i = 0; i < open.length; i++) {
      const k = open[i],
        h = Math.hypot((k % cols) - tx, Math.floor(k / cols) - tz),
        score = scores.get(k) + h;
      if (score < bscore) {
        bi = i;
        bscore = score;
      }
    }
    const current = open.splice(bi, 1)[0];
    if (current === goal) {
      const path = [];
      let k = current;
      while (k !== start && k !== undefined) {
        const x = k % cols,
          z = Math.floor(k / cols);
        path.unshift(coords(x, z));
        k = prev.get(k);
      }
      return path;
    }
    done.add(current);
    const cx = current % cols,
      cz = Math.floor(current / cols);
    for (const [dx, dz] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
    ]) {
      const nx = cx + dx,
        nz = cz + dz,
        k = key(nx, nz);
      if (nx < 0 || nx >= cols || nz < 0 || nz >= rows || done.has(k)) continue;
      const p = coords(nx, nz);
      if (!canWalk(p.x, p.z)) continue;
      if (dx && dz) {
        const a = coords(cx + dx, cz),
          b = coords(cx, cz + dz);
        if (!canWalk(a.x, a.z) || !canWalk(b.x, b.z)) continue;
      }
      const score = scores.get(current) + (dx && dz ? 1.414 : 1);
      if (!scores.has(k) || score < scores.get(k)) {
        scores.set(k, score);
        prev.set(k, current);
        if (!open.includes(k)) open.push(k);
      }
    }
  }
  return null;
}
function cancelActor(actor, reason = "Task stopped.") {
  const d = actor.userData;
  d.path = [];
  if (d.job?.node?.reserved === actor) d.job.node.reserved = null;
  d.job = null;
  d.working = 0;
  if (d.resolve) {
    const resolve = d.resolve;
    d.resolve = null;
    resolve(reason);
  }
}
function navigate(actor, target, job = null) {
  cancelActor(actor);
  const path = findPath(actor.position, target);
  if (!path) {
    if (job?.node?.reserved === actor) job.node.reserved = null;
    return Promise.resolve("That spot is not reachable yet.");
  }
  actor.userData.path = path;
  actor.userData.job = job;
  if (job?.node) job.node.reserved = actor;
  return new Promise((resolve) => {
    actor.userData.resolve = resolve;
  });
}
function nodeReady(n) {
  return n.root.visible && n.cooldown <= 0 && !n.reserved;
}
function actorBag(actor = player) { return actor === bot ? G.botInventory : G.inventory; }
function marketCount(k, actor = player) { return G.storage[k] + actorBag(actor)[k]; }
function atMarket(actor) { return Math.hypot(actor.position.x - 8, actor.position.z - 4.1) <= 2.5; }
function affordable(item, amount = 1, actor = player) {
  return !!ITEMS[item] && Number.isInteger(amount) && amount > 0 && amount <= CARRY_LIMIT &&
    Object.entries(ITEMS[item].cost).every(([k, v]) => actorBag(actor)[k] >= v * amount);
}
function canServe(order, actor = player) {
  return Object.entries(order.needs).every(([k, v]) => marketCount(k, actor) >= v);
}
function deposit(actor) {
  if (!atMarket(actor)) return "Walk to Your little market to store items.";
  const bag = actorBag(actor), amount = countBag(bag);
  for (const k of ITEM_KEYS) { G.storage[k] += bag[k]; bag[k] = 0; }
  updateUI(); save();
  return `Stored ${amount} items at Your little market.`;
}
function withdraw(item, amount = 1, actor = player) {
  if (!atMarket(actor)) return "Walk to Your little market to collect stored items.";
  const bag = actorBag(actor);
  if (!ITEM_KEYS.includes(item) || !Number.isInteger(amount) || amount < 1 || G.storage[item] < amount) return "Not enough stored stock.";
  if (countBag(bag) + amount > CARRY_LIMIT) return "Hands full: carry at most 5 items. Store some first.";
  G.storage[item] -= amount; bag[item] += amount;
  updateUI(); save();
  return `Collected ${amount} ${item} from market storage.`;
}
function consumeMarket(needs, actor) {
  const bag = actorBag(actor);
  for (const [k, v] of Object.entries(needs)) {
    const fromHand = Math.min(bag[k], v);
    bag[k] -= fromHand; G.storage[k] -= v - fromHand;
  }
}
function updateCarry(actor) {
  if (!actor) return;
  const count = countBag(actorBag(actor));
  if (!actor.userData.carry) {
    const group = new THREE.Group();
    actor.add(group); actor.userData.carry = group;
    for (let i = 0; i < CARRY_LIMIT; i++) box(0.3, 0.22, 0.3, 0xc1a174, group, (i % 2 - 0.5) * 0.32, 0.7 + Math.floor(i / 2) * 0.23, 0.6);
  }
  actor.userData.carry.children.forEach((part, i) => { part.visible = i < count; });
  actor.userData.carry.visible = count > 0;
}
function record(text) {
  G.journal.push({ day: 1 + Math.floor(G.time / 300), text });
  if (G.journal.length > 60) G.journal.shift();
}
function toast(text, error = false) {
  const div = document.createElement("div");
  div.className = `toast${error ? " error" : ""}`;
  div.textContent = text;
  $("toast-stack").append(div);
  setTimeout(() => div.remove(), 3700);
}
function speak(text) {
  $("speech").textContent = text;
  $("speech").style.display = "block";
  speechUntil = tick + 4;
}
let audioContext = null,
  soundEnabled = false;
try { soundEnabled = localStorage.getItem("market-meadow-sound") === "on"; } catch {}
function updateSoundButton() {
  $("sound").innerHTML = icons[soundEnabled ? "soundOn" : "soundOff"];
  $("sound").setAttribute("aria-pressed", String(soundEnabled));
  $("sound").setAttribute("aria-label", soundEnabled ? "Mute sound" : "Turn sound on");
  $("sound").title = soundEnabled ? "Mute sound" : "Turn sound on";
}
function sound(kind = "gather") {
  if (!soundEnabled) return;
  try {
    audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
    audioContext.resume().catch(() => {});
    const notes =
      kind === "coin"
        ? [660, 880, 1100]
        : kind === "land"
          ? [330, 440, 550, 660]
          : kind === "error"
            ? [170, 140]
            : [420, 590];
    notes.forEach((freq, i) => {
      const osc = audioContext.createOscillator(),
        gain = audioContext.createGain(),
        at = audioContext.currentTime + i * 0.07;
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, at);
      gain.gain.setValueAtTime(0, at);
      gain.gain.linearRampToValueAtTime(0.045, at + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, at + 0.18);
      osc.connect(gain).connect(audioContext.destination);
      osc.start(at);
      osc.stop(at + 0.2);
    });
  } catch {}
}
function burst(x, z, color = 0xeac568) {
  for (let i = 0; i < 9; i++) {
    const p = ball(0.085, color, scene, x, 1, z, 0);
    p.castShadow = false;
    effects.push({
      mesh: p,
      life: 0.8,
      velocity: new THREE.Vector3(
        (random() - 0.5) * 3,
        2 + random() * 2,
        (random() - 0.5) * 3,
      ),
    });
  }
}
function collectNode(n, actor, requested = 3) {
  if (n.cooldown > 0 || !n.root.visible) return "That resource is regrowing. Try another patch.";
  const bag = actorBag(actor), amount = Math.min(n.remaining, requested, CARRY_LIMIT - countBag(bag));
  if (amount <= 0) return "Hands full: carry at most 5 items. Store them at Your little market.";
  bag[n.type] += amount;
  G.harvested += amount;
  n.remaining -= amount;
  n.reserved = null;
  if (!n.remaining) {
    n.cooldown = n.type === "grass" ? 24 : n.type === "wood" ? 42 : 38;
    n.remaining = 3;
    n.art.scale.setScalar(0.12);
    renderer.shadowMap.needsUpdate = true;
  }
  G.nodeRemaining[n.id] = n.remaining;
  G.cooldowns[n.id] = n.cooldown;
  burst(n.x, n.z, n.type === "stone" ? 0xbfc6b0 : n.type === "wood" ? 0xd0ae72 : 0xb5c98b);
  record(`Gathered ${amount} ${n.type}${actor === bot ? " with Pip" : ""}.`);
  sound(); toast(`+${amount} ${n.type} · ${countBag(bag)}/5 carried`);
  updateUI(); save();
  return `Gathered ${amount} ${n.type}. Carrying ${countBag(bag)}/5.`;
}
function trade(item, amount = 1, actor = player) {
  if (!affordable(item, amount, actor)) {
    sound("error");
    return `Not enough resources for ${amount} ${ITEMS[item].name.toLowerCase()}. Need ${Object.entries(
      ITEMS[item].cost,
    )
      .map(([k, v]) => `${v * amount} ${k}`)
      .join(" + ")}.`;
  }
  const bag = actorBag(actor);
  const costCount = Object.values(ITEMS[item].cost).reduce((sum, n) => sum + n, 0) * amount;
  if (countBag(bag) - costCount + amount > CARRY_LIMIT) return "Hands full: store items at your market first.";
  for (const [k, v] of Object.entries(ITEMS[item].cost)) bag[k] -= v * amount;
  bag[item] += amount;
  G.traded += amount;
  record(
    `Traded resources for ${amount} ${ITEMS[item].name.toLowerCase()}${actor === bot ? " with Pip" : ""}.`,
  );
  sound();
  burst(actor.position.x, actor.position.z);
  toast(`+${amount} ${ITEMS[item].name} · ${countBag(bag)}/5 carried`);
  updateUI();
  save();
  return `Fetched ${amount} ${ITEMS[item].name.toLowerCase()}. Carrying ${countBag(bag)}/5.`;
}
function serve(id, actor = player) {
  const index = G.orders.findIndex((o) => o.id === id),
    order = G.orders[index];
  if (!order) return "That customer has already been served.";
  if (!atMarket(actor)) return "Walk to Your little market to serve customers.";
  if (!canServe(order, actor))
    return "The order is not ready. Collect every requested item first.";
  consumeMarket(order.needs, actor);
  G.coins += order.reward;
  G.served++;
  G.orders.splice(index, 1);
  const npc = npcs.get(id);
  if (npc) {
    npc.userData.leaving = true;
    npc.userData.path = findPath(npc.position, { x: 1, z: 12.6 }) || [];
    npc.userData.leaveTimer = 0;
  }
  record(
    `Served ${order.name} for ${order.reward} coins${actor === bot ? " with Pip" : ""}.`,
  );
  toast(
    `${order.name}: "${choose(["Just what I needed!", "You made my day!", "See you again soon!", "Thank you, neighbor!"])}" +${order.reward} coins`,
  );
  sound("coin");
  burst(8, 4.3);
  const next = newOrder();
  G.orders.push(next);
  spawnNPC(next);
  repositionNPCs();
  updateUI();
  save();
  return `Served ${order.name} and collected ${order.reward} coins. Balance: ${G.coins}.`;
}
function buyLand(plot) {
  if (!plot || G.land.includes(plot.id)) return "That land is already owned.";
  if (!plotUnlocked(plot)) { toast("Buy both the orchard and Sunstone garden first.", true); return "Buy both original properties first."; }
  if (G.coins < plot.cost) {
    toast(`Save ${plot.cost - G.coins} more coins to grow here.`, true);
    return;
  }
  G.coins -= plot.cost;
  G.land.push(plot.id);
  renderer.shadowMap.needsUpdate = true;
  PLOTS.forEach(updatePlot);
  for (const n of nodes.filter((n) => n.plot === plot.id))
    burst(n.x, n.z, 0xd6df9d);
  record(`Bought ${plot.name} for ${plot.cost} coins.`);
  sound("land");
  toast(`Welcome to ${plot.name}! New resources are ready.`);
  $("shop-dialog").close();
  updateUI();
  save();
  return `Bought ${plot.name} for ${plot.cost} coins.`;
}
function spawnNPC(order, initial = false) {
  const npc = character(
    [0xb7a270, 0xa8897e, 0x899d92, 0xb1a27f, 0x89927b][order.color],
  );
  npc.scale.setScalar(0.83);
  npc.userData.orderId = order.id;
  npc.userData.speed = 2.1;
  npc.userData.leaving = false;
  const index = G.orders.indexOf(order);
  npc.position.set(
    initial ? 6.7 - index * 1.25 : 1,
    0,
    initial ? 4.8 + index * 0.3 : 12.7,
  );
  npcs.set(order.id, npc);
  if (!initial)
    npc.userData.path =
      findPath(npc.position, { x: 6.7 - index * 1.25, z: 4.8 + index * 0.3 }) ||
      [];
}
function repositionNPCs() {
  G.orders.forEach((o, i) => {
    const npc = npcs.get(o.id);
    if (npc)
      npc.userData.path =
        findPath(npc.position, { x: 6.7 - i * 1.25, z: 4.8 + i * 0.3 }) || [];
  });
}

function portrait(order) {
  const colors = ["#d8dbc0", "#e7d6c7", "#d7e3db", "#e8dfc5", "#dcdac8"];
  return `<div class="portrait" style="--portrait-bg:${colors[order.color]}">${svg(`<path d="M4 34c0-13 24-13 24 0" fill="${["#ad9873", "#bd9381", "#8eaaa0", "#b7a67f", "#9aa287"][order.color]}"/><ellipse cx="16" cy="16" rx="8" ry="10" fill="#e5c7a1"/><path d="M8 15c-2-13 18-13 16 0l-4-5-11 4" fill="#79654d"/><path d="M5 9h22M10 8V4h12v4" stroke="#b89f6b" stroke-width="3" stroke-linecap="round"/><circle cx="13" cy="16" r=".8" fill="#455043"/><circle cx="19" cy="16" r=".8" fill="#455043"/><path d="M14 20q2 2 4 0" stroke="#bc8b6e"/>`)}</div>`;
}
function updateUI() {
  for (const k of Object.keys(G.inventory)) {
    if ($(`${k}-count`)) $(`${k}-count`).textContent = G.inventory[k];
    if (ITEMS[k])
      document
        .querySelector(`[data-item="${k}"]`)
        .classList.toggle("stocked", G.inventory[k] > 0);
  }
  updateCarry(player); updateCarry(bot);
  if ($("carry-status")) $("carry-status").textContent = `You ${countBag(G.inventory)}/5 · Pip ${countBag(G.botInventory)}/5 · Stored ${countBag(G.storage)} · Fish ${G.inventory.fish}`;
  $("coins").textContent = G.coins;
  $("day").textContent = 1 + Math.floor(G.time / 300);
  $("order-count").textContent = G.orders.length;
  $("mobile-count").textContent = G.orders.length;
  $("order-list").innerHTML = G.orders
    .map(
      (o) =>
        `<div class="order">${portrait(o)}<div class="order-info"><strong>${esc(o.name)}<span style="font-weight:400;color:#a0a78f;font-size:9px"> would like</span></strong><div class="order-needs">${Object.entries(
          o.needs,
        )
          .map(
            ([k, v]) =>
              `<span class="need ${marketCount(k) >= v ? "have" : ""}" title="${ITEMS[k].name}: ${marketCount(k)} / ${v}">${icons[k]} ${v}</span>`,
          )
          .join(
            "",
          )}</div></div><button class="serve-order ${canServe(o) ? "ready" : ""}" data-order="${o.id}" title="${canServe(o) ? "Walk to checkout and serve" : "View this customer request"}">${canServe(o) ? "Sell" : icons.coin} ${o.reward}</button></div>`,
    )
    .join("");
  const stages = [
    {
      done: G.harvested >= 3,
      title: "A pocketful of possibilities",
      description:
        "Click the grass, trees, or rocks to gather your first resources.",
      detail: `Gather 3 resources · ${Math.min(G.harvested, 3)} / 3`,
      progress: G.harvested / 3,
    },
    {
      done: G.traded >= 1,
      title: "Something for something",
      description:
        "Visit a shop. Trade your resources for the food your neighbors need.",
      detail: "Make your first resource trade",
      progress: 0,
    },
    {
      done: G.served >= 1,
      title: "Your very first happy customer",
      description:
        "Fill an order, then head to your market to collect those first coins.",
      detail: "Complete a customer order",
      progress: 0,
    },
    {
      done: G.land.length >= 1,
      title: "A little more room to grow",
      description:
        "Save 65 coins for the orchard. More land means more resources to gather.",
      detail: `Orchard fund · ${Math.min(G.coins, 65)} / 65 coins`,
      progress: G.coins / 65,
    },
  ];
  const index = stages.findIndex((s) => !s.done),
    q =
      index < 0
        ? {
            title: "Look how far you have grown.",
            description:
              "Keep your neighbors happy. Unlock every plot and make this meadow your own.",
            detail: `${G.served} happy customers · ${G.land.length + 1} plots`,
            progress: 1,
          }
        : stages[index];
  $("quest-step").textContent = index < 0 ? "04 / 04" : `0${index + 1} / 04`;
  $("quest-title").textContent = q.title;
  $("quest-description").textContent = q.description;
  $("quest-detail").textContent = q.detail;
  $("quest-progress").style.width = `${Math.min(1, q.progress) * 100}%`;
  $("helper-task").textContent = botTask;
  if ($("shop-dialog").open) renderShop();
}
function save() {
  if (!player) return;
  G.player = { x: player.position.x, z: player.position.z };
  for (const n of nodes) { G.cooldowns[n.id] = n.cooldown; G.nodeRemaining[n.id] = n.remaining; }
  try {
    localStorage.setItem(SAVE, JSON.stringify(G));
    saveAvailable = true;
    $("save-state").textContent = "Progress saved on this device";
  } catch {
    if (saveAvailable)
      toast(
        "Device storage is unavailable. This session will not be saved.",
        true,
      );
    saveAvailable = false;
    $("save-state").textContent = "Session only · storage unavailable";
  }
}
function addMessage(role, text) {
  const div = document.createElement("div");
  div.className = `message ${role}`;
  div.textContent = text;
  $("chat-log").append(div);
  while ($("chat-log").children.length > 50) $("chat-log").firstChild.remove();
  $("chat-log").scrollTop = $("chat-log").scrollHeight;
}
function showDialog(kind, value) {
  activeShop = kind === "shop" ? value : null;
  activeCustomer = kind === "customer" ? value : null;
  activePlot = kind === "plot" ? value : null;
  renderShop();
  $("shop-dialog").showModal();
}
function renderShop() {
  const root = $("shop-content");
  if (activeShop) {
    const shop = SHOPS[activeShop],
      items = Object.keys(ITEMS).filter((k) => ITEMS[k].shop === activeShop);
    root.innerHTML = `<div class="shop-banner" style="--shop-bg:${activeShop === "dairy" ? "#dfebdf" : activeShop === "pantry" ? "#f0e0ce" : "#e8efd9"}">${items.map((k) => icons[k]).join("")}</div><div class="eyebrow">${shop.tag}</div><h2>${esc(shop.name)}</h2><p>Trade resources in your hands. You and Pip each carry at most 5 items. Store extras at Your little market.</p>${items
      .map(
        (k) =>
          `<div class="shop-item"><span>${icons[k]}</span><div class="shop-item-info"><strong>${ITEMS[k].name}</strong><div class="shop-cost">${Object.entries(
            ITEMS[k].cost,
          )
            .map(
              ([r, v]) =>
                `<span style="color:${G.inventory[r] < v ? "#ba8569" : "#70875b"}">${icons[r]} ${v} ${r}</span>`,
            )
            .join(
              "",
            )}</div></div><button class="primary" data-trade="${k}" ${affordable(k) ? "" : "disabled"}>Trade for 1</button></div>`,
      )
      .join(
        "",
      )}<p class="shop-note">Resources are your currency here. Save coins to buy new land.</p>`;
  } else if (activePlot) {
    const p = activePlot;
    root.innerHTML = `<div class="shop-banner">${icons.sprout}</div><div class="eyebrow">A LITTLE MORE ROOM TO GROW</div><h2>${esc(p.name)}</h2><p>${p.id === "lake" ? "A peaceful lake with fish and new resources. Buy it, wade into the water, and hold Capture near a fish." : "A fresh patch of possibility, with six new resource spots that regrow over time."}</p><div class="land-benefits"><span>${icons.wood}2 trees</span><span>${icons.grass}2 grass patches</span><span>${icons.stone}2 stone deposits</span></div><div class="dialog-actions"><strong>${p.cost} coins <small style="color:#929e84;font-weight:400">· You have ${G.coins}</small></strong><button class="primary" data-buy-land="${p.id}" ${G.coins < p.cost || !plotUnlocked(p) ? "disabled" : ""}>Make it yours</button></div>`;
  } else if (activeCustomer) {
    const o = G.orders.find((o) => o.id === activeCustomer);
    if (!o) {
      $("shop-dialog").close();
      return;
    }
    root.innerHTML = `<div class="eyebrow">A HELLO FROM YOUR NEIGHBOR</div><h2>${esc(o.name)} stopped by.</h2><p>"Hello! Could I get ${Object.entries(
      o.needs,
    )
      .map(([k, v]) => `${v} ${ITEMS[k].name.toLowerCase()}`)
      .join(
        " and ",
      )}? I'd be happy to pay ${o.reward} coins."</p><div class="checkout-list">${Object.entries(
      o.needs,
    )
      .map(
        ([k, v]) =>
          `<div class="checkout-row"><span>${icons[k]}</span><div>${ITEMS[k].name}<small>${marketCount(k)} in your hands + market storage · ${v} needed<br>${esc(SHOPS[ITEMS[k].shop].name)}</small></div><button class="primary" data-visit="${ITEMS[k].shop}">Visit shop</button></div>`,
      )
      .join(
        "",
      )}</div><div class="dialog-actions"><button class="text-button" data-promise="${o.id}">"I'll get that for you!"</button><button class="primary" data-serve="${o.id}" ${canServe(o) ? "" : "disabled"}>Sell for ${o.reward} coins</button></div>`;
  } else {
    root.innerHTML = `<div class="shop-banner">${icons.bag}${icons.coin}</div><div class="eyebrow">GOOD FOOD. HAPPY NEIGHBORS.</div><h2>Your little market</h2><p>Sell from your hands or market storage. Pip must bring his stock here first.</p><div class="checkout-list">${G.orders
      .map(
        (o) =>
          `<div class="checkout-row">${portrait(o)}<div>${esc(o.name)}<small>${Object.entries(
            o.needs,
          )
            .map(
              ([k, v]) =>
                `${v} ${ITEMS[k].name.toLowerCase()} (${marketCount(k)}/${v})`,
            )
            .join(
              " · ",
            )}</small></div><button class="primary" data-serve="${o.id}" ${canServe(o) ? "" : "disabled"}>Sell · ${o.reward}</button></div>`,
      )
      .join(
        "",
      )}</div><h3>Market storage</h3><p>You: ${countBag(G.inventory)}/5 · Pip: ${countBag(G.botInventory)}/5. Storage has no carrying limit.</p><button class="primary" data-store="all">Store everything in my hands</button>${ITEM_KEYS.map(k => `<div class="checkout-row"><span>${icons[k]}</span><div>${ITEMS[k]?.name || k}<small>${G.storage[k]} stored · ${G.inventory[k]} in your hands</small></div><button class="primary" data-withdraw="${k}" ${!G.storage[k] || countBag(G.inventory) >= CARRY_LIMIT ? "disabled" : ""}>Take 1</button></div>`).join("")}<button class="primary" data-sell-fish="1" ${marketCount("fish") ? "" : "disabled"}>Sell 1 fish · 10 coins</button><p class="shop-note">Ask Pip to "store all", "cut tree 3", "break stone 2", "buy eggs", or "checkout". Bot trades use market storage, not your hands.</p>`;
  }
}
function interact(target) {
  if (!target || target.disabled || replay) return;
  if (target.type === "resource") {
    const n = target.node;
    if (countBag(G.inventory) >= CARRY_LIMIT) { toast("Hands full (5/5). Store items at Your little market.", true); return; }
    if (!nodeReady(n)) {
      toast(
        n.reserved
          ? "Pip is gathering that. Try another spot."
          : `Regrowing · ready in ${Math.ceil(n.cooldown)} seconds`,
        true,
      );
      return;
    }
    const promise = navigate(
      player,
      { x: n.x, z: n.z + 0.8 },
      { type: "harvest", node: n },
    );
    promise.then((result) => {
      if (/reachable/.test(result)) toast(result, true);
    });
  } else if (target.type === "fish") {
    if (!G.land.includes("lake")) { toast("Buy Willow Lake first.", true); return; }
    navigate(player, { x: target.x, z: target.z + 0.6 });
    toast("Wade close to the fish, then hold Capture (or F) until caught.");
  } else if (target.type === "shop") {
    toast(`On the way to ${SHOPS[target.key].name}`);
    navigate(player, target, { type: "openShop", key: target.key });
  } else if (target.type === "checkout")
    navigate(player, target, { type: "openCheckout" });
  else if (target.type === "plot")
    navigate(player, target, { type: "openPlot", plot: target.plot });
}
function nearestInteractable() {
  let best = null,
    dist = 2.5;
  for (const g of interactables) {
    const t = g.userData.target;
    if (!g.visible || t.disabled || (t.node && !nodeReady(t.node))) continue;
    const d = Math.hypot(player.position.x - t.x, player.position.z - t.z);
    if (d < dist) {
      best = t;
      dist = d;
    }
  }
  return best;
}
function moveToOrder(id) {
  const order = G.orders.find((o) => o.id === id);
  if (!order) return;
  if (canServe(order)) {
    navigate(player, { x: 8, z: 4.1 }, { type: "checkout", id });
    toast(`Taking ${order.name}'s order to checkout`);
  } else showDialog("customer", id);
}
function finishJob(actor) {
  const d = actor.userData,
    job = d.job;
  if (job?.type === "harvest" && d.working === 0) {
    d.working = 0.7;
    return;
  }
  let result = "Arrived.";
  if (job?.type === "harvest") result = collectNode(job.node, actor, job.amount ?? 3);
  else if (job?.type === "deposit") result = deposit(actor);
  else if (job?.type === "buyLand") result = buyLand(job.plot);
  else if (job?.type === "openShop") showDialog("shop", job.key);
  else if (job?.type === "openCheckout") showDialog("checkout");
  else if (job?.type === "openPlot") showDialog("plot", job.plot);
  else if (job?.type === "checkout") {
    if (job.id) result = serve(job.id, actor);
    else {
      const ready = G.orders.filter(o => canServe(o, actor));
      result = ready.length
        ? ready.map((o) => serve(o.id, actor)).join(" ")
        : "No orders are ready yet. Gather and trade for the missing products first.";
    }
  } else if (job?.type === "trade") result = trade(job.item, job.amount, actor);
  if (job?.node?.reserved === actor) job.node.reserved = null;
  d.job = null;
  d.working = 0;
  if (d.resolve) {
    const resolve = d.resolve;
    d.resolve = null;
    resolve(result);
  }
  updateUI();
}
function updateActor(actor, dt) {
  const d = actor.userData;
  let moving = false;
  if (d.path.length) {
    const p = d.path[0],
      dx = p.x - actor.position.x,
      dz = p.z - actor.position.z,
      dist = Math.hypot(dx, dz),
      step = d.speed * dt;
    if (dist <= step) {
      actor.position.x = p.x;
      actor.position.z = p.z;
      d.path.shift();
    } else {
      actor.position.x += (dx / dist) * step;
      actor.position.z += (dz / dist) * step;
    }
    if (dist > 0.01) {
      const target = Math.atan2(dx, dz);
      actor.rotation.y +=
        Math.atan2(
          Math.sin(target - actor.rotation.y),
          Math.cos(target - actor.rotation.y),
        ) * Math.min(1, dt * 13);
    }
    moving = true;
  } else if (d.working > 0) {
    d.working -= dt;
    d.rightArm.rotation.x = Math.sin(tick * 25) * 0.9;
    if (d.working <= 0) {
      d.working = -1;
      finishJob(actor);
    }
  } else if (d.resolve || d.job) finishJob(actor);
  d.phase += dt * (moving ? 10 : 2);
  d.body.position.y = moving
    ? Math.abs(Math.sin(d.phase)) * 0.07
    : Math.sin(d.phase) * 0.012;
  d.leftLeg.rotation.x = moving ? Math.sin(d.phase) * 0.6 : 0;
  d.rightLeg.rotation.x = moving ? -Math.sin(d.phase) * 0.6 : 0;
  if (d.working <= 0) {
    d.leftArm.rotation.x = moving ? -Math.sin(d.phase) * 0.5 : 0;
    d.rightArm.rotation.x = moving ? Math.sin(d.phase) * 0.5 : 0;
  }
}
async function executeAction(action) {
  if (replay) return "Route replay is playing. Try again when it finishes.";
  if (action.type === "stop") {
    botGeneration++;
    autoFollow = false;
    cancelActor(bot);
    botTask = "Taking a little break";
    updateCarry(bot);
    updateUI();
    return "Pip stopped. Carried items stay in Pip's hands; ask him to store all when ready.";
  }
  const generation = ++botGeneration;
  autoFollow = action.type === "follow";
  if (autoFollow) {
    cancelActor(bot);
    botTask = "Following your lead";
    speak("Right behind you!");
    updateUI();
    return "Pip will follow you.";
  }
  let result = "";
  cancelActor(bot);
  try {
    if (action.type === "store") {
      botTask = "Storing items at your market";
      result = await navigate(bot, { x: 8, z: 4.1 }, { type: "deposit" });
    } else if (action.type === "buyLand") {
      const plot = PLOTS.find(p => p.id === action.plot);
      if (!plot || !plotUnlocked(plot)) return "Buy both original properties before unlocking Willow Lake.";
      if (G.land.includes(plot.id)) return "That property is already yours.";
      if (G.coins < plot.cost) return `Need ${plot.cost - G.coins} more coins.`;
      result = await navigate(bot, plot.group.userData.target, { type: "buyLand", plot });
    } else if (action.type === "harvest") {
      if (!Number.isInteger(action.amount) || action.amount < 1 || action.amount > CARRY_LIMIT) return "Gather 1 to 5 items per command.";
      botTask = `Gathering ${action.resource}`;
      if (countBag(G.botInventory)) {
        await navigate(bot, { x: 8, z: 4.1 }, { type: "deposit" });
        if (generation !== botGeneration || countBag(G.botInventory)) return "Task stopped before gathering.";
      }
      let remaining = action.amount;
      while (remaining > 0 && generation === botGeneration) {
        const node = nodes.filter(n => n.type === action.resource && nodeReady(n))
          .sort((a, b) => Math.hypot(a.x - bot.position.x, a.z - bot.position.z) - Math.hypot(b.x - bot.position.x, b.z - bot.position.z))[0];
        if (!node) { result += " No more resources are ready. They regrow in under a minute."; break; }
        const before = G.botInventory[action.resource];
        const report = await navigate(bot, { x: node.x, z: node.z + 0.8 }, { type: "harvest", node, amount: remaining });
        result += " " + report;
        const gathered = G.botInventory[action.resource] - before;
        if (gathered <= 0) break;
        remaining -= gathered;
      }
      if (generation === botGeneration && countBag(G.botInventory)) {
        botTask = "Carrying resources to storage";
        result += " " + await navigate(bot, { x: 8, z: 4.1 }, { type: "deposit" });
      }
    } else if (action.type === "deliver") {
      if (!ITEMS[action.item] || !Number.isInteger(action.amount) || action.amount < 1 || action.amount > CARRY_LIMIT) return "Fetch 1 to 5 products per command.";
      const item = ITEMS[action.item], shop = SHOPS[item.shop];
      if (!Object.entries(item.cost).every(([k, v]) => marketCount(k, bot) >= v * action.amount)) return "Not enough market resources. Store your gathered resources at Your little market, or ask Pip to gather them.";
      // One product per round trip keeps ingredients AND the product within five hands slots.
      for (let i = 0; i < action.amount && generation === botGeneration; i++) {
        botTask = "Collecting stored ingredients";
        await navigate(bot, { x: 8, z: 4.1 }, { type: "deposit" });
        if (generation !== botGeneration || !atMarket(bot)) break;
        if (!Object.entries(item.cost).every(([k, v]) => G.storage[k] >= v)) { result += " Stored ingredients were used by another trade."; break; }
        for (const [k, v] of Object.entries(item.cost)) withdraw(k, v, bot);
        botTask = `Fetching ${item.name.toLowerCase()}`;
        const report = await navigate(bot, { x: shop.x, z: -4.6 }, { type: "trade", item: action.item, amount: 1 });
        result += " " + report;
        if (generation !== botGeneration || !report.startsWith("Fetched")) break;
        botTask = "Bringing it to your market";
        result += " " + await navigate(bot, { x: 8, z: 4.1 }, { type: "deposit" });
      }
    } else if (action.type === "checkout") {
      botTask = "Helping at checkout";
      speak("Let me take the checkout.");
      result = await navigate(bot, { x: 8, z: 4.1 }, { type: "checkout" });
    } else if (action.type === "move") {
      const target =
        action.target === "player"
          ? { x: player.position.x + 1, z: player.position.z + 1 }
          : action.target === "checkout"
            ? { x: 8, z: 4.1 }
            : { x: SHOPS[action.target].x, z: -4.6 };
      botTask = `Walking to ${action.target}`;
      result = await navigate(bot, target);
    }
    return result.trim() || "Task stopped.";
  } finally {
    if (generation === botGeneration) {
      botTask = "Ready when you are";
      updateUI();
    }
  }
}
function getState() {
  return {
    inventory: Object.fromEntries(ITEM_KEYS.map(k => [k, marketCount(k, bot)])),
    playerInventory: { ...G.inventory },
    botInventory: { ...G.botInventory },
    storage: { ...G.storage },
    carryLimit: CARRY_LIMIT,
    properties: PLOTS.map(({ id, name, cost, requires }) => ({ id, name, cost, requires, unlocked: plotUnlocked(PLOTS.find(p => p.id === id)), owned: G.land.includes(id) })),
    coins: G.coins,
    day: 1 + Math.floor(G.time / 300),
    served: G.served,
    land: G.land,
    orders: G.orders.map(({ name, needs, reward }) => ({
      name,
      needs,
      reward,
    })),
    products: ITEMS,
    shops: SHOPS,
    resourceNodes: Object.fromEntries(
      ["grass", "wood", "stone"].map((r) => [
        r,
        {
          ready: nodes.filter((n) => n.type === r && nodeReady(n)).length,
          yieldPerHarvest: "up to 3, capped by free carrying space",
          regrowthSeconds: r === "grass" ? 24 : 42,
        },
      ]),
    ),
    helper: { task: botTask, x: bot.position.x, z: bot.position.z },
    player: { x: player.position.x, z: player.position.z },
    rules:
      "Player and bot each carry at most 5 total items. Inventory is market storage plus bot hands; playerInventory is separate. Harvest amount counts individual items, 1-5, carried to storage. Deliver uses stored resources in safe round trips. Store deposits bot hands at market. Checkout uses storage plus the acting character hands. BuyLand spends coins; lake requires orchard and highland. Fish by holding Capture near a fish in owned lake, then store or sell fish at market. No real purchases.",
  };
}
async function sendChat(text) {
  if (!text.trim()) return;
  $("assistant-panel").classList.remove("collapsed");
  addMessage("user", text);
  $("chat-input").value = "";
  if (/^(stop|cancel|stop working|stop following)$/i.test(text.trim())) {
    ai.cancel();
    addMessage("assistant", await executeAction({ type: "stop" }));
    return;
  }
  $("chat-send").disabled = true;
  try {
    await ai.send(text);
  } finally {
    $("chat-send").disabled = false;
  }
}

function startReplay() {
  if (trail.length < 8) {
    toast("Walk around a little first, then replay your route.");
    return;
  }
  if (ai.isBusy() || bot.userData.resolve) {
    toast("Let Pip finish the current task before replaying.", true);
    return;
  }
  $("journal-dialog").close();
  stopFishing();
  replay = {
    frames: trail.slice(),
    time: 0,
    player: player.position.clone(),
    bot: bot.position.clone(),
    pr: player.rotation.y,
    br: bot.rotation.y,
  };
  $("replay-banner").hidden = false;
}
function stopReplay() {
  if (!replay) return;
  player.position.copy(replay.player);
  bot.position.copy(replay.bot);
  player.rotation.y = replay.pr;
  bot.rotation.y = replay.br;
  replay = null;
  $("replay-banner").hidden = true;
}
function getTarget(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.set(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    (-(event.clientY - rect.top) / rect.height) * 2 + 1,
  );
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(interactables, true);
  for (const hit of hits) {
    let object = hit.object,
      visible = true,
      target = null;
    while (object) {
      if (!object.visible) visible = false;
      if (object.userData.target) target = object.userData.target;
      object = object.parent;
    }
    if (visible && target && !target.disabled) return target;
  }
  return null;
}
function moveFromInput(dt) {
  let x =
      (movementKeys.KeyD || movementKeys.ArrowRight ? 1 : 0) -
      (movementKeys.KeyA || movementKeys.ArrowLeft ? 1 : 0) +
      joystickVector.x,
    z =
      (movementKeys.KeyS || movementKeys.ArrowDown ? 1 : 0) -
      (movementKeys.KeyW || movementKeys.ArrowUp ? 1 : 0) +
      joystickVector.z;
  if (!x && !z) return false;
  cancelActor(player);
  const length = Math.hypot(x, z);
  x /= Math.max(length, 1);
  z /= Math.max(length, 1);
  const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
  right.y = 0;
  right.normalize();
  const forward = new THREE.Vector3().crossVectors(
    right,
    new THREE.Vector3(0, 1, 0),
  );
  const dx = (right.x * x + forward.x * z) * player.userData.speed * dt,
    dz = (right.z * x + forward.z * z) * player.userData.speed * dt;
  if (canWalk(player.position.x + dx, player.position.z))
    player.position.x += dx;
  if (canWalk(player.position.x, player.position.z + dz))
    player.position.z += dz;
  player.rotation.y = Math.atan2(dx, dz);
  const d = player.userData;
  d.phase += dt * 10;
  d.body.position.y = Math.abs(Math.sin(d.phase)) * 0.07;
  d.leftLeg.rotation.x = Math.sin(d.phase) * 0.6;
  d.rightLeg.rotation.x = -Math.sin(d.phase) * 0.6;
  d.leftArm.rotation.x = -Math.sin(d.phase) * 0.5;
  d.rightArm.rotation.x = Math.sin(d.phase) * 0.5;
  return true;
}
function bindControls() {
  window.addEventListener("resize", resize);
  window.addEventListener("blur", () => {
    stopFishing(); mouseDown = null;
    movementKeys = {};
    joystickVector = { x: 0, z: 0 };
  });
  document.addEventListener("visibilitychange", () => {
    stopFishing(); mouseDown = null;
    joystickVector = { x: 0, z: 0 };
    movementKeys = {};
    save();
    clock.getDelta();
  });
  const typing = (e) =>
    e.target.closest('input,textarea,select,[contenteditable="true"]');
  window.addEventListener("keydown", (e) => {
    if (typing(e) || document.querySelector("dialog[open]") || replay) return;
    if (
      [
        "KeyW",
        "KeyA",
        "KeyS",
        "KeyD",
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
      ].includes(e.code)
    ) {
      e.preventDefault();
      movementKeys[e.code] = true;
    }
    if (e.code === "KeyF" && !e.repeat) { e.preventDefault(); beginFishing(); }
    if (e.code === "KeyE" && !e.repeat) interact(nearestInteractable());
  });
  window.addEventListener("keyup", (e) => {
    delete movementKeys[e.code];
    if (e.code === "KeyF") stopFishing();
  });
  const canvas = renderer.domElement;
  const clearPointer = () => { mouseDown = null; canvas.style.cursor = "default"; };
  canvas.addEventListener("contextmenu", e => e.preventDefault());
  canvas.addEventListener("pointerdown", e => {
    if (replay || document.querySelector("dialog[open]") || (e.button !== 0 && e.button !== 1)) return;
    if (mouseDown) { mouseDown.dragged = true; return; }
    getTarget(e);
    const anchor = raycaster.ray.intersectPlane(groundPlane, new THREE.Vector3());
    if (!anchor) return;
    mouseDown = { x: e.clientX, y: e.clientY, id: e.pointerId, at: performance.now(), dragged: false, anchor: anchor.clone() };
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointerup", e => {
    if (!mouseDown || e.pointerId !== mouseDown.id) return;
    const down = mouseDown;
    clearPointer();
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    if (replay || down.dragged || Math.hypot(e.clientX - down.x, e.clientY - down.y) > 8 || performance.now() - down.at > 350) return;
    const target = getTarget(e);
    if (target) { interact(target); return; }
    if (raycaster.ray.intersectPlane(groundPlane, groundHit) && canWalk(groundHit.x, groundHit.z)) {
      navigate(player, { x: groundHit.x, z: groundHit.z });
      burst(groundHit.x, groundHit.z, 0xe3edbe);
    } else toast("That spot is not walkable. Fenced plots can be purchased.", true);
  });
  canvas.addEventListener("pointercancel", clearPointer);
  canvas.addEventListener("lostpointercapture", clearPointer);
  renderer.domElement.addEventListener("pointermove", (e) => {
    if (mouseDown && e.pointerId === mouseDown.id) {
      if (Math.hypot(e.clientX - mouseDown.x, e.clientY - mouseDown.y) > 8 || performance.now() - mouseDown.at >= 350) mouseDown.dragged = true;
      if (mouseDown.dragged) {
        getTarget(e);
        const hit = raycaster.ray.intersectPlane(groundPlane, new THREE.Vector3());
        if (hit) {
          const next = cameraPan.clone().add(mouseDown.anchor.clone().sub(hit));
          next.x = THREE.MathUtils.clamp(next.x, -22, 30);
          next.z = THREE.MathUtils.clamp(next.z, -16, 20);
          camera.position.add(next.clone().sub(cameraPan)); cameraPan.copy(next);
          camera.updateMatrixWorld();
        }
        renderer.domElement.style.cursor = "grabbing";
        $("hover-label").style.display = "none";
        return;
      }
    }
    if (e.pointerType === "touch") return;
    hovered = getTarget(e);
    renderer.domElement.style.cursor = hovered ? "pointer" : "default";
    const label = $("hover-label");
    label.style.display = hovered ? "block" : "none";
    if (hovered) {
      label.textContent =
        hovered.node?.cooldown > 0
          ? `Regrowing · ${Math.ceil(hovered.node.cooldown)}s`
          : hovered.label;
      label.style.left = `${Math.min(innerWidth - 240, e.clientX + 13)}px`;
      label.style.top = `${Math.min(innerHeight - 45, e.clientY + 16)}px`;
    }
  });
  renderer.domElement.addEventListener("pointerleave", () => {
    $("hover-label").style.display = "none";
  });
  renderer.domElement.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      camera.zoom = THREE.MathUtils.clamp(
        camera.zoom * (e.deltaY > 0 ? 0.92 : 1.08),
        0.72,
        1.85,
      );
      camera.updateProjectionMatrix();
    },
    { passive: false },
  );
  $("zoom-in").onclick = () => {
    camera.zoom = Math.min(1.85, camera.zoom * 1.12);
    camera.updateProjectionMatrix();
  };
  $("zoom-out").onclick = () => {
    camera.zoom = Math.max(0.72, camera.zoom / 1.12);
    camera.updateProjectionMatrix();
  };
  $("camera-reset").onclick = () => {
    camera.position.sub(cameraPan); cameraPan.set(0, 0, 0); camera.updateMatrixWorld();
    camera.zoom = 1.06;
    camera.updateProjectionMatrix();
  };
  updateSoundButton();
  $("sound").onclick = () => {
    soundEnabled = !soundEnabled;
    updateSoundButton();
    try { localStorage.setItem("market-meadow-sound", soundEnabled ? "on" : "off"); }
    catch { toast("Sound changed for this session; device storage is unavailable.", true); }
    sound("coin");
  };
  // Browsers require a gesture to resume audio; restoring a preference never autoplays.
  document.addEventListener("pointerdown", () => {
    if (soundEnabled && audioContext?.state === "suspended") audioContext.resume().catch(() => {});
  });
  $("settings").onclick = $("connect-link").onclick = () => ai.openSettings();
  $("help").onclick = () => $("help-dialog").showModal();
  $("help-play").onclick = () => $("help-dialog").close();
  $("chat-form").onsubmit = (e) => {
    e.preventDefault();
    sendChat($("chat-input").value);
  };
  document
    .querySelectorAll("[data-chat]")
    .forEach((b) => (b.onclick = () => sendChat(b.dataset.chat)));
  $("chat-toggle").onclick = () => {
    const collapsed = $("assistant-panel").classList.toggle("collapsed");
    $("chat-toggle").setAttribute(
      "aria-label",
      collapsed ? "Expand chat" : "Minimize chat",
    );
  };
  $("orders-mobile").onclick = () =>
    document.querySelector(".orders").classList.toggle("mobile-open");
  $("order-list").onclick = (e) => {
    const b = e.target.closest("[data-order]");
    if (b) {
      document.querySelector(".orders").classList.remove("mobile-open");
      moveToOrder(Number(b.dataset.order));
    }
  };
  document.querySelectorAll("[data-item]").forEach(
    (b) =>
      (b.onclick = () => {
        const shop = ITEMS[b.dataset.item].shop;
        interact({ type: "shop", key: shop, x: SHOPS[shop].x, z: -4.6 });
      }),
  );
  $("shop-content").onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.store) toast(deposit(player));
    if (b.dataset.withdraw) toast(withdraw(b.dataset.withdraw));
    if (b.dataset.sellFish && atMarket(player) && marketCount("fish") > 0) {
      consumeMarket({ fish: 1 }, player); G.coins += 10;
      record("Sold a fish for 10 coins."); sound("coin"); updateUI(); save();
    }
    if (b.dataset.trade) {
      const shop = SHOPS[ITEMS[b.dataset.trade].shop];
      if (Math.hypot(player.position.x - shop.x, player.position.z + 4.6) > 2) {
        $("shop-dialog").close();
        interact({
          type: "shop",
          key: ITEMS[b.dataset.trade].shop,
          x: shop.x,
          z: -4.6,
        });
        return;
      }
      toast(trade(b.dataset.trade));
      renderShop();
    }
    if (b.dataset.buyLand)
      buyLand(PLOTS.find((p) => p.id === b.dataset.buyLand));
    if (b.dataset.serve) {
      $("shop-dialog").close();
      navigate(
        player,
        { x: 8, z: 4.1 },
        { type: "checkout", id: Number(b.dataset.serve) },
      );
    }
    if (b.dataset.visit) {
      $("shop-dialog").close();
      const key = b.dataset.visit;
      interact({ type: "shop", key, x: SHOPS[key].x, z: -4.6 });
    }
    if (b.dataset.promise) {
      const o = G.orders.find((o) => o.id === Number(b.dataset.promise));
      addMessage("system", `${o.name}: "Thank you! I'll be right here."`);
      $("shop-dialog").close();
      toast(`${o.name} will wait while you collect the order.`);
    }
  };
  $("journal-open").onclick = () => {
    $("journal-list").innerHTML = G.journal.length
      ? G.journal
          .slice()
          .reverse()
          .map(
            (j) =>
              `<div class="journal-entry"><time>Day ${j.day}</time><span>${esc(j.text)}</span></div>`,
          )
          .join("")
      : "<p>Your first little adventure is waiting. Gather something to begin.</p>";
    $("journal-dialog").showModal();
  };
  $("replay").onclick = startReplay;
  $("stop-replay").onclick = stopReplay;
  $("reset-game").onclick = () => {
    if (
      !confirm(
        "Start a new meadow? This will erase only your game progress, not AI settings.",
      )
    )
      return;
    try {
      localStorage.removeItem(SAVE);
    } catch {}
    location.reload();
  };
  if ($("storage-open")) $("storage-open").onclick = () => interact({ type: "checkout", x: 8, z: 4.1 });
  if ($("capture-fish")) {
    const capture = $("capture-fish");
    capture.addEventListener("pointerdown", e => { e.preventDefault(); capture.setPointerCapture(e.pointerId); beginFishing(); });
    for (const event of ["pointerup", "pointercancel", "lostpointercapture", "blur"]) capture.addEventListener(event, stopFishing);
    capture.addEventListener("keydown", e => { if (["Space", "Enter"].includes(e.code)) { e.preventDefault(); if (!e.repeat) beginFishing(); } });
    capture.addEventListener("keyup", e => { if (["Space", "Enter"].includes(e.code)) stopFishing(); });
  }
  $("mobile-interact").onclick = () => interact(nearestInteractable());
  let joystickId = null;
  const stickMove = (e) => {
    const r = $("joystick").getBoundingClientRect(),
      dx = e.clientX - r.left - r.width / 2,
      dz = e.clientY - r.top - r.height / 2,
      d = Math.hypot(dx, dz),
      m = Math.min(d, 25),
      x = d ? (dx / d) * m : 0,
      z = d ? (dz / d) * m : 0;
    joystickVector = { x: x / 25, z: z / 25 };
    $("stick").style.transform = `translate(${x}px,${z}px)`;
  };
  $("joystick").addEventListener("pointerdown", (e) => {
    e.preventDefault();
    joystickId = e.pointerId;
    $("joystick").setPointerCapture(e.pointerId);
    stickMove(e);
  });
  $("joystick").addEventListener("pointermove", (e) => {
    if (e.pointerId === joystickId) stickMove(e);
  });
  const stickEnd = () => {
    joystickId = null;
    joystickVector = { x: 0, z: 0 };
    $("stick").style.transform = "";
  };
  $("joystick").addEventListener("pointerup", stickEnd);
  $("joystick").addEventListener("pointercancel", stickEnd);
  for (const dialog of document.querySelectorAll(".game-dialog"))
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        const r = dialog.getBoundingClientRect();
        if (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        )
          dialog.close();
      }
    });
}
function inLake() {
  return G.land.includes("lake") && ((player.position.x - 23) / 4.5) ** 2 + ((player.position.z - 5) / 3.6) ** 2 <= 1;
}
function stopFishing() {
  captureHeld = false; fishing = null;
  if ($("capture-progress")) $("capture-progress").value = 0;
}
function beginFishing() {
  if (replay || document.querySelector("dialog[open]")) return;
  if (!inLake()) { toast("Buy Willow Lake and wade into its water first.", true); return; }
  if (countBag(G.inventory) >= CARRY_LIMIT) { toast("Hands full. Store items before fishing.", true); return; }
  const spot = fishSpots.filter(f => f.cooldown <= 0 && Math.hypot(player.position.x - f.x, player.position.z - f.z) <= 2)
    .sort((a, b) => Math.hypot(player.position.x - a.x, player.position.z - a.z) - Math.hypot(player.position.x - b.x, player.position.z - b.z))[0];
  if (!spot) { toast("Move within 2 steps of a visible fish, then hold Capture."); return; }
  cancelActor(player); captureHeld = true; fishing = { spot, progress: 0 };
}
function updateFishing(dt, dialogOpen) {
  for (const f of fishSpots) {
    f.cooldown = Math.max(0, f.cooldown - dt);
    f.art.visible = G.land.includes("lake") && f.cooldown <= 0;
    f.art.rotation.y = Math.sin(tick * 0.8 + f.x) * 0.3;
  }
  if ($("fishing-controls")) $("fishing-controls").hidden = !inLake();
  if (!captureHeld || !fishing) return;
  const { spot } = fishing;
  if (dialogOpen || !inLake() || Math.hypot(player.position.x - spot.x, player.position.z - spot.z) > 2 || countBag(G.inventory) >= CARRY_LIMIT || spot.cooldown > 0) { stopFishing(); return; }
  fishing.progress += dt;
  if ($("capture-progress")) $("capture-progress").value = Math.min(1, fishing.progress / 3);
  if (fishing.progress >= 3) {
    G.inventory.fish++; spot.cooldown = 20; spot.art.visible = false;
    record("Caught a fish at Willow Lake."); toast("Fish caught! Store it or sell it at your market for 10 coins.");
    sound("coin"); burst(spot.x, spot.z, 0x80b8b7); stopFishing(); updateUI(); save();
  }
}
function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.25);
  if (document.hidden) return;
  tick += dt;
  if (replay) {
    replay.time += dt * 1.35;
    const f =
      replay.frames[
        Math.min(replay.frames.length - 1, Math.floor(replay.time / 0.2))
      ];
    player.position.set(f[0], 0, f[1]);
    player.rotation.y = f[2];
    bot.position.set(f[3], 0, f[4]);
    bot.rotation.y = f[5];
    if (replay.time >= replay.frames.length * 0.2) stopReplay();
  } else {
    G.time += dt;
    const dialogOpen = !!document.querySelector("dialog[open]");
    const manual = !dialogOpen && moveFromInput(dt);
    updateFishing(dt, dialogOpen);
    if (!manual) updateActor(player, dt);
    updateActor(bot, dt);
    if (
      autoFollow &&
      !bot.userData.path.length &&
      !bot.userData.resolve &&
      Math.hypot(
        bot.position.x - player.position.x,
        bot.position.z - player.position.z,
      ) > 2.5 &&
      tick % 1 < dt
    ) {
      const target = { x: player.position.x + 1.1, z: player.position.z + 0.7 };
      bot.userData.path = findPath(bot.position, target) || [];
    }
    for (const n of nodes) {
      if (n.cooldown > 0) {
        n.cooldown = Math.max(0, n.cooldown - dt);
        n.art.scale.setScalar(n.cooldown <= 0 ? 1 : 0.12);
        if (n.cooldown === 0) {
          renderer.shadowMap.needsUpdate = true;
          burst(n.x, n.z, 0xd5dea4);
        }
      }
      if (n.type === "grass" && n.cooldown === 0)
        n.art.rotation.z = Math.sin(tick * 1.2 + n.x) * 0.055;
    }
    for (const [id, npc] of npcs) {
      updateActor(npc, dt);
      if (npc.userData.leaving) {
        npc.userData.leaveTimer += dt;
        if (!npc.userData.path.length || npc.userData.leaveTimer > 15) {
          scene.remove(npc);
          npcs.delete(id);
        }
      }
    }
    if (tick - lastTrail >= 0.2) {
      lastTrail = tick;
      trail.push([
        player.position.x,
        player.position.z,
        player.rotation.y,
        bot.position.x,
        bot.position.z,
        bot.rotation.y,
      ]);
      if (trail.length > 100) trail.shift();
    }
  }
  for (let i = effects.length - 1; i >= 0; i--) {
    const e = effects[i];
    e.life -= dt;
    e.mesh.position.addScaledVector(e.velocity, dt);
    e.velocity.y -= 6 * dt;
    e.mesh.scale.setScalar(Math.max(0, e.life / 0.8));
    if (e.life <= 0) {
      scene.remove(e.mesh);
      effects.splice(i, 1);
    }
  }
  if (speechUntil > tick) {
    const p = bot.position
      .clone()
      .add(new THREE.Vector3(0, 2.65, 0))
      .project(camera);
    $("speech").style.left = `${(p.x * 0.5 + 0.5) * innerWidth}px`;
    $("speech").style.top = `${(-p.y * 0.5 + 0.5) * innerHeight}px`;
  } else $("speech").style.display = "none";
  if (tick - lastUI > 1) {
    lastUI = tick;
    $("day").textContent = 1 + Math.floor(G.time / 300);
    $("helper-task").textContent = botTask;
  }
  if (tick - lastSave > 7 && !replay) {
    lastSave = tick;
    save();
  }
  renderer.render(scene, camera);
}
try {
  buildWorld();
  clock = new THREE.Clock();
  ai = window.createMeadowAI({
    getState,
    executeAction,
    onMessage: addMessage,
    onStatus: (label, connected) => {
      $("ai-status").textContent = label;
      $("ai-status").style.color = connected ? "#50834c" : "#8a9d74";
      $("connect-link").firstChild.textContent = connected
        ? "AI settings "
        : "Connect your AI ";
    },
  });
  bindControls();
  updateUI();
  addMessage(
    "assistant",
    "Hi, I'm Pip, your little extra pair of hands. Gather a few resources and we'll turn this patch into something lovely.\n\nI'm the offline helper until you connect an AI.",
  );
  if (innerWidth <= 850) {
    $("assistant-panel").classList.add("collapsed");
    $("chat-toggle").setAttribute("aria-label", "Expand chat");
    $("context-hint").innerHTML =
      "<kbd>TAP</kbd> to walk or interact <span>·</span> Hold + drag to pan <span>·</span> Joystick to walk";
  }
  started = true;
  loop();
  $("loading").style.opacity = "0";
  setTimeout(() => $("loading").remove(), 550);
  let seen = false;
  try {
    seen = localStorage.getItem("market-meadow-welcomed") === "1";
    localStorage.setItem("market-meadow-welcomed", "1");
  } catch {}
  if (!seen) setTimeout(() => ai.openSettings(), 700);
  window.meadow = {
    snapshot: getState,
    locations: () =>
      interactables
        .filter((g) => g.visible && !g.userData.target.disabled)
        .map((g) => {
          const t = g.userData.target,
            p = new THREE.Vector3(
              t.x,
              t.type === "resource"
                ? t.node.type === "wood"
                  ? 2
                  : 0.4
                : t.type === "shop"
                  ? 2
                  : 1.2,
              t.z + (t.type === "shop" ? -2 : 0),
            ).project(camera);
          return {
            type: t.type,
            key: t.key || t.node?.type || t.plot?.id,
            label: t.label,
            ready: t.node ? nodeReady(t.node) : true,
            screen: {
              x: (p.x * 0.5 + 0.5) * innerWidth,
              y: (-p.y * 0.5 + 0.5) * innerHeight,
            },
          };
        }),
    status: () => ({
      started,
      drawCalls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
      playerPath: player.userData.path.length,
      botPath: bot.userData.path.length,
      replaying: !!replay,
      cameraPan: { x: cameraPan.x, z: cameraPan.z },
      fishingProgress: fishing?.progress || 0,
    }),
  };
  window.addEventListener("pagehide", save);
} catch (error) {
  console.error("Meadow initialization failed", error);
  $("loading").innerHTML =
    '<h2>Your meadow could not load.</h2><p>WebGL and an internet connection are required. Please reload or try a current browser.</p><button class="primary" onclick="location.reload()">Try again</button>';
}
