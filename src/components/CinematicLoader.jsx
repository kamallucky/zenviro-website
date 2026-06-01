import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Branded preloader: a seed sprouts into a leaf while a counter climbs 0 -> 100,
// then the whole panel "blooms" open to reveal the 3D world.
export default function CinematicLoader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const DURATION = 2400;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setGone(true);
          setTimeout(() => onDone?.(), 1100);
        }, 350);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  // leaf draws in as pct climbs
  const grow = pct / 100;

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, #0F3D1F 0%, #050D06 80%)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* bloom-open panels */}
          <motion.div
            className="absolute inset-0 origin-top"
            style={{ background: '#050D06', height: '50%' }}
            initial={{ scaleY: 1 }}
            animate={gone ? { scaleY: 0 } : { scaleY: 1 }}
          />

          {/* Seed -> sprout SVG */}
          <div className="relative" style={{ width: 140, height: 180 }}>
            <svg width="140" height="180" viewBox="0 0 140 180" fill="none">
              {/* stem */}
              <motion.path
                d="M70 175 C70 140 70 120 70 92"
                stroke="#639922"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{ pathLength: Math.min(1, grow * 1.4) }}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: Math.min(1, grow * 1.4) }}
              />
              {/* left leaf */}
              <motion.path
                d="M70 120 C45 118 28 100 30 78 C52 80 70 96 70 120 Z"
                fill="#1A5C2A"
                style={{ originX: '70px', originY: '110px' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: grow > 0.4 ? 1 : 0, opacity: grow > 0.4 ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              />
              {/* right leaf */}
              <motion.path
                d="M70 108 C95 104 114 84 110 60 C86 64 70 82 70 108 Z"
                fill="#639922"
                style={{ originX: '70px', originY: '95px' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: grow > 0.62 ? 1 : 0, opacity: grow > 0.62 ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              />
              {/* top bud */}
              <motion.circle
                cx="70" cy="60" r="9"
                fill="#EF9F27"
                initial={{ scale: 0 }}
                animate={{ scale: grow > 0.85 ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 160, damping: 12 }}
              />
              {/* seed at base */}
              <ellipse cx="70" cy="172" rx="10" ry="6" fill="#3a2a18" />
            </svg>
          </div>

          <div className="mt-6 text-center relative z-10">
            <div
              className="font-display font-black tracking-[0.35em] text-white text-lg"
              style={{ fontFamily: 'Fraunces, serif' }}
            >
              ZEN<span style={{ color: '#EF9F27' }}>VIRO</span>
            </div>
            <div className="mt-2 text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Cultivating the experience
            </div>
          </div>

          {/* progress bar */}
          <div className="mt-8 relative z-10" style={{ width: 220 }}>
            <div style={{ height: 2, background: 'rgba(255,255,255,0.12)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#639922,#EF9F27)', transition: 'width .1s linear' }} />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Loading</span>
              <span className="text-[10px] tracking-[0.2em] font-mono" style={{ color: '#EF9F27' }}>{pct} / 100</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
