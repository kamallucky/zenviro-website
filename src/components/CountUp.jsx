import { useEffect, useRef, useState } from 'react';

// Animates the numeric part of values like "22+" or "8+" when scrolled into
// view; non-numeric values ("B2B") render as-is. Uses the same geometry
// fallback as Reveal so numbers never stay stuck at 0.
export default function CountUp({ value, duration = 1.6, className }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';
  const ref = useRef(null);
  const started = useRef(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (target === null) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            run();
            io.disconnect();
          }
        },
        { rootMargin: '-40px' },
      );
      io.observe(el);
    }
    const fallback = setTimeout(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (!io || (r.top < vh && r.bottom > 0)) run();
    }, 1400);
    return () => {
      io?.disconnect();
      clearTimeout(fallback);
    };
  }, [target, duration]);

  if (target === null) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}
