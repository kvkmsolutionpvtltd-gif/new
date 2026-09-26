import Reveal from '../components/Reveal';

export function SectionHead({ eyebrow, title, lead, titleClass = 'h-lg' }) {
  return (
    <Reveal className="section-head" stagger>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={titleClass}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  );
}

export function Chain({ steps }) {
  return (
    <Reveal className="chain" stagger>
      {steps.map((s, i) => (
        <div className="chain__step" key={i} data-cursor>
          <span className="chain__num">{String(i + 1).padStart(2, '0')}</span>
          <span className="chain__title">{s.title}</span>
          {s.desc && <span className="chain__desc">{s.desc}</span>}
        </div>
      ))}
    </Reveal>
  );
}

export function Section({ id, children, style }) {
  return (
    <section id={id} className="section" style={style}>
      <div className="section__inner">{children}</div>
    </section>
  );
}

/** Tall hero for inner pages. */
export function PageHero({ eyebrow, title, lead, children }) {
  return (
    <header className="pagehero">
      <div className="section__inner">
        <Reveal stagger>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="display">{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </Reveal>
      </div>
    </header>
  );
}
