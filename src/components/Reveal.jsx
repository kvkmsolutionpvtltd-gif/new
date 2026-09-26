import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '../lib/hooks';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered reveal. Children animate in when they enter the viewport.
 * variant: 'up' | 'fade' | 'scale' | 'left' | 'right'
 * `stagger` reveals direct children in sequence.
 */
export default function Reveal({
  children,
  variant = 'up',
  stagger = false,
  delay = 0,
  y = 40,
  className = '',
  as: Tag = 'div',
  ...rest
}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) : el;

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    const from = { opacity: 0 };
    if (variant === 'up') from.y = y;
    if (variant === 'left') from.x = -y;
    if (variant === 'right') from.x = y;
    if (variant === 'scale') from.scale = 0.92;

    const ctx = gsap.context(() => {
      gsap.set(targets, from);
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 1,
        delay,
        ease: 'power3.out',
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [variant, stagger, delay, y, reduced]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
