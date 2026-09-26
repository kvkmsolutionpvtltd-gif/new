import { Link } from 'react-router-dom';
import { company } from '../data/company';
import { services } from '../data/services';

const NAV = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Solutions', '/solutions'],
  ['Technologies', '/technologies'],
  ['Work', '/case-studies'],
  ['Process', '/process'],
  ['Contact', '/contact'],
];

export default function Footer() {
  return (
    <footer className="sitefooter">
      <div className="sitefooter__grid">
        <div className="sitefooter__brand">
          <div className="footer__brand">
            <img src="./eagle.svg" alt="" width="30" height="30" />
            KVK M SOLUTIONS
          </div>
          <p style={{ marginTop: 16, maxWidth: '34ch' }}>{company.mission}</p>
          <p className="mono" style={{ marginTop: 18, fontSize: '0.8rem' }}>
            {company.locations.join(' · ')}
          </p>
        </div>

        <div>
          <h4 className="sitefooter__h">Explore</h4>
          <ul className="sitefooter__list">
            {NAV.map(([l, to]) => (
              <li key={to}><Link to={to} data-cursor="link">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="sitefooter__h">Services</h4>
          <ul className="sitefooter__list">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`} data-cursor="link">{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="sitefooter__h">Contact</h4>
          <ul className="sitefooter__list">
            {company.emails.map((e) => (
              <li key={e}><a href={`mailto:${e}`} data-cursor="link">{e}</a></li>
            ))}
            <li><a href={`tel:${company.phoneHref}`} data-cursor="link">{company.phone}</a></li>
          </ul>
          <Link to="/contact" className="btn btn--primary" style={{ marginTop: 18 }} data-cursor="button">
            START A PROJECT <span className="btn__arrow">→</span>
          </Link>
        </div>
      </div>

      <div className="sitefooter__bar">
        <p>© {new Date().getFullYear()} {company.legalName} · Est. {company.established}</p>
        <p style={{ opacity: 0.6, fontSize: '0.72rem' }}>
          3D: MacBook model by jackbaeten (
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>CC BY 4.0</a>)
        </p>
      </div>
    </footer>
  );
}
