import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Users, Package, Layers, MapPin,
  Bug, Microscope, Sprout, TrendingUp, Atom, Leaf,
  Award, Target, ShieldCheck, HandHeart, Globe,
  ShieldAlert, Hand, Baby, Ban, Recycle,
  Star, CheckCircle, XCircle, MessageCircle, Zap,
} from 'lucide-react';
import ProductBottle from '../components/ProductBottle';
import FeaturedShowcase from '../components/FeaturedShowcase';
import TelanganaSection from '../components/TelanganaSection';
import { products } from '../data/products';

const blockRock = products.find(p => p.id === 'block-rock');

// ── HERO SECTION ─────────────────────────────────────────────────────
function HeroSection() {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="hero-field min-h-[100vh] flex items-center relative pt-20 pb-16">
      {/* Field rows SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="field" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(22)">
            <line x1="0" y1="0" x2="0" y2="80" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
          </pattern>
          <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(99,153,34,0.18)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#field)"/>
        <ellipse cx="20%" cy="80%" rx="40%" ry="35%" fill="url(#heroGlow)" />
      </svg>

      {/* Animated sun — slowly rotating with breathing glow */}
      <div className="absolute top-20 right-20 w-44 h-44 pointer-events-none hidden lg:block">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full pulse-glow"
            style={{ background: 'radial-gradient(circle, rgba(239,159,39,0.45) 0%, transparent 70%)' }} />
          <svg viewBox="0 0 120 120" className="w-full h-full slow-rotate">
            <circle cx="60" cy="60" r="28" fill="#EF9F27" opacity="0.92"/>
            <circle cx="60" cy="60" r="36" fill="none" stroke="#EF9F27" strokeWidth="1.5" opacity="0.35" strokeDasharray="6 4"/>
            <circle cx="60" cy="60" r="48" fill="none" stroke="#EF9F27" strokeWidth="1" opacity="0.18" strokeDasharray="3 6"/>
            {[0,30,60,90,120,150,180,210,240,270,300,330].map(angle => (
              <line
                key={angle}
                x1={60 + 40 * Math.cos(angle * Math.PI/180)}
                y1={60 + 40 * Math.sin(angle * Math.PI/180)}
                x2={60 + 54 * Math.cos(angle * Math.PI/180)}
                y2={60 + 54 * Math.sin(angle * Math.PI/180)}
                stroke="#EF9F27"
                strokeWidth={angle % 60 === 0 ? 3 : 2}
                strokeLinecap="round"
                opacity={angle % 60 === 0 ? 0.85 : 0.5}
              />
            ))}
          </svg>
          {/* Center glow that doesn't rotate */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)' }} />
        </div>
      </div>

      {/* Floating decorative orb — adds depth */}
      <div className="absolute top-1/3 left-10 w-32 h-32 rounded-full pointer-events-none hidden lg:block spotlight-anim"
        style={{ background: 'radial-gradient(circle, rgba(99,153,34,0.25) 0%, transparent 70%)' }} />
      <div className="absolute bottom-32 right-1/3 w-40 h-40 rounded-full pointer-events-none hidden lg:block spotlight-anim"
        style={{ background: 'radial-gradient(circle, rgba(239,159,39,0.18) 0%, transparent 70%)', animationDelay: '4s' }} />

      {/* Floating leaves */}
      {[
        { x: '7%', delay: 0, size: 26, opacity: 0.5 },
        { x: '14%', delay: 2, size: 18, opacity: 0.4 },
        { x: '88%', delay: 1, size: 22, opacity: 0.45 },
        { x: '94%', delay: 3, size: 16, opacity: 0.35 },
      ].map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: leaf.x, bottom: '20%', color: '#639922', opacity: leaf.opacity }}
          animate={{ y: [0, -50, -100], rotate: [0, 30, 60], opacity: [leaf.opacity, leaf.opacity * 0.6, 0] }}
          transition={{ duration: 5 + i, delay: leaf.delay, repeat: Infinity, repeatDelay: 1.5 }}
        >
          <Leaf size={leaf.size} />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 w-full">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-bold mb-8"
              style={{
                background: 'rgba(239,159,39,0.15)',
                color: '#F5C77E',
                border: '1px solid rgba(239,159,39,0.3)',
                backdropFilter: 'blur(8px)',
              }}>
              <Leaf size={14} style={{ color: 'var(--gold)' }} />
              <span className="tracking-wide">Trusted by 500+ Telangana Farmers</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(44px, 7vw, 84px)', letterSpacing: '-0.025em', lineHeight: 1.02 }}
            >
              Nurturing Crops.
              <br />
              <span style={{ color: 'var(--gold)' }}>Protecting Futures.</span>
            </motion.h1>

            {/* Sub headline */}
            <motion.p
              variants={itemVariants}
              className="mt-8 text-lg sm:text-xl"
              style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '520px', lineHeight: 1.75 }}
            >
              Premium agro solutions crafted for Telangana farmers — from powerful crop protection to precision plant nutrition.
            </motion.p>

            {/* Telugu tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-5 text-2xl font-semibold font-telugu"
              style={{ color: 'var(--gold)' }}
            >
              మొక్కకు రక్షణ | పంటకు భరోసా
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-10 justify-center lg:justify-start">
              <Link
                to="/products"
                className="btn-gold flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base"
              >
                Explore Products
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/919347959693?text=Hi%2C%20I%27m%20interested%20in%20Zenviro%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
            </motion.div>

            {/* Quick stats */}
            <motion.div variants={itemVariants}
              className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              {[
                { value: '500+', label: 'Farmers' },
                { value: '16', label: 'Products' },
                { value: '6', label: 'Categories' },
              ].map(s => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="font-display font-bold text-2xl text-white">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Block Rock bottle — cinematic with 3D depth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="flex items-center justify-center relative hidden lg:flex"
          >
            {/* Spotlight rays behind bottle */}
            <div className="absolute w-[420px] h-[420px] rounded-full slow-rotate opacity-20"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(239,159,39,0.5), transparent, rgba(99,153,34,0.4), transparent, rgba(239,159,39,0.5), transparent)',
              }} />

            {/* Glow ring */}
            <div className="absolute w-96 h-96 rounded-full pulse-glow" style={{
              background: 'radial-gradient(circle, rgba(239,159,39,0.35) 0%, transparent 65%)'
            }} />

            {/* Bottle with 3D hover effect */}
            <motion.div
              className="relative z-10 bottle-3d"
              animate={{
                rotateY: [0, 4, 0, -4, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ProductBottle product={blockRock} size="xl" floating />
            </motion.div>

            {/* Orbiting feature badges */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-72 h-72">
                {[
                  { label: 'Fast Action', Icon: Zap, class: 'orbit-1', color: '#EF9F27' },
                  { label: 'Max Protection', Icon: ShieldCheck, class: 'orbit-2', color: '#1A5C2A' },
                  { label: 'Eco Safe', Icon: Leaf, class: 'orbit-3', color: '#639922' },
                ].map(({ label, Icon, class: orbitClass, color }) => (
                  <div key={label} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${orbitClass}`}>
                    <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold text-white shadow-xl whitespace-nowrap"
                      style={{ background: color, boxShadow: `0 6px 16px ${color}66` }}>
                      <Icon size={12} />
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/60 bounce-scroll" />
        </div>
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-semibold">Scroll</span>
      </div>
    </section>
  );
}

// ── TRUST BAR ──────────────────────────────────────────────────────
function CounterItem({ target, label, suffix = '+', Icon }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1800;
    const step = (target / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3 text-center py-10 px-4">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
        <Icon size={24} className="text-white" />
      </div>
      <div className="font-display font-bold text-white" style={{ fontSize: '3rem', lineHeight: 1, letterSpacing: '-0.02em' }}>
        {isInView ? count : 0}{suffix}
      </div>
      <div className="text-sm font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</div>
    </div>
  );
}

function TrustBar() {
  return (
    <section style={{ background: 'var(--green-deep)' }} className="border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
          <CounterItem target={500} label="Farmers Served" suffix="+" Icon={Users} />
          <CounterItem target={16} label="Premium Products" suffix="+" Icon={Package} />
          <CounterItem target={6} label="Product Categories" suffix="" Icon={Layers} />
          <CounterItem target={100} label="Made in Hyderabad" suffix="%" Icon={MapPin} />
        </div>
      </div>
    </section>
  );
}

// ── PRODUCT CATEGORIES ─────────────────────────────────────────────
const categoryData = [
  { id: 'insecticides', label: 'Insecticides', Icon: Bug, count: 3, tagline: 'Powerful pest protection that works fast and lasts long', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
  { id: 'fungicides', label: 'Fungicides', Icon: Microscope, count: 2, tagline: 'Guard your crops against fungal threats and disease', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
  { id: 'herbicides', label: 'Herbicides', Icon: Sprout, count: 2, tagline: 'Effective weed control before and after emergence', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
  { id: 'plant-growth', label: 'Plant Growth', Icon: TrendingUp, count: 2, tagline: 'Boost crop performance through balanced nutrition', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
  { id: 'micronutrients', label: 'Micronutrients', Icon: Atom, count: 4, tagline: 'Precision crop nutrition for deficiency correction', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
  { id: 'biostimulants', label: 'Biostimulants', Icon: Leaf, count: 3, tagline: 'Natural growth stimulation and stress tolerance', color: '#0F3D1F', bg: '#F0FDF4', border: '#BBF7D0' },
];

function CategoriesSection() {
  return (
    <section className="py-28 lg:py-36" style={{ background: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
            style={{ background: 'rgba(99,153,34,0.12)', color: 'var(--green-leaf)' }}>
            Our Products
          </span>
          <h2 className="font-display font-bold mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--green-deep)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Complete Crop Care Solutions
          </h2>
          <p className="text-lg sm:text-xl" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
            From seed to harvest — everything your crops need to thrive, organized by category for easy discovery.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {categoryData.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <Link
                to={`/products?category=${cat.id}`}
                className="category-card group block bg-white rounded-3xl h-full cursor-pointer relative overflow-hidden"
                style={{
                  border: `1px solid #E5E7EB`,
                  boxShadow: '0 8px 28px rgba(15,61,31,0.07)',
                }}
              >
                {/* Top colored stripe */}
                <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${cat.color} 0%, ${cat.color}aa 100%)` }} />

                {/* Subtle bg pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.04] pointer-events-none">
                  <cat.Icon size={128} style={{ color: cat.color }} />
                </div>

                <div className="flex flex-col gap-5 h-full p-7 lg:p-8">
                  <div className="cat-icon w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${cat.bg} 0%, white 100%)`,
                      border: `1.5px solid ${cat.border}`,
                    }}>
                    <cat.Icon size={30} style={{ color: cat.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-2xl mb-3" style={{ color: 'var(--green-deep)', letterSpacing: '-0.01em' }}>
                      {cat.label}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>{cat.tagline}</p>
                  </div>
                  <div className="flex items-center justify-between pt-5 mt-auto border-t border-gray-100">
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                      style={{ background: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}>
                      {cat.count} products
                    </span>
                    <span className="text-sm font-bold flex items-center gap-1.5 transition-all group-hover:gap-2.5"
                      style={{ color: cat.color }}>
                      View All <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── BLOCK ROCK SPOTLIGHT ───────────────────────────────────────────
function BlockRockSpotlight() {
  const features = [
    'Fast Action — Results in 2-4 hours',
    'Long Protection — Up to 3 weeks',
    'Eco Safe Formula',
    'Higher Marketable Yield',
  ];
  const crops = [
    { name: 'Chilli', color: '#DC2626', desc: 'Eliminates thrips completely' },
    { name: 'Roses', color: '#EC4899', desc: 'Premium quality blooms' },
    { name: 'Marigold', color: '#F59E0B', desc: 'Better flower yield' },
  ];

  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{ background: 'var(--green-deep)' }}>
      {/* Radial gold glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 25% 50%, rgba(239,159,39,0.15) 0%, transparent 70%)' }} />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-display font-black text-white opacity-[0.025] select-none"
          style={{ fontSize: 'clamp(100px, 22vw, 280px)', letterSpacing: '-0.04em', transform: 'rotate(-8deg)', whiteSpace: 'nowrap' }}>
          BLOCK ROCK
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Bottle — cinematic spotlight */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center relative"
          >
            {/* Conic spotlight rays */}
            <div className="absolute w-[480px] h-[480px] rounded-full slow-rotate opacity-15"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(239,159,39,0.6), transparent 90deg, rgba(99,153,34,0.5), transparent 180deg, rgba(239,159,39,0.6), transparent 270deg, rgba(99,153,34,0.5), transparent)',
              }} />
            <div className="absolute inset-0 pulse-glow rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(239,159,39,0.3) 0%, transparent 65%)' }} />
            <motion.div
              className="bottle-3d relative z-10"
              animate={{ rotateY: [0, 3, 0, -3, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ProductBottle product={blockRock} size="xl" floating />
            </motion.div>

            {/* Award badge floating — properly contained */}
            <div className="absolute bottom-2 right-0 sm:right-4 lg:right-0 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 max-w-[180px]"
              style={{
                background: 'linear-gradient(135deg, #EF9F27 0%, #d4891a 100%)',
                boxShadow: '0 12px 32px rgba(239,159,39,0.45)',
              }}>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Award size={16} className="text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] uppercase tracking-wider text-white/80 font-bold leading-none mb-0.5">Flagship</div>
                <div className="text-xs font-bold text-white leading-tight whitespace-nowrap">Top Seller 2025</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: 'var(--gold)' }}>
              Flagship Product
            </span>
            <h2 className="font-display font-bold mt-4 leading-[1.05]"
              style={{ fontSize: 'clamp(36px, 5.5vw, 64px)', letterSpacing: '-0.025em' }}>
              Block Thrips.
              <br />
              <span style={{ color: 'var(--gold)' }}>Protect Profits.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '520px' }}>
              Block Rock is Zenviro's breakthrough insecticide — a dual-action formula that eliminates thrips within hours while protecting your chilli and flower crops for up to 3 weeks.
            </p>

            {/* Feature pills */}
            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {features.map(f => (
                <div key={f} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(239,159,39,0.2)' }}>
                    <CheckCircle size={12} style={{ color: 'var(--gold)' }} />
                  </div>
                  <span className="text-sm font-medium">{f}</span>
                </div>
              ))}
            </div>

            {/* Target crops */}
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Proven on these crops
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {crops.map(crop => (
                  <div key={crop.name} className="flex items-start gap-3 px-4 py-3.5 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5" style={{ background: crop.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white leading-tight">{crop.name}</p>
                      <p className="text-xs mt-1 leading-snug" style={{ color: 'rgba(255,255,255,0.6)' }}>{crop.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-10">
              <Link to="/products/block-rock" className="btn-gold flex items-center gap-2 px-7 py-4 rounded-2xl text-sm">
                Get Block Rock
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/919347959693?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Block%20Rock"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white flex items-center gap-2 px-7 py-4 rounded-2xl text-sm"
              >
                <MessageCircle size={16} />
                Free Demo
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── WHY ZENVIRO ────────────────────────────────────────────────────
const values = [
  { Icon: Award, title: 'Highest Quality', desc: 'ISO-grade manufacturing with rigorous quality checks at every production stage of our products.' },
  { Icon: Target, title: 'Reliable Results', desc: 'Consistent performance across seasons and soil types — same proven results every single time.' },
  { Icon: ShieldCheck, title: 'Complete Protection', desc: 'End-to-end solutions covering pest control, disease management, nutrition and soil health.' },
  { Icon: TrendingUp, title: 'Higher Yield', desc: 'Proven to increase marketable yield by 20-30% in Telangana field trials across crop varieties.' },
  { Icon: HandHeart, title: 'Farmer Prosperity', desc: 'Our success is measured by the prosperity of every farmer we serve across the region.' },
  { Icon: Globe, title: 'Eco-Friendly', desc: 'Responsible formulations that protect crops while caring for our environment and ecosystem.' },
];

function WhyZenviroSection() {
  return (
    <section className="py-28 lg:py-36" style={{ background: 'var(--cream-dark)' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
            style={{ background: 'rgba(99,153,34,0.12)', color: 'var(--green-leaf)' }}>
            Why Zenviro
          </span>
          <h2 className="font-display font-bold mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--green-deep)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Our Commitment to Farmers
          </h2>
          <p className="text-lg sm:text-xl" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
            We don't just sell products. We partner in your crop's success — every season, every harvest.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="value-card bg-white rounded-3xl p-8"
              style={{ border: '1.5px solid transparent', boxShadow: '0 4px 24px rgba(15,61,31,0.05)' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(26,92,42,0.08)' }}>
                <v.Icon size={26} style={{ color: 'var(--green-mid)' }} />
              </div>
              <h3 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--green-deep)', letterSpacing: '-0.01em' }}>{v.title}</h3>
              <p className="text-[15px] leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── NUTRITION DEEP DIVE ────────────────────────────────────────────
function NutritionSection() {
  const micronutrients = [
    { symbol: 'Zn', name: 'Zinc EDTA 12%', desc: 'Corrects khaira disease, boosts enzyme activity' },
    { symbol: 'B',  name: 'Boron 20%', desc: 'Essential for pollination and fruit set' },
    { symbol: 'Fe', name: 'Ferro EDDHA 6%', desc: 'Prevents iron chlorosis in alkaline soils' },
    { symbol: 'Mg', name: 'Magnesium Sulphate 9.6%', desc: 'Builds chlorophyll, powers photosynthesis' },
  ];
  const biostimulants = [
    { name: 'Seaweed Extract', desc: 'Natural plant hormones, improves stress tolerance', Icon: Leaf },
    { name: 'Amino Power', desc: 'Free amino acids for rapid protein synthesis', Icon: Zap },
    { name: 'Humic Power', desc: 'Improves soil structure and nutrient availability', Icon: Sprout },
    { name: 'Fulvic Power', desc: 'Chelates nutrients, boosts cell absorption', Icon: Atom },
  ];

  return (
    <section className="py-28 lg:py-36" style={{ background: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
            style={{ background: 'rgba(37,99,235,0.1)', color: '#2563EB' }}>
            Precision Nutrition
          </span>
          <h2 className="font-display font-bold mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--green-deep)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Nutrition & Biostimulation
          </h2>
          <p className="text-lg sm:text-xl" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
            Correcting deficiencies and activating natural plant potential — from the soil to the leaf.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Micronutrients */}
          <div>
            <h3 className="font-display font-bold text-2xl mb-8 flex items-center gap-3"
              style={{ color: 'var(--green-deep)' }}>
              <Atom size={24} style={{ color: 'var(--green-leaf)' }} />
              Micronutrients
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {micronutrients.map((m, i) => (
                <motion.div
                  key={m.symbol}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="element-card rounded-2xl p-6 text-white cursor-pointer"
                >
                  <div className="font-display font-black text-5xl opacity-90">{m.symbol}</div>
                  <div className="text-sm font-bold mt-4 text-white">{m.name}</div>
                  <div className="text-xs mt-2 text-white/70 leading-relaxed">{m.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Biostimulants */}
          <div>
            <h3 className="font-display font-bold text-2xl mb-8 flex items-center gap-3"
              style={{ color: 'var(--green-deep)' }}>
              <Leaf size={24} style={{ color: 'var(--green-leaf)' }} />
              Biostimulants
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {biostimulants.map((b, i) => (
                <motion.div
                  key={b.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-5 flex items-center gap-5"
                  style={{ border: '1.5px solid #F3F4F6', boxShadow: '0 2px 12px rgba(15,61,31,0.04)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(99,153,34,0.1)' }}>
                    <b.Icon size={20} style={{ color: 'var(--green-leaf)' }} />
                  </div>
                  <div>
                    <p className="font-display font-bold text-base" style={{ color: 'var(--green-deep)' }}>{b.name}</p>
                    <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center py-10 px-8 rounded-3xl relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--green-mid), var(--green-deep))', color: 'white' }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            background: 'radial-gradient(circle at 30% 50%, var(--gold) 0%, transparent 50%)'
          }} />
          <p className="font-display font-bold text-2xl sm:text-3xl relative" style={{ letterSpacing: '-0.01em' }}>
            Right Nutrition → Right Production → Right Results
          </p>
          <p className="mt-3 text-base opacity-75 font-telugu relative">సరైన పోషణ – సరైన ఉత్పత్తి – సరైన ఫలితం</p>
        </motion.div>
      </div>
    </section>
  );
}

// ── SAFETY GUIDELINES ──────────────────────────────────────────────
const safetyItems = [
  { Icon: ShieldAlert, title: 'Read the Label', desc: 'Always read full label instructions before use. Follow recommended doses strictly.' },
  { Icon: Hand, title: 'Wear PPE', desc: 'Use gloves, mask, and protective clothing. Wash hands thoroughly after handling.' },
  { Icon: Baby, title: 'Keep from Children', desc: 'Store all products in locked, cool, dry location away from children and food.' },
  { Icon: Ban, title: 'No Eating', desc: 'Do not eat, drink, or smoke while applying agro chemical products.' },
  { Icon: Recycle, title: 'Dispose Properly', desc: 'Triple-rinse empty containers and dispose as per local regulations.' },
];

function SafetySection() {
  return (
    <section className="py-24 lg:py-28" style={{ background: 'var(--cream-dark)' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
            style={{ background: 'rgba(239,159,39,0.15)', color: '#D97706' }}>
            Safety First
          </span>
          <h2 className="font-display font-bold mb-5"
            style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', color: 'var(--green-deep)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Safe Usage Guidelines
          </h2>
          <p className="text-base sm:text-lg" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
            Your safety matters. Follow these simple guidelines every time you handle agro chemicals.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {safetyItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="safety-card bg-white rounded-2xl p-7 text-center"
              style={{ boxShadow: '0 4px 20px rgba(15,61,31,0.05)' }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'rgba(239,159,39,0.12)' }}>
                <item.Icon size={24} style={{ color: 'var(--gold)' }} />
              </div>
              <h4 className="font-display font-bold text-base mb-3" style={{ color: 'var(--green-deep)' }}>{item.title}</h4>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ───────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Rajesh Kumar', village: 'Tandur', crop: 'Chilli',
    rating: 5,
    problem: 'Thrips were destroying my chilli crop every season. I was losing 40% of my yield — damaged fruits couldn\'t be sold at market.',
    solution: 'After using Block Rock by Zenviro, the thrips infestation was under control within 3 days. Just two sprays in a season.',
    result: '35% higher marketable yield',
    quote: 'Block Rock has changed my chilli farming completely. My fruits are clean, shiny, and get premium prices at the market.',
  },
  {
    name: 'Priya Sharma', village: 'Shamirpet', crop: 'Roses',
    rating: 5,
    problem: 'My rose farm was losing flowers to thrips and mites. Blooms would dry up before harvest, reducing my income significantly.',
    solution: 'Zenviro\'s team recommended Block Rock for thrips and Hexaconazole for powdery mildew. The combination transformed my farm.',
    result: '28% more marketable blooms',
    quote: 'My roses are so beautiful now. Buyers from Hyderabad specifically ask for my flowers. Zenviro is my trusted partner.',
  },
  {
    name: 'Venkatesh Reddy', village: 'Moinabad', crop: 'Rice',
    rating: 5,
    problem: 'BPH attack destroyed 30% of my paddy in Kharif 2023. Sheath blight was spreading fast and I didn\'t know what to use.',
    solution: 'Zenviro\'s crop finder helped me identify the right products — Imidacloprid for BPH and Hexaconazole for sheath blight.',
    result: '22% yield increase',
    quote: 'Before Zenviro, I used to guess which products to buy. Now I know exactly what my paddy needs. Quality matters.',
  },
];

function TestimonialsSection() {
  return (
    <section className="py-28 lg:py-36" style={{ background: 'var(--cream)' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
            style={{ background: 'rgba(99,153,34,0.12)', color: 'var(--green-leaf)' }}>
            Farmer Stories
          </span>
          <h2 className="font-display font-bold mb-5"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--green-deep)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Farmers Who Trust Zenviro
          </h2>
          <p className="text-lg sm:text-xl" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
            Real results from real Telangana fields.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="testimonial-card bg-white rounded-3xl p-8"
              style={{ border: '1.5px solid #F3F4F6', boxShadow: '0 4px 24px rgba(15,61,31,0.06)' }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-lg text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, var(--green-mid), var(--green-deep))' }}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="font-display font-bold text-base" style={{ color: 'var(--ink)' }}>{t.name}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--ink-soft)' }}>{t.village} · {t.crop} Farmer</p>
                </div>
                <div className="flex">
                  {[...Array(t.rating)].map((_, s) => (
                    <Star key={s} size={13} style={{ color: 'var(--gold)' }} className="fill-current" />
                  ))}
                </div>
              </div>

              {/* Problem */}
              <div className="p-4 rounded-xl mb-3" style={{ background: '#FEF2F2', borderLeft: '3px solid #DC2626' }}>
                <div className="flex items-center gap-2 mb-2">
                  <XCircle size={13} style={{ color: '#DC2626' }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#DC2626' }}>Problem</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#7F1D1D' }}>{t.problem}</p>
              </div>

              {/* Solution */}
              <div className="p-4 rounded-xl mb-5" style={{ background: '#F0FDF4', borderLeft: '3px solid var(--green-mid)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={13} style={{ color: 'var(--green-mid)' }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--green-mid)' }}>Solution</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--green-deep)' }}>{t.solution}</p>
              </div>

              {/* Quote */}
              <p className="font-display italic text-base leading-relaxed mb-5"
                style={{ color: 'var(--ink-soft)', borderLeft: '3px solid var(--gold)', paddingLeft: '14px' }}>
                "{t.quote}"
              </p>

              {/* Result */}
              <div className="px-4 py-3 rounded-xl text-center"
                style={{ background: 'linear-gradient(135deg, var(--green-mid), var(--green-deep))', color: 'white' }}>
                <span className="text-xs uppercase tracking-widest opacity-80 block mb-1 font-semibold">Result</span>
                <span className="text-base font-display font-bold">{t.result}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA STRIP ──────────────────────────────────────────────────────
function CTAStrip() {
  return (
    <section className="py-24" style={{ background: 'var(--green-mid)' }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Ready to Transform Your Farm?
          </h2>
          <p className="mt-5 text-lg sm:text-xl text-white/80" style={{ lineHeight: 1.6 }}>
            Talk to our crop experts today. Free consultation, local support.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Link to="/crop-finder"
              className="btn-gold flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold">
              Try Crop Finder
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact"
              className="btn-outline-white flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── PAGE EXPORT ────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CategoriesSection />
      <BlockRockSpotlight />
      <FeaturedShowcase />
      <WhyZenviroSection />
      <NutritionSection />
      <TelanganaSection />
      <SafetySection />
      <TestimonialsSection />
      <CTAStrip />
    </>
  );
}
