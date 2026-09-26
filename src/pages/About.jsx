import { Link } from 'react-router-dom';
import { PageHero, Section, SectionHead, Chain } from '../sections/bits';
import Reveal from '../components/Reveal';
import { useSeo } from '../lib/seo';
import { company } from '../data/company';

const VALUES = [
  ['Quality', 'Engineering we can stand behind.'],
  ['Innovation', 'Modern tools, applied with intent.'],
  ['User Experience', 'Products that feel effortless to use.'],
  ['Engineering', 'Solid architecture over shortcuts.'],
  ['Execution', 'Ideas turned into shipped products.'],
];

export default function About() {
  useSeo({ title: 'About', description: `${company.name} — technology with purpose. ${company.mission}` });
  return (
    <>
      <PageHero
        eyebrow="About"
        title={<>Technology with <span className="text-grad">purpose.</span></>}
        lead={company.mission}
      />

      <Section id="mission">
        <div className="split">
          <div>
            <SectionHead eyebrow="Mission" title="Ideas, engineered into products." lead={company.mission} />
            <p className="dim" style={{ marginTop: 18 }}>
              {company.legalName} · Established {company.established} · {company.locations.join(' & ')}.
              {' '}{company.registeredNote}
            </p>
          </div>
          <Reveal variant="scale">
            <div className="card core3d" data-cursor>
              <span className="core3d__ring" />
              <div className="core3d__inner">
                {['DESIGN', 'TECHNOLOGY', 'EXECUTION'].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="blueprint">
        <SectionHead
          eyebrow="How we think"
          title="From blueprint to product."
          lead="Every product is an architecture before it's an interface."
        />
        <Chain
          steps={[
            { title: 'CODE', desc: 'The foundation' },
            { title: 'INTERFACE', desc: 'How people experience it' },
            { title: 'APPLICATION', desc: 'The working product' },
            { title: 'SYSTEM', desc: 'Connected and reliable' },
            { title: 'PRODUCT', desc: 'Something businesses depend on' },
          ]}
        />
      </Section>

      <Section id="values">
        <SectionHead eyebrow="Values" title="What we build on." />
        <div className="cards">
          {VALUES.map(([t, d], i) => (
            <Reveal key={t} variant="up" delay={(i % 3) * 0.05}>
              <div className="card" data-cursor>
                <div className="pipeline__num">{String(i + 1).padStart(2, '0')}</div>
                <h3 style={{ marginTop: 8 }}>{t}</h3>
                <p>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="btn-row">
          <Link to="/contact" className="btn btn--primary" data-cursor="button">Start a project <span className="btn__arrow">→</span></Link>
        </div>
      </Section>
    </>
  );
}
