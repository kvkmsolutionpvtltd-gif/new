import { Link } from 'react-router-dom';
import { PageHero, Section } from '../sections/bits';
import Reveal from '../components/Reveal';
import { useSeo } from '../lib/seo';

/**
 * Blog — EDIT posts here. Empty by default so nothing is invented.
 * Add { slug, title, date, excerpt } objects when real posts exist.
 */
const posts = [];

export default function Blog() {
  useSeo({ title: 'Blog', description: 'Notes and insights from the KVK M SOLUTIONS team.' });
  return (
    <>
      <PageHero eyebrow="Blog" title={<>Notes from the <span className="text-grad">workshop.</span></>} lead="Writing on engineering, design and building digital products." />
      <Section id="posts">
        {posts.length === 0 ? (
          <Reveal className="card center" >
            <div style={{ padding: '30px 20px' }} data-cursor>
              <h3>Articles are on the way.</h3>
              <p style={{ margin: '10px auto 0', maxWidth: '46ch' }}>
                We're preparing the first posts. In the meantime, explore our work or start a conversation.
              </p>
              <div className="btn-row" style={{ justifyContent: 'center' }}>
                <Link to="/case-studies" className="btn" data-cursor="button">View our work</Link>
                <Link to="/contact" className="btn btn--primary" data-cursor="button">Start a project <span className="btn__arrow">→</span></Link>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="cards">
            {posts.map((p) => (
              <article key={p.slug} className="card" data-cursor>
                <span className="mono dim">{p.date}</span>
                <h3 style={{ marginTop: 8 }}>{p.title}</h3>
                <p>{p.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
