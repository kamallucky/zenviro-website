import { useEffect, useRef, useState } from 'react';

// A bespoke glowing leaf/seed cursor that grows on interactive hovers.
// Disabled on touch devices and when reduced-motion is requested.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reduce) return;
    setEnabled(true);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };

    function onMove(e) {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      const el = e.target;
      const interactive = el.closest('a, button, [data-cursor="grow"], input, textarea, select');
      setHovering(!!interactive);
    }

    let raf;
    function loop() {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    window.addEventListener('pointermove', onMove);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99999, pointerEvents: 'none',
          marginLeft: -4, marginTop: -4, width: 8, height: 8, borderRadius: '50%',
          background: '#EF9F27',
          boxShadow: '0 0 12px rgba(239,159,39,0.9)',
          transition: 'width .25s, height .25s, opacity .25s',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0, zIndex: 99998, pointerEvents: 'none',
          marginLeft: hovering ? -26 : -18, marginTop: hovering ? -26 : -18,
          width: hovering ? 52 : 36, height: hovering ? 52 : 36,
          borderRadius: '50%',
          border: `1.5px solid rgba(239,159,39,${hovering ? 0.9 : 0.5})`,
          background: hovering ? 'rgba(239,159,39,0.08)' : 'transparent',
          transition: 'width .25s, height .25s, margin .25s, border-color .25s, background .25s',
        }}
      />
    </>
  );
}
