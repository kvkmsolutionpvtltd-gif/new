/**
 * Company facts — EDIT HERE. These are the single source of truth for
 * contact details and identity across the site.
 *
 * ⚠ VERIFY every value against the official site (kvkmsolutions.com) and
 * company records before treating as final production content. Values marked
 * `verify: true` were taken from the brief / public registries and could not be
 * confirmed live from this environment (the site was network-blocked).
 */
export const company = {
  name: 'KVK M SOLUTIONS',
  legalName: 'KVKM Solutions Private Limited',
  tagline: 'We build digital experiences that move business forward.',
  established: 2021, // Incorporated 08 Feb 2021 (public registry)

  // Contact — VERIFY before production
  phone: '+91 90142 46844', // ⚠ verify
  phoneHref: '+919014246844',
  emails: ['info@kvkmsolutions.com'],
  locations: ['Vijayawada', 'Hyderabad'],
  registeredNote: 'Registered in Andhra Pradesh, India (Repalle).',

  website: 'https://kvkmsolutions.com/',
  social: [
    // { label: 'Facebook', href: '' }, // add verified links only
  ],

  // Short mission/vision — rewritten premium copy from the company's stated
  // focus (empowering businesses through web/mobile apps, design & execution).
  mission:
    'We empower businesses with thoughtfully engineered web and mobile applications — pairing considered design, solid engineering and strategic execution to turn ideas into dependable digital products.',
};
