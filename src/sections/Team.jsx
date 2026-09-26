import { useRef } from 'react';
import Reveal from '../components/Reveal';
import { Section, SectionHead } from './bits';
import { useIsTouch } from '../lib/hooks';

/* 23. Software engineer profile cards with 3D tilt */
const TEAM = [
  { role: 'SOFTWARE ENGINEER', name: 'Full Stack', skills: ['React', 'Node.js', 'Database', 'API'] },
  { role: 'FLUTTER DEVELOPER', name: 'Mobile', skills: ['Flutter', 'Dart', 'Firebase', 'REST API'] },
  { role: 'UI / UX DESIGNER', name: 'Product Design', skills: ['Figma', 'Photoshop', 'Canva', 'Branding'] },
  { role: '3D / GAME DEVELOPER', name: 'Interactive', skills: ['Blender', '3D', 'Game Systems', 'Animation'] },
];

function TiltCard({ member }) {
  const ref = useRef(null);
  const touch = useIsTouch();

  const onMove = (e) => {
    if (touch) return;
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 14}deg) translateZ(10px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'rotateY(0) rotateX(0)';
  };

  return (
    <div className="team__card" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} data-cursor>
      <div className="team__role">{member.role}</div>
      <div className="team__name">{member.name}</div>
      <div className="card__tags">
        {member.skills.map((s) => (
          <span className="tag" key={s}>{s}</span>
        ))}
      </div>
    </div>
  );
}

export function TeamSection() {
  return (
    <Section id="about">
      <SectionHead
        eyebrow="17 — The Team"
        title="Specialists, not generalists."
        lead="Engineers, designers and 3D artists who each go deep — and work as one team to ship complete products."
      />
      <div className="team">
        {TEAM.map((m, i) => (
          <Reveal key={i} variant="up" delay={i * 0.05}>
            <TiltCard member={m} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* 24. The development pipeline */
const STAGES = [
  ['01', 'DISCOVER', 'Understand the goal'],
  ['02', 'PLAN', 'Scope and architecture'],
  ['03', 'DESIGN', 'Interfaces and flows'],
  ['04', 'DEVELOP', 'Engineer the product'],
  ['05', 'INTEGRATE', 'Connect the systems'],
  ['06', 'TEST', 'Verify and harden'],
  ['07', 'OPTIMIZE', 'Speed and polish'],
  ['08', 'DEPLOY', 'Ship to production'],
  ['09', 'SUPPORT', 'Iterate and maintain'],
];

export function PipelineSection() {
  return (
    <Section id="process">
      <SectionHead
        eyebrow="18 — How We Work"
        title="The development pipeline."
        lead="Every project travels the same disciplined path — from a first conversation to a supported, living product."
      />
      <div className="pipeline">
        {STAGES.map(([num, name, desc], i) => (
          <Reveal key={i} variant="up" delay={(i % 3) * 0.05}>
            <div className="pipeline__stage" data-cursor>
              <div className="pipeline__num">{num}</div>
              <div className="pipeline__name">{name}</div>
              <p>{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* 25. Testing */
export function TestingSection() {
  const kinds = [
    ['Unit Testing', 96],
    ['API Testing', 92],
    ['UI Testing', 88],
    ['Device Testing', 90],
    ['Performance', 85],
    ['Security', 94],
  ];
  return (
    <Section id="testing">
      <div className="split">
        <div>
          <SectionHead
            eyebrow="19 — Quality"
            title="Tested until it's dependable."
            lead="Unit, API, UI, device, performance and security testing. Bugs surface, get fixed and the green checks come back — reliability you can build on."
          />
        </div>
        <Reveal className="meters" stagger>
          {kinds.map(([label, val]) => (
            <div key={label}>
              <div className="meter__head"><span>{label}</span><span>{val}%</span></div>
              <div className="meter__track">
                <div className="meter__fill" style={{ width: `${val}%` }} />
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

/* 26. Deployment */
export function DeploymentSection() {
  return (
    <Section id="deploy">
      <SectionHead
        eyebrow="20 — Go Live"
        title="Code becomes something people can use."
        lead="Git, CI/CD, build, testing, cloud, production — the moment source turns into a live website, app and API."
      />
      <div className="flow" style={{ marginTop: 40 }}>
        {['GIT', 'CI/CD', 'BUILD', 'TEST', 'CLOUD', 'PRODUCTION'].map((s, i, a) => (
          <span key={i}>{s}{i < a.length - 1 ? '' : ''}</span>
        ))}
      </div>
      <div className="devices" style={{ marginTop: 24 }}>
        {['🌐 WEBSITE LIVE', '📱 APP LIVE', '🔌 API LIVE'].map((d, i) => (
          <Reveal key={i} variant="scale" delay={i * 0.1}>
            <div className="device" style={{ borderColor: 'rgba(95,208,138,0.4)', color: '#9fe8bc' }} data-cursor>{d}</div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
