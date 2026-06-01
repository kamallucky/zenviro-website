import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    // Use Lenis if present so the smooth-scroll engine stays in sync.
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <AnimatePresence mode="wait">
        {/* IMPORTANT: opacity-only transition — a transform here would create a
            containing block and break the home page's `position: fixed` 3D canvas. */}
        <motion.main
          key={location.pathname}
          id="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {/* Home is a self-contained immersive experience with its own finale — hide the
          standard footer there so the scroll-progress mapping stays clean. */}
      {!isHome && <Footer />}
      {location.pathname !== '/contact' && !isHome && <WhatsAppButton />}
    </>
  );
}
