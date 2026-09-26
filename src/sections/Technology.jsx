import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from '../components/Reveal';
import { Section, SectionHead, Chain } from './bits';
import { usePrefersReducedMotion } from '../lib/hooks';

gsap.registerPlugin(ScrollTrigger);

const STACKS = [
  {
    name: 'Node.js',
    tag: 'BACKEND',
    flow: ['API', 'SERVER', 'DATABASE'],
    code: [
      ['k', 'const '], ['', 'app = '], ['f', 'express'], ['', '();\n'],
      ['', 'app.'], ['f', 'get'], ['', '('], ['s', "'/api/users'"], ['', ', '], ['k', 'async '], ['', '(req, res) => {\n'],
      ['', '  '], ['k', 'const '], ['', 'data = '], ['k', 'await '], ['n', 'db'], ['', '.users.'], ['f', 'find'], ['', '();\n'],
      ['', '  res.'], ['f', 'json'], ['', '(data);\n'], ['', '});'],
    ],
  },
  {
    name: 'React',
    tag: 'WEB UI',
    flow: ['Components', 'Props', 'State', 'UI'],
    code: [
      ['k', 'function '], ['f', 'Product'], ['', '({ '], ['n', 'item'], ['', ' }) {\n'],
      ['', '  '], ['k', 'const '], ['', '['], ['n', 'cart'], ['', ', '], ['f', 'setCart'], ['', '] = '], ['f', 'useState'], ['', '([]);\n'],
      ['', '  '], ['k', 'return '], ['', '<'], ['f', 'Card'], ['', ' '], ['n', 'onAdd'], ['', '={'], ['f', 'setCart'], ['', '} />;\n'],
      ['', '}'],
    ],
  },
  {
    name: 'Flutter',
    tag: 'CROSS-PLATFORM',
    flow: ['Android', 'iPhone', 'Tablet', 'Desktop'],
    note: 'ONE CODEBASE. MULTIPLE EXPERIENCES.',
    code: [
      ['k', 'class '], ['f', 'App'], [' ', ' '], ['k', 'extends '], ['f', 'StatelessWidget'], ['', ' {\n'],
      ['', '  '], ['f', 'Widget'], ['', ' '], ['f', 'build'], ['', '('], ['n', 'context'], ['', ') {\n'],
      ['', '    '], ['k', 'return '], ['f', 'MaterialApp'], ['', '(home: '], ['f', 'Home'], ['', '());\n'],
      ['', '  }\n}'],
    ],
  },
  {
    name: 'React Native',
    tag: 'MOBILE',
    flow: ['Android', 'iOS'],
    code: [
      ['k', 'export default function '], ['f', 'Home'], ['', '() {\n'],
      ['', '  '], ['k', 'return '], ['', '(<'], ['f', 'View'], ['', '><'], ['f', 'Text'], ['', '>KVK M</'], ['f', 'Text'], ['', '></'], ['f', 'View'], ['', '>);\n'],
      ['', '}'],
    ],
  },
  {
    name: 'iOS · Swift',
    tag: 'APPLE',
    flow: ['Xcode', 'SwiftUI', 'App Store'],
    code: [
      ['k', 'struct '], ['f', 'ContentView'], ['', ': '], ['f', 'View'], ['', ' {\n'],
      ['', '  '], ['k', 'var '], ['n', 'body'], ['', ': '], ['k', 'some '], ['f', 'View'], ['', ' {\n'],
      ['', '    '], ['f', 'Text'], ['', '('], ['s', '"KVK M"'], ['', ')\n  }\n}'],
    ],
  },
  {
    name: 'Android · Kotlin',
    tag: 'GOOGLE',
    flow: ['Android Studio', 'Gradle', 'APK / AAB'],
    code: [
      ['k', 'class '], ['f', 'MainActivity'], ['', ' : '], ['f', 'ComponentActivity'], ['', '() {\n'],
      ['', '  '], ['k', 'override fun '], ['f', 'onCreate'], ['', '(b: '], ['f', 'Bundle'], ['', '?) {\n'],
      ['', '    '], ['f', 'setContent'], ['', ' { '], ['f', 'App'], ['', '() }\n  }\n}'],
    ],
  },
];

function CodeCard({ stack }) {
  return (
    <div className="card" data-cursor>
      <div className="meter__head">
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--white)' }}>{stack.name}</span>
        <span className="tag">{stack.tag}</span>
      </div>
      <pre className="codeblock" style={{ marginTop: 16 }}>
        {stack.code.map(([cls, txt], i) => (
          <span key={i} className={cls}>{txt}</span>
        ))}
      </pre>
      <div className="flow" style={{ marginTop: 16 }}>
        {stack.flow.map((f, i) => (
          <span key={i}>{f}</span>
        ))}
      </div>
      {stack.note && (
        <p className="mono" style={{ marginTop: 14, color: 'var(--blue-bright)', letterSpacing: '0.1em', fontSize: '0.75rem' }}>
          {stack.note}
        </p>
      )}
    </div>
  );
}

export function TechnologySection() {
  return (
    <Section id="technology">
      <SectionHead
        eyebrow="05 — Engineering"
        title="The languages we build in."
        lead="Each technology is a different way to bring a product to life. We pick the right stack for the job — web, mobile, backend and beyond."
      />
      <div className="cards">
        {STACKS.map((s, i) => (
          <Reveal key={i} variant="up" delay={(i % 3) * 0.05}>
            <CodeCard stack={s} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* 12. Massive code scene — commands stream in */
export function MassiveCodeSection() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  const cmds = [
    ['prompt', '$ npm install'],
    ['ok', '  added 1284 packages in 6s'],
    ['prompt', '$ npm run build'],
    ['ok', '  ✓ built in 3.4s'],
    ['prompt', '$ flutter build apk --release'],
    ['ok', '  ✓ app-release.apk (24.1MB)'],
    ['prompt', '$ ./gradlew assembleRelease'],
    ['ok', '  BUILD SUCCESSFUL in 41s'],
    ['prompt', '$ git commit -m "ship it"'],
    ['prompt', '$ git push origin main'],
    ['ok', '  → deploy triggered'],
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const lines = el.querySelectorAll('.mc-line');
    const ctx = gsap.context(() => {
      gsap.set(lines, { opacity: 0, x: -12 });
      gsap.to(lines, {
        opacity: 1,
        x: 0,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 70%' },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <Section id="code">
      <div className="split">
        <div>
          <SectionHead
            eyebrow="06 — Inside The Machine"
            title={<>The code you see is only<br />one part of the system.</>}
            lead="Terminals, build pipelines, git branches and servers — the invisible engineering that turns source code into a live product."
          />
        </div>
        <div className="terminal" ref={ref} data-cursor>
          <div className="terminal__bar">
            <i style={{ background: '#ff5f56' }} />
            <i style={{ background: '#ffbd2e' }} />
            <i style={{ background: '#27c93f' }} />
          </div>
          <div className="terminal__body">
            {cmds.map(([cls, txt], i) => (
              <div className="mc-line" key={i}>
                <span className={cls}>{txt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* 13. Developer day & night story */
const PHASES = [
  { t: 'MORNING', sky: 'linear-gradient(160deg,#2a4a72,#8fb4dd)', c: '☕', d: 'Plan the day, review tickets.' },
  { t: 'AFTERNOON', sky: 'linear-gradient(160deg,#3a6ea8,#bcd6ff)', c: '☕', d: 'Deep work — features take shape.' },
  { t: 'EVENING', sky: 'linear-gradient(160deg,#5a3a72,#c88fb8)', c: '☕☕', d: 'Tests, edge cases, review.' },
  { t: 'NIGHT', sky: 'linear-gradient(160deg,#141b3a,#3a3a72)', c: '☕☕', d: 'Debug the tricky bug.' },
  { t: 'LATE NIGHT', sky: 'linear-gradient(160deg,#0a0f24,#1c2450)', c: '☕☕☕', d: 'Fix found. Build passes.' },
  { t: 'EARLY MORNING', sky: 'linear-gradient(160deg,#1a2440,#6a7aa8)', c: '☕', d: 'Shipped. Rest earned.' },
];

export function DayNightSection() {
  return (
    <Section id="craft">
      <SectionHead
        eyebrow="07 — The Process"
        title="Good software takes time."
        lead="Behind every polished product are hours of design, coding, testing and refinement. Dedication and iteration — not endless overwork."
      />
      <div className="daynight">
        {PHASES.map((p, i) => (
          <Reveal key={i} variant="up" delay={i * 0.05}>
            <div className="daynight__cell" data-cursor>
              <div className="daynight__sky" style={{ background: p.sky }} />
              <h4>{p.t}</h4>
              <div className="daynight__coffee">{p.c}</div>
              <p>{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="chain" stagger style={{ marginTop: 28 }}>
        <div className="flow">
          <span>ERROR</span><em>→</em>
          <span>DEBUG</span><em>→</em>
          <span>FIX</span><em>→</em>
          <span>TEST</span><em>→</em>
          <span style={{ borderColor: 'rgba(95,208,138,0.5)', color: '#9fe8bc' }}>BUILD SUCCESS</span>
        </div>
      </Reveal>
    </Section>
  );
}
