import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Builds a label texture with a 2D canvas (no external font dependency).
function makeLabelTexture({ labelColor, accent, name, sub }) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const g = c.getContext('2d');

  // background
  g.fillStyle = labelColor;
  g.fillRect(0, 0, 512, 512);
  // subtle vertical sheen
  const grad = g.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, 'rgba(255,255,255,0.10)');
  grad.addColorStop(0.5, 'rgba(255,255,255,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.18)');
  g.fillStyle = grad; g.fillRect(0, 0, 512, 512);

  // gold rule lines
  g.fillStyle = accent;
  g.fillRect(96, 150, 320, 4);
  g.fillRect(96, 372, 320, 4);

  g.textAlign = 'center';
  // brand
  g.fillStyle = accent;
  g.font = '700 30px Georgia, serif';
  g.fillText('Z E N V I R O', 256, 130);
  // product name (may wrap two lines)
  g.fillStyle = '#ffffff';
  g.font = '900 76px Georgia, serif';
  const words = name.split(' ');
  if (words.length > 1) {
    g.fillText(words[0], 256, 245);
    g.fillText(words.slice(1).join(' '), 256, 320);
  } else {
    g.fillText(name, 256, 285);
  }
  // sub
  g.fillStyle = 'rgba(255,255,255,0.85)';
  g.font = '400 26px Helvetica, Arial, sans-serif';
  g.fillText(sub, 256, 420);

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 8;
  return tex;
}

// A stylized-premium 3D Block Rock bottle: white plastic body, green wrap label
// (baked texture), gold cap. Gently floats & auto-rotates.
export default function Bottle({
  scale = 1, floatSpeed = 1, spin = 0.25,
  labelColor = '#0F3D1F', accent = '#EF9F27',
  name = 'BLOCK ROCK', sub = 'Imidacloprid 17.8% SL',
}) {
  const group = useRef();
  const t0 = useMemo(() => Math.random() * 100, []);
  const labelTex = useMemo(() => makeLabelTexture({ labelColor, accent, name, sub }), [labelColor, accent, name, sub]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime + t0;
    group.current.position.y = Math.sin(t * floatSpeed) * 0.12;
    group.current.rotation.y += spin * 0.005;
    group.current.rotation.z = Math.sin(t * 0.5) * 0.02;
  });

  return (
    <group ref={group} scale={scale} dispose={null}>
      {/* body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.46, 0.5, 1.7, 48]} />
        <meshStandardMaterial color="#f4f4ef" roughness={0.25} metalness={0.05} />
      </mesh>
      {/* shoulder */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.2, 0.46, 0.28, 48]} />
        <meshStandardMaterial color="#f4f4ef" roughness={0.25} metalness={0.05} />
      </mesh>
      {/* neck */}
      <mesh position={[0, 1.16, 0]}>
        <cylinderGeometry args={[0.16, 0.18, 0.18, 32]} />
        <meshStandardMaterial color="#e8e8e2" roughness={0.3} />
      </mesh>
      {/* gold cap */}
      <mesh position={[0, 1.33, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.22, 32]} />
        <meshStandardMaterial color={accent} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* solid green label wrap (back / sides) */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.505, 0.505, 1.18, 48, 1, true]} />
        <meshStandardMaterial color={labelColor} roughness={0.55} side={THREE.DoubleSide} />
      </mesh>

      {/* front label face with baked texture */}
      <mesh position={[0, -0.02, 0.5]}>
        <planeGeometry args={[0.86, 1.16]} />
        <meshStandardMaterial map={labelTex} roughness={0.5} />
      </mesh>
    </group>
  );
}
