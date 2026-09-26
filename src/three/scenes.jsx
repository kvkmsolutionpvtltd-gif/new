import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';
import EagleParticles from './EagleParticles';

const BLUE = '#3a8dff';
const CYAN = '#35e3e3';
const VIOLET = '#8a6cff';
const GREEN = '#5fd08a';
const RED = '#ff5f6b';

/* Idea sphere that splits into diverging paths */
export function IdeaSplit({ scale = 1, ...props }) {
  const core = useRef();
  const paths = useRef();
  const count = 5;
  useFrame((_, d) => {
    if (core.current) {
      core.current.rotation.y += d * 0.5;
      core.current.rotation.x += d * 0.2;
    }
    if (paths.current) paths.current.rotation.z += d * 0.05;
  });
  return (
    <group scale={scale} {...props}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial color="#0d2438" emissive={CYAN} emissiveIntensity={0.6} wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
      <group ref={paths}>
        {[...Array(count)].map((_, i) => {
          const a = (i / count) * Math.PI * 2;
          const r = 3;
          return (
            <group key={i}>
              <mesh position={[Math.cos(a) * r, Math.sin(a) * r * 0.6, 0]}>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color={i % 2 ? BLUE : VIOLET} emissive={i % 2 ? BLUE : VIOLET} emissiveIntensity={0.5} wireframe />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/* Stacked translucent layers assembling into a poster (Photoshop / Canva) */
export function LayerStack({ scale = 1, color = VIOLET, ...props }) {
  const g = useRef();
  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.elapsedTime;
    g.current.children.forEach((c, i) => {
      c.position.z = -i * 0.35 + Math.sin(t + i) * 0.05;
    });
    g.current.rotation.y = Math.sin(t * 0.2) * 0.4;
  });
  const layers = ['#12203a', '#1a2c4a', '#24406a', color, '#eaf2ff'];
  return (
    <group ref={g} scale={scale} rotation={[0.2, -0.4, 0]} {...props}>
      {layers.map((c, i) => (
        <mesh key={i} position={[i * 0.12, -i * 0.1, -i * 0.35]}>
          <planeGeometry args={[2.4, 1.5]} />
          <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.2} transparent opacity={0.7} side={THREE.DoubleSide} metalness={0.3} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/* React component blocks assembling into a layout */
export function ComponentAssembly({ scale = 1, ...props }) {
  const blocks = useMemo(
    () => [
      { p: [0, 1.5, 0], s: [3, 0.4, 0.2], c: BLUE },
      { p: [0, 0.4, 0], s: [3, 1.3, 0.2], c: CYAN },
      { p: [-1, -1, 0], s: [1.3, 0.9, 0.2], c: VIOLET },
      { p: [0.9, -1, 0], s: [1.3, 0.9, 0.2], c: BLUE },
      { p: [0, -2, 0], s: [3, 0.35, 0.2], c: CYAN },
    ],
    []
  );
  const g = useRef();
  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.elapsedTime;
    g.current.children.forEach((c, i) => {
      c.position.x = c.userData.x + Math.sin(t * 0.8 + i) * 0.06;
    });
    g.current.rotation.y = Math.sin(t * 0.25) * 0.3;
  });
  return (
    <group ref={g} scale={scale} {...props}>
      {blocks.map((b, i) => (
        <mesh key={i} position={b.p} userData={{ x: b.p[0] }}>
          <boxGeometry args={b.s} />
          <meshStandardMaterial color="#0e1a2c" emissive={b.c} emissiveIntensity={0.35} metalness={0.4} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

/* Data packets streaming through a tunnel (Node backend / API) */
export function DataTunnel({ scale = 1, color = BLUE, ...props }) {
  const packets = useRef();
  const COUNT = 220;
  const { positions, offs } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const offs = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) offs[i] = Math.random();
    return { positions, offs };
  }, []);
  const tunnel = useRef();
  useFrame((_, d) => {
    const R = 1.4;
    for (let i = 0; i < COUNT; i++) {
      offs[i] = (offs[i] + d * 0.25) % 1;
      const z = (offs[i] - 0.5) * 12;
      const a = i * 0.6 + offs[i] * 6;
      const rr = R * (0.5 + 0.5 * ((i % 5) / 5));
      positions[i * 3] = Math.cos(a) * rr;
      positions[i * 3 + 1] = Math.sin(a) * rr;
      positions[i * 3 + 2] = z;
    }
    if (packets.current) packets.current.geometry.attributes.position.needsUpdate = true;
    if (tunnel.current) tunnel.current.rotation.z += d * 0.1;
  });
  return (
    <group scale={scale} rotation={[0, 0, 0]} {...props}>
      <mesh ref={tunnel}>
        <cylinderGeometry args={[1.8, 1.8, 12, 24, 1, true]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
      <points ref={packets}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color={CYAN} size={0.12} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </points>
    </group>
  );
}

/* One code core splitting into multiple devices (Flutter / RN) */
export function DeviceSplit({ scale = 1, mobile = false, ...props }) {
  const specs = mobile
    ? [[0, 0, 0, 1]]
    : [
        [-3, 0.2, 0, 0.9],
        [-1, -0.3, 0.5, 1],
        [1.1, 0.1, 0.3, 0.8],
        [3, -0.2, 0, 1.1],
      ];
  return (
    <group scale={scale} {...props}>
      <mesh position={[0, 1.6, -1]}>
        <boxGeometry args={[1.2, 0.8, 0.1]} />
        <meshStandardMaterial color="#0e1a2c" emissive={CYAN} emissiveIntensity={0.4} />
      </mesh>
      {specs.map(([x, y, z, s], i) => (
        <Float key={i} speed={1.4} floatIntensity={0.5} rotationIntensity={0.2}>
          <group position={[x, y, z]} scale={s}>
            <mesh>
              <boxGeometry args={[0.9, 1.85, 0.08]} />
              <meshStandardMaterial color="#0c1420" metalness={0.8} roughness={0.25} />
            </mesh>
            <mesh position={[0, 0, 0.05]}>
              <planeGeometry args={[0.78, 1.66]} />
              <meshStandardMaterial color="#0b2647" emissive={BLUE} emissiveIntensity={0.5} toneMapped={false} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

/* Build factory — rotating gear-like rings feeding a core (Gradle) */
export function BuildFactory({ scale = 1, ...props }) {
  const rings = useRef([]);
  useFrame((_, d) => {
    rings.current.forEach((r, i) => {
      if (r) r.rotation.z += d * (i % 2 ? -0.6 : 0.6) * (1 + i * 0.2);
    });
  });
  return (
    <group scale={scale} {...props}>
      {[1.6, 1.1, 0.7].map((rad, i) => (
        <mesh key={i} ref={(el) => (rings.current[i] = el)}>
          <torusGeometry args={[rad, 0.06, 8, 28]} />
          <meshStandardMaterial color={i === 0 ? BLUE : i === 1 ? CYAN : VIOLET} emissive={i === 0 ? BLUE : i === 1 ? CYAN : VIOLET} emissiveIntensity={0.6} toneMapped={false} />
        </mesh>
      ))}
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={1.2} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* Floating card game — cards fanning and flipping */
export function CardGame({ scale = 1, ...props }) {
  const g = useRef();
  useFrame(({ clock }) => {
    if (!g.current) return;
    const t = clock.elapsedTime;
    g.current.children.forEach((c, i) => {
      c.rotation.y = Math.sin(t * 0.8 + i * 0.5) * 0.8;
      c.position.y = Math.sin(t + i) * 0.15;
    });
    g.current.rotation.y = Math.sin(t * 0.2) * 0.3;
  });
  const cols = [BLUE, CYAN, VIOLET, BLUE, CYAN];
  return (
    <group ref={g} scale={scale} {...props}>
      {cols.map((c, i) => (
        <group key={i} position={[(i - 2) * 0.9, 0, 0]} rotation={[0, 0, (i - 2) * 0.12]}>
          <mesh>
            <boxGeometry args={[0.7, 1.05, 0.03]} />
            <meshStandardMaterial color="#0e1a2c" emissive={c} emissiveIntensity={0.35} metalness={0.4} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.5, 0.85]} />
            <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.5} transparent opacity={0.5} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* Morphing object — cube to detailed shape (Blender / 3D) */
export function MorphObject({ scale = 1, ...props }) {
  const m = useRef();
  useFrame((_, d) => {
    if (m.current) {
      m.current.rotation.x += d * 0.3;
      m.current.rotation.y += d * 0.4;
    }
  });
  return (
    <group scale={scale} {...props}>
      <mesh ref={m}>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshStandardMaterial color="#16324e" emissive={CYAN} emissiveIntensity={0.35} metalness={0.6} roughness={0.2} flatShading />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

/* Testing chambers — objects with pass/fail state */
export function TestChambers({ scale = 1, ...props }) {
  const items = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    items.current.forEach((it, i) => {
      if (!it) return;
      const pass = Math.sin(t * 0.6 + i * 1.3) > -0.2;
      const c = pass ? GREEN : RED;
      it.material.color.set(c);
      it.material.emissive.set(c);
      it.position.y = Math.sin(t + i) * 0.1;
    });
  });
  return (
    <group scale={scale} {...props}>
      {[...Array(6)].map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <group key={i} position={[Math.cos(a) * 2.6, 0, Math.sin(a) * 2.6]}>
            <mesh>
              <boxGeometry args={[1, 1.2, 1]} />
              <meshBasicMaterial color={BLUE} wireframe transparent opacity={0.2} />
            </mesh>
            <mesh ref={(el) => (items.current[i] = el)}>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.9} toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* Cloud deployment — a core radiating to device points lighting up */
export function CloudDeploy({ scale = 1, ...props }) {
  const dots = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    dots.current.forEach((dt, i) => {
      if (dt) dt.material.emissiveIntensity = 0.3 + Math.abs(Math.sin(t * 1.2 + i)) * 1.4;
    });
  });
  const pts = [];
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    pts.push([Math.cos(a) * 3, Math.sin(a) * 1.6, Math.sin(a * 2) * 1.5]);
  }
  return (
    <group scale={scale} {...props}>
      <mesh>
        <sphereGeometry args={[0.9, 24, 16]} />
        <meshStandardMaterial color="#0e2438" emissive={BLUE} emissiveIntensity={0.6} wireframe />
      </mesh>
      {pts.map((p, i) => (
        <group key={i}>
          <line>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={2} array={new Float32Array([0, 0, 0, ...p])} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial color={BLUE} transparent opacity={0.3} />
          </line>
          <mesh position={p} ref={(el) => (dots.current[i] = el)}>
            <boxGeometry args={[0.5, 0.85, 0.06]} />
            <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={1} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* Products orbiting the camera (e-commerce) */
export function ProductRing({ scale = 1, count = 7, ...props }) {
  const g = useRef();
  useFrame((_, d) => {
    if (g.current) g.current.rotation.y += d * 0.25;
  });
  const cols = [BLUE, CYAN, VIOLET];
  return (
    <group ref={g} scale={scale} {...props}>
      {[...Array(count)].map((_, i) => {
        const a = (i / count) * Math.PI * 2;
        const r = 3.2;
        return (
          <Float key={i} speed={1.5} floatIntensity={0.6} rotationIntensity={0.4}>
            <mesh position={[Math.cos(a) * r, Math.sin(a * 1.5) * 0.6, Math.sin(a) * r]}>
              <boxGeometry args={[0.7, 0.7, 0.7]} />
              <meshStandardMaterial color="#0e1a2c" emissive={cols[i % 3]} emissiveIntensity={0.4} metalness={0.5} roughness={0.3} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

/* ============ Dedicated deliverable showcases ============ */

/** APPS — a fan of phones flipping and orbiting, one central hero device. */
export function AppsShowcase({ scale = 1, mobile = false, ...props }) {
  const g = useRef();
  const hero = useRef();
  const cols = ['#3a8dff', '#35e3e3', '#8a6cff', '#5fd08a', '#ff8f5a'];
  const n = mobile ? 3 : 5;
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (g.current) {
      g.current.rotation.y = Math.sin(t * 0.2) * 0.4;
      g.current.children.forEach((c, i) => {
        c.rotation.y = Math.sin(t * 0.8 + i) * 0.6;
        c.position.y = Math.sin(t + i * 0.7) * 0.2;
      });
    }
    if (hero.current) hero.current.rotation.y += 0.01;
  });
  return (
    <group scale={scale} {...props}>
      <group ref={hero}>
        <mesh>
          <boxGeometry args={[1.1, 2.2, 0.1]} />
          <meshStandardMaterial color="#0c1420" metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[0.95, 2]} />
          <meshStandardMaterial color="#0b2647" emissive="#3a8dff" emissiveIntensity={0.6} toneMapped={false} />
        </mesh>
      </group>
      <group ref={g}>
        {[...Array(n)].map((_, i) => {
          const a = (i / n) * Math.PI * 2;
          const r = 3;
          return (
            <group key={i} position={[Math.cos(a) * r, 0, Math.sin(a) * r]}>
              <mesh>
                <boxGeometry args={[0.8, 1.6, 0.08]} />
                <meshStandardMaterial color="#0c1420" metalness={0.7} roughness={0.3} />
              </mesh>
              <mesh position={[0, 0, 0.05]}>
                <planeGeometry args={[0.68, 1.44]} />
                <meshStandardMaterial color="#0b2038" emissive={cols[i % cols.length]} emissiveIntensity={0.55} toneMapped={false} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/** WEBSITE — a large browser window that continuously builds its blocks. */
export function WebsiteShowcase({ scale = 1, ...props }) {
  const blocks = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    blocks.current.forEach((b, i) => {
      if (!b) return;
      const cycle = (t * 0.5 + i * 0.25) % 3;
      const grow = THREE.MathUtils.clamp(cycle, 0, 1);
      b.scale.y = 0.05 + grow * 0.95;
    });
  });
  const rows = [
    { y: 1.5, w: 4.6, h: 0.5, c: '#3a8dff' },
    { y: 0.7, w: 4.6, h: 1.0, c: '#35e3e3' },
    { y: -0.5, w: 2.1, h: 1.0, c: '#8a6cff', x: -1.25 },
    { y: -0.5, w: 2.1, h: 1.0, c: '#3a8dff', x: 1.25 },
    { y: -1.7, w: 4.6, h: 0.5, c: '#35e3e3' },
  ];
  return (
    <group scale={scale} {...props}>
      {/* browser frame */}
      <mesh position={[0, 0, -0.15]}>
        <boxGeometry args={[5.4, 4.2, 0.1]} />
        <meshStandardMaterial color="#0a1220" metalness={0.5} roughness={0.5} />
      </mesh>
      <lineSegments position={[0, 0, -0.05]}>
        <edgesGeometry args={[new THREE.BoxGeometry(5.4, 4.2, 0.1)]} />
        <lineBasicMaterial color="#3a8dff" transparent opacity={0.5} />
      </lineSegments>
      {/* window dots */}
      {[-2.5, -2.3, -2.1].map((x, i) => (
        <mesh key={i} position={[x, 1.9, 0]}>
          <circleGeometry args={[0.06, 12]} />
          <meshStandardMaterial color={['#ff5f56', '#ffbd2e', '#27c93f'][i]} emissive={['#ff5f56', '#ffbd2e', '#27c93f'][i]} emissiveIntensity={0.6} toneMapped={false} />
        </mesh>
      ))}
      {/* building blocks */}
      {rows.map((r, i) => (
        <mesh key={i} ref={(el) => (blocks.current[i] = el)} position={[r.x || 0, r.y, 0.02]}>
          <boxGeometry args={[r.w, r.h, 0.06]} />
          <meshStandardMaterial color="#0e1a2c" emissive={r.c} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/** LOGO — the eagle assembling from particles inside a rotating light ring. */
export function LogoShowcase({ scale = 1, mobile = false, ...props }) {
  const ring = useRef();
  const ring2 = useRef();
  useFrame((_, d) => {
    if (ring.current) ring.current.rotation.z += d * 0.4;
    if (ring2.current) ring2.current.rotation.z -= d * 0.25;
  });
  return (
    <group scale={scale} {...props}>
      <EagleParticles count={mobile ? 2200 : 4200} assemble={1} scale={1.4} size={0.028} />
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.6, 0.02, 8, 64]} />
        <meshStandardMaterial color="#35e3e3" emissive="#35e3e3" emissiveIntensity={0.8} toneMapped={false} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[3.1, 0.015, 8, 64]} />
        <meshStandardMaterial color="#3a8dff" emissive="#3a8dff" emissiveIntensity={0.6} toneMapped={false} />
      </mesh>
    </group>
  );
}
