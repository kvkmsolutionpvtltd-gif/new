import Reveal from '../components/Reveal';
import { Section, SectionHead, Chain } from './bits';

/* 14. Database connection — request/response flow */
export function DatabaseSection() {
  return (
    <Section id="database">
      <SectionHead
        eyebrow="08 — Data Flow"
        title="How a request reaches the database."
        lead="A single tap on a phone travels through the API, hits the server, queries the database and returns — in milliseconds."
      />
      <Chain
        steps={[
          { title: 'LOGIN REQUEST', desc: 'User taps sign in on the app' },
          { title: 'AUTH API', desc: 'Request routed and validated' },
          { title: 'DATABASE', desc: 'Credentials checked securely' },
          { title: 'USER VERIFIED', desc: 'Identity confirmed' },
          { title: 'TOKEN ISSUED', desc: 'Session token returned' },
          { title: 'APP HOME', desc: 'User lands, signed in' },
        ]}
      />
    </Section>
  );
}

/* 15. API architecture — the system map */
const NODES = ['Mobile App', 'Website', 'Admin Panel', 'API Gateway', 'Auth', 'Payments', 'Database', 'Storage', 'Notifications', 'Analytics', 'Cloud'];

export function ApiSection() {
  return (
    <Section id="api">
      <SectionHead
        eyebrow="09 — Architecture"
        title="One API. Many surfaces."
        lead="Apps, websites and admin panels all talk to the same backbone — authentication, payments, storage, notifications and analytics, connected."
      />
      <Reveal className="cards" stagger>
        {NODES.map((n, i) => (
          <div className="device" key={i} data-cursor>
            <b>◦</b> {n}
          </div>
        ))}
      </Reveal>
    </Section>
  );
}

/* 16. Gradle / Android build system */
export function BuildSection() {
  return (
    <Section id="build">
      <div className="split">
        <div>
          <SectionHead
            eyebrow="10 — Build System"
            title="From source to signed app."
            lead="Android Studio and Gradle resolve dependencies, compile Kotlin, Java, Flutter or React Native, package and sign — producing an installable APK / AAB."
          />
        </div>
        <Reveal variant="right">
          <div className="terminal" data-cursor>
            <div className="terminal__bar">
              <i style={{ background: '#ff5f56' }} /><i style={{ background: '#ffbd2e' }} /><i style={{ background: '#27c93f' }} />
            </div>
            <div className="terminal__body">
              <div><span className="prompt">BUILD STARTED</span></div>
              <div>→ COMPILING</div>
              <div>→ PACKAGING</div>
              <div>→ SIGNING</div>
              <div><span className="ok">✓ BUILD SUCCESS · app-release.aab</span></div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* 17. E-commerce ecosystem */
export function EcommerceSection() {
  return (
    <Section id="ecommerce">
      <SectionHead
        eyebrow="11 — E-commerce"
        title="A complete shopping ecosystem."
        lead="Catalog, cart, checkout, payment, orders, admin and delivery — the full customer journey, engineered end to end."
      />
      <Chain
        steps={[
          { title: 'PRODUCT', desc: 'Browse the catalog' },
          { title: 'CART', desc: 'Add and adjust items' },
          { title: 'CHECKOUT', desc: 'Address and shipping' },
          { title: 'PAYMENT', desc: 'Secure transaction' },
          { title: 'ORDER', desc: 'Confirmed and stored' },
          { title: 'ADMIN → CUSTOMER', desc: 'Fulfilment and delivery' },
        ]}
      />
    </Section>
  );
}

/* 18. Payment system — security */
export function PaymentSection() {
  return (
    <Section id="payment">
      <div className="split">
        <div>
          <SectionHead
            eyebrow="12 — Payments"
            title="Secure by design."
            lead="Payment flows built around encryption and verification. We never expose secrets — data travels as encrypted, verified transactions."
          />
        </div>
        <Reveal variant="scale">
          <div className="card" data-cursor>
            <div className="flow" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
              {['USER', 'ORDER', 'PAYMENT GATEWAY', 'VERIFICATION', 'DATABASE', 'ORDER CONFIRMED'].map((s, i, arr) => (
                <span key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <em>{i < arr.length - 1 ? '↓' : '✓'}</em> {s}
                </span>
              ))}
            </div>
            <p style={{ marginTop: 16, fontSize: '0.78rem' }} className="mono">🔒 END-TO-END ENCRYPTED</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
