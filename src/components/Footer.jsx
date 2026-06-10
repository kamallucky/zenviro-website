import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, FileDown } from 'lucide-react';
import Logo from './Logo';
import { COMPANY, DISCLAIMERS, DOWNLOADS, telHref, mailHref, mapsHref } from '../config/company';
import { categories } from '../data/products';

const QUICK_LINKS = [
  { label: 'Products', to: '/products' },
  { label: 'Price List', to: '/pricing' },
  { label: 'Catalog', to: '/catalog' },
  { label: 'About Us', to: '/about' },
  { label: 'Safety & Responsible Use', to: '/about#safety' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-cream">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:py-20">
        <div className="flex flex-col gap-5">
          <Logo variant="light" className="h-20" />
          <p className="max-w-xs text-sm leading-relaxed text-cream/70">
            {COMPANY.tagline}. Supporting farmers, dealers and distributors with a reliable
            range of crop nutrition and crop protection products.
          </p>
          <p lang="te" className="font-telugu text-sm text-cream/60">{COMPANY.taglineTelugu}</p>
          <div className="flex flex-wrap gap-2">
            <a href={DOWNLOADS.catalog} download data-analytics="download-catalog" className="btn-light !px-4 !py-2 text-xs">
              <FileDown className="h-4 w-4" aria-hidden="true" /> Product Catalog
            </a>
            <a href={DOWNLOADS.priceList} download data-analytics="download-price-list" className="btn-light !px-4 !py-2 text-xs">
              <FileDown className="h-4 w-4" aria-hidden="true" /> Price List
            </a>
          </div>
        </div>

        <nav aria-label="Product lines">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-gold-soft">Product Lines</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/products?category=${c.id}`} className="text-cream/75 transition-colors hover:text-gold-soft">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/catalog" className="text-cream/75 transition-colors hover:text-gold-soft">
                Micronutrients & Biostimulants
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Quick links">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-gold-soft">Quick Links</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-cream/75 transition-colors hover:text-gold-soft">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic">
          <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-gold-soft">Contact</h3>
          <ul className="flex flex-col gap-4 text-sm text-cream/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" aria-hidden="true" />
              <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="hover:text-gold-soft">
                {COMPANY.address.line1},<br />
                {COMPANY.address.line2}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" aria-hidden="true" />
              <span className="flex flex-col gap-1">
                {COMPANY.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="hover:text-gold-soft">
                    {p}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-soft" aria-hidden="true" />
              <a href={mailHref()} className="break-all hover:text-gold-soft">
                {COMPANY.email}
              </a>
            </li>
          </ul>
          <p className="mt-5 rounded-lg bg-white/5 px-3 py-2 text-xs tracking-wide text-cream/60">
            GST: <span className="font-semibold text-cream/85">{COMPANY.gst}</span>
          </p>
        </address>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs leading-relaxed text-cream/55">
          <p>{DISCLAIMERS.price} {DISCLAIMERS.safety}</p>
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
