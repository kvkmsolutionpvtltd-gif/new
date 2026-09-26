import { Link } from 'react-router-dom';
import { PageHero, Section, SectionHead } from '../sections/bits';
import Reveal from '../components/Reveal';
import { useSeo } from '../lib/seo';
import { processSteps } from '../data/process';

export default function Process() {
  useSeo({
    title: 'Process',
    description: 'The KVK M SOLUTIONS delivery process — discovery, design & development, testing & QA, deployment and maintenance.',
  });
  return (
    <>
      <PageHero
        eyebrow="Process"
        title={<>A digital product <span className="text-grad">factory.</span></>}
        lead="Each stage physically builds part of the final product — from a first conversation to a live, maintained application."
      />
      <Section id="pipeline">
        <SectionHead eyebrow="The pipeline" title="Five stages, one direction." />
        <div className="proc-track">
          {processSteps.map((p, i) => (
            <Reveal key={p.no} variant="left" delay={i * 0.06}>
              <div className="proc-step" data-cursor>
                <div className="proc-step__no">{p.no}</div>
                <div className="proc-step__body">
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="btn-row">
          <Link to="/contact" className="btn btn--primary" data-cursor="button">Begin with discovery <span className="btn__arrow">→</span></Link>
        </div>
      </Section>
    </>
  );
}
