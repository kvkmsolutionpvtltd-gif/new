import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { scrollTo } from '../lib/smoothScroll';
import { usePrefersReducedMotion } from '../lib/hooks';

const WORDS = ['WE', 'BUILD', 'DIGITAL', 'EXPERIENCES'];

export default function Hero({ started }) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!started) return;
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll('.word > span');
    const rest = el.querySelectorAll('[data-hero-fade]');

    if (reduced) {
      gsap.set([spans, rest], { y: 0, opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(spans, { yPercent: 120 });
      gsap.set(rest, { opacity: 0, y: 24 });
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(spans, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.09 })
        .to(rest, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }, '-=0.5');
    }, el);
    return () => ctx.revert();
  }, [started, reduced]);

  const go = (href) => {
    const t = document.querySelector(href);
    if (t) scrollTo(t);
  };

  return (
    <section id="hero" className="hero" ref={ref}>
      <div className="hero__inner">
        <p className="eyebrow" data-hero-fade>KVK M SOLUTIONS · SOFTWARE STUDIO</p>
        <h1>
          {WORDS.map((w, i) => (
            <span className="word" key={i}>
              <span>{w}{i < WORDS.length - 1 ? ' ' : ''}</span>
            </span>
          ))}
        </h1>
        <p className="hero__sub" data-hero-fade>
          Websites. Apps. Platforms. Games. Designs. Digital&nbsp;Products.
        </p>
        <div className="btn-row" data-hero-fade>
          <button className="btn btn--primary" onClick={() => go('#work')} data-cursor="button">
            EXPLORE OUR WORK <span className="btn__arrow">→</span>
          </button>
          <button className="btn" onClick={() => go('#contact')} data-cursor="button">
            START A PROJECT
          </button>
        </div>
      </div>

      <div className="hero__scroll" data-hero-fade>
        <span className="mouse" />
        SCROLL
      </div>
    </section>
  );
}
