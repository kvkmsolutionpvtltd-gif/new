import { useEffect, useRef } from 'react';

/**
 * Premium custom cursor: a small dot + a lagging ring that grows and labels
 * itself over interactive elements ([data-cursor], a, button). Desktop only —
 * touch devices keep native interaction. Never blocks pointer events.
 */
export default function Cursor() {
  const dot = useRef();
  const ring = useRef();
  const label = useRef();

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    document.documentElement.classList.add('cursor-enabled');

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let raf;

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      const t = e.target.closest('[data-cursor], a, button');
      if (ring.current) {
        const active = !!t;
        ring.current.classList.toggle('cursor__ring--active', active);
        if (label.current) {
          const type = t?.getAttribute('data-cursor');
          label.current.textContent = type === 'link' ? '→' : type === 'button' ? '' : '';
        }
      }
    };

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (ring.current) ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      raf = requestAnimationFrame(loop);
    };

    const onDown = () => ring.current?.classList.add('cursor__ring--down');
    const onUp = () => ring.current?.classList.remove('cursor__ring--down');
    const onLeave = () => {
      if (dot.current) dot.current.style.opacity = '0';
      if (ring.current) ring.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (dot.current) dot.current.style.opacity = '1';
      if (ring.current) ring.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.classList.remove('cursor-enabled');
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor__dot" aria-hidden="true" />
      <div ref={ring} className="cursor__ring" aria-hidden="true">
        <span ref={label} />
      </div>
    </>
  );
}
