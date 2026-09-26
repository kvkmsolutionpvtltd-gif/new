import { Link } from 'react-router-dom';
import { PageHero, Section } from '../sections/bits';
import Reveal from '../components/Reveal';
import { useSeo } from '../lib/seo';
import { solutions } from '../data/process';

export default function Solutions() {
  useSeo({
    title: 'Solutions',
    description: 'Product solutions from KVK M SOLUTIONS — CRM, HRM, e-commerce, business websites & portals, mobile apps and custom platforms.',
  });
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={<>Products built for <span className="text-grad">how you work.</span></>}
        lead="Ready-to-tailor product solutions — shaped around your operations, not the other way around."
      />
      <Section id="solutions-grid">
        <div className="cards">
          {solutions.map((s, i) => (
            <Reveal key={s.title} variant="up" delay={(i % 3) * 0.05}>
              <div className="card" data-cursor>
                <div className="svc__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="btn-row">
          <Link to="/contact" className="btn btn--primary" data-cursor="button">Discuss your solution <span className="btn__arrow">→</span></Link>
        </div>
      </Section>
    </>
  );
}
