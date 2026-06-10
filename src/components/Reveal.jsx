import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Scroll-reveal wrapper: gentle rise + fade, fired once per element.
// Falls back to visible if IntersectionObserver never reports (e.g. headless
// renderers or embedded webviews), so content is never stuck hidden.
export default function Reveal({ children, delay = 0, y = 28, className, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        },
        { rootMargin: '-60px' },
      );
      io.observe(el);
    }
    // safety net: if the element is geometrically in view but the observer
    // hasn't reported it (frozen frames, odd webviews), reveal it anyway
    const fallback = setTimeout(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (!io || (r.top < vh && r.bottom > 0)) setShown(true);
    }, 1400);
    return () => {
      io?.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.65, 0.32, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
