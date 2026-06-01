import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, ChevronRight, Home, Package, Sparkles, Info, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const navLinks = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/products', label: 'Products', Icon: Package },
  { to: '/crop-finder', label: 'Crop Finder', Icon: Sparkles },
  { to: '/about', label: 'About', Icon: Info },
  { to: '/contact', label: 'Contact', Icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // The home page is a dark immersive 3D world — keep the nav dark/transparent
  // across the whole journey. Inner (light) pages flip to the solid theme on scroll.
  const isDarkTheme = isHome ? true : !scrolled;

  return (
    <>
      {/* Top accent gradient bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1"
        style={{ background: 'linear-gradient(90deg, var(--green-leaf) 0%, var(--gold) 50%, var(--green-leaf) 100%)' }}
      />

      {/* Main navbar — taller, more spacious */}
      <header
        className="fixed left-0 right-0 z-50 transition-all duration-500"
        style={{
          top: '4px',
          background: isDarkTheme
            ? 'linear-gradient(180deg, rgba(15,61,31,0.95) 0%, rgba(15,61,31,0.75) 100%)'
            : 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: isDarkTheme ? 'none' : '0 8px 32px rgba(15,61,31,0.1)',
          borderBottom: isDarkTheme ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(15,61,31,0.06)',
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-[84px] flex items-center justify-between">

          {/* Logo */}
          <Link to="/" aria-label="Zenviro Agro Chemicals — home" className="flex-shrink-0">
            <Logo dark={!isDarkTheme} />
          </Link>

          {/* Desktop nav — generous spacing, each item is its own button */}
          <div
            className="hidden lg:flex items-center gap-1 flex-1 justify-center"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map(({ to, label, Icon }) => {
              const isActive = to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(to);
              const isHovered = hoveredLink === to;

              return (
                <Link
                  key={to}
                  to={to}
                  onMouseEnter={() => setHoveredLink(to)}
                  className="relative px-6 py-3 group"
                >
                  {/* Hover background — slides in */}
                  {isHovered && !isActive && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-2xl -z-10"
                      style={{
                        background: isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(26,92,42,0.06)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Active background — bold pill */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-2xl -z-10"
                      style={{
                        background: isDarkTheme
                          ? 'linear-gradient(135deg, #EF9F27 0%, #d4891a 100%)'
                          : 'linear-gradient(135deg, var(--green-mid) 0%, var(--green-deep) 100%)',
                        boxShadow: isDarkTheme
                          ? '0 8px 24px rgba(239,159,39,0.45), inset 0 1px 0 rgba(255,255,255,0.2)'
                          : '0 8px 24px rgba(26,92,42,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Link content */}
                  <span className="relative flex items-center gap-2.5">
                    <Icon
                      size={16}
                      strokeWidth={2.2}
                      style={{
                        color: isActive
                          ? (isDarkTheme ? 'var(--green-deep)' : '#FFFFFF')
                          : (isDarkTheme ? 'rgba(255,255,255,0.9)' : 'var(--green-mid)'),
                      }}
                      className="transition-colors"
                    />
                    <span
                      className="text-[15px] font-bold tracking-tight transition-colors"
                      style={{
                        color: isActive
                          ? (isDarkTheme ? 'var(--green-deep)' : '#FFFFFF')
                          : (isDarkTheme ? 'rgba(255,255,255,0.92)' : 'var(--ink)'),
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {label}
                    </span>
                  </span>

                  {/* Active gold dot below */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-1.5 h-1.5 rounded-full"
                      style={{
                        background: isDarkTheme ? '#FFFFFF' : 'var(--gold)',
                        boxShadow: isDarkTheme
                          ? '0 0 8px rgba(255,255,255,0.6)'
                          : '0 0 8px rgba(239,159,39,0.6)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side — Phone + WhatsApp */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:+919347959693"
              className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: isDarkTheme ? 'rgba(255,255,255,0.06)' : 'rgba(26,92,42,0.05)',
                border: isDarkTheme ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(26,92,42,0.1)',
              }}
            >
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{
                  background: isDarkTheme
                    ? 'linear-gradient(135deg, rgba(239,159,39,0.2) 0%, rgba(239,159,39,0.1) 100%)'
                    : 'linear-gradient(135deg, var(--green-mid) 0%, var(--green-deep) 100%)',
                  boxShadow: isDarkTheme ? 'none' : '0 4px 10px rgba(26,92,42,0.25)',
                }}
              >
                <Phone size={15} style={{ color: isDarkTheme ? 'var(--gold)' : '#FFFFFF' }} strokeWidth={2.5} />
              </span>
              <span className="hidden xl:flex flex-col leading-tight">
                <span className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: isDarkTheme ? 'rgba(255,255,255,0.55)' : 'var(--ink-soft)' }}>
                  Call us
                </span>
                <span className="text-sm font-bold tabular-nums"
                  style={{ color: isDarkTheme ? '#FFFFFF' : 'var(--green-deep)' }}>
                  +91 93479 59693
                </span>
              </span>
            </a>
            <a
              href="https://wa.me/919347959693?text=Hi%2C%20I%27m%20interested%20in%20Zenviro%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #1da851 100%)',
                boxShadow: '0 8px 20px rgba(37,211,102,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              <MessageCircle size={16} strokeWidth={2.5} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-3 rounded-2xl transition-colors flex items-center justify-center"
            style={{
              color: isDarkTheme ? '#FFFFFF' : 'var(--green-deep)',
              background: isDarkTheme ? 'rgba(255,255,255,0.1)' : 'rgba(26,92,42,0.06)',
              border: isDarkTheme ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(26,92,42,0.08)',
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(15,61,31,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 z-40 w-full sm:max-w-md lg:hidden flex flex-col"
              style={{
                background: 'linear-gradient(180deg, var(--green-deep) 0%, #0a2a14 100%)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.3)',
              }}
            >
              <div className="h-1"
                style={{ background: 'linear-gradient(90deg, var(--green-leaf) 0%, var(--gold) 50%, var(--green-leaf) 100%)' }} />
              <div className="flex flex-col h-full px-7 pt-24 pb-10 overflow-y-auto">
                <nav className="flex flex-col gap-2 flex-1">
                  {navLinks.map(({ to, label, Icon }, i) => {
                    const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
                    return (
                      <motion.div
                        key={to}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                      >
                        <Link
                          to={to}
                          className="flex items-center justify-between py-4 px-5 rounded-2xl text-lg font-display font-semibold transition-all duration-300"
                          style={{
                            background: isActive
                              ? 'linear-gradient(135deg, rgba(239,159,39,0.2) 0%, rgba(239,159,39,0.08) 100%)'
                              : 'rgba(255,255,255,0.04)',
                            color: isActive ? 'var(--gold)' : 'rgba(255,255,255,0.85)',
                            border: isActive ? '1px solid rgba(239,159,39,0.35)' : '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          <span className="flex items-center gap-3">
                            <Icon size={18} />
                            {label}
                          </span>
                          <ChevronRight size={18} style={{ opacity: isActive ? 1 : 0.4 }} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col gap-3 pt-8 mt-8 border-t border-white/10"
                >
                  <a
                    href="tel:+919347959693"
                    className="flex items-center justify-center gap-3 py-4 rounded-2xl text-base font-bold transition-all hover:-translate-y-0.5"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    <Phone size={18} />
                    +91 93479 59693
                  </a>
                  <a
                    href="https://wa.me/919347959693?text=Hi%2C%20I%27m%20interested%20in%20Zenviro%20products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 py-4 rounded-2xl text-base font-bold text-white transition-all hover:-translate-y-0.5"
                    style={{
                      background: 'linear-gradient(135deg, #25D366 0%, #1da851 100%)',
                      boxShadow: '0 6px 20px rgba(37,211,102,0.4)',
                    }}
                  >
                    <MessageCircle size={20} />
                    Chat on WhatsApp
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
