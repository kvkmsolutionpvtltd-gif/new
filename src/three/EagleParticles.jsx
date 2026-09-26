import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateEaglePoints, generateScatter } from '../lib/eagleShape';

/**
 * Particle eagle. `assemble` (0..1) morphs from a scattered cloud into the
 * eagle silhouette. Used by the loader and by cinematic transitions.
 *
 * Reusable knobs:
 *  - count: particle count (scaled down on low-perf devices by caller)
 *  - assemble: 0 = scattered cloud, 1 = full eagle
 *  - color / size
 */
export default function EagleParticles({
  count = 4200,
  assemble = 1,
  scale = 1,
  color = '#bcd6ff',
  size = 0.02,
  spin = 0.08,
  flap = 0.12,
}) {
  const ref = useRef();
  const matRef = useRef();

  const { target, scatter, seed } = useMemo(() => {
    return {
      target: generateEaglePoints(count, 1),
      scatter: generateScatter(count, 3.4),
      seed: new Float32Array(count).map(() => Math.random()),
    };
  }, [count]);

  // working buffer
  const positions = useMemo(() => new Float32Array(count * 3), [count]);

  const state = useRef({ a: assemble });

  useFrame((_, delta) => {
    const s = state.current;
    // ease current assemble toward target assemble
    s.a += (assemble - s.a) * Math.min(1, delta * 3);
    const a = s.a;
    const t = performance.now() * 0.001;

    const pos = positions;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // eagle target with a gentle wing "flap" on the eagle x-extent
      const tx = target[i3];
      const ty = target[i3 + 1];
      const tz = target[i3 + 2];
      const wing = Math.min(1, Math.abs(tx) / 1.5);
      const flapY = Math.sin(t * 1.6 + seed[i] * 0.5) * flap * wing;

      const sx = scatter[i3];
      const sy = scatter[i3 + 1];
      const sz = scatter[i3 + 2];

      // scattered points drift slowly
      const drift = 0.15 * (1 - a);
      pos[i3] = sx * (1 - a) + tx * a + Math.sin(t + seed[i] * 6.28) * drift;
      pos[i3 + 1] = sy * (1 - a) + (ty + flapY) * a + Math.cos(t + seed[i] * 6.28) * drift;
      pos[i3 + 2] = sz * (1 - a) + tz * a;
    }

    if (ref.current) {
      ref.current.geometry.attributes.position.needsUpdate = true;
      ref.current.rotation.y = Math.sin(t * spin) * 0.15;
    }
    if (matRef.current) {
      matRef.current.opacity = 0.55 + 0.45 * a;
    }
  });

  return (
    <points ref={ref} scale={scale}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={size}
        color={color}
        transparent
        opacity={1}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
