import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Leaf, Award, Target, ShieldCheck, TrendingUp, Globe,
  HandHeart, Users, Package, ArrowRight, MessageCircle, Sparkles,
  ShieldAlert, Hand, Baby, Ban, Recycle,
} from 'lucide-react';
import TelanganaSection from '../components/TelanganaSection';

const values = [
  { Icon: Award, title: 'Highest Quality', desc: 'Every product undergoes rigorous quality testing to ensure consistent performance every time you spray.' },
  { Icon: Target, title: 'Reliable Results', desc: 'Proven performance in Telangana\'s diverse soil types and crop conditions, season after season.' },
  { Icon: ShieldCheck, title: 'Complete Protection', desc: 'From pest control to precision nutrition — we cover every aspect of your crop\'s health journey.' },
  { Icon: TrendingUp, title: 'Higher Yield', desc: 'Our formulations are designed to maximize your marketable yield while minimizing input costs.' },
  { Icon: HandHeart, title: 'Farmer First', desc: 'Every decision we make starts with one question: How does this help the farmer succeed?' },
  { Icon: Globe, title: 'Eco-Responsible', desc: 'We believe crop protection and environmental stewardship can coexist — and we prove it every day.' },
];

const safetyItems = [
  { Icon: ShieldAlert, title: 'Read the Label', desc: 'Always read complete label instructions before use. Follow recommended doses precisely.' },
  { Icon: Hand, title: 'Wear PPE', desc: 'Gloves, mask, and protective clothing are mandatory during every application.' },
  { Icon: Baby, title: 'Keep from Children', desc: 'Store in locked, cool, dry location — always away from children and food storage.' },
  { Icon: Ban, title: 'No Eating', desc: 'Never eat, drink, or smoke while handling agro chemicals of any kind.' },
  { Icon: Recycle, title: 'Dispose Properly', desc: 'Triple-rinse containers and dispose as per local Telangana guidelines responsibly.' },
];

const journey = [
  {
    year: 'Mission',
    title: 'Quality Without Compromise',
    desc: 'Source the best raw materials. Manufacture to international standards. Test rigorously at every step. This is non-negotiable.',
  },
  {
    year: 'Promise',
    title: 'Expert Support, Always',
    desc: 'When you buy Zenviro, our crop advisors become your team. Free guidance on dosage, timing, and crop care — just a call away.',
  },
  {
    year: 'Vision',
    title: 'Prosperity for Every Farmer',
    desc: 'A Telangana where every farmer has the knowledge and tools to maximize crop potential — sustainably, safely, and profitably.',
  },
];

export default function About() {
  return (
    <div style={{ background: 'var(--cream)' }}>
      {/* HERO */}
      <section style={{ background: 'var(--green-deep)' }} className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 70% at 100% 50%, rgba(99,153,34,0.12) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 40% 50% at 0% 100%, rgba(239,159,39,0.08) 0%, transparent 60%)' }} />
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="about-field" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(22)">
              <line x1="0" y1="0" x2="0" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-field)"/>
        </svg>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
              style={{ background: 'rgba(239,159,39,0.15)', color: 'var(--gold)', border: '1px solid rgba(239,159,39,0.25)' }}>
              <Sparkles size={12} />
              Our Story
            </div>
            <h1 className="font-display font-bold text-white leading-[1.02] mb-8"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '-0.025em', maxWidth: '900px' }}>
              Grown in Telangana.
              <br />
              <span style={{ color: 'var(--gold)' }}>Built for Telangana Farmers.</span>
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed max-w-2xl"
              style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.75 }}>
              Zenviro Agro Chemicals was founded with one mission: to give every farmer in Telangana access to premium-grade crop protection and nutrition products — at honest prices, with local expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* JOURNEY / STORY */}
      <section className="py-28 lg:py-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
                style={{ background: 'rgba(99,153,34,0.12)', color: 'var(--green-leaf)' }}>
                Who We Are
              </span>
              <h2 className="font-display font-bold leading-[1.05] mb-8"
                style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--green-deep)', letterSpacing: '-0.025em' }}>
                Your Local Partner for Crop Success
              </h2>
              <div className="space-y-5 text-lg leading-relaxed" style={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
                <p>
                  Based in Injapur, Rangareddy, Hyderabad, Zenviro Agro Chemicals understands the challenges facing Telangana farmers — the unpredictable monsoon, the diverse pest pressures, and the relentless pressure to maximize yields each season.
                </p>
                <p>
                  Our product range spans <span className="font-semibold" style={{ color: 'var(--green-deep)' }}>insecticides, fungicides, herbicides, plant growth regulators, micronutrients, and biostimulants</span> — all carefully sourced and quality-tested to meet the demands of modern farming.
                </p>
                <p>
                  What makes us different is our commitment to local support. We don't just sell products — we help you understand what your crop needs and when.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/products" className="btn-gold flex items-center gap-2 px-7 py-4 rounded-2xl text-sm">
                  See Our Products <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="flex items-center gap-2 px-7 py-4 rounded-2xl text-sm font-bold transition-all hover:-translate-y-0.5"
                  style={{ border: '2px solid var(--green-mid)', color: 'var(--green-mid)' }}>
                  Talk to Our Team
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              {journey.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="p-7 rounded-3xl"
                  style={{
                    background: i === 0 ? 'linear-gradient(135deg, #F0FDF4, #FFFFFF)' :
                               i === 1 ? 'linear-gradient(135deg, #FFFBEB, #FFFFFF)' :
                                         'linear-gradient(135deg, #F5F3FF, #FFFFFF)',
                    border: `1.5px solid ${i === 0 ? '#BBF7D0' : i === 1 ? '#FDE68A' : '#DDD6FE'}`,
                    boxShadow: '0 4px 24px rgba(15,61,31,0.05)',
                  }}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.2em]"
                    style={{ color: i === 0 ? 'var(--green-mid)' : i === 1 ? 'var(--gold)' : '#7C3AED' }}>
                    {item.year}
                  </span>
                  <h4 className="font-display font-bold text-xl mt-2 mb-3" style={{ color: 'var(--green-deep)', letterSpacing: '-0.01em' }}>
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: 'var(--green-deep)' }} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 100%, rgba(239,159,39,0.1) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { Icon: Users, value: '500+', label: 'Farmers Served' },
              { Icon: Package, value: '16+', label: 'Premium Products' },
              { Icon: Leaf, value: '6', label: 'Categories' },
              { Icon: MapPin, value: '10', label: 'Districts Reached' },
            ].map(({ Icon, value, label }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(239,159,39,0.15)', border: '1px solid rgba(239,159,39,0.2)' }}>
                  <Icon size={26} style={{ color: 'var(--gold)' }} />
                </div>
                <div className="font-display font-bold text-white" style={{ fontSize: '2.75rem', lineHeight: 1, letterSpacing: '-0.02em' }}>
                  {value}
                </div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-28 lg:py-36" style={{ background: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
              style={{ background: 'rgba(99,153,34,0.12)', color: 'var(--green-leaf)' }}>
              Our Values
            </span>
            <h2 className="font-display font-bold mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--green-deep)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              The Principles That Guide Us
            </h2>
            <p className="text-lg sm:text-xl" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
              Six commitments we live by — to our farmers, our products, and our planet.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="value-card bg-white rounded-3xl p-8"
                style={{ border: '1.5px solid transparent', boxShadow: '0 4px 24px rgba(15,61,31,0.05)' }}
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'rgba(26,92,42,0.08)' }}>
                  <v.Icon size={26} style={{ color: 'var(--green-mid)' }} />
                </div>
                <h3 className="font-display font-bold text-xl mb-3" style={{ color: 'var(--green-deep)', letterSpacing: '-0.01em' }}>{v.title}</h3>
                <p className="text-[15px] leading-relaxed" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TELANGANA MAP SECTION */}
      <TelanganaSection />

      {/* SAFETY GUIDELINES */}
      <section id="safety" className="py-28 lg:py-32" style={{ background: 'var(--cream-dark)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <span className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
              style={{ background: 'rgba(239,159,39,0.15)', color: '#D97706' }}>
              Safe Usage
            </span>
            <h2 className="font-display font-bold mb-5"
              style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', color: 'var(--green-deep)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Safety Guidelines
            </h2>
            <p className="text-base sm:text-lg" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
              We are committed to safe use of agro chemicals. Follow these guidelines on every application.
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

      {/* CTA */}
      <section className="py-24" style={{ background: 'var(--green-mid)' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Visit Our Facility
            </h2>
            <p className="mt-5 text-lg sm:text-xl text-white/80" style={{ lineHeight: 1.6 }}>
              Drop by our Injapur facility, or just give us a call. We love meeting farmers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <a
                href="https://wa.me/919347959693?text=Hi%2C%20I%27d%20like%20to%20visit%20Zenviro%20Agro%20Chemicals"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ background: '#25D366', boxShadow: '0 6px 16px rgba(37,211,102,0.35)' }}
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </a>
              <a href="tel:+919347959693"
                className="btn-gold flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold">
                <Phone size={18} />
                +91 93479 59693
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
