import { useEffect } from 'react';
import Lenis from 'lenis';
import { scrollState } from './scrollStore';

// Wraps the app with Lenis smooth scrolling and continuously updates the
// module-level scrollState that the 3D scene reads from.
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: reduce ? 0 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduce,
      syncTouch: false,
      touchMultiplier: 1.5,
    });

    function onScroll({ scroll, limit, velocity }) {
      scrollState.raw = scroll;
      scrollState.max = Math.max(1, limit);
      scrollState.progress = Math.min(1, Math.max(0, scroll / Math.max(1, limit)));
      scrollState.velocity = velocity;
    }
    lenis.on('scroll', onScroll);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // pointer for parallax
    function onPointer(e) {
      scrollState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener('pointermove', onPointer);

    // expose for anchor scrolling
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointer);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
}
