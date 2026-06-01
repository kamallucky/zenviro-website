import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Drifting golden pollen / dust motes that float in the light. Additive, glowing.
export default function Pollen({ count = 380, area = 18, color = '#F5C77E' }) {
  const ref = useRef();

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * area;
      positions[i * 3 + 1] = Math.random() * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * area;
      speeds[i] = 0.15 + Math.random() * 0.4;
    }
    return { positions, speeds };
  }, [count, area]);

  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,230,170,0.8)');
    grad.addColorStop(1, 'rgba(255,230,170,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    return t;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array;
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * 0.01;
      arr[i * 3] += Math.sin(t * 0.5 + i) * 0.002;
      if (arr[i * 3 + 1] > 8) arr[i * 3 + 1] = 0;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.13}
        map={tex}
        color={color}
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
