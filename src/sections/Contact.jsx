import { useState } from 'react';
import Reveal from '../components/Reveal';
import { Section, SectionHead } from './bits';

const PROJECT_TYPES = [
  'Website', 'E-commerce', 'Mobile App (Android/iOS)', 'Flutter / React Native',
  'Game / Card Game', 'UI/UX & Branding', 'API / Backend / Cloud', 'Other',
];

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!v.email.trim()) e.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'Enter a valid email address.';
  if (v.phone && !/^[+\d][\d\s()-]{6,}$/.test(v.phone)) e.phone = 'Enter a valid phone number.';
  if (!v.projectType) e.projectType = 'Select a project type.';
  if (!v.message.trim() || v.message.trim().length < 10) e.message = 'Tell us a little more (10+ characters).';
  return e;
}

export function ContactSection() {
  const [values, setValues] = useState({ name: '', email: '', phone: '', projectType: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = document.querySelector(`.field--error input, .field--error select, .field--error textarea`);
      first?.focus();
      return;
    }
    // No backend in this build: compose a mailto so the form is functional.
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone || '—'}\nProject: ${values.projectType}\n\n${values.message}`
    );
    const subject = encodeURIComponent(`New project enquiry — ${values.projectType}`);
    window.location.href = `mailto:kvkmsolutionpvtltd@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Section id="contact">
      <div className="split">
        <div>
          <SectionHead
            eyebrow="Let's Build"
            title={<>Have an idea?<br /><span className="text-grad">Let's build it.</span></>}
            lead="Tell us what you're imagining — a website, an app, a game, a brand. We'll turn it into a finished digital product."
          />
          <div className="stack" style={{ marginTop: 34 }}>
            <p className="mono" style={{ color: 'var(--silver)' }}>✉ kvkmsolutionpvtltd@gmail.com</p>
            <p className="mono" style={{ color: 'var(--silver)' }}>◦ Design · Develop · Deploy</p>
          </div>
        </div>

        <Reveal variant="right">
          <form className="card" onSubmit={onSubmit} noValidate data-cursor>
            <div className="contact__grid">
              <div className={`field ${errors.name ? 'field--error' : ''}`}>
                <label htmlFor="f-name">Name</label>
                <input id="f-name" type="text" value={values.name} onChange={set('name')} aria-invalid={!!errors.name} autoComplete="name" />
                {errors.name && <span className="field__err">{errors.name}</span>}
              </div>
              <div className={`field ${errors.email ? 'field--error' : ''}`}>
                <label htmlFor="f-email">Email</label>
                <input id="f-email" type="email" value={values.email} onChange={set('email')} aria-invalid={!!errors.email} autoComplete="email" />
                {errors.email && <span className="field__err">{errors.email}</span>}
              </div>
              <div className={`field ${errors.phone ? 'field--error' : ''}`}>
                <label htmlFor="f-phone">Phone</label>
                <input id="f-phone" type="tel" value={values.phone} onChange={set('phone')} aria-invalid={!!errors.phone} autoComplete="tel" />
                {errors.phone && <span className="field__err">{errors.phone}</span>}
              </div>
              <div className={`field ${errors.projectType ? 'field--error' : ''}`}>
                <label htmlFor="f-projectType">Project Type</label>
                <select id="f-projectType" value={values.projectType} onChange={set('projectType')} aria-invalid={!!errors.projectType}>
                  <option value="">Select…</option>
                  {PROJECT_TYPES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                {errors.projectType && <span className="field__err">{errors.projectType}</span>}
              </div>
              <div className={`field field--full ${errors.message ? 'field--error' : ''}`}>
                <label htmlFor="f-message">Message</label>
                <textarea id="f-message" value={values.message} onChange={set('message')} aria-invalid={!!errors.message} />
                {errors.message && <span className="field__err">{errors.message}</span>}
              </div>
              {sent && (
                <div className="form__status" role="status">
                  ✓ Thanks! Your email draft is ready — hit send to reach us.
                </div>
              )}
              <div className="field--full">
                <button className="btn btn--primary" type="submit" data-cursor="button">
                  START A CONVERSATION <span className="btn__arrow">→</span>
                </button>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

/* 38. Final eagle animation + footer */
export function FinaleSection() {
  return (
    <>
      <section className="finale" id="finale">
        <Reveal className="section__inner center" stagger>
          <img src="./eagle.svg" alt="KVK M SOLUTIONS eagle" />
          <h2>KVK M SOLUTIONS</h2>
          <p className="lead" style={{ margin: '18px auto 0' }}>Building what's next.</p>
        </Reveal>
      </section>
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <img src="./eagle.svg" alt="" width="28" height="28" />
            KVK M SOLUTIONS
          </div>
          <div style={{ textAlign: 'right' }}>
            <p>© {new Date().getFullYear()} KVK M SOLUTIONS · Software Development &amp; Digital Solutions</p>
            <p style={{ fontSize: '0.7rem', marginTop: 6, opacity: 0.6 }}>
              3D: MacBook model by jackbaeten (
              <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline' }}>CC BY 4.0</a>
              ) · Robot by Tomás Laulhé (CC0)
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
