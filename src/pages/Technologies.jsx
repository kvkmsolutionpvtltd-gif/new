import { PageHero, Section } from '../sections/bits';
import Reveal from '../components/Reveal';
import { useSeo } from '../lib/seo';
import { techCategories, techMeta } from '../data/technologies';

export default function Technologies() {
  useSeo({
    title: 'Technologies',
    description: 'The technology stack behind KVK M SOLUTIONS — frontend, mobile, backend, database, cloud/DevOps and design tools.',
  });
  return (
    <>
      <PageHero
        eyebrow="Technologies"
        title={<>A modern <span className="text-grad">technology galaxy.</span></>}
        lead="Chosen for fit, not fashion. Here's what we build with and how the pieces connect."
      />
      {techCategories.map((cat) => (
        <Section id={cat.group.toLowerCase().replace(/\W+/g, '-')} key={cat.group}>
          <div className="tech-cat">
            <h2 className="tech-cat__title">{cat.group}</h2>
            <Reveal className="techwall" stagger>
              {cat.items.map((t) => {
                const meta = techMeta[t];
                return (
                  <div className={`techwall__node ${meta ? 'techwall__node--rich' : ''}`} key={t} data-cursor>
                    <span className="techwall__name">{t}</span>
                    {meta && (
                      <span className="techwall__meta">
                        <b>{meta.what}</b> · {meta.fits}
                      </span>
                    )}
                  </div>
                );
              })}
            </Reveal>
          </div>
        </Section>
      ))}
    </>
  );
}
