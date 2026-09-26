import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sampleTextPoints } from '../lib/points';
import { generateEaglePoints, generateScatter } from '../lib/eagleShape';
import { getPerfTier } from '../lib/hooks';

/* Phase timeline (ms) */
const PHASES = [
  { at: 0, name: 'light' },
  { at: 600, name: 'kvk' },
  { at: 1500, name: 'm' },
  { at: 2400, name: 'solutions' },
  { at: 3600, name: 'explode' },
  { at: 4100, name: 'eagle' },
  { at: 5500, name: 'fly' },
];
const DONE_AT = 6300;
const PROGRESS_FULL_AT = 5400;

function scaleBuffer(src, s) {
  const out = new Float32Array(src.length);
  for (let i = 0; i < src.length; i++) out[i] = src[i] * s;
  return out;
}
function lightBuffer(n) {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    out[i * 3] = (Math.random() - 0.5) * 0.06;
    out[i * 3 + 1] = (Math.random() - 0.5) * 0.06;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
  }
  return out;
}

function OpeningParticles({ phaseRef }) {
  const ptsRef = useRef();
  const matRef = useRef();
  const groupRef = useRef();
  const N = useMemo(() => (getPerfTier() === 'low' ? 2600 : 5200), []);

  const targets = useMemo(() => {
    const eagle = scaleBuffer(generateEaglePoints(N, 1), 1.45);
    return {
      light: lightBuffer(N),
      kvk: scaleBuffer(sampleTextPoints('KVK', N), 1.0),
      m: scaleBuffer(sampleTextPoints('M', N), 1.0),
      solutions: scaleBuffer(sampleTextPoints('SOLUTIONS', N), 0.82),
      explode: scaleBuffer(generateScatter(N, 3.6), 1),
      eagle,
      fly: eagle,
    };
  }, [N]);

  const positions = useMemo(() => {
    const p = new Float32Array(N * 3);
    p.set(targets.light);
    return p;
  }, [N, targets]);

  const flyZ = useRef(0);

  useFrame((_, delta) => {
    const phase = phaseRef.current.name;
    const target = targets[phase] || targets.light;
    const d = Math.min(1, delta * (phase === 'explode' ? 6 : 4));
    const pos = positions;
    const t = performance.now() * 0.001;
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      pos[i3] += (target[i3] - pos[i3]) * d;
      pos[i3 + 1] += (target[i3 + 1] - pos[i3 + 1]) * d;
      pos[i3 + 2] += (target[i3 + 2] - pos[i3 + 2]) * d;
    }
    if (ptsRef.current) ptsRef.current.geometry.attributes.position.needsUpdate = true;

    if (groupRef.current) {
      // gentle rotation once the eagle forms
      if (phase === 'eagle' || phase === 'fly') {
        groupRef.current.rotation.y += delta * 0.4;
      } else {
        groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.08;
      }
      // fly through: push toward camera + scale up
      if (phase === 'fly') {
        flyZ.current += (7 - flyZ.current) * Math.min(1, delta * 2);
        groupRef.current.position.z = flyZ.current;
        groupRef.current.scale.setScalar(1 + flyZ.current * 0.5);
      }
    }
    if (matRef.current) {
      matRef.current.opacity = phase === 'light' ? 0.5 : phase === 'fly' ? Math.max(0, 1 - flyZ.current / 7) : 0.95;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={ptsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={N} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          ref={matRef}
          size={0.02}
          color="#bcd6ff"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}

export default function OpeningSequence({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [hide, setHide] = useState(false);
  const [uiOut, setUiOut] = useState(false);
  const phaseRef = useRef({ name: 'light' });

  useEffect(() => {
    const start = performance.now();
    const timers = PHASES.map((p) =>
      setTimeout(() => {
        phaseRef.current = { name: p.name };
        if (p.name === 'fly') setUiOut(true);
      }, p.at)
    );
    let raf;
    const tick = () => {
      const e = performance.now() - start;
      setProgress(Math.min(100, Math.round((e / PROGRESS_FULL_AT) * 100)));
      if (e < PROGRESS_FULL_AT) raf = requestAnimationFrame(tick);
      else setProgress(100);
    };
    raf = requestAnimationFrame(tick);
    const done = setTimeout(() => {
      setHide(true);
      setTimeout(() => onDone && onDone(), 700);
    }, DONE_AT);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
      cancelAnimationFrame(raf);
    };
  }, [onDone]);

  return (
    <div className={`loader ${hide ? 'loader--hide' : ''}`} role="status" aria-live="polite" aria-label="Loading KVK M SOLUTIONS">
      <div className="loader__canvas">
        <Canvas dpr={[1, 1.6]} camera={{ fov: 50, position: [0, 0, 5] }} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[3, 3, 4]} intensity={30} color="#4aa8ff" distance={20} />
          <OpeningParticles phaseRef={phaseRef} />
        </Canvas>
      </div>

      <div className={`loader__ui ${uiOut ? 'loader__ui--out' : ''}`}>
        <p className="loader__tag" style={{ marginBottom: 8 }}>KVK M SOLUTIONS · EAGLE</p>
        <div className="loader__bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="loader__count mono">LOADING {String(progress).padStart(2, '0')}%</p>
      </div>
    </div>
  );
}
