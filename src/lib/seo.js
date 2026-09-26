import { useEffect } from 'react';

const BASE = 'KVK M SOLUTIONS';

/** Lightweight per-page SEO — sets <title> and meta description without a dep. */
export function useSeo({ title, description }) {
  useEffect(() => {
    const full = title ? `${title} — ${BASE}` : `${BASE} — Software Development & Digital Solutions`;
    document.title = full;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) {
        m = document.createElement('meta');
        m.setAttribute('name', 'description');
        document.head.appendChild(m);
      }
      m.setAttribute('content', description);
    }
    let og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute('content', full);
  }, [title, description]);
}
