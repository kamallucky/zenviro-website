import { useEffect } from 'react';
import { SITE_URL } from '../config/company';

// Per-page SEO: title, description, canonical and optional JSON-LD.
export default function Seo({ title, description, path = '/', jsonLd }) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE_URL}${path}`;

    let script;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      script.dataset.page = 'true';
      document.head.appendChild(script);
    }
    return () => {
      if (script) script.remove();
    };
  }, [title, description, path, jsonLd]);

  return null;
}
