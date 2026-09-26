import Reveal from '../components/Reveal';
import { Section, SectionHead } from './bits';

/* Creator — a maker at a neat PC, output flying out in 3D (3D carries it) */
export function CreatorSection() {
  return (
    <Section id="build">
      <SectionHead
        eyebrow="How We Build"
        title={<>Built by hand.<br /><span className="text-grad">Shipped in 3D.</span></>}
        lead="A maker at a neat workstation turns code into product — and the finished apps, websites and logos rise straight off the screen into a living 3D world."
        titleClass="display"
      />
    </Section>
  );
}

/* APPS showcase */
export function AppsSection() {
  return (
    <Section id="apps">
      <SectionHead
        eyebrow="Deliverable 01"
        title="Apps."
        lead="Android, iOS, Flutter and React Native — one product, every device. Native-feeling interfaces backed by real APIs, data and payments."
        titleClass="display"
      />
      <Reveal className="devices" stagger style={{ marginTop: 34 }}>
        {['Android', 'iOS', 'Flutter', 'React Native', 'Tablet', 'Desktop'].map((d) => (
          <div className="device" key={d} data-cursor><b>◦</b> {d}</div>
        ))}
      </Reveal>
    </Section>
  );
}

/* WEBSITE showcase */
export function WebsiteShowcaseSection() {
  return (
    <Section id="websites">
      <SectionHead
        eyebrow="Deliverable 02"
        title="Websites."
        lead="Marketing sites, dashboards and web apps that build themselves block by block — fast, responsive and production-grade from HTML to React to cloud."
        titleClass="display"
      />
      <Reveal className="devices" stagger style={{ marginTop: 34 }}>
        {['Landing Pages', 'Dashboards', 'Web Apps', 'E-commerce', 'CMS', 'SEO-ready'].map((d) => (
          <div className="device" key={d} data-cursor><b>◦</b> {d}</div>
        ))}
      </Reveal>
    </Section>
  );
}

/* LOGO & BRANDING showcase */
export function LogoSection() {
  return (
    <Section id="logo">
      <SectionHead
        eyebrow="Deliverable 03"
        title={<>Logo &amp; <span className="text-grad">Branding.</span></>}
        lead="Identity systems that assemble from the smallest particle up — logos, brand marks, posters and creative that scale across every surface."
        titleClass="display"
      />
      <Reveal className="devices" stagger style={{ marginTop: 34 }}>
        {['Logo Design', 'Brand System', 'Posters', 'Social Creative', 'Print', 'Guidelines'].map((d) => (
          <div className="device" key={d} data-cursor><b>◦</b> {d}</div>
        ))}
      </Reveal>
    </Section>
  );
}
