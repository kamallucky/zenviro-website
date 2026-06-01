import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Field from './Field';
import Bottle from './Bottle';
import Pollen from './Pollen';
import ChilliScene from './ChilliScene';
import TelanganaMap from './TelanganaMap';
import Rig from './Rig';

// ─── Gradient golden-hour sky dome ───
function GradientSky() {
  const mat = useMemo(() => new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: {
      top: { value: new THREE.Color('#0a3326') },
      mid: { value: new THREE.Color('#2a7d4a') },
      bottom: { value: new THREE.Color('#f3b24a') },
    },
    vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec3 vP; uniform vec3 top; uniform vec3 mid; uniform vec3 bottom;
      void main(){
        float h = normalize(vP).y * 0.5 + 0.5;
        vec3 c = h < 0.5 ? mix(bottom, mid, smoothstep(0.0,1.0,h*2.0))
                         : mix(mid, top, smoothstep(0.0,1.0,(h-0.5)*2.0));
        gl_FragColor = vec4(c, 1.0);
      }`,
  }), []);
  return (
    <mesh>
      <sphereGeometry args={[60, 32, 32]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

// ─── Glowing sun near the horizon (bloom picks this up) ───
function Sun() {
  return (
    <mesh position={[8, 5, -28]}>
      <sphereGeometry args={[3.2, 32, 32]} />
      <meshBasicMaterial color="#ffe6a8" toneMapped={false} />
    </mesh>
  );
}

// ─── A small flower & crop patch for the Crop Finder act ───
function FlowerPatch({ position = [0, 0, 0] }) {
  const group = useRef();
  const flowers = useMemo(() => {
    const arr = [];
    const cols = ['#EF9F27', '#e85d75', '#f3d250', '#d94f8c', '#ffffff'];
    for (let i = 0; i < 14; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 4,
        z: (Math.random() - 0.5) * 3,
        h: 0.7 + Math.random() * 0.7,
        c: cols[i % cols.length],
        ph: Math.random() * 10,
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.children.forEach((f, i) => {
      f.rotation.z = Math.sin(t * 1.2 + flowers[i]?.ph) * 0.12;
    });
  });

  return (
    <group ref={group} position={position}>
      {flowers.map((f, i) => (
        <group key={i} position={[f.x, 0, f.z]}>
          <mesh position={[0, f.h / 2, 0]}>
            <cylinderGeometry args={[0.015, 0.025, f.h, 6]} />
            <meshStandardMaterial color="#2e6b34" />
          </mesh>
          <mesh position={[0, f.h, 0]}>
            <sphereGeometry args={[0.13, 12, 10]} />
            <meshStandardMaterial color={f.c} emissive={f.c} emissiveIntensity={0.35} roughness={0.6} flatShading />
          </mesh>
          <mesh position={[0, f.h, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#5a3a12" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── Ground disc ───
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
      <circleGeometry args={[40, 48]} />
      <meshStandardMaterial color="#173a1e" roughness={1} />
    </mesh>
  );
}

function SceneContents({ quality }) {
  const high = quality === 'high';
  return (
    <>
      <GradientSky />
      <Sun />
      <fog attach="fog" args={['#3a7d4a', 10, 46]} />

      {/* warm golden-hour lighting */}
      <hemisphereLight args={['#bfe6c0', '#2a1a0e', 0.7]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[8, 6, -10]} intensity={2.2} color="#ffd9a0" castShadow={false} />
      <directionalLight position={[-6, 4, 6]} intensity={0.5} color="#9fd4ff" />

      <Ground />
      <Field count={high ? 7000 : 2600} radius={26} />
      <Pollen count={high ? 380 : 140} />

      {/* ACT 1 — hero bottle (center) */}
      <group position={[0, 1.45, 0]}>
        <Bottle scale={1.15} spin={0.4} />
        {/* contact shadow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]}>
          <circleGeometry args={[0.9, 32]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.25} />
        </mesh>
      </group>

      {/* ACT 2 — chilli + pests + spray */}
      <ChilliScene position={[4, 0, -1.5]} />

      {/* ACT 3 — product showcase bottle */}
      <group position={[-4, 1.4, -1]}>
        <Bottle scale={1.0} spin={0.6} labelColor="#0F3D1F" name="ZENVIRO" sub="16 Products · 6 Ranges" />
      </group>

      {/* ACT 4 — crops & flowers */}
      <FlowerPatch position={[0, 0, -5]} />

      {/* ACT 5 — Telangana map */}
      <TelanganaMap position={[4.5, 2.4, -4]} />

      <Rig />

      {high && (
        <EffectComposer disableNormalPass>
          <Bloom intensity={0.85} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur />
          <Vignette eskil={false} offset={0.25} darkness={0.75} />
        </EffectComposer>
      )}
    </>
  );
}

export default function Experience({ quality = 'high' }) {
  return (
    <Canvas
      className="fixed inset-0"
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      dpr={[1, quality === 'high' ? 2 : 1.3]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 42, near: 0.1, far: 120, position: [0, 1.6, 6.6] }}
    >
      <Suspense fallback={null}>
        <SceneContents quality={quality} />
      </Suspense>
    </Canvas>
  );
}
