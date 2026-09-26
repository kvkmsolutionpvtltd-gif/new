import Reveal from '../components/Reveal';
import { Section, SectionHead } from './bits';
import { scrollTo } from '../lib/smoothScroll';

/* 27. Final product showcase */
const PRODUCTS = [
  'Website', 'Android App', 'iOS App', 'Flutter App', 'E-commerce', 'Game',
  'Card Game', 'Admin Panel', 'Database', 'Cloud', 'Design', 'Branding',
];

export function ShowcaseSection() {
  return (
    <Section id="work">
      <SectionHead
        eyebrow="21 — The Reveal"
        title="Everything, together."
        lead="Websites, apps, e-commerce, games, admin panels, databases, cloud and design — all the work, assembled into one digital ecosystem."
      />
      <div className="cards" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))' }}>
        {PRODUCTS.map((p, i) => (
          <Reveal key={i} variant="scale" delay={(i % 4) * 0.05}>
            <div className="card center" data-cursor style={{ padding: '28px 18px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', color: 'var(--white)' }}>{p}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* 28. Final hero reveal */
export function FinalHeroSection() {
  return (
    <Section id="final-hero">
      <div className="section__inner center">
        <Reveal variant="scale">
          <img src="./eagle.svg" alt="KVK M SOLUTIONS eagle" style={{ width: 'clamp(80px,14vw,150px)', margin: '0 auto 30px', filter: 'drop-shadow(0 0 34px rgba(74,168,255,0.55))' }} />
        </Reveal>
        <Reveal stagger>
          <h2 className="display">We turn ideas into<br /><span className="text-grad">digital products.</span></h2>
          <p className="lead" style={{ margin: '22px auto 0' }}>Design. Develop. Deploy.</p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <button className="btn btn--primary" onClick={() => scrollTo(document.querySelector('#contact'))} data-cursor="button">
              START YOUR PROJECT <span className="btn__arrow">→</span>
            </button>
            <button className="btn" onClick={() => scrollTo(document.querySelector('#services'))} data-cursor="button">
              EXPLORE OUR SERVICES
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
