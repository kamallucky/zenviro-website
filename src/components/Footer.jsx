import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Leaf, Send, CheckCircle, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const productLinks = [
  { label: 'Insecticides', to: '/products?category=insecticides' },
  { label: 'Fungicides', to: '/products?category=fungicides' },
  { label: 'Herbicides', to: '/products?category=herbicides' },
  { label: 'Plant Growth', to: '/products?category=plant-growth' },
  { label: 'Micronutrients', to: '/products?category=micronutrients' },
  { label: 'Biostimulants', to: '/products?category=biostimulants' },
];

const companyLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Crop Finder', to: '/crop-finder' },
  { label: 'Safety Guidelines', to: '/about#safety' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => { setSubscribed(false); setEmail(''); }, 4000);
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--green-deep) 0%, #0a2a14 100%)',
        color: 'rgba(255,255,255,0.85)',
      }}
    >
      {/* Subtle decorative gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(99,153,34,0.4) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(239,159,39,0.3) 0%, transparent 70%)' }} />
      </div>

      {/* Top accent stripe */}
      <div className="h-0.5 relative"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-10">

        {/* NEWSLETTER — Premium top strip */}
        <div className="mb-16 pb-16 border-b border-white/10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
                style={{ background: 'rgba(239,159,39,0.15)', color: 'var(--gold)', border: '1px solid rgba(239,159,39,0.25)' }}>
                <Leaf size={12} />
                Stay Updated
              </div>
              <h3 className="font-display font-bold text-white mb-2"
                style={{ fontSize: 'clamp(24px, 3vw, 32px)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Get Free Farming Tips
              </h3>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: '420px' }}>
                Seasonal crop care guides, expert advice, and exclusive product updates — straight to your inbox.
              </p>
            </div>
            <div>
              {subscribed ? (
                <div className="flex items-center justify-center gap-3 p-5 rounded-2xl"
                  style={{ background: 'rgba(99,153,34,0.15)', border: '1px solid rgba(99,153,34,0.3)' }}>
                  <CheckCircle size={22} style={{ color: '#86EFAC' }} />
                  <span className="font-semibold text-white">Subscribed! We'll be in touch soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2.5 max-w-md lg:max-w-none lg:justify-end">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    aria-label="Email for farming tips newsletter"
                    className="flex-1 lg:max-w-sm px-5 py-4 rounded-2xl text-sm text-white outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1.5px solid rgba(255,255,255,0.12)',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-bold transition-all hover:-translate-y-0.5"
                    style={{
                      background: 'linear-gradient(135deg, var(--gold) 0%, #d4891a 100%)',
                      color: 'white',
                      boxShadow: '0 6px 18px rgba(239,159,39,0.4)',
                    }}
                  >
                    Subscribe
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* MAIN COLUMNS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Logo dark={false} />
            <p className="mt-5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
              Premium agro-chemical solutions trusted by 500+ farmers across Telangana and Andhra Pradesh.
            </p>
            <p className="mt-4 text-base font-telugu" style={{ color: 'var(--gold-soft)' }}>
              మొక్కకు రక్షణ | పంటకు భరోసా
            </p>
            <div className="flex items-center gap-2 mt-6 px-3.5 py-2 rounded-full inline-flex"
              style={{ background: 'rgba(99,153,34,0.12)', border: '1px solid rgba(99,153,34,0.2)', width: 'fit-content' }}>
              <Leaf size={14} style={{ color: 'var(--gold)' }} />
              <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Trusted by 500+ farmers
              </span>
            </div>
          </div>

          {/* Products column */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-white mb-5 text-sm uppercase tracking-[0.15em]">Products</h4>
            <ul className="space-y-3">
              {productLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm transition-all hover:text-white hover:translate-x-1 inline-block"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-white mb-5 text-sm uppercase tracking-[0.15em]">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm transition-all hover:text-white hover:translate-x-1 inline-block"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div className="lg:col-span-4">
            <h4 className="font-display font-bold text-white mb-5 text-sm uppercase tracking-[0.15em]">Get In Touch</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+919347959693"
                  className="flex items-center gap-3 text-sm transition-all hover:text-white group"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                >
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Phone size={15} />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest opacity-60 mb-0.5">Call us</div>
                    <div className="font-semibold tabular-nums">+91 93479 59693</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919347959693?text=Hi%2C%20I%27m%20interested%20in%20Zenviro%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-all hover:text-white group"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                >
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #25D366 0%, #1da851 100%)', boxShadow: '0 4px 12px rgba(37,211,102,0.3)' }}>
                    <MessageCircle size={15} className="text-white" />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest opacity-60 mb-0.5">WhatsApp</div>
                    <div className="font-semibold">Chat instantly</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@zenviroagro.com"
                  className="flex items-center gap-3 text-sm transition-all hover:text-white group"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                >
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: 'rgba(239,159,39,0.15)', border: '1px solid rgba(239,159,39,0.25)' }}>
                    <Mail size={15} style={{ color: 'var(--gold)' }} />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest opacity-60 mb-0.5">Email</div>
                    <div className="font-semibold">info@zenviroagro.com</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <MapPin size={15} />
                  </span>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest opacity-60 mb-0.5">Visit us</div>
                    <div className="font-semibold leading-relaxed">
                      Injapur, Rangareddy,<br />Hyderabad, Telangana
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
          <p>© {currentYear} Zenviro Agro Chemicals. All rights reserved.</p>
          <p className="font-display italic text-center" style={{ color: 'var(--gold-soft)', opacity: 0.85 }}>
            Innovating Today | Sustaining Tomorrow
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={11} />
            <span className="tabular-nums">Made in Hyderabad, India</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
