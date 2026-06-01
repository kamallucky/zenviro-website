import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { actProgress, smoothstep } from './scrollStore';

// An extruded 3D map of Telangana that rises and tilts into view during the 'reach' act,
// with district pins that pop up and a glowing Hyderabad HQ marker.
export default function TelanganaMap({ position = [0, 0, 0] }) {
  const group = useRef();
  const pinsRef = useRef([]);
  const hqRef = useRef();
  const hqGlowRef = useRef();

  const geometry = useMemo(() => {
    // approximate Telangana outline (local units, ~6 wide)
    const pts = [
      [0.1, 3.0], [1.0, 2.7], [1.6, 2.9], [2.0, 2.4], [2.6, 2.2],
      [2.9, 1.5], [2.6, 0.8], [2.9, 0.2], [2.5, -0.6], [2.0, -1.2],
      [1.6, -2.0], [1.0, -2.6], [0.4, -3.0], [-0.2, -2.5], [-0.8, -2.7],
      [-1.4, -2.1], [-1.9, -1.4], [-2.3, -0.6], [-2.0, 0.2], [-2.4, 0.9],
      [-2.0, 1.6], [-1.4, 1.9], [-1.0, 2.5], [-0.4, 2.7],
    ];
    const shape = new THREE.Shape();
    shape.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.5, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 2,
    });
    geo.center();
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  // district pins (local x,z on the map plane), HQ first (Hyderabad ~ center)
  const pins = useMemo(() => ([
    { x: 0.2, z: 0.1, hq: true },
    { x: 1.2, z: -0.6 }, { x: -0.9, z: -0.4 }, { x: 0.9, z: 0.9 },
    { x: -1.3, z: 0.6 }, { x: 0.0, z: 1.4 }, { x: 1.4, z: 0.4 },
    { x: -0.5, z: -1.2 }, { x: 0.7, z: -1.4 }, { x: -1.6, z: -0.9 },
  ]), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const rp = actProgress('reach');
    const rise = smoothstep(0.0, 0.5, rp);

    if (group.current) {
      group.current.position.y = position[1] + (1 - rise) * -3;
      group.current.rotation.x = (1 - rise) * 0.5;
      group.current.rotation.y = Math.sin(t * 0.2) * 0.15 + rp * 0.3;
    }
    pinsRef.current.forEach((pin, i) => {
      if (!pin) return;
      const local = smoothstep(0.15 + i * 0.05, 0.55 + i * 0.05, rp);
      pin.scale.setScalar(Math.max(0.0001, local));
      pin.position.y = 0.3 + local * (0.4 + Math.sin(t * 2 + i) * 0.05);
    });
    if (hqRef.current) {
      const s = 1 + Math.sin(t * 3) * 0.12;
      hqRef.current.scale.set(s, 1, s);
    }
    if (hqGlowRef.current) {
      hqGlowRef.current.material.opacity = (0.3 + Math.sin(t * 3) * 0.15) * rise;
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color="#0F3D1F" roughness={0.6} metalness={0.1} emissive="#1A5C2A" emissiveIntensity={0.25} />
      </mesh>
      {/* gold rim glow on top face */}
      <mesh geometry={geometry} scale={1.005}>
        <meshStandardMaterial color="#1A5C2A" wireframe transparent opacity={0.15} />
      </mesh>

      {pins.map((p, i) => (
        <group key={i} position={[p.x, 0.3, p.z]}>
          <mesh ref={(el) => (pinsRef.current[i] = el)}>
            <coneGeometry args={[0.08, 0.3, 8]} />
            <meshStandardMaterial
              color={p.hq ? '#EF9F27' : '#639922'}
              emissive={p.hq ? '#EF9F27' : '#639922'}
              emissiveIntensity={p.hq ? 0.8 : 0.4}
            />
          </mesh>
          {p.hq && (
            <>
              <mesh ref={hqRef} position={[0, -0.1, 0]}>
                <cylinderGeometry args={[0.14, 0.14, 0.02, 24]} />
                <meshBasicMaterial color="#EF9F27" transparent opacity={0.5} />
              </mesh>
              <mesh ref={hqGlowRef} position={[0, 0.2, 0]}>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshBasicMaterial color="#EF9F27" transparent opacity={0.3} />
              </mesh>
            </>
          )}
        </group>
      ))}
    </group>
  );
}
