import { useEffect, useRef, useState } from 'react';
import { scrollState } from '../lib/smoothScroll';

const PHASES = [
  [0, 'OPENING'],
  [0.1, 'IDEA'],
  [0.2, 'DESIGN'],
  [0.3, 'CODE'],
  [0.4, 'BACKEND'],
  [0.5, 'DATA / API'],
  [0.6, 'APPS'],
  [0.7, 'COMMERCE / GAMES'],
  [0.8, 'TEST / DEPLOY'],
  [0.9, 'KVK REVEAL'],
];

function phaseFor(p) {
  let label = PHASES[0][1];
  for (const [t, l] of PHASES) if (p >= t) label = l;
  return label;
}

export default function ScrollProgress() {
  const fill = useRef(null);
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState('OPENING');

  useEffect(() => {
    let raf;
    let lastPct = -1;
    const loop = () => {
      const p = scrollState.progress || 0;
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
      const rounded = Math.round(p * 100);
      if (rounded !== lastPct) {
        lastPct = rounded;
        setPct(rounded);
        setPhase(phaseFor(p));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="progress" aria-hidden="true">
      <div className="progress__track">
        <div className="progress__fill" ref={fill} />
      </div>
      <div className="progress__meta mono">
        <span className="progress__phase">{phase}</span>
        <span className="progress__pct">{String(pct).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
