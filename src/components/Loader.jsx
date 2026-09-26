import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import EagleParticles from '../three/EagleParticles';
import { getPerfTier } from '../lib/hooks';

/**
 * Cinematic loader: black screen, eagle assembles from particles while a
 * counter climbs to 100, then the eagle flies toward the camera and the
 * whole overlay fades — handing off to the main site.
 */
function LoaderEagle({ progress, launch }) {
  const g = useRef();
  const state = useRef({ z: 0 });
  useFrame((_, d) => {
    if (!g.current) return;
    if (launch) {
      // fly toward camera
      state.current.z += (9 - state.current.z) * Math.min(1, d * 2.2);
    }
    g.current.position.z = state.current.z;
    g.current.rotation.y += d * 0.15;
  });
  return (
    <group ref={g}>
      <EagleParticles count={getPerfTier() === 'low' ? 2400 : 4200} assemble={progress / 100} scale={1.4} size={0.024} />
    </group>
  );
}

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [launch, setLaunch] = useState(false);
  const [hide, setHide] = useState(false);
  const overlay = useRef();

  useEffect(() => {
    let raf;
    let cur = 0;
    const start = performance.now();
    // simulate progressive asset/scene warmup, ~2.6s min
    const tick = () => {
      const elapsed = performance.now() - start;
      const target = Math.min(100, (elapsed / 2600) * 100);
      cur += (target - cur) * 0.12;
      const shown = Math.min(100, Math.round(cur));
      setProgress(shown);
      if (shown >= 100) {
        setLaunch(true);
        setTimeout(() => {
          setHide(true);
          setTimeout(() => onDone && onDone(), 900);
        }, 850);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div ref={overlay} className={`loader ${hide ? 'loader--hide' : ''}`} role="status" aria-live="polite">
      <div className="loader__canvas">
        <Canvas dpr={[1, 1.6]} camera={{ fov: 50, position: [0, 0, 5] }} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[3, 3, 4]} intensity={30} color="#4aa8ff" distance={20} />
          <LoaderEagle progress={progress} launch={launch} />
        </Canvas>
      </div>

      <div className={`loader__ui ${launch ? 'loader__ui--out' : ''}`}>
        <h1 className="loader__brand">KVK&nbsp;M&nbsp;SOLUTIONS</h1>
        <p className="loader__tag">BUILDING DIGITAL EXPERIENCES</p>
        <div className="loader__bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="loader__count mono">
          LOADING {String(progress).padStart(2, '0')}%
        </p>
      </div>
    </div>
  );
}
