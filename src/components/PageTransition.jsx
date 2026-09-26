import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic route transition + scroll reset. On navigation the overlay sweeps
 * up with the eagle, we jump to the top under cover, then it sweeps away.
 */
export default function PageTransition() {
  const overlay = useRef(null);
  const eagle = useRef(null);
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    // reset scroll immediately on every route change
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    if (first.current) {
      first.current = false;
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    const ov = overlay.current;
    const eg = eagle.current;
    if (!ov) return;

    const tl = gsap.timeline();
    tl.set(ov, { pointerEvents: 'auto' })
      .fromTo(ov, { yPercent: 100 }, { yPercent: 0, duration: 0.45, ease: 'power3.inOut' })
      .fromTo(eg, { opacity: 0, scale: 0.7, rotate: -8 }, { opacity: 1, scale: 1, rotate: 4, duration: 0.4, ease: 'power2.out' }, 0.05)
      .add(() => {
        window.scrollTo(0, 0);
        if (lenis) lenis.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
      })
      .to(eg, { opacity: 0, scale: 1.25, duration: 0.35, ease: 'power2.in' }, 0.55)
      .to(ov, { yPercent: -100, duration: 0.5, ease: 'power3.inOut' }, 0.6)
      .set(ov, { yPercent: 100, pointerEvents: 'none' });

    return () => tl.kill();
  }, [pathname]);

  return (
    <div ref={overlay} className="pagetrans" aria-hidden="true">
      <img ref={eagle} src="./eagle.svg" alt="" width="110" height="110" />
    </div>
  );
}
