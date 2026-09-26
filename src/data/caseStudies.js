/**
 * Case studies / work — EDIT HERE.
 * ⚠ VERIFY names, scope and results against the official site before treating
 * as final. Only real projects are listed; do not invent clients or results.
 * Leave `result` empty unless you have a verified, shareable outcome.
 */
export const caseStudies = [
  {
    slug: 'tarabba-qld-wholesale',
    title: 'Tarabba QLD Wholesale',
    type: 'Website',
    industry: 'Wholesale / Retail',
    kind: 'browser',
    problem: 'A wholesale business needed a clear, credible web presence to showcase products and reach customers.',
    solution: 'Designed and built a responsive wholesale website with a structured product presentation.',
    result: '', // ⚠ add only verified, shareable outcomes
  },
  {
    slug: 'mobile-app-design',
    title: 'Mobile App Design',
    type: 'Mobile App',
    industry: 'Product Design',
    kind: 'phone',
    problem: 'A product needed an intuitive, modern mobile interface that users could navigate with ease.',
    solution: 'Delivered end-to-end mobile UI/UX — flows, wireframes and a polished, native-feeling interface.',
    result: '',
  },
  {
    slug: 'crm-hrm-software',
    title: 'CRM / HRM Software',
    type: 'Custom Software',
    industry: 'Business Operations',
    kind: 'dashboard',
    problem: 'Manual, scattered operations needed a single system to manage customers and human resources.',
    solution: 'Built tailored CRM and HRM software to streamline day-to-day operations in one place.',
    result: '',
  },
];

export const getCaseStudy = (slug) => caseStudies.find((c) => c.slug === slug);
