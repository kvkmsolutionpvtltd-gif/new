import { useEffect, useRef, useState } from 'react';

/**
 * Optional cinematic ambient sound. OFF by default (respects autoplay
 * restrictions — audio only starts on the user's click). Generated with the
 * Web Audio API so there's no asset to load: a soft evolving drone.
 */
export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);

  const build = () => {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const freqs = [55, 82.4, 110, 164.8];
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i % 2 ? 'sine' : 'triangle';
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.12 / (i + 1);
      // slow LFO on gain for movement
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.03;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.05;
      lfo.connect(lfoGain).connect(g.gain);
      o.connect(g).connect(master);
      o.start();
      lfo.start();
      return { o, lfo };
    });

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 700;

    return { ctx, master, oscs };
  };

  const toggle = async () => {
    if (!ctxRef.current) {
      nodesRef.current = build();
      if (!nodesRef.current) return;
      ctxRef.current = nodesRef.current.ctx;
    }
    const { ctx, master } = nodesRef.current;
    if (ctx.state === 'suspended') await ctx.resume();
    const next = !on;
    setOn(next);
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.linearRampToValueAtTime(next ? 0.22 : 0.0001, now + 1.2);
  };

  useEffect(() => {
    return () => {
      if (ctxRef.current) ctxRef.current.close?.();
    };
  }, []);

  return (
    <button
      className={`sound ${on ? 'sound--on' : ''}`}
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute ambient sound' : 'Play ambient sound'}
      data-cursor="button"
    >
      <span className="sound__bars" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span className="sound__label mono">{on ? 'SOUND ON' : 'SOUND OFF'}</span>
    </button>
  );
}
