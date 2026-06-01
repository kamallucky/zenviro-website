import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from './scrollStore';

// Scroll-driven cinematic camera. Interpolates the camera between keyframes
// (position + look target) based on global scroll progress, with mouse parallax.
const KEYS = [
  { p: 0.00, P: [0, 1.6, 6.6], T: [0, 1.45, 0] },   // hero — face the bottle
  { p: 0.14, P: [1.6, 1.8, 4.6], T: [0.6, 1.4, 0] }, // drift
  { p: 0.205, P: [5.6, 1.7, 3.2], T: [4, 1.0, -1.5] }, // travel to chilli
  { p: 0.34, P: [4.1, 1.45, 1.2], T: [4, 1.0, -1.5] }, // chilli close-up (the drama)
  { p: 0.41, P: [-1.4, 1.8, 4.2], T: [-4, 1.4, -1] },  // travel to product
  { p: 0.55, P: [-4.0, 1.5, 2.3], T: [-4, 1.4, -1] },  // product close-up
  { p: 0.61, P: [-1.0, 1.7, 2.2], T: [0, 0.8, -5] },   // travel to crops
  { p: 0.72, P: [0, 1.4, 0.6], T: [0, 0.75, -5] },     // crops
  { p: 0.77, P: [2.2, 3.4, 2.2], T: [4.5, 2.4, -4] },  // travel to map
  { p: 0.87, P: [4.6, 3.5, 0.6], T: [4.5, 2.4, -4] },  // map close
  { p: 0.93, P: [0, 2.7, 6.2], T: [0, 1.6, 0] },       // pull back
  { p: 1.00, P: [0, 2.3, 9.5], T: [0, 2.1, -2] },      // finale — wide sunrise
];

export default function Rig() {
  const pos = useMemo(() => new THREE.Vector3(...KEYS[0].P), []);
  const tgt = useMemo(() => new THREE.Vector3(...KEYS[0].T), []);
  const curTarget = useRef(new THREE.Vector3(...KEYS[0].T));
  const Pa = useMemo(() => new THREE.Vector3(), []);
  const Pb = useMemo(() => new THREE.Vector3(), []);
  const Ta = useMemo(() => new THREE.Vector3(), []);
  const Tb = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera }, delta) => {
    const p = scrollState.progress;
    let i = 0;
    while (i < KEYS.length - 1 && p > KEYS[i + 1].p) i++;
    const a = KEYS[i];
    const b = KEYS[Math.min(i + 1, KEYS.length - 1)];
    const span = b.p - a.p || 1;
    let lt = (p - a.p) / span;
    lt = Math.min(1, Math.max(0, lt));
    const t = lt * lt * (3 - 2 * lt);

    Pa.set(...a.P); Pb.set(...b.P);
    Ta.set(...a.T); Tb.set(...b.T);
    pos.lerpVectors(Pa, Pb, t);
    tgt.lerpVectors(Ta, Tb, t);

    // mouse parallax
    pos.x += scrollState.pointer.x * 0.45;
    pos.y += -scrollState.pointer.y * 0.28;

    // frame-rate independent smoothing
    const s = 1 - Math.pow(0.0015, delta);
    camera.position.lerp(pos, s);
    curTarget.current.lerp(tgt, s);
    camera.lookAt(curTarget.current);
  });

  return null;
}
