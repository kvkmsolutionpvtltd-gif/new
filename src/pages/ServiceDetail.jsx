import { Link, useParams, Navigate } from 'react-router-dom';
import { PageHero, Section, SectionHead, Chain } from '../sections/bits';
import Reveal from '../components/Reveal';
import { useSeo } from '../lib/seo';
import { getService, services } from '../data/services';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);
  if (!service) return <Navigate to="/services" replace />;

  useSeo({ title: service.title, description: service.detail });

  const others = services.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <>
      <PageHero
        eyebrow={<>Services · {service.title}</>}
        title={service.title}
        lead={service.detail}
      >
        <div className="btn-row">
          <Link to="/contact" className="btn btn--primary" data-cursor="button">Start a project <span className="btn__arrow">→</span></Link>
          <Link to="/services" className="btn" data-cursor="button">All services</Link>
        </div>
      </PageHero>

      <Section id="flow">
        <SectionHead eyebrow="The flow" title="How it comes together." lead="The path from starting point to a working, deployed result." />
        <Chain steps={service.flow.map((f) => ({ title: f }))} />
      </Section>

      <Section id="includes">
        <SectionHead eyebrow="What's included" title="Everything you need in one place." />
        <div className="cards">
          {service.includes.map((x, i) => (
            <Reveal key={x} variant="up" delay={(i % 3) * 0.05}>
              <div className="card" data-cursor>
                <div className="svc__icon">{service.icon}</div>
                <h3 style={{ fontSize: '1.05rem' }}>{x}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="more">
        <SectionHead eyebrow="Explore" title="Related services." />
        <div className="cards">
          {others.map((s, i) => (
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
      </Section>
    </>
  );
}
