"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────
// Scène 3D du hero :
// 1. un "terrain" de points (shader) qui ondule et réagit à la souris
// 2. un noyau filaire (icosaèdre) entouré d'anneaux : le "moteur"
// ─────────────────────────────────────────────────────────────

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  varying float vH;
  varying float vDist;
  void main() {
    vec3 p = position;
    float w = sin(p.x * 0.35 + uTime * 0.6) * 0.45 + cos(p.y * 0.3 + uTime * 0.4) * 0.45;
    float d = distance(p.xy, uMouse * vec2(14.0, 9.0));
    float ripple = sin(d * 1.3 - uTime * 3.0) * exp(-d * 0.25) * 0.9;
    p.z += w + ripple;
    vH = p.z;
    vDist = d;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = (2.2 + ripple * 2.0) * (14.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uA;
  uniform vec3 uB;
  varying float vH;
  varying float vDist;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (length(c) > 0.5) discard;
    float t = smoothstep(-0.6, 1.4, vH);
    vec3 col = mix(uA, uB, t * exp(-vDist * 0.08));
    gl_FragColor = vec4(col, 0.35 + t * 0.6);
  }
`;

function PointField() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(40, 26, 150, 100);
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uA: { value: new THREE.Color("#3a3d44") },
      uB: { value: new THREE.Color("#ff5b1f") },
    }),
    []
  );

  useFrame((state, dt) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value += dt;
    mouse.current.lerp(state.pointer, 0.06);
    mat.current.uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <points geometry={geometry} rotation={[-1.08, 0, 0]} position={[0, -3.2, -4]}>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Core() {
  const group = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * 0.15;
    // parallaxe douce avec la souris
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.3, 0.05);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.pointer.x * 0.4, 0.05);
    if (ring1.current) ring1.current.rotation.z += dt * 0.4;
    if (ring2.current) ring2.current.rotation.x += dt * 0.25;
  });

  return (
    <group ref={group} position={[0, 0.6, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial color="#e8e6df" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh scale={0.55}>
        <icosahedronGeometry args={[1.25, 0]} />
        <meshBasicMaterial color="#ff5b1f" wireframe />
      </mesh>
      <mesh ref={ring1} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.1, 0.006, 8, 160]} />
        <meshBasicMaterial color="#e8e6df" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2} rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[2.6, 0.004, 8, 160]} />
        <meshBasicMaterial color="#ff5b1f" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// La caméra recule et descend quand on scrolle dans le hero.
function ScrollCamera() {
  const { camera } = useThree();
  useFrame(() => {
    const p = Math.min(window.scrollY / window.innerHeight, 1.2);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7 + p * 4, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.4 - p * 1.5, 0.08);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.4, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <PointField />
      <Core />
      <ScrollCamera />
    </Canvas>
  );
}
