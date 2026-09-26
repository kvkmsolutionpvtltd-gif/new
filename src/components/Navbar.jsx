import { useEffect, useState } from 'react';
import { scrollTo } from '../lib/smoothScroll';

const LINKS = [
  ['Home', '#hero'],
  ['Services', '#services'],
  ['Technology', '#technology'],
  ['Process', '#process'],
  ['Work', '#work'],
  ['About', '#about'],
  ['Contact', '#contact'],
];

export default function Navbar() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) scrollTo(el);
  };

  return (
    <header className={`nav ${compact ? 'nav--compact' : ''} ${open ? 'nav--open' : ''}`}>
      <a className="nav__brand" href="#hero" onClick={(e) => go(e, '#hero')} aria-label="KVK M SOLUTIONS home">
        <img src="./eagle.svg" alt="KVK M SOLUTIONS eagle logo" width="34" height="34" />
        <span className="nav__brand-text">
          KVK <b>M</b> SOLUTIONS
        </span>
      </a>

      <nav className="nav__links" aria-label="Primary">
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} onClick={(e) => go(e, href)} data-cursor="link">
            {label}
          </a>
        ))}
      </nav>

      <a href="#contact" className="btn btn--primary nav__cta" onClick={(e) => go(e, '#contact')} data-cursor="button">
        START PROJECT
      </a>

      <button
        className="nav__burger"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className="nav__mobile" role="dialog" aria-label="Menu">
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} onClick={(e) => go(e, href)}>
            {label}
          </a>
        ))}
        <a href="#contact" className="btn btn--primary" onClick={(e) => go(e, '#contact')}>
          START PROJECT
        </a>
      </div>
    </header>
  );
}
