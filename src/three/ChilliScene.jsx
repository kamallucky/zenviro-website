import { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { actProgress, smoothstep } from './scrollStore';

// The story beat: a chilli (mirchi) plant swarmed by pests, then a protective spray
// sweeps in, the insects flee, and the plant heals & glows.
// All driven by scroll progress within the 'threat' act.
export default function ChilliScene({ position = [0, 0, 0] }) {
  const group = useRef();
  const insectsRef = useRef();
  const leavesRef = useRef();
  const sprayRef = useRef();
  const podMats = useRef([]);

  const INSECTS = 70;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const insectData = useMemo(() => {
    const d = [];
    for (let i = 0; i < INSECTS; i++) {
      d.push({
        a: Math.random() * Math.PI * 2,
        y: 0.4 + Math.random() * 1.6,
        r: 0.5 + Math.random() * 0.7,
        spd: 0.6 + Math.random() * 1.4,
        flee: 3 + Math.random() * 4,
        ph: Math.random() * 10,
      });
    }
    return d;
  }, []);

  // spray particles
  const SPRAY = 220;
  const sprayPos = useMemo(() => {
    const p = new Float32Array(SPRAY * 3);
    for (let i = 0; i < SPRAY; i++) {
      p[i * 3] = -2.4 + Math.random() * 0.6;
      p[i * 3 + 1] = 1.2 + (Math.random() - 0.5) * 1.6;
      p[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
    }
    return p;
  }, []);
  const sprayTex = useMemo(() => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(200,255,220,0.95)');
    grad.addColorStop(1, 'rgba(140,220,160,0)');
    g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  useLayoutEffect(() => {
    if (!insectsRef.current) return;
    const c = new THREE.Color('#1a1208');
    for (let i = 0; i < INSECTS; i++) insectsRef.current.setColorAt(i, c);
    if (insectsRef.current.instanceColor) insectsRef.current.instanceColor.needsUpdate = true;
  }, []);

  // leaf positions on the plant
  const leaves = useMemo(() => ([
    { p: [0.32, 0.7, 0.1], r: [0, 0.6, 0.5], s: 1 },
    { p: [-0.34, 0.95, -0.05], r: [0, -0.7, -0.5], s: 1.05 },
    { p: [0.28, 1.25, -0.18], r: [0.2, 0.5, 0.4], s: 0.9 },
    { p: [-0.26, 1.5, 0.12], r: [0, -0.4, -0.4], s: 0.85 },
    { p: [0.12, 1.75, 0.0], r: [0.3, 0.2, 0.3], s: 0.7 },
  ]), []);

  const pods = useMemo(() => ([
    { p: [0.22, 0.9, 0.22], r: [0.2, 0, -0.5] },
    { p: [-0.2, 1.15, 0.18], r: [-0.3, 0, 0.6] },
    { p: [0.16, 1.4, 0.2], r: [0.1, 0, -0.4] },
  ]), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const tp = actProgress('threat');           // 0..1 over the act
    const sprayOn = smoothstep(0.38, 0.6, tp);   // spray sweeps in
    const fled = smoothstep(0.5, 0.85, tp);      // insects gone
    const heal = smoothstep(0.55, 1.0, tp);      // plant heals/glows

    // insects: orbit close, then flee outward + fade
    if (insectsRef.current) {
      for (let i = 0; i < INSECTS; i++) {
        const d = insectData[i];
        const ang = d.a + t * d.spd * 0.6;
        const radius = d.r + fled * d.flee;
        const yLift = d.y + fled * (2 + Math.random() * 0.0);
        const buzz = Math.sin(t * 8 + d.ph) * 0.05;
        dummy.position.set(
          Math.cos(ang) * radius + buzz,
          yLift + Math.sin(t * 6 + d.ph) * 0.06,
          Math.sin(ang) * radius + buzz
        );
        const sc = (1 - fled) * (0.05 + Math.sin(t * 10 + d.ph) * 0.005);
        dummy.scale.setScalar(Math.max(0.0001, sc));
        dummy.updateMatrix();
        insectsRef.current.setMatrixAt(i, dummy.matrix);
      }
      insectsRef.current.instanceMatrix.needsUpdate = true;
    }

    // spray sweep
    if (sprayRef.current) {
      sprayRef.current.visible = sprayOn > 0.02 && fled < 0.98;
      const arr = sprayRef.current.geometry.attributes.position.array;
      for (let i = 0; i < SPRAY; i++) {
        arr[i * 3] += 0.06 * sprayOn;
        if (arr[i * 3] > 2.4) arr[i * 3] = -2.4 + Math.random() * 0.4;
      }
      sprayRef.current.geometry.attributes.position.needsUpdate = true;
      sprayRef.current.material.opacity = sprayOn * (1 - fled) * 0.9;
    }

    // leaves heal: emissive green glow
    podMats.current.forEach((m) => { if (m) m.emissiveIntensity = 0.1 + heal * 0.5; });
    if (leavesRef.current) {
      leavesRef.current.children.forEach((leaf, idx) => {
        const m = leaf.material;
        if (m) {
          m.color.setHSL(0.32, 0.55, 0.18 + heal * 0.22);
          m.emissiveIntensity = heal * 0.35;
        }
        leaf.rotation.z = leaves[idx].r[2] + Math.sin(t * 1.5 + idx) * 0.06;
      });
    }

    // gentle plant sway
    if (group.current) group.current.rotation.z = Math.sin(t * 0.8) * 0.02;
  });

  return (
    <group ref={group} position={position}>
      {/* pot */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.32, 0.45, 24]} />
        <meshStandardMaterial color="#9c5a33" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.06, 24]} />
        <meshStandardMaterial color="#7a4327" roughness={0.9} />
      </mesh>
      {/* soil */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.05, 24]} />
        <meshStandardMaterial color="#2a1a0e" roughness={1} />
      </mesh>

      {/* stem */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.07, 1.5, 12]} />
        <meshStandardMaterial color="#2e6b34" roughness={0.8} />
      </mesh>

      {/* leaves */}
      <group ref={leavesRef}>
        {leaves.map((l, i) => (
          <mesh key={i} position={l.p} rotation={l.r} scale={l.s} castShadow>
            <sphereGeometry args={[0.22, 16, 12]} />
            <meshStandardMaterial color="#2e6b34" emissive="#3a8f2a" emissiveIntensity={0.1} roughness={0.7} flatShading />
          </mesh>
        ))}
      </group>

      {/* red chilli pods */}
      {pods.map((p, i) => (
        <mesh key={i} position={p.p} rotation={p.r} castShadow>
          <capsuleGeometry args={[0.045, 0.32, 6, 12]} />
          <meshStandardMaterial
            ref={(m) => (podMats.current[i] = m)}
            color="#c1281f" emissive="#c1281f" emissiveIntensity={0.15} roughness={0.45}
          />
        </mesh>
      ))}

      {/* pest swarm */}
      <instancedMesh ref={insectsRef} args={[undefined, undefined, INSECTS]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial color="#1a1208" roughness={0.6} />
      </instancedMesh>

      {/* protective spray mist */}
      <points ref={sprayRef} visible={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sprayPos, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.16} map={sprayTex} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} color="#bfffce" sizeAttenuation />
      </points>
    </group>
  );
}
