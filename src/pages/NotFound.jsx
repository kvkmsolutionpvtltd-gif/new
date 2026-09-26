import { Link } from 'react-router-dom';
import { PageHero, Section } from '../sections/bits';
import { useSeo } from '../lib/seo';

export default function NotFound() {
  useSeo({ title: 'Page not found' });
  return (
    <>
      <PageHero eyebrow="404" title={<>This page drifted <span className="text-grad">off-map.</span></>} lead="The link may be broken or the page may have moved." />
      <Section id="nf">
        <div className="btn-row">
          <Link to="/" className="btn btn--primary" data-cursor="button">Back home <span className="btn__arrow">→</span></Link>
          <Link to="/services" className="btn" data-cursor="button">Explore services</Link>
        </div>
      </Section>
    </>
  );
}
