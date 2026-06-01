import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Phone, Sparkles, MapPin, ShieldCheck, Bug, Leaf, ChevronDown,
} from 'lucide-react';
import CinematicLoader from '../components/CinematicLoader';
import { scrollState, ACTS } from '../three/scrollStore';

const Experience = lazy(() => import('../three/Experience'));

const WHATSAPP = 'https://wa.me/919347959693';
const PHONE = '+91 93479 59693';

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const ACT_LABELS = ['Welcome', 'Protection', 'Products', 'Crops', 'Reach', 'Connect'];

function Scrim({ side = 'left' }) {
  const dir = side === 'left' ? 'to right' : side === 'right' ? 'to left' : 'to top';
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: `linear-gradient(${dir}, rgba(5,13,6,0.72) 0%, rgba(5,13,6,0.35) 40%, transparent 70%)` }}
    />
  );
}

function Eyebrow({ children, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="h-px w-8" style={{ background: 'var(--gold)' }} />
      {Icon && <Icon size={15} style={{ color: 'var(--gold)' }} />}
      <span className="text-[11px] font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>
        {children}
      </span>
    </div>
  );
}

export default function Home() {
  const [ready, setReady] = useState(false);
  const [act, setAct] = useState(0);
  const [quality] = useState(() => {
    if (typeof window === 'undefined') return 'high';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return window.innerWidth < 820 || reduce ? 'low' : 'high';
  });
  const actRef = useRef(0);

  // track active act for the side navigator
  useEffect(() => {
    let raf;
    const loop = () => {
      const p = scrollState.progress;
      let idx = ACTS.findIndex((a) => p >= a.start && p < a.end);
      if (idx === -1) idx = p >= 1 ? ACTS.length - 1 : 0;
      if (idx !== actRef.current) {
        actRef.current = idx;
        setAct(idx);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const goTo = (i) => {
    const target = (i / ACTS.length) * (document.documentElement.scrollHeight - window.innerHeight) + 10;
    window.__lenis ? window.__lenis.scrollTo(target) : window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <div className="relative" style={{ background: '#050D06' }}>
      {!ready && <CinematicLoader onDone={() => setReady(true)} />}

      {/* Fixed 3D world */}
      <Suspense fallback={null}>
        <Experience quality={quality} />
      </Suspense>

      {/* readability base tint over canvas */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1, background: 'radial-gradient(ellipse at 50% 120%, rgba(5,13,6,0.35), transparent 60%)' }} />

      {/* Side act navigator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-4">
        {ACTS.map((a, i) => (
          <button
            key={a.id}
            onClick={() => goTo(i)}
            className="group flex items-center gap-3 justify-end"
            aria-label={`Go to ${ACT_LABELS[i]}`}
          >
            <span
              className="text-[10px] tracking-[0.2em] uppercase transition-opacity"
              style={{ color: 'var(--gold)', opacity: act === i ? 1 : 0 }}
            >
              {String(i + 1).padStart(2, '0')} {ACT_LABELS[i]}
            </span>
            <span
              className="rounded-full transition-all"
              style={{
                width: act === i ? 11 : 7, height: act === i ? 11 : 7,
                background: act === i ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
                boxShadow: act === i ? '0 0 12px rgba(239,159,39,0.8)' : 'none',
              }}
            />
          </button>
        ))}
      </div>

      {/* ════════ OVERLAY ACTS ════════ */}
      <div className="relative" style={{ zIndex: 10 }}>

        {/* ACT 01 — HERO */}
        <section className="relative min-h-[120vh] flex items-center">
          <Scrim side="left" />
          <div className="relative max-w-7xl mx-auto px-8 w-full">
            <motion.div initial="hidden" animate={ready ? 'show' : 'hidden'} variants={reveal} className="max-w-2xl">
              <Eyebrow>Zenviro Agro Chemicals</Eyebrow>
              <h1 className="font-display font-black text-white leading-[1.02]"
                style={{ fontSize: 'clamp(48px, 7vw, 92px)', textShadow: '0 4px 40px rgba(0,0,0,0.6)' }}>
                Science for the Soil.<br />
                <span style={{ color: 'var(--gold)' }}>Strength</span> for the Farmer.
              </h1>
              <p className="mt-7 text-lg max-w-md" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Hyderabad's trusted crop-protection partner — guarding harvests across
                10 districts of Telangana.
              </p>
              <p className="mt-3 font-telugu text-base" style={{ color: 'var(--gold-soft)' }}>
                ప్రతి పంటను కాపాడుతూ — ప్రతి రైతుకు అండగా
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href={WHATSAPP} target="_blank" rel="noreferrer"
                  className="btn-gold px-8 py-4 rounded-lg text-sm tracking-wide uppercase font-semibold inline-flex items-center gap-2">
                  Talk to an Expert <ArrowRight size={16} />
                </a>
                <Link to="/products"
                  className="btn-outline-white px-8 py-4 rounded-lg text-sm tracking-wide uppercase inline-flex items-center gap-2">
                  Explore Products
                </Link>
              </div>
            </motion.div>
          </div>
          {/* scroll cue */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>Scroll</span>
            <ChevronDown size={18} style={{ color: 'var(--gold)' }} />
          </motion.div>
        </section>

        {/* ACT 02 — THREAT & PROTECTION */}
        <section className="relative min-h-[120vh] flex items-end pb-28">
          <Scrim side="bottom" />
          <div className="relative max-w-7xl mx-auto px-8 w-full">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={reveal} className="max-w-xl">
              <Eyebrow icon={Bug}>The Threat → The Protection</Eyebrow>
              <h2 className="font-display font-black text-white leading-[1.05]" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)' }}>
                When pests attack,<br /><span style={{ color: 'var(--gold)' }}>Block Rock</span> answers.
              </h2>
              <p className="mt-6 text-base max-w-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Thrips, whitefly and sucking pests swarm the chilli crop. Block Rock's
                systemic action moves through the whole plant — from root to leaf-tip —
                so protection works where contact sprays can't reach. Watch the pests flee.
              </p>
              <div className="mt-8 flex gap-8">
                {[['2–4h', 'Fast action'], ['3 wks', 'Long protection'], ['Systemic', 'Whole-plant']].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display font-black text-2xl" style={{ color: 'var(--gold)' }}>{n}</div>
                    <div className="text-[11px] tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ACT 03 — PRODUCTS */}
        <section className="relative min-h-[120vh] flex items-center justify-end">
          <Scrim side="right" />
          <div className="relative max-w-7xl mx-auto px-8 w-full flex justify-end">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={reveal} className="max-w-xl text-right">
              <div className="flex items-center gap-3 mb-5 justify-end">
                <span className="text-[11px] font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>Our Range</span>
                <Leaf size={15} style={{ color: 'var(--gold)' }} />
                <span className="h-px w-8" style={{ background: 'var(--gold)' }} />
              </div>
              <h2 className="font-display font-black text-white leading-[1.05]" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)' }}>
                16 Products.<br /><span style={{ color: 'var(--gold)' }}>6 Complete</span> Ranges.
              </h2>
              <p className="mt-6 text-base ml-auto max-w-md" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Insecticides, fungicides, herbicides, plant-growth promoters, micronutrients
                and biostimulants — a complete portfolio engineered for Telangana's key crops.
              </p>
              <div className="mt-7 flex flex-wrap gap-2 justify-end">
                {['Insecticides', 'Fungicides', 'Herbicides', 'Plant Growth', 'Micronutrients', 'Biostimulants'].map((c) => (
                  <span key={c} className="px-4 py-2 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(239,159,39,0.35)', color: 'rgba(255,255,255,0.9)' }}>
                    {c}
                  </span>
                ))}
              </div>
              <Link to="/products" className="btn-gold mt-8 px-8 py-4 rounded-lg text-sm tracking-wide uppercase font-semibold inline-flex items-center gap-2">
                Explore All Products <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ACT 04 — CROP FINDER */}
        <section className="relative min-h-[120vh] flex items-end pb-28 justify-center text-center">
          <Scrim side="bottom" />
          <div className="relative max-w-3xl mx-auto px-8 w-full">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={reveal}>
              <div className="flex items-center gap-3 mb-5 justify-center">
                <span className="h-px w-8" style={{ background: 'var(--gold)' }} />
                <Sparkles size={15} style={{ color: 'var(--gold)' }} />
                <span className="text-[11px] font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>Crop Finder</span>
                <span className="h-px w-8" style={{ background: 'var(--gold)' }} />
              </div>
              <h2 className="font-display font-black text-white leading-[1.05]" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)' }}>
                The right solution for<br /><span style={{ color: 'var(--gold)' }}>every crop.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                {['Rice & Paddy', 'Chilli', 'Cotton', 'Vegetables', 'Fruits', 'Flowers'].map((c) => (
                  <span key={c} className="px-5 py-2.5 rounded-full text-sm font-medium"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(239,159,39,0.35)', color: '#fff' }}>
                    {c}
                  </span>
                ))}
              </div>
              <Link to="/crop-finder" className="btn-gold mt-9 px-8 py-4 rounded-lg text-sm tracking-wide uppercase font-semibold inline-flex items-center gap-2">
                Find Your Solution <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ACT 05 — REACH */}
        <section className="relative min-h-[120vh] flex items-center">
          <Scrim side="left" />
          <div className="relative max-w-7xl mx-auto px-8 w-full">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={reveal} className="max-w-xl">
              <Eyebrow icon={MapPin}>Our Reach</Eyebrow>
              <h2 className="font-display font-black text-white leading-[1.05]" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)' }}>
                Rooted in Telangana.<br /><span style={{ color: 'var(--gold)' }}>Growing</span> everywhere.
              </h2>
              <p className="mt-6 text-base max-w-md" style={{ color: 'rgba(255,255,255,0.75)' }}>
                From our base in Injapur, Rangareddy — we serve farmers across 10 districts
                with fast delivery, expert agronomy advice and trusted products.
              </p>
              <div className="mt-9 flex gap-10">
                {[['10', 'Districts'], ['500+', 'Farmers'], ['24h', 'Response']].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display font-black text-4xl" style={{ color: 'var(--gold)' }}>{n}</div>
                    <div className="text-[11px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ACT 06 — FINALE / CONTACT */}
        <section className="relative min-h-[110vh] flex items-center justify-center text-center">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(5,13,6,0.6), rgba(5,13,6,0.85))' }} />
          <div className="relative max-w-3xl mx-auto px-8 w-full">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.4 }} variants={reveal}>
              <div className="flex items-center gap-3 mb-5 justify-center">
                <span className="h-px w-8" style={{ background: 'var(--gold)' }} />
                <ShieldCheck size={15} style={{ color: 'var(--gold)' }} />
                <span className="text-[11px] font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>Get In Touch</span>
                <span className="h-px w-8" style={{ background: 'var(--gold)' }} />
              </div>
              <h2 className="font-display font-black text-white leading-[1.03]" style={{ fontSize: 'clamp(44px, 6vw, 80px)' }}>
                Ready to protect<br /><span style={{ color: 'var(--gold)' }}>your harvest?</span>
              </h2>
              <p className="mt-6 text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Tell us your crop and your problem — we'll recommend the right solution.
              </p>
              <div className="mt-9 flex flex-wrap gap-4 justify-center">
                <a href="tel:+919347959693" className="btn-gold px-8 py-4 rounded-lg text-sm tracking-wide uppercase font-semibold inline-flex items-center gap-2">
                  <Phone size={16} /> {PHONE}
                </a>
                <a href={WHATSAPP} target="_blank" rel="noreferrer"
                  className="px-8 py-4 rounded-lg text-sm tracking-wide uppercase font-semibold inline-flex items-center gap-2 text-white"
                  style={{ background: 'linear-gradient(135deg,#25D366,#1da851)' }}>
                  WhatsApp Us
                </a>
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <span>CIB Registered</span><span>·</span>
                <span>Telangana State Licensed</span><span>·</span>
                <span>ISO Quality Assured</span>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
