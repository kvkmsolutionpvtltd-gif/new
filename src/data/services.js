/**
 * Services — EDIT HERE. Sourced from the company's stated capabilities.
 * `flow` drives the 3D/diagram step chains; `detail` powers the service pages.
 */
export const services = [
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    short: 'Tailored systems designed around real business processes.',
    icon: '⌘',
    scene: 'architecture',
    includes: ['Software Architecture', 'System Integration', 'Data Migration', 'Legacy Application Modernization'],
    flow: ['Business Idea', 'Requirements', 'Architecture', 'Database', 'API', 'Frontend', 'Testing', 'Deployment'],
    detail:
      'We design and build software around how your business actually works — from architecture and integrations to data migration and modernizing legacy applications.',
  },
  {
    slug: 'web-development',
    title: 'Web Application Development',
    short: 'Web apps, portals and websites engineered to scale.',
    icon: '❖',
    scene: 'browser',
    includes: ['Web Application Development', 'Web Portal Development', 'Website Development'],
    flow: ['HTML / CSS / JS', 'Frontend (React)', 'Backend', 'API', 'Database', 'Live Website'],
    detail:
      'From marketing websites to complex web portals and applications — responsive, fast and built on a maintainable frontend/backend architecture.',
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    short: 'Android, iOS and cross-platform apps from one codebase.',
    icon: '▤',
    scene: 'devices',
    includes: ['Android Development', 'iOS Development', 'Flutter Development', 'Cross-platform'],
    flow: ['Dart / Native', 'Flutter', 'Android', 'iOS', 'Backend + API', 'Database'],
    detail:
      'Native Android and iOS, or a single Flutter codebase across devices — connected to secure backends, APIs, authentication and payments where needed.',
  },
  {
    slug: 'ui-ux-design',
    title: 'UI / UX Design',
    short: 'Interfaces people understand and enjoy using.',
    icon: '◑',
    scene: 'design',
    includes: ['Wireframing', 'Prototyping', 'UI Design', 'Design Systems'],
    flow: ['Wireframe', 'Prototype', 'UI', 'Design System', 'Handoff to Code'],
    detail:
      'Research-led interface design — wireframes, prototypes, polished UI and reusable design systems that translate cleanly into code.',
  },
  {
    slug: 'it-consulting',
    title: 'IT Consulting & Audits',
    short: 'Assess, plan and modernize your technology.',
    icon: '◎',
    scene: 'audit',
    includes: ['IT Consulting', 'IT / Security Audits', 'Architecture Review'],
    flow: ['Discover', 'Analyze', 'Recommend', 'Implement'],
    detail:
      'We review systems, architecture and security posture, then recommend and help implement pragmatic improvements aligned to your goals.',
  },
  {
    slug: 'data-security',
    title: 'Data & Security',
    short: 'Move, protect and make sense of your data.',
    icon: '⛨',
    scene: 'network',
    includes: ['Data Migration', 'Data Solutions', 'Security Practices'],
    flow: ['User', 'Application', 'API', 'Server', 'Database'],
    detail:
      'Data migration and data solutions with security considered at every layer — from the client through APIs to the database.',
  },
  {
    slug: 'cloud-services',
    title: 'Cloud Services',
    short: 'Deploy and run software on modern cloud infrastructure.',
    icon: '☁',
    scene: 'cloud',
    includes: ['Cloud Deployment', 'Backend Infrastructure', 'CI/CD'],
    flow: ['Code', 'Build', 'Test', 'Cloud', 'Production'],
    detail:
      'We deploy and operate applications on cloud infrastructure with build and release pipelines for reliable, repeatable delivery.',
  },
  {
    slug: 'maintenance-support',
    title: 'Maintenance & Support',
    short: 'Keep software healthy, current and improving.',
    icon: '↻',
    scene: 'maintenance',
    includes: ['Maintenance', 'Customer Support', 'Optimization'],
    flow: ['Monitor', 'Maintain', 'Optimize', 'Update', 'Support'],
    detail:
      'Ongoing maintenance, updates, performance optimization and support so your product keeps running smoothly after launch.',
  },
];

export const getService = (slug) => services.find((s) => s.slug === slug);
