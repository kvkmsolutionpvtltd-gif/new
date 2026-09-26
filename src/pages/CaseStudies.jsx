import { Link } from 'react-router-dom';
import { PageHero, Section } from '../sections/bits';
import Reveal from '../components/Reveal';
import { useSeo } from '../lib/seo';
import { caseStudies } from '../data/caseStudies';

export default function CaseStudies() {
  useSeo({
    title: 'Case Studies',
    description: 'Selected work from KVK M SOLUTIONS — websites, mobile apps and custom CRM/HRM software.',
  });
  return (
    <>
      <PageHero
        eyebrow="Work"
        title={<>Selected <span className="text-grad">work.</span></>}
        lead="A look at the kind of products we build. Details are added as projects are published."
      />
      <Section id="cases">
        <div className="stack" style={{ gap: 22 }}>
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug} variant="up" delay={i * 0.05}>
              <article id={c.slug} className="case" data-cursor>
                <div className="case__meta">
                  <span className="tag">{c.type}</span>
                  <span className="mono case__ind">{c.industry}</span>
                </div>
                <h2 className="case__title">{c.title}</h2>
                <div className="case__body">
                  <div>
                    <h4 className="case__label">Problem</h4>
                    <p>{c.problem}</p>
                  </div>
                  <div>
                    <h4 className="case__label">Solution</h4>
                    <p>{c.solution}</p>
                  </div>
                  {c.result && (
                    <div>
                      <h4 className="case__label">Result</h4>
                      <p>{c.result}</p>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="btn-row">
          <Link to="/contact" className="btn btn--primary" data-cursor="button">Start your project <span className="btn__arrow">→</span></Link>
        </div>
      </Section>
    </>
  );
}
