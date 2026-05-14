import { Link } from 'react-router-dom';
import { MessageCircle, Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductBottle from './ProductBottle';

const categoryColors = {
  insecticides: { bg: '#FEF2F2', color: '#DC2626', border: '#FECACA', soft: '#FFF7F7' },
  fungicides: { bg: '#F5F3FF', color: '#7C3AED', border: '#DDD6FE', soft: '#FAFAFF' },
  herbicides: { bg: '#FFFBEB', color: '#D97706', border: '#FDE68A', soft: '#FFFCF0' },
  'plant-growth': { bg: '#ECFDF5', color: '#059669', border: '#A7F3D0', soft: '#F4FDF8' },
  micronutrients: { bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE', soft: '#F5F9FF' },
  biostimulants: { bg: '#F0FDF4', color: '#0F3D1F', border: '#BBF7D0', soft: '#F6FDF8' },
};

const categoryLabels = {
  insecticides: 'Insecticide',
  fungicides: 'Fungicide',
  herbicides: 'Herbicide',
  'plant-growth': 'Plant Growth',
  micronutrients: 'Micronutrient',
  biostimulants: 'Biostimulant',
};

export default function ProductCard({ product, index = 0 }) {
  const colors = categoryColors[product.category] || categoryColors.biostimulants;
  const maxCrops = 3;
  const visibleCrops = product.crops.slice(0, maxCrops);
  const extraCrops = product.crops.length - maxCrops;

  const waMessage = encodeURIComponent(
    `Hi, I'm interested in ${product.name} (${product.formulation}). Please share details and pricing.`
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      layout
      className="product-card group bg-white rounded-3xl overflow-hidden flex flex-col h-full"
      style={{
        border: '1.5px solid #F3F4F6',
        boxShadow: '0 4px 24px rgba(15,61,31,0.06)',
      }}
    >
      {/* Product Image Area — generous height, brochure-style backdrop */}
      <div
        className="relative flex items-center justify-center pt-12 pb-10"
        style={{
          background: `linear-gradient(160deg, ${colors.soft} 0%, ${colors.bg} 100%)`,
          minHeight: '300px',
        }}
      >
        {/* Decorative grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(${colors.color} 1px, transparent 1px), linear-gradient(90deg, ${colors.color} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }} />

        {/* Category badge — top-left */}
        <span
          className="absolute top-5 left-5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase z-10"
          style={{
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(8px)',
            color: colors.color,
            border: `1px solid ${colors.border}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          {categoryLabels[product.category]}
        </span>

        {/* Featured star — top-right */}
        {product.featured && (
          <div
            className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider z-10"
            style={{
              background: 'linear-gradient(135deg, #EF9F27 0%, #d4891a 100%)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(239,159,39,0.45)',
            }}
          >
            <Star size={11} className="fill-white" />
            Featured
          </div>
        )}

        {/* The bottle */}
        <div className="relative transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1">
          <ProductBottle product={product} size="md" />
        </div>

        {/* Soft glow under bottle */}
        <div className="absolute pointer-events-none"
          style={{
            bottom: '8%', left: '50%', transform: 'translateX(-50%)',
            width: '60%', height: '20px',
            background: `radial-gradient(ellipse, ${colors.color}25 0%, transparent 70%)`,
            filter: 'blur(8px)',
          }} />
      </div>

      {/* Content — generous padding and breathing room */}
      <div className="flex flex-col flex-1 p-7 gap-4">
        <div>
          <h3 className="font-display font-bold text-[#0F1A0F] leading-tight" style={{ fontSize: '22px', letterSpacing: '-0.01em' }}>
            {product.name}
          </h3>
          <p className="text-[13px] font-mono mt-1.5" style={{ color: 'var(--ink-soft)' }}>
            {product.formulation}
          </p>
        </div>

        {/* Crop chips */}
        <div className="flex flex-wrap gap-1.5">
          {visibleCrops.map(crop => (
            <span
              key={crop}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium"
              style={{ background: 'var(--cream-dark)', color: 'var(--ink-soft)' }}
            >
              {crop}
            </span>
          ))}
          {extraCrops > 0 && (
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-bold"
              style={{ background: colors.bg, color: colors.color }}
            >
              +{extraCrops} more
            </span>
          )}
        </div>

        {/* Actions — properly spaced */}
        <div className="flex gap-2.5 mt-auto pt-2">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-[13px] font-semibold transition-all duration-300 hover:bg-gray-50"
            style={{
              border: '1.5px solid var(--green-mid)',
              color: 'var(--green-mid)',
            }}
          >
            View Details
            <ArrowUpRight size={14} />
          </Link>
          <a
            href={`https://wa.me/919347959693?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
            className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-[13px] font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #EF9F27 0%, #d4891a 100%)',
              boxShadow: '0 4px 12px rgba(239,159,39,0.35)',
              minWidth: '52px',
            }}
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
