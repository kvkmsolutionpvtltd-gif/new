import Reveal from '../components/Reveal';
import { Section, SectionHead, Chain } from './bits';

/* 19. Game development + card game */
export function GameSection() {
  return (
    <Section id="games">
      <SectionHead
        eyebrow="13 — Game Studio"
        title="Games & card games."
        lead="Game engines, 3D environments, physics, multiplayer servers — and real-time card games where rooms are created, players connect and leaderboards update live."
      />
      <div className="cards">
        {[
          { t: 'Game Engine', d: 'Environments, characters, physics, UI and logic.' },
          { t: 'Multiplayer', d: 'Rooms, matchmaking and real-time server sync.' },
          { t: 'Card Games', d: 'Shuffle, deal, score and leaderboard systems.' },
        ].map((c, i) => (
          <Reveal key={i} variant="up" delay={i * 0.06}>
            <div className="card" data-cursor>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="flow" style={{ marginTop: 28 }}>
        <span>ROOM CREATED</span><em>→</em><span>PLAYERS JOIN</span><em>→</em><span>GAME STARTS</span><em>→</em><span>SCORE</span><em>→</em><span>LEADERBOARD</span>
      </Reveal>
    </Section>
  );
}

/* 20. Blender / 3D creative studio */
export function BlenderSection() {
  return (
    <Section id="threed">
      <div className="split">
        <div>
          <SectionHead
            eyebrow="14 — 3D & Motion"
            title={<>We don't just build software.<br /><span className="text-grad">We build experiences.</span></>}
            lead="From a primitive cube to a cinematic rendered asset — modeling, sculpting, materials, lighting, animation and rendering."
          />
        </div>
        <Reveal variant="right">
          <div className="card" data-cursor>
            <div className="flow" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              {['MODELING', 'SCULPTING', 'MATERIALS', 'LIGHTING', 'ANIMATION', 'RENDERING'].map((s, i) => (
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

/* 21. Website development */
export function WebsiteSection() {
  return (
    <Section id="web">
      <SectionHead
        eyebrow="15 — Web Development"
        title="From blank browser to production."
        lead="Code is written, the browser refreshes, and the website progressively appears — then scales to a fast, production-grade product."
      />
      <Chain
        steps={[
          { title: 'HTML / CSS / JS', desc: 'The foundation' },
          { title: 'REACT', desc: 'Component architecture' },
          { title: 'API', desc: 'Dynamic data' },
          { title: 'DATABASE', desc: 'Persistent content' },
          { title: 'PRODUCTION WEBSITE', desc: 'Live, fast, responsive' },
        ]}
      />
    </Section>
  );
}

/* 22. Mobile app development */
export function MobileSection() {
  return (
    <Section id="mobile">
      <SectionHead
        eyebrow="16 — Mobile"
        title="One product. Every device."
        lead="A single central app expands into Android, iPhone, tablet and desktop — synchronized UI backed by the same APIs, database, notifications and payments."
      />
      <div className="devices">
        {['📱 Android', '🍎 iPhone', '💻 Tablet', '🖥️ Desktop'].map((d, i) => (
          <Reveal key={i} variant="up" delay={i * 0.06}>
            <div className="device" data-cursor>{d}</div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
