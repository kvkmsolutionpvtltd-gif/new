import { useState } from 'react';
import { PageHero, Section } from '../sections/bits';
import Reveal from '../components/Reveal';
import { useSeo } from '../lib/seo';
import { company } from '../data/company';

const PROJECT_TYPES = [
  'Custom Software', 'Web Application / Website', 'Mobile App (Android/iOS/Flutter)',
  'UI/UX Design', 'CRM / HRM', 'E-commerce', 'IT Consulting / Audit', 'Cloud / Data', 'Other',
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

export default function Contact() {
  useSeo({ title: 'Contact', description: `Have an idea? Let's build it. Contact ${company.name} in ${company.locations.join(' & ')}.` });
  const [v, setV] = useState({ name: '', email: '', phone: '', companyName: '', projectType: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate(v);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.querySelector('.field--error input, .field--error select, .field--error textarea')?.focus();
      return;
    }
    const body = encodeURIComponent(
      `Name: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone || '—'}\nCompany: ${v.companyName || '—'}\nProject: ${v.projectType}\n\n${v.message}`
    );
    window.location.href = `mailto:${company.emails[0]}?subject=${encodeURIComponent('New project enquiry — ' + v.projectType)}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Have an idea?<br /><span className="text-grad">Let's build it.</span></>}
        lead="Tell us what you're imagining. We'll help turn it into a dependable digital product."
      />
      <Section id="contact">
        <div className="split">
          <div className="stack" style={{ gap: 22 }}>
            <div>
              <h3 className="h-md">Talk to us</h3>
              <p style={{ marginTop: 10 }}>Share a few details and we'll get back to you.</p>
            </div>
            <ul className="contact-info">
              {company.emails.map((e) => (
                <li key={e}><span className="mono contact-info__k">EMAIL</span><a href={`mailto:${e}`} data-cursor="link">{e}</a></li>
              ))}
              <li><span className="mono contact-info__k">PHONE</span><a href={`tel:${company.phoneHref}`} data-cursor="link">{company.phone}</a></li>
              <li><span className="mono contact-info__k">LOCATIONS</span><span>{company.locations.join(' · ')}</span></li>
            </ul>
            <p className="dim" style={{ fontSize: '0.8rem' }}>{company.legalName} · Est. {company.established}</p>
          </div>

          <Reveal variant="right">
            <form className="card" onSubmit={onSubmit} noValidate data-cursor>
              <div className="contact__grid">
                <div className={`field ${errors.name ? 'field--error' : ''}`}>
                  <label htmlFor="c-name">Name</label>
                  <input id="c-name" value={v.name} onChange={set('name')} autoComplete="name" />
                  {errors.name && <span className="field__err">{errors.name}</span>}
                </div>
                <div className={`field ${errors.email ? 'field--error' : ''}`}>
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" type="email" value={v.email} onChange={set('email')} autoComplete="email" />
                  {errors.email && <span className="field__err">{errors.email}</span>}
                </div>
                <div className={`field ${errors.phone ? 'field--error' : ''}`}>
                  <label htmlFor="c-phone">Phone</label>
                  <input id="c-phone" type="tel" value={v.phone} onChange={set('phone')} autoComplete="tel" />
                  {errors.phone && <span className="field__err">{errors.phone}</span>}
                </div>
                <div className="field">
                  <label htmlFor="c-company">Company</label>
                  <input id="c-company" value={v.companyName} onChange={set('companyName')} autoComplete="organization" />
                </div>
                <div className={`field field--full ${errors.projectType ? 'field--error' : ''}`}>
                  <label htmlFor="c-type">Project Type</label>
                  <select id="c-type" value={v.projectType} onChange={set('projectType')}>
                    <option value="">Select…</option>
                    {PROJECT_TYPES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {errors.projectType && <span className="field__err">{errors.projectType}</span>}
                </div>
                <div className={`field field--full ${errors.message ? 'field--error' : ''}`}>
                  <label htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" value={v.message} onChange={set('message')} />
                  {errors.message && <span className="field__err">{errors.message}</span>}
                </div>
                {sent && <div className="form__status" role="status">✓ Thanks! Your email draft is ready — hit send to reach us.</div>}
                <div className="field--full">
                  <button className="btn btn--primary" type="submit" data-cursor="button">SEND PROJECT REQUEST <span className="btn__arrow">→</span></button>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
