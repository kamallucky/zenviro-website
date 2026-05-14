import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles, Award } from 'lucide-react';
import ProductBottle from './ProductBottle';
import { products } from '../data/products';

const showcaseIds = [
  'imidacloprid-17-8-sl',
  'profenofos-50-ec',
  'hexaconazole-5-sc',
  'glyphosate-41-sl',
  'seaweed-extract',
  'npk-19-19-19',
];

export default function FeaturedShowcase() {
  const showcase = showcaseIds.map(id => products.find(p => p.id === id)).filter(Boolean);

  return (
    <section className="py-28 lg:py-36 relative overflow-hidden" style={{ background: 'var(--cream-dark)' }}>
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(99,153,34,0.25) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(239,159,39,0.2) 0%, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
            style={{ background: 'rgba(239,159,39,0.15)', color: '#D97706', border: '1px solid rgba(239,159,39,0.25)' }}>
            <Sparkles size={12} />
            Best Sellers
          </div>
          <h2 className="font-display font-bold mb-6"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--green-deep)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
            Premium Products,
            <br />
            <span style={{ color: 'var(--green-leaf)' }}>Real Farmer Results.</span>
          </h2>
          <p className="text-lg sm:text-xl" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
            Crafted formulations trusted across Telangana — engineered for the climate, soils, and crops that matter most to you.
          </p>
        </motion.div>

        {/* Wooden shelf — premium retail display */}
        <div className="relative">
          {/* Shelf surface */}
          <div className="absolute inset-x-0 bottom-0 h-3 rounded-full opacity-40"
            style={{
              background: 'linear-gradient(180deg, #92400E 0%, #78350F 100%)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              filter: 'blur(1px)',
            }} />

          {/* Bottles grid with stagger rotation entrance */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4 px-4 pb-6">
            {showcase.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -8 : 8 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col items-center group"
              >
                <Link
                  to={`/products/${product.id}`}
                  className="block bottle-3d transition-transform duration-500 hover:-translate-y-3"
                >
                  <ProductBottle product={product} size="md" />
                </Link>
                {/* Bottle shadow */}
                <div className="w-24 h-2 rounded-full opacity-25 mt-2 transition-all duration-500 group-hover:opacity-50 group-hover:w-28"
                  style={{ background: 'radial-gradient(ellipse, #0F3D1F 0%, transparent 70%)', filter: 'blur(5px)' }} />

                {/* Name label */}
                <Link to={`/products/${product.id}`} className="block text-center mt-4 transition-colors group-hover:opacity-80">
                  <p className="font-display font-bold text-base leading-tight" style={{ color: 'var(--green-deep)', letterSpacing: '-0.01em' }}>
                    {product.name}
                  </p>
                  <p className="text-[11px] font-mono mt-1" style={{ color: 'var(--ink-soft)' }}>{product.formulation.split(' | ')[0]}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-16"
        >
          <Link to="/products" className="btn-gold flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold">
            View All 16 Products
            <ArrowRight size={18} />
          </Link>
          <a
            href="https://wa.me/919347959693?text=Hi%2C%20I%27d%20like%20a%20catalog%20of%20Zenviro%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: 'white', color: 'var(--green-mid)', border: '2px solid var(--green-mid)' }}
          >
            <MessageCircle size={18} />
            Request Catalog
          </a>
        </motion.div>
      </div>
    </section>
  );
}
