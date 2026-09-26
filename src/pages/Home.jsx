import { Link } from 'react-router-dom';
import Hero from '../sections/Hero';
import Reveal from '../components/Reveal';
import CinematicTransition from '../components/CinematicTransition';
import { Section, SectionHead, Chain } from '../sections/bits';
import { useSeo } from '../lib/seo';
import { services } from '../data/services';
import { caseStudies } from '../data/caseStudies';
import { techCategories } from '../data/technologies';
import { processSteps } from '../data/process';
import { company } from '../data/company';

export default function Home({ started }) {
  useSeo({
    title: 'Software Development & Digital Solutions',
    description:
      'KVK M SOLUTIONS builds custom software, web and mobile applications, UI/UX, cloud and data solutions — turning ideas into dependable digital products.',
  });

  return (
    <>
      <Hero started={started} />

      {/* Idea → Product pipeline */}
      <CinematicTransition variant="eagle" label="From idea to product" />
      <Section id="pipeline">
        <SectionHead
          eyebrow="How it comes together"
          title={<>From idea to <span className="text-grad">digital product.</span></>}
          lead="Every engagement moves through the same disciplined path — visible end to end."
          titleClass="display"
        />
        <Chain
          steps={[
            { title: 'IDEA', desc: 'A problem worth solving' },
            { title: 'DESIGN', desc: 'Shape the experience' },
            { title: 'DEVELOPMENT', desc: 'Engineer the product' },
            { title: 'INTEGRATION', desc: 'Connect the systems' },
            { title: 'TESTING', desc: 'Make it dependable' },
            { title: 'DEPLOYMENT', desc: 'Ship to production' },
          ]}
        />
      </Section>

      {/* Services overview */}
      <CinematicTransition variant="code" label="Services" />
      <Section id="services">
        <SectionHead
          eyebrow="What we do"
          title="One digital partner. Multiple capabilities."
          lead="From custom software to web, mobile, design, cloud and support — engineered around real business needs."
        />
        <div className="cards">
          {services.map((s, i) => (
            <Reveal key={s.slug} variant="up" delay={(i % 3) * 0.05}>
              <Link to={`/services/${s.slug}`} className="card svc-card" data-cursor="link">
                <div className="svc__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="svc-card__more mono">Explore →</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="btn-row">
          <Link to="/services" className="btn" data-cursor="button">All services <span className="btn__arrow">→</span></Link>
        </div>
      </Section>

      {/* Technology strip */}
      <CinematicTransition variant="streak" label="Technologies" />
      <Section id="technology">
        <SectionHead
          eyebrow="Our stack"
          title="Built on modern technology."
          lead="We choose the right tools for the job across frontend, mobile, backend, data, cloud and design."
        />
        <Reveal className="techwall" stagger>
          {techCategories.flatMap((c) => c.items).map((t) => (
            <span className="techwall__chip" key={t} data-cursor>{t}</span>
          ))}
        </Reveal>
        <div className="btn-row">
          <Link to="/technologies" className="btn" data-cursor="button">Explore technologies <span className="btn__arrow">→</span></Link>
        </div>
      </Section>

      {/* Case studies */}
      <CinematicTransition variant="eagle" label="Selected work" />
      <Section id="work">
        <SectionHead
          eyebrow="Selected work"
          title="Real projects, engineered end to end."
          lead="A look at the kind of products we build. Full details are added as they're published."
        />
        <div className="cards">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug} variant="up" delay={i * 0.06}>
              <Link to={`/case-studies#${c.slug}`} className="card work-card" data-cursor="link">
                <span className="tag">{c.type}</span>
                <h3 style={{ marginTop: 12 }}>{c.title}</h3>
                <p>{c.solution}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="btn-row">
          <Link to="/case-studies" className="btn" data-cursor="button">View all work <span className="btn__arrow">→</span></Link>
        </div>
      </Section>

      {/* Process */}
      <CinematicTransition variant="code" label="Process" />
      <Section id="process">
        <SectionHead
          eyebrow="How we work"
          title="A clear path, every time."
          lead="A disciplined process from discovery to maintenance keeps projects predictable."
        />
        <div className="pipeline">
          {processSteps.map((p, i) => (
            <Reveal key={p.no} variant="up" delay={(i % 3) * 0.05}>
              <div className="pipeline__stage" data-cursor>
                <div className="pipeline__num">{p.no}</div>
                <div className="pipeline__name">{p.name}</div>
                <p>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="btn-row">
          <Link to="/process" className="btn" data-cursor="button">See the full process <span className="btn__arrow">→</span></Link>
        </div>
      </Section>

      {/* Final reveal */}
      <CinematicTransition variant="streak" label="KVK M SOLUTIONS" />
      <section className="finale" id="final">
        <Reveal className="section__inner center" stagger>
          <img src="./eagle.svg" alt="KVK M SOLUTIONS eagle" />
          <h2 className="display">We turn ideas into<br /><span className="text-grad">digital products.</span></h2>
          <p className="lead" style={{ margin: '20px auto 0' }}>{company.tagline}</p>
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <Link to="/contact" className="btn btn--primary" data-cursor="button">START YOUR PROJECT <span className="btn__arrow">→</span></Link>
            <Link to="/case-studies" className="btn" data-cursor="button">EXPLORE OUR WORK</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
