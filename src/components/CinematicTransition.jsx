import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable cinematic divider between major sections. The whole site shares one
 * continuous 3D background, so sections never cut to a flat colour — this adds
 * the eagle + light-streak "camera travel" beat on top of that continuity.
 *
 * variant: 'eagle' | 'streak' | 'code'
 */
export default function CinematicTransition({ variant = 'eagle', label }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const eagle = el.querySelector('.ct__eagle');
    const streaks = el.querySelectorAll('.ct__streak');
    const line = el.querySelector('.ct__label');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
      if (eagle) {
        tl.fromTo(
          eagle,
          { xPercent: -140, opacity: 0, rotate: -8 },
          { xPercent: 140, opacity: 1, rotate: 6, ease: 'none' },
          0
        );
      }
      streaks.forEach((s, i) => {
        tl.fromTo(
          s,
          { scaleX: 0, transformOrigin: i % 2 ? 'right center' : 'left center' },
          { scaleX: 1, ease: 'none' },
          0
        );
      });
      if (line) {
        tl.fromTo(line, { opacity: 0, letterSpacing: '0.1em' }, { opacity: 0.7, letterSpacing: '0.5em', ease: 'none' }, 0);
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`ct ct--${variant}`} aria-hidden="true">
      <div className="ct__streaks">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="ct__streak" style={{ top: `${12 + i * 18}%` }} />
        ))}
      </div>
      <img className="ct__eagle" src="./eagle.svg" alt="" width="120" height="120" />
      {label && <span className="ct__label mono">{label}</span>}
    </div>
  );
}
