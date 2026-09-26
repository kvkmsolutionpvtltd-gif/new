/**
 * Technologies — EDIT HERE. List only tools the company actually uses.
 * Remove anything not offered; add verified ones.
 */
export const techCategories = [
  { group: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'HTML / CSS'] },
  { group: 'Mobile', items: ['Flutter', 'Android', 'iOS', 'React Native'] },
  { group: 'Backend', items: ['Node.js', 'PHP', 'REST APIs'] },
  { group: 'Database', items: ['SQL', 'Firebase'] },
  { group: 'Cloud & DevOps', items: ['Cloud Hosting', 'CI/CD', 'Git'] },
  { group: 'Design', items: ['Figma', 'Photoshop', 'Canva'] },
];

export const techMeta = {
  React: { what: 'Component-based UI library', fits: 'Web frontends & dashboards', connects: 'Talks to APIs, renders UI' },
  Flutter: { what: 'Single codebase, many devices', fits: 'Cross-platform mobile', connects: 'Backends via REST/Firebase' },
  'Node.js': { what: 'JavaScript server runtime', fits: 'APIs & business logic', connects: 'Sits between apps and the database' },
  SQL: { what: 'Relational data storage', fits: 'Structured records', connects: 'Queried by the API layer' },
  Firebase: { what: 'App backend services', fits: 'Auth, realtime data', connects: 'Directly to mobile & web apps' },
};
