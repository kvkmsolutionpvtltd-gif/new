import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared, mutable scroll state read by the WebGL scene each frame.
 * Kept outside React so the render loop never triggers re-renders.
 */
export const scrollState = {
  /** 0..1 progress through the whole document */
  progress: 0,
  /** raw scrollY in px */
  y: 0,
  /** smoothed scroll velocity, negative = up */
  velocity: 0,
};

let lenis = null;
let rafId = null;

export function initSmoothScroll({ reducedMotion = false } = {}) {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: reducedMotion ? 0.1 : 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !reducedMotion,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.y = lenis.scroll;
    scrollState.progress = max > 0 ? lenis.scroll / max : 0;
    scrollState.velocity = lenis.velocity || 0;
  };

  lenis.on('scroll', () => {
    update();
    ScrollTrigger.update();
  });

  // Drive Lenis from GSAP's ticker so scroll + ScrollTrigger stay in sync
  gsap.ticker.add(tickerCb);
  gsap.ticker.lagSmoothing(0);

  // ScrollTrigger uses native scroll positions; Lenis writes them, so the
  // default scroller works. We just need to update on refresh.
  ScrollTrigger.addEventListener('refresh', update);
  update();

  return lenis;
}

function tickerCb(time) {
  if (lenis) lenis.raf(time * 1000);
}

export function getLenis() {
  return lenis;
}

export function scrollTo(target, opts = {}) {
  if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.3, ...opts });
}

export function stopScroll() {
  if (lenis) lenis.stop();
}
export function startScroll() {
  if (lenis) lenis.start();
}

export function destroySmoothScroll() {
  if (rafId) cancelAnimationFrame(rafId);
  gsap.ticker.remove(tickerCb);
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}
