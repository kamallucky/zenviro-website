import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, Languages, Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import { useLang } from '../i18n';
import { useTheme } from '../theme';

const NAV = [
  { key: 'home', to: '/' },
  { key: 'products', to: '/products' },
  { key: 'pricing', to: '/pricing' },
  { key: 'cropSolutions', to: '/#crop-solutions' },
  { key: 'catalog', to: '/catalog' },
  { key: 'safety', to: '/about#safety' },
  { key: 'about', to: '/about' },
  { key: 'contact', to: '/contact' },
];

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkCls = ({ isActive }) =>
    `rounded-full px-3 py-2 text-[0.82rem] font-semibold transition-colors ${
      isActive ? 'text-forest bg-forest/8' : 'text-[var(--text-soft)] hover:text-forest'
    }`;

  return (
    <header
      style={{ backgroundColor: scrolled ? 'var(--bg-nav)' : undefined, borderColor: 'var(--border-line)' }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b shadow-[0_4px_24px_-12px_rgb(23_33_28/0.18)] backdrop-blur-xl'
          : 'backdrop-blur-md'
      }`}
    >
      <nav aria-label="Main navigation" className="container-site flex h-[72px] items-center justify-between gap-4">
        <Link to="/" aria-label="Zenviro Agro Chemicals — home" onClick={closeMenu} className="shrink-0">
          <Logo className="h-12 sm:h-14" />
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) =>
            item.to.includes('#') ? (
              <Link key={item.key} to={item.to} style={{ color: 'var(--text-soft)' }} className="rounded-full px-3 py-2 text-[0.82rem] font-semibold transition-colors hover:text-forest">
                {t(item.key)}
              </Link>
            ) : (
              <NavLink key={item.key} to={item.to} className={linkCls} end={item.to === '/'}>
                {t(item.key)}
              </NavLink>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="hidden h-10 w-10 items-center justify-center rounded-full border transition-colors hover:border-leaf hover:text-forest sm:flex"
            style={{ borderColor: 'var(--border-line)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-soft)' }}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Sun className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={lang === 'en' ? 'తెలుగులో చూడండి (switch to Telugu)' : 'Switch to English'}
            className="hidden h-10 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition-colors hover:border-leaf hover:text-forest sm:flex"
            style={{ borderColor: 'var(--border-line)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-soft)' }}
          >
            <Languages className="h-4 w-4" aria-hidden="true" />
            {lang === 'en' ? 'తెలుగు' : 'EN'}
          </button>
          <Link to="/contact?type=dealer" id="contact-sales" className="btn-primary hidden !px-5 !py-2.5 text-[0.8rem] md:inline-flex">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {t('getDealerPrice')}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center rounded-full border text-forest lg:hidden"
            style={{ borderColor: 'var(--border-line)', backgroundColor: 'var(--bg-surface)' }}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t backdrop-blur-xl lg:hidden" style={{ borderColor: 'var(--border-line)', backgroundColor: 'var(--bg-nav-mobile)' }}>
          <div className="container-site flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-[0.95rem] font-semibold hover:bg-forest/6 hover:text-forest"
                style={{ color: 'var(--text-body)' }}
              >
                {t(item.key)}
              </Link>
            ))}
            <div className="mt-3 flex items-center gap-2 border-t pt-4" style={{ borderColor: 'var(--border-line)' }}>
              <Link to="/contact?type=dealer" onClick={closeMenu} className="btn-primary flex-1 text-sm">
                {t('getDealerPrice')}
              </Link>
              <button
                type="button"
                onClick={toggle}
                aria-label={lang === 'en' ? 'తెలుగులో చూడండి (switch to Telugu)' : 'Switch to English'}
                className="flex h-12 items-center gap-1.5 rounded-full border px-4 text-xs font-bold"
                style={{ borderColor: 'var(--border-line)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-soft)' }}
              >
                <Languages className="h-4 w-4" aria-hidden="true" />
                {lang === 'en' ? 'తెలుగు' : 'EN'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
