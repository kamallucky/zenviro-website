// Lightweight module-level store for scroll state shared between DOM and the R3F Canvas.
// Avoids React re-renders — the Canvas reads these values inside useFrame.

export const scrollState = {
  progress: 0,      // 0..1 over the whole immersive page
  velocity: 0,      // current scroll velocity (from Lenis)
  raw: 0,           // raw scrollY in px
  max: 1,           // max scrollable px
  pointer: { x: 0, y: 0 }, // normalized -1..1 mouse for parallax
};

// Act boundaries (in progress units). 6 acts.
export const ACTS = [
  { id: 'hero', start: 0.0, end: 0.17 },
  { id: 'threat', start: 0.17, end: 0.37 },
  { id: 'products', start: 0.37, end: 0.56 },
  { id: 'crops', start: 0.56, end: 0.73 },
  { id: 'reach', start: 0.73, end: 0.88 },
  { id: 'finale', start: 0.88, end: 1.0 },
];

// Returns 0..1 local progress within a given act, clamped.
export function actProgress(id) {
  const act = ACTS.find((a) => a.id === id);
  if (!act) return 0;
  const t = (scrollState.progress - act.start) / (act.end - act.start);
  return Math.min(1, Math.max(0, t));
}

// Smoothstep easing helper.
export const smoothstep = (edge0, edge1, x) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

export const lerp = (a, b, t) => a + (b - a) * t;
