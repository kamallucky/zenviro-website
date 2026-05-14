import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight, MessageCircle, Phone, CheckCircle, XCircle,
  AlertTriangle, Droplet, Layers, Crop, Beaker,
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductBottle from '../components/ProductBottle';

const categoryColors = {
  insecticides: { color: '#DC2626', bg: '#FEF2F2', border: '#FECACA', soft: '#FFF7F7' },
  fungicides: { color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE', soft: '#FAFAFF' },
  herbicides: { color: '#D97706', bg: '#FFFBEB', border: '#FDE68A', soft: '#FFFCF0' },
  'plant-growth': { color: '#059669', bg: '#ECFDF5', border: '#A7F3D0', soft: '#F4FDF8' },
  micronutrients: { color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE', soft: '#F5F9FF' },
  biostimulants: { color: '#0F3D1F', bg: '#F0FDF4', border: '#BBF7D0', soft: '#F6FDF8' },
};

const categoryLabels = {
  insecticides: 'Insecticide', fungicides: 'Fungicide', herbicides: 'Herbicide',
  'plant-growth': 'Plant Growth', micronutrients: 'Micronutrient', biostimulants: 'Biostimulant',
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20" style={{ background: 'var(--cream)' }}>
        <h1 className="font-display text-4xl font-bold mb-6" style={{ color: 'var(--green-deep)' }}>Product not found</h1>
        <Link to="/products" className="btn-gold px-7 py-3.5 rounded-xl text-sm">Back to Products</Link>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const colors = categoryColors[product.category] || categoryColors.biostimulants;

  const waMessage = encodeURIComponent(
    `Hi, I'd like to enquire about ${product.name} (${product.formulation}). Please share pricing and availability.`
  );

  const specs = [
    { Icon: Droplet, label: 'Dosage', value: product.dosage },
    { Icon: Beaker, label: 'Application', value: product.applicationMethod },
    { Icon: Layers, label: 'Pack Size', value: product.packSize },
    { Icon: Crop, label: 'Type', value: product.type },
  ];

  return (
    <div style={{ background: 'var(--cream)' }} className="min-h-screen">
      {/* Breadcrumb header */}
      <div className="pt-28 pb-6" style={{ background: 'var(--green-deep)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <nav className="flex items-center gap-2 text-xs flex-wrap" aria-label="Breadcrumb">
            {[
              { label: 'Home', to: '/' },
              { label: 'Products', to: '/products' },
              { label: categoryLabels[product.category], to: `/products?category=${product.category}` },
              { label: product.name },
            ].map((item, i, arr) => (
              <span key={i} className="flex items-center gap-2">
                {item.to ? (
                  <Link to={item.to} className="transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white font-semibold">{item.label}</span>
                )}
                {i < arr.length - 1 && <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.4)' }} />}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Product Bottle Display */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="lg:sticky lg:top-28">
              {/* Bottle display */}
              <div
                className="rounded-3xl p-10 lg:p-12 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(160deg, ${colors.soft} 0%, ${colors.bg} 100%)`,
                  border: `1.5px solid ${colors.border}`,
                  minHeight: '500px',
                }}
              >
                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `linear-gradient(${colors.color} 1px, transparent 1px), linear-gradient(90deg, ${colors.color} 1px, transparent 1px)`,
                    backgroundSize: '32px 32px',
                  }} />

                {product.featured && (
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                    style={{ background: 'linear-gradient(135deg, #EF9F27 0%, #d4891a 100%)', boxShadow: '0 6px 16px rgba(239,159,39,0.45)' }}>
                    Flagship Product
                  </div>
                )}

                <ProductBottle product={product} size="lg" floating />

                {/* Glow under bottle */}
                <div className="absolute pointer-events-none"
                  style={{
                    bottom: '10%', left: '50%', transform: 'translateX(-50%)',
                    width: '50%', height: '28px',
                    background: `radial-gradient(ellipse, ${colors.color}30 0%, transparent 70%)`,
                    filter: 'blur(10px)',
                  }} />
              </div>

              {/* Sticky enquiry card */}
              <div className="mt-7 bg-white rounded-3xl p-7"
                style={{ border: '1.5px solid #F3F4F6', boxShadow: '0 4px 24px rgba(15,61,31,0.06)' }}>
                <h4 className="font-display font-bold text-lg mb-1" style={{ color: 'var(--green-deep)' }}>Enquire Now</h4>
                <p className="text-sm mb-5" style={{ color: 'var(--ink-soft)' }}>Free expert consultation. We respond within 1 hour.</p>
                <a
                  href={`https://wa.me/919347959693?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm mb-3"
                >
                  <MessageCircle size={18} />
                  WhatsApp Enquiry
                </a>
                <a
                  href="tel:+919347959693"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-semibold transition-colors hover:bg-gray-50"
                  style={{ border: '2px solid var(--green-mid)', color: 'var(--green-mid)' }}
                >
                  <Phone size={16} />
                  +91 93479 59693
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* Category badge */}
            <span
              className="inline-block px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-5"
              style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}
            >
              {categoryLabels[product.category]}
            </span>

            <h1 className="font-display font-bold leading-[1.05] mb-3"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--green-deep)', letterSpacing: '-0.025em' }}>
              {product.name}
            </h1>
            <p className="font-mono text-base mb-2" style={{ color: 'var(--ink-soft)' }}>{product.formulation}</p>
            <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: colors.color }}>{product.type}</p>

            <p className="mt-8 text-lg leading-relaxed" style={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>
              {product.description}
            </p>

            {/* Specs cards */}
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {specs.map(spec => (
                <div key={spec.label} className="p-5 rounded-2xl"
                  style={{ background: 'white', border: '1.5px solid #F3F4F6' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: colors.bg }}>
                      <spec.Icon size={16} style={{ color: colors.color }} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--ink-soft)' }}>
                      {spec.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Target Crops */}
            <div className="mt-10">
              <h3 className="font-display font-bold text-xl mb-4" style={{ color: 'var(--green-deep)' }}>
                Target Crops
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.crops.map(crop => (
                  <span key={crop} className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{ background: 'white', color: 'var(--ink)', border: '1.5px solid var(--cream-dark)' }}>
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Problems & Benefits */}
            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {/* Problems */}
              <div className="bg-white rounded-2xl p-6" style={{ border: '1.5px solid #FEE2E2' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#FEF2F2' }}>
                    <XCircle size={16} style={{ color: '#DC2626' }} />
                  </div>
                  <h3 className="font-display font-bold text-base" style={{ color: '#DC2626' }}>
                    Problems It Solves
                  </h3>
                </div>
                <ul className="space-y-3">
                  {product.problems.map(p => (
                    <li key={p} className="flex items-start gap-2.5 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#DC2626' }} />
                      <span style={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl p-6" style={{ border: '1.5px solid #BBF7D0' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F0FDF4' }}>
                    <CheckCircle size={16} style={{ color: 'var(--green-mid)' }} />
                  </div>
                  <h3 className="font-display font-bold text-base" style={{ color: 'var(--green-mid)' }}>
                    Key Benefits
                  </h3>
                </div>
                <ul className="space-y-3">
                  {product.benefits.map(b => (
                    <li key={b} className="flex items-start gap-2.5 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--green-mid)' }} />
                      <span style={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Safety reminder */}
            <div className="mt-10 p-6 rounded-2xl flex items-start gap-4"
              style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A' }}>
              <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(217,119,6,0.15)' }}>
                <AlertTriangle size={20} style={{ color: '#D97706' }} />
              </div>
              <div>
                <p className="font-display font-bold text-base mb-1.5" style={{ color: '#92400E' }}>Safety Reminder</p>
                <p className="text-sm leading-relaxed" style={{ color: '#92400E' }}>
                  Always read and follow label instructions. Wear protective equipment during application.
                  Store in original container away from children. Dispose of empty containers responsibly.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 pt-16 border-t border-gray-200"
          >
            <h2 className="font-display font-bold text-3xl mb-2"
              style={{ color: 'var(--green-deep)', letterSpacing: '-0.02em' }}>
              Related Products
            </h2>
            <p className="text-base mb-10" style={{ color: 'var(--ink-soft)' }}>
              Other products from the same category that may interest you
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
