import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const LINKS = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Solutions', '/solutions'],
  ['Technologies', '/technologies'],
  ['Work', '/case-studies'],
  ['Process', '/process'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
];

export default function Navbar() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`nav ${compact ? 'nav--compact' : ''} ${open ? 'nav--open' : ''}`}>
      <Link className="nav__brand" to="/" onClick={() => setOpen(false)} aria-label="KVK M SOLUTIONS home">
        <img src="./eagle.svg" alt="KVK M SOLUTIONS eagle logo" width="34" height="34" />
        <span className="nav__brand-text">KVK <b>M</b> SOLUTIONS</span>
      </Link>

      <nav className="nav__links" aria-label="Primary">
        {LINKS.map(([label, to]) => (
          <NavLink key={to} to={to} end={to === '/'} data-cursor="link" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            {label}
          </NavLink>
        ))}
      </nav>

      <Link to="/contact" className="btn btn--primary nav__cta" data-cursor="button">START A PROJECT</Link>

      <button className="nav__burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span /><span /><span />
      </button>

      <div className="nav__mobile" role="dialog" aria-label="Menu" aria-hidden={!open}>
        {LINKS.map(([label, to], i) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? 'is-active' : '')}
            style={{ transitionDelay: open ? `${0.05 + i * 0.04}s` : '0s' }}
          >
            <span className="nav__mobile-i mono">{String(i + 1).padStart(2, '0')}</span>
            {label}
          </NavLink>
        ))}
        <Link to="/contact" className="btn btn--primary" onClick={() => setOpen(false)}>START A PROJECT</Link>
      </div>
    </header>
  );
}
