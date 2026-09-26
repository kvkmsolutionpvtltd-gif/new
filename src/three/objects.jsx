import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BLUE = '#3a8dff';
const CYAN = '#35e3e3';
const SILVER = '#9fb2cc';

/* ---------- Small helpers ---------- */

export function WireBox({ w = 1, h = 1, d = 1, color = BLUE, opacity = 1, ...props }) {
  return (
    <mesh {...props}>
      <boxGeometry args={[w, h, d]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={opacity} />
    </mesh>
  );
}

/** Glowing panel that reads as a floating UI/window/screen. */
export function Panel({ w = 2, h = 1.2, color = '#0e1a2c', edge = BLUE, glow = 0.5, ...props }) {
  return (
    <group {...props}>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          color={color}
          emissive={edge}
          emissiveIntensity={glow * 0.25}
          metalness={0.4}
          roughness={0.35}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(w, h)]} />
        <lineBasicMaterial color={edge} transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
}

/** A developer monitor with a "code" texture drawn procedurally. */
export function Monitor({ scale = 1, ...props }) {
  const tex = useMemo(() => makeCodeTexture(), []);
  return (
    <group scale={scale} {...props}>
      {/* screen */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[3.2, 2]} />
        <meshStandardMaterial map={tex} emissive={'#0a1830'} emissiveIntensity={0.6} toneMapped={false} />
      </mesh>
      {/* bezel */}
      <lineSegments position={[0, 0, 0.01]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(3.34, 2.14)]} />
        <lineBasicMaterial color={SILVER} transparent opacity={0.7} />
      </lineSegments>
      {/* stand */}
      <mesh position={[0, -1.3, -0.05]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color={'#20293a'} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -1.62, -0.05]}>
        <boxGeometry args={[1.2, 0.06, 0.5]} />
        <meshStandardMaterial color={'#20293a'} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}

/** Stacked database "disks". */
export function DatabaseStack({ color = CYAN, scale = 1, ...props }) {
  const g = useRef();
  useFrame((_, d) => {
    if (g.current) g.current.rotation.y += d * 0.25;
  });
  return (
    <group ref={g} scale={scale} {...props}>
      {[0.7, 0, -0.7].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <mesh>
            <cylinderGeometry args={[0.9, 0.9, 0.45, 40, 1, true]} />
            <meshStandardMaterial color={'#0e2130'} emissive={color} emissiveIntensity={0.25} metalness={0.6} roughness={0.3} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.225, 0]}>
            <cylinderGeometry args={[0.9, 0.9, 0.02, 40]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Server rack with blinking lights. */
export function ServerRack({ scale = 1, ...props }) {
  const lights = useRef([]);
  useFrame(() => {
    const t = performance.now() * 0.002;
    lights.current.forEach((m, i) => {
      if (m) m.material.emissiveIntensity = 0.2 + Math.abs(Math.sin(t + i)) * 1.2;
    });
  });
  return (
    <group scale={scale} {...props}>
      <mesh>
        <boxGeometry args={[1.4, 2.4, 1]} />
        <meshStandardMaterial color={'#0c141f'} metalness={0.6} roughness={0.4} />
      </mesh>
      {[0.9, 0.45, 0, -0.45, -0.9].map((y, r) => (
        <group key={r} position={[0, y, 0.51]}>
          <mesh>
            <boxGeometry args={[1.3, 0.32, 0.04]} />
            <meshStandardMaterial color={'#16202f'} metalness={0.5} roughness={0.5} />
          </mesh>
          {[-0.5, -0.3].map((x, c) => (
            <mesh key={c} ref={(el) => (lights.current[r * 2 + c] = el)} position={[x, 0, 0.03]}>
              <circleGeometry args={[0.03, 12]} />
              <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1} toneMapped={false} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/** A phone slab with a glowing screen. */
export function Phone({ scale = 1, screen = '#0b2647', ...props }) {
  return (
    <group scale={scale} {...props}>
      <mesh>
        <boxGeometry args={[0.9, 1.85, 0.08]} />
        <meshStandardMaterial color={'#0c1420'} metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[0.78, 1.66]} />
        <meshStandardMaterial color={screen} emissive={BLUE} emissiveIntensity={0.4} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.7, 0.05]}>
        <planeGeometry args={[0.6, 0.18]} />
        <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={0.6} transparent opacity={0.7} toneMapped={false} />
      </mesh>
    </group>
  );
}

/**
 * API node network: nodes connected by lines with data packets travelling.
 */
export function NodeNetwork({ count = 9, radius = 3, color = BLUE, scale = 1, ...props }) {
  const packetsRef = useRef();
  const { nodes, links, packetData } = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = radius * (0.5 + Math.random() * 0.5);
      nodes.push(new THREE.Vector3(Math.cos(a) * r, (Math.random() - 0.5) * 2.4, Math.sin(a) * r));
    }
    // center hub
    nodes.push(new THREE.Vector3(0, 0, 0));
    const links = [];
    for (let i = 0; i < count; i++) {
      links.push([i, count]); // to hub
      if (Math.random() > 0.5) links.push([i, (i + 1) % count]);
    }
    const packetData = links.map(() => Math.random());
    return { nodes, links, packetData };
  }, [count, radius]);

  const linePositions = useMemo(() => {
    const arr = new Float32Array(links.length * 2 * 3);
    links.forEach(([a, b], i) => {
      arr.set([nodes[a].x, nodes[a].y, nodes[a].z], i * 6);
      arr.set([nodes[b].x, nodes[b].y, nodes[b].z], i * 6 + 3);
    });
    return arr;
  }, [nodes, links]);

  const packetPositions = useMemo(() => new Float32Array(links.length * 3), [links]);

  useFrame((_, d) => {
    for (let i = 0; i < links.length; i++) {
      packetData[i] = (packetData[i] + d * 0.35) % 1;
      const [a, b] = links[i];
      const t = packetData[i];
      packetPositions[i * 3] = nodes[a].x + (nodes[b].x - nodes[a].x) * t;
      packetPositions[i * 3 + 1] = nodes[a].y + (nodes[b].y - nodes[a].y) * t;
      packetPositions[i * 3 + 2] = nodes[a].z + (nodes[b].z - nodes[a].z) * t;
    }
    if (packetsRef.current) packetsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group scale={scale} {...props}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n}>
          <icosahedronGeometry args={[i === count ? 0.32 : 0.16, 0]} />
          <meshStandardMaterial color={i === count ? CYAN : color} emissive={i === count ? CYAN : color} emissiveIntensity={0.8} toneMapped={false} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.25} />
      </lineSegments>
      <points ref={packetsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={packetPositions.length / 3} array={packetPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color={CYAN} size={0.12} transparent depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </points>
    </group>
  );
}

/** Vertical streams of "code" points flowing upward — the massive code scene. */
export function CodeStreams({ columns = 40, height = 20, color = BLUE, scale = 1, ...props }) {
  const ref = useRef();
  const count = columns * 24;
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * height;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 26;
      speeds[i] = 1 + Math.random() * 3;
    }
    return { positions, speeds };
  }, [count, height]);

  useFrame((_, d) => {
    const pos = positions;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i] * d;
      if (pos[i * 3 + 1] > height / 2) pos[i * 3 + 1] = -height / 2;
    }
    if (ref.current) ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref} scale={scale} {...props}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.06} transparent opacity={0.85} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
    </points>
  );
}

/** Slowly rotating icosahedron "idea" core. */
export function IdeaCore({ color = CYAN, scale = 1, ...props }) {
  const ref = useRef();
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.x += d * 0.3;
      ref.current.rotation.y += d * 0.4;
    }
  });
  return (
    <group scale={scale} {...props}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={'#0d2438'} emissive={color} emissiveIntensity={0.5} metalness={0.3} roughness={0.2} wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Floating card that tilts to mouse; used for design/team cards in 3D. */
export function FloatCard({ w = 1.4, h = 1.9, color = '#12203a', edge = BLUE, ...props }) {
  return (
    <group {...props}>
      <mesh>
        <boxGeometry args={[w, h, 0.05]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} emissive={edge} emissiveIntensity={0.12} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(w, h, 0.05)]} />
        <lineBasicMaterial color={edge} transparent opacity={0.6} />
      </lineSegments>
    </group>
  );
}

/* ---------- Procedural code texture ---------- */
let cachedCode = null;
function makeCodeTexture() {
  if (cachedCode) return cachedCode;
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 320;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#081426';
  ctx.fillRect(0, 0, c.width, c.height);
  // window chrome dots
  ctx.fillStyle = '#ff5f56';
  ctx.beginPath(); ctx.arc(16, 14, 5, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffbd2e';
  ctx.beginPath(); ctx.arc(34, 14, 5, 0, 7); ctx.fill();
  ctx.fillStyle = '#27c93f';
  ctx.beginPath(); ctx.arc(52, 14, 5, 0, 7); ctx.fill();
  const palette = ['#4aa8ff', '#35e3e3', '#8a6cff', '#9fb2cc', '#5fd08a'];
  ctx.font = '13px monospace';
  let y = 40;
  for (let line = 0; line < 20; line++) {
    let x = 14 + (line % 3) * 12;
    const segs = 2 + Math.floor(Math.random() * 5);
    for (let s = 0; s < segs; s++) {
      ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
      const wch = 3 + Math.floor(Math.random() * 9);
      ctx.fillRect(x, y - 9, wch * 7, 9);
      x += wch * 7 + 8;
      if (x > 470) break;
    }
    y += 14;
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  cachedCode = tex;
  return tex;
}
