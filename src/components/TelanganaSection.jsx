import { motion } from 'framer-motion';
import { MapPin, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const districts = [
  { name: 'Hyderabad', x: 52, y: 50, isHQ: true },
  { name: 'Rangareddy', x: 48, y: 55 },
  { name: 'Medak', x: 45, y: 38 },
  { name: 'Mahbubnagar', x: 40, y: 70 },
  { name: 'Nalgonda', x: 62, y: 60 },
  { name: 'Warangal', x: 70, y: 42 },
  { name: 'Karimnagar', x: 65, y: 28 },
  { name: 'Nizamabad', x: 38, y: 22 },
  { name: 'Adilabad', x: 50, y: 12 },
  { name: 'Khammam', x: 78, y: 58 },
];

export default function TelanganaSection() {
  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{ background: 'var(--green-deep)' }}>
      {/* Decorative gold radial */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 30%, rgba(239,159,39,0.12) 0%, transparent 65%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
              style={{ background: 'rgba(239,159,39,0.15)', color: 'var(--gold)', border: '1px solid rgba(239,159,39,0.25)' }}>
              <Sparkles size={12} />
              Local Roots, Global Standards
            </div>
            <h2 className="font-display font-bold text-white leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(36px, 5.5vw, 60px)', letterSpacing: '-0.025em' }}>
              Made in Hyderabad.
              <br />
              <span style={{ color: 'var(--gold)' }}>For Telangana Farms.</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.78)', lineHeight: 1.75 }}>
              From our Injapur facility in Rangareddy, we serve farmers across all 10 districts of Telangana — formulating products specifically calibrated for our soil types, rainfall patterns, and crop varieties.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10 pt-8 border-t border-white/10">
              {[
                { value: '10', label: 'Districts Served' },
                { value: '500+', label: 'Active Farmers' },
                { value: '24h', label: 'Response Time' },
              ].map(s => (
                <div key={s.label}>
                  <div className="font-display font-bold text-white" style={{ fontSize: '2.25rem', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {s.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Address card */}
            <div className="p-6 rounded-2xl mb-6"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(239,159,39,0.2)' }}>
                  <MapPin size={20} style={{ color: 'var(--gold)' }} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    Headquarters
                  </p>
                  <p className="text-base font-display font-bold text-white">
                    Injapur, Rangareddy
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Hyderabad, Telangana, India</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+919347959693"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold transition-all hover:-translate-y-0.5"
                style={{ background: 'white', color: 'var(--green-deep)' }}
              >
                <Phone size={16} />
                +91 93479 59693
              </a>
              <a
                href="https://wa.me/919347959693?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20Zenviro%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                style={{ background: '#25D366' }}
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right: Stylized Telangana map */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-3xl"
                style={{ background: 'radial-gradient(circle at center, rgba(99,153,34,0.2) 0%, transparent 65%)' }} />

              {/* Map container */}
              <div className="relative w-full h-full rounded-3xl p-8 flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <linearGradient id="map-fill" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#639922" stopOpacity="0.18"/>
                      <stop offset="100%" stopColor="#EF9F27" stopOpacity="0.08"/>
                    </linearGradient>
                    <linearGradient id="map-stroke" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#639922"/>
                      <stop offset="100%" stopColor="#EF9F27"/>
                    </linearGradient>
                  </defs>

                  {/* Stylized Telangana outline (simplified geographical shape) */}
                  <path
                    d="M 50 5 Q 60 8 65 14 L 72 18 Q 78 22 76 30 L 80 36 Q 85 40 82 48 L 86 55 Q 88 62 82 66 L 78 72 Q 70 78 62 76 L 55 82 Q 45 85 38 80 L 32 76 Q 28 70 30 64 L 25 56 Q 22 48 26 42 L 28 35 Q 30 28 36 24 L 38 18 Q 42 12 50 5 Z"
                    fill="url(#map-fill)"
                    stroke="url(#map-stroke)"
                    strokeWidth="0.5"
                  />

                  {/* District dots */}
                  {districts.map((d, i) => (
                    <g key={d.name}>
                      {d.isHQ ? (
                        <>
                          <circle cx={d.x} cy={d.y} r="3" fill="#EF9F27">
                            <animate attributeName="r" values="3;4.5;3" dur="2.5s" repeatCount="indefinite"/>
                          </circle>
                          <circle cx={d.x} cy={d.y} r="6" fill="none" stroke="#EF9F27" strokeWidth="0.5" opacity="0.5">
                            <animate attributeName="r" values="6;10;6" dur="2.5s" repeatCount="indefinite"/>
                            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite"/>
                          </circle>
                        </>
                      ) : (
                        <circle cx={d.x} cy={d.y} r="1.4" fill="#639922" opacity="0.85">
                          <animate attributeName="opacity" values="0.85;0.4;0.85" dur="3s" begin={`${i * 0.3}s`} repeatCount="indefinite"/>
                        </circle>
                      )}
                    </g>
                  ))}

                  {/* HQ label */}
                  <text x="52" y="46" textAnchor="middle"
                    fontSize="2.2" fontWeight="700"
                    fill="#EF9F27"
                    style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.2px' }}>
                    HYDERABAD
                  </text>
                  <text x="52" y="62" textAnchor="middle"
                    fontSize="1.6" fontWeight="500"
                    fill="rgba(255,255,255,0.5)"
                    style={{ fontFamily: 'Inter, sans-serif' }}>
                    HQ · Injapur
                  </text>
                </svg>
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-4 -left-4 p-4 rounded-2xl flex items-center gap-3"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
                }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--gold)' }}>
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--ink-soft)' }}>
                    Trusted Across
                  </div>
                  <div className="font-display font-bold text-base" style={{ color: 'var(--green-deep)' }}>10 Districts</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
