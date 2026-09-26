import Reveal from '../components/Reveal';
import { Section, SectionHead, Chain } from './bits';

/* 7. An idea becomes software */
export function IdeaSection() {
  return (
    <Section id="idea">
      <SectionHead
        eyebrow="01 — The Origin"
        title={<>Every great product<br />starts with an <span className="text-grad">idea</span>.</>}
        lead="A single thought becomes design, code, data and infrastructure — connected pieces that work as one system."
        titleClass="display"
      />
      <Chain
        steps={[
          { title: 'IDEA', desc: 'A problem worth solving' },
          { title: 'DESIGN', desc: 'Shape how it looks and feels' },
          { title: 'DEVELOPMENT', desc: 'Engineer it into reality' },
          { title: 'TESTING', desc: 'Make it dependable' },
          { title: 'DEPLOYMENT', desc: 'Ship it to the world' },
          { title: 'PRODUCT', desc: 'Something people use' },
        ]}
      />
    </Section>
  );
}

/* 8. UI/UX Design studio */
const DESIGN_CARDS = [
  { icon: '🖥️', t: 'Website Design', d: 'Marketing sites, landing pages, dashboards.' },
  { icon: '📱', t: 'Mobile App UI', d: 'Native-feeling Android & iOS interfaces.' },
  { icon: '🛒', t: 'E-commerce UI', d: 'Catalogs, carts and checkout people trust.' },
  { icon: '🎨', t: 'Poster & Print', d: 'Posters, banners and marketing creative.' },
  { icon: '🦅', t: 'Logo & Branding', d: 'Identity systems that scale everywhere.' },
  { icon: '✨', t: 'Social Creative', d: 'Feed-ready graphics and motion.' },
];

export function DesignSection() {
  return (
    <Section id="services">
      <SectionHead
        eyebrow="02 — Design Studio"
        title="Design before we code."
        lead="We turn ideas into interfaces people understand and enjoy using — screens that rotate, refine and assemble into one finished product."
      />
      <div className="cards">
        {DESIGN_CARDS.map((c, i) => (
          <Reveal key={i} variant="up" delay={i * 0.04}>
            <div className="card" data-cursor>
              <div className="svc__icon">{c.icon}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* 9. Photoshop + Canva creative studio */
export function CreativeSection() {
  const steps = ['EMPTY CANVAS', 'LAYOUT', 'IMAGE', 'TYPOGRAPHY', 'BRANDING', 'FINAL POSTER'];
  return (
    <Section id="creative">
      <div className="split">
        <div>
          <SectionHead
            eyebrow="03 — Creative Lab"
            title={<>From blank canvas<br />to final creative.</>}
            lead="Photoshop and Canva workspaces where posters, ads and brand material are composed layer by layer — then float out into the real world."
          />
        </div>
        <Reveal variant="scale">
          <div className="card" data-cursor>
            <div className="meter__head"><span>POSTER.psd</span><span>KVK M</span></div>
            <div className="flow" style={{ marginTop: 18, flexDirection: 'column', alignItems: 'stretch' }}>
              {steps.map((s, i) => (
                <span key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <em>{String(i + 1).padStart(2, '0')}</em> {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* 10. Woman developer scene */
export function DeveloperSection() {
  return (
    <Section id="developer">
      <div className="split">
        <div>
          <SectionHead
            eyebrow="04 — At The Desk"
            title="Real engineers. Real craft."
            lead="A developer at a laptop, writing the code that turns a design into a working product. No theatrics — just focus, iteration and attention to detail."
          />
        </div>
        <Reveal variant="right">
          <div className="terminal" data-cursor>
            <div className="terminal__bar">
              <i style={{ background: '#ff5f56' }} />
              <i style={{ background: '#ffbd2e' }} />
              <i style={{ background: '#27c93f' }} />
            </div>
            <pre className="codeblock" style={{ border: 'none', background: 'transparent' }}>
{`export function `}<span className="f">buildProduct</span>{`(idea) {
  const `}<span className="n">design</span>{` = `}<span className="f">refine</span>{`(idea);
  const `}<span className="n">code</span>{`   = `}<span className="f">engineer</span>{`(design);
  `}<span className="k">return</span>{` `}<span className="f">deploy</span>{`(code);
}`}
            </pre>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
