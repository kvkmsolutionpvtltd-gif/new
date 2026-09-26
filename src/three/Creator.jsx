import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Monitor } from './objects';

/**
 * Stylized (non-photorealistic, low-poly) 3D creator at a neat PC desk.
 * We see them over the shoulder: back of head + shoulders + hands typing on a
 * keyboard, a glowing monitor beyond, and finished products (app / website /
 * logo) rising out of the screen and flying into 3D space.
 *
 * Purely procedural geometry — flat-shaded, matte, brand-tinted. No textures of
 * a real person, no photoreal skin.
 */

const SKIN = '#c9d4e2'; // stylized neutral, not realistic skin
const HOODIE = '#1b2a44';
const HAIR = '#26303f';
const DESK = '#141c28';

function Figure() {
  const larm = useRef();
  const rarm = useRef();
  const head = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // typing: forearms bob up/down out of phase
    if (larm.current) larm.current.rotation.x = -0.9 + Math.sin(t * 6) * 0.08;
    if (rarm.current) rarm.current.rotation.x = -0.9 + Math.sin(t * 6 + 1.4) * 0.08;
    // subtle head motion
    if (head.current) head.current.rotation.y = Math.sin(t * 0.8) * 0.12;
  });

  return (
    <group>
      {/* gaming chair back + headrest with RGB edge */}
      <mesh position={[0, 0.65, 0.55]}>
        <boxGeometry args={[1.1, 1.2, 0.12]} />
        <meshStandardMaterial color="#0e1622" metalness={0.4} roughness={0.6} flatShading />
      </mesh>
      <mesh position={[0, 1.45, 0.55]}>
        <boxGeometry args={[0.7, 0.4, 0.14]} />
        <meshStandardMaterial color="#0e1622" metalness={0.4} roughness={0.6} flatShading />
      </mesh>
      {[-0.56, 0.56].map((x) => (
        <mesh key={x} position={[x, 0.7, 0.5]}>
          <boxGeometry args={[0.05, 1.5, 0.05]} />
          <meshStandardMaterial color="#3a8dff" emissive="#3a8dff" emissiveIntensity={0.8} toneMapped={false} />
        </mesh>
      ))}

      {/* torso (hoodie) */}
      <mesh position={[0, 0.55, 0.1]} rotation={[0.18, 0, 0]}>
        <capsuleGeometry args={[0.42, 0.55, 6, 12]} />
        <meshStandardMaterial color={HOODIE} emissive="#24406a" emissiveIntensity={0.4} roughness={0.7} flatShading />
      </mesh>

      {/* neck + head (seen from behind) */}
      <group ref={head} position={[0, 1.28, 0.06]}>
        <mesh position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.12, 0.14, 0.2, 10]} />
          <meshStandardMaterial color={SKIN} roughness={0.8} flatShading />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.28, 16, 14]} />
          <meshStandardMaterial color={SKIN} emissive="#66707e" emissiveIntensity={0.18} roughness={0.85} flatShading />
        </mesh>
        {/* hair cap */}
        <mesh position={[0, 0.05, 0.02]} scale={[1.04, 1.02, 1.06]}>
          <sphereGeometry args={[0.28, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
          <meshStandardMaterial color={HAIR} roughness={0.9} flatShading />
        </mesh>
        {/* headphones — band + glowing ear cups */}
        <mesh position={[0, 0.16, 0]} rotation={[0.1, 0, 0]}>
          <torusGeometry args={[0.3, 0.035, 8, 20, Math.PI]} />
          <meshStandardMaterial color="#0e1622" metalness={0.5} roughness={0.4} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.29, -0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.11, 0.11, 0.08, 16]} />
            <meshStandardMaterial color="#0e1622" emissive="#3a8dff" emissiveIntensity={0.9} toneMapped={false} />
          </mesh>
        ))}
      </group>

      {/* shoulders */}
      <mesh position={[0, 0.92, 0.08]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.16, 0.7, 4, 10]} />
        <meshStandardMaterial color={HOODIE} roughness={0.7} flatShading />
      </mesh>

      {/* arms: upper arm fixed, forearm bobs (typing) */}
      {[-1, 1].map((side, i) => (
        <group key={i} position={[side * 0.42, 0.9, 0.1]}>
          {/* upper arm */}
          <mesh position={[side * 0.05, -0.2, 0.15]} rotation={[0.5, 0, side * 0.2]}>
            <capsuleGeometry args={[0.11, 0.4, 4, 8]} />
            <meshStandardMaterial color={HOODIE} roughness={0.7} flatShading />
          </mesh>
          {/* forearm + hand (animated) */}
          <group ref={side < 0 ? larm : rarm} position={[side * 0.1, -0.42, 0.32]}>
            <mesh position={[0, 0, 0.18]} rotation={[1.1, 0, 0]}>
              <capsuleGeometry args={[0.09, 0.34, 4, 8]} />
              <meshStandardMaterial color={SKIN} roughness={0.85} flatShading />
            </mesh>
            <mesh position={[0, -0.04, 0.42]}>
              <boxGeometry args={[0.16, 0.08, 0.16]} />
              <meshStandardMaterial color={SKIN} roughness={0.85} flatShading />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

/** Products rising out of the monitor and flying into 3D space. */
export function OutputEmitter() {
  const items = useMemo(
    () => [
      { kind: 'phone', color: '#3a8dff', off: 0.0 },
      { kind: 'web', color: '#35e3e3', off: 0.33 },
      { kind: 'logo', color: '#8a6cff', off: 0.66 },
      { kind: 'phone', color: '#5fd08a', off: 0.85 },
    ],
    []
  );
  const refs = useRef([]);
  const phase = useRef(items.map((it) => it.off));

  useFrame((_, d) => {
    for (let i = 0; i < items.length; i++) {
      phase.current[i] = (phase.current[i] + d * 0.12) % 1;
      const p = phase.current[i];
      const g = refs.current[i];
      if (!g) continue;
      // start at screen (z ~ -0.3, y ~ 0.9), fly up + toward camera
      g.position.set(
        Math.sin(p * Math.PI * 2 + i) * (0.4 + p * 1.6),
        0.9 + p * 2.6,
        -0.3 + p * 4.5
      );
      g.rotation.y += d * 1.2;
      g.rotation.z = Math.sin(p * 6) * 0.2;
      const s = 0.2 + p * 0.55;
      g.scale.setScalar(s);
      const mat = g.children[0]?.material;
      if (mat) mat.opacity = Math.sin(p * Math.PI); // fade in then out
    }
  });

  return (
    <group>
      {items.map((it, i) => (
        <group key={i} ref={(el) => (refs.current[i] = el)}>
          {it.kind === 'phone' && (
            <mesh>
              <boxGeometry args={[0.6, 1.15, 0.06]} />
              <meshStandardMaterial color="#0c1420" emissive={it.color} emissiveIntensity={0.6} transparent toneMapped={false} />
            </mesh>
          )}
          {it.kind === 'web' && (
            <mesh>
              <boxGeometry args={[1.3, 0.9, 0.06]} />
              <meshStandardMaterial color="#0c1420" emissive={it.color} emissiveIntensity={0.6} transparent toneMapped={false} />
            </mesh>
          )}
          {it.kind === 'logo' && (
            <mesh>
              <icosahedronGeometry args={[0.55, 0]} />
              <meshStandardMaterial color="#0c1420" emissive={it.color} emissiveIntensity={0.8} transparent wireframe toneMapped={false} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

export default function CreatorScene({ mobile = false, scale = 1 }) {
  return (
    <group scale={scale} position={[0, -0.6, 0]}>
      {/* neat desk */}
      <mesh position={[0, -0.15, 0.1]}>
        <boxGeometry args={[3.6, 0.12, 1.5]} />
        <meshStandardMaterial color={DESK} metalness={0.4} roughness={0.5} flatShading />
      </mesh>
      {/* keyboard */}
      <mesh position={[0, -0.06, 0.4]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[1.2, 0.04, 0.4]} />
        <meshStandardMaterial color="#0e1622" emissive="#1a2740" emissiveIntensity={0.3} flatShading />
      </mesh>
      {/* mouse */}
      <mesh position={[0.85, -0.05, 0.42]}>
        <boxGeometry args={[0.14, 0.05, 0.22]} />
        <meshStandardMaterial color="#0e1622" flatShading />
      </mesh>
      {/* RGB strip along the desk front edge */}
      <mesh position={[0, -0.15, 0.82]}>
        <boxGeometry args={[3.5, 0.04, 0.04]} />
        <meshStandardMaterial color="#8a6cff" emissive="#8a6cff" emissiveIntensity={1} toneMapped={false} />
      </mesh>

      {/* mug */}
      <group position={[1.05, 0.02, 0.15]}>
        <mesh>
          <cylinderGeometry args={[0.11, 0.09, 0.2, 16]} />
          <meshStandardMaterial color="#e8b8c8" roughness={0.6} flatShading />
        </mesh>
        <mesh position={[0.13, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.07, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#e8b8c8" roughness={0.6} />
        </mesh>
      </group>

      {/* small plant */}
      <group position={[-1.2, 0.05, 0.15]}>
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.1, 0.08, 0.18, 12]} />
          <meshStandardMaterial color="#2a3342" roughness={0.7} flatShading />
        </mesh>
        {[[0, 0.16, 0], [0.06, 0.13, 0.04], [-0.06, 0.13, -0.03]].map((p, i) => (
          <mesh key={i} position={p} rotation={[0.3 * (i - 1), i, 0.2 * i]}>
            <coneGeometry args={[0.06, 0.24, 6]} />
            <meshStandardMaterial color="#3f7d54" roughness={0.7} flatShading />
          </mesh>
        ))}
      </group>

      {/* lighting: desk lamp, key light on the maker, cool rim */}
      <pointLight position={[-1.4, 1.2, 0.4]} intensity={12} color="#4aa8ff" distance={6} />
      <pointLight position={[1.2, 2.0, 2.6]} intensity={22} color="#eaf2ff" distance={9} />
      <pointLight position={[-1.2, 2.2, -1.6]} intensity={14} color="#8a6cff" distance={8} />
      <spotLight position={[0, 3, 2.2]} angle={0.7} penumbra={0.8} intensity={18} color="#cfe0ff" target-position={[0, 0.6, 0]} />

      {/* main monitor with code, facing the creator + camera */}
      <group position={[0, 0.75, -0.35]} scale={0.62}>
        <Monitor />
      </group>
      {/* second angled monitor */}
      <group position={[1.7, 0.7, -0.15]} scale={0.5} rotation={[0, -0.6, 0]}>
        <Monitor />
      </group>

      {/* the stylized creator */}
      <Figure />

      {/* products flying out of the screen */}
      <OutputEmitter />
    </group>
  );
}
