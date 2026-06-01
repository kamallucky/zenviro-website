import { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BLADE_H = 0.95;

// A vast instanced field of grass/crop blades swaying in the wind.
// Wind is applied per-vertex in the shader (more displacement toward the tip),
// phased by each instance's world position so the whole field ripples.
export default function Field({ count = 7000, radius = 26, color = '#1A5C2A', tip = '#8FbF3a' }) {
  const meshRef = useRef();
  const matRef = useRef();
  const shaderRef = useRef(null);

  // blade geometry — tapered, base pivot at y=0
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(0.09, BLADE_H, 1, 4);
    g.translate(0, BLADE_H / 2, 0);
    return g;
  }, []);

  const { dummy, data } = useMemo(() => {
    const dummy = new THREE.Object3D();
    const data = [];
    for (let i = 0; i < count; i++) {
      // scatter on a disc, denser toward center
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radius;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      data.push({ x, z, rot: Math.random() * Math.PI, scale: 0.6 + Math.random() * 1.1 });
    }
    return { dummy, data };
  }, [count, radius]);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    const colorAttr = new Float32Array(count * 3);
    const cBase = new THREE.Color(color);
    for (let i = 0; i < count; i++) {
      const d = data[i];
      dummy.position.set(d.x, 0, d.z);
      dummy.rotation.set(0, d.rot, 0);
      dummy.scale.set(1, d.scale, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      // slight per-blade hue variation
      const c = cBase.clone().offsetHSL(0, 0, (Math.random() - 0.5) * 0.12);
      colorAttr[i * 3] = c.r;
      colorAttr[i * 3 + 1] = c.g;
      colorAttr[i * 3 + 2] = c.b;
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.geometry.setAttribute('aColor', new THREE.InstancedBufferAttribute(colorAttr, 3));
  }, [count, data, dummy, color]);

  // inject wind sway + tip gradient into a standard material
  const onBeforeCompile = (shader) => {
    shader.uniforms.uTime = { value: 0 };
    shader.uniforms.uTip = { value: new THREE.Color(tip) };
    shaderRef.current = shader;

    shader.vertexShader =
      'uniform float uTime;\nattribute vec3 aColor;\nvarying float vH;\nvarying vec3 vInstColor;\n' +
      shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
       vH = clamp(position.y / ${BLADE_H.toFixed(2)}, 0.0, 1.0);
       vInstColor = aColor;
       float ipx = instanceMatrix[3][0];
       float ipz = instanceMatrix[3][2];
       float wind = sin(uTime * 1.6 + ipx * 0.55 + ipz * 0.4)
                  + 0.5 * sin(uTime * 3.1 + ipx * 0.9);
       float k = vH * vH;
       transformed.x += wind * 0.22 * k;
       transformed.z += cos(uTime * 1.3 + ipx * 0.5) * 0.12 * k;`
    );

    shader.fragmentShader =
      'uniform vec3 uTip;\nvarying float vH;\nvarying vec3 vInstColor;\n' + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
       vec3 grad = mix(vInstColor, uTip, vH * 0.85);
       diffuseColor.rgb *= grad;`
    );
  };

  useFrame(({ clock }) => {
    if (shaderRef.current) shaderRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, count]}
      castShadow={false}
      receiveShadow={false}
    >
      <meshStandardMaterial
        ref={matRef}
        color="#ffffff"
        side={THREE.DoubleSide}
        roughness={0.85}
        metalness={0}
        onBeforeCompile={onBeforeCompile}
      />
    </instancedMesh>
  );
}
