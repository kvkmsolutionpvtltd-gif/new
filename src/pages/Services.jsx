import { Link } from 'react-router-dom';
import { PageHero, Section } from '../sections/bits';
import Reveal from '../components/Reveal';
import { useSeo } from '../lib/seo';
import { services } from '../data/services';

export default function Services() {
  useSeo({
    title: 'Services',
    description: 'Custom software, web and mobile development, UI/UX design, IT consulting, cloud, data & security and maintenance from KVK M SOLUTIONS.',
  });
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={<>One digital partner.<br /><span className="text-grad">Multiple capabilities.</span></>}
        lead="Each service is a discipline in its own right — and they connect into complete products."
      />
      <Section id="services-grid">
        <div className="cards">
          {services.map((s, i) => (
            <Reveal key={s.slug} variant="up" delay={(i % 3) * 0.05}>
              <Link to={`/services/${s.slug}`} className="card svc-card" data-cursor="link">
                <div className="svc__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <div className="card__tags">
                  {s.includes.slice(0, 3).map((x) => <span className="tag" key={x}>{x}</span>)}
                </div>
                <span className="svc-card__more mono">Explore →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
