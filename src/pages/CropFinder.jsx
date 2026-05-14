import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, MessageCircle, CheckCircle, Lightbulb, AlertTriangle, Clock,
  ArrowRight, Sparkles, Leaf, ChevronDown,
} from 'lucide-react';
import { crops, cropSolutions } from '../data/cropSolutions';
import { getProductById } from '../data/products';
import { cropIllustrations } from '../components/CropIllustration';
import ProductBottle from '../components/ProductBottle';

const categoryFilters = ['All', 'Pest Control', 'Disease Control', 'Nutrition'];

export default function CropFinder() {
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop);
    setActiveFilter('All');
    setTimeout(() => {
      document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const solutions = selectedCrop ? cropSolutions[selectedCrop.id] || [] : [];
  const filtered = activeFilter === 'All' ? solutions : solutions.filter(s => s.category === activeFilter);

  return (
    <div style={{ background: 'var(--cream)' }} className="min-h-screen">
      {/* HEADER */}
      <header style={{ background: 'var(--green-deep)' }} className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 80% 50%, rgba(99,153,34,0.15) 0%, transparent 60%)' }} />
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="cf-field" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
              <line x1="0" y1="0" x2="0" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cf-field)"/>
        </svg>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
              style={{ background: 'rgba(239,159,39,0.15)', color: 'var(--gold)', border: '1px solid rgba(239,159,39,0.25)' }}>
              <Sparkles size={12} />
              Crop Intelligence Tool
            </div>
            <h1 className="font-display font-bold text-white leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-0.025em' }}>
              Find the Right Products
              <br />
              <span style={{ color: 'var(--gold)' }}>For Your Crop.</span>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
              Select your crop and get expert-recommended Zenviro products with detailed dosage, timing, and farmer tips.
            </p>
          </motion.div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24">

        {/* STEP 1: Crop Selection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-xl text-white"
              style={{ background: 'linear-gradient(135deg, var(--green-mid), var(--green-deep))' }}>
              1
            </div>
            <div>
              <h2 className="font-display font-bold text-3xl" style={{ color: 'var(--green-deep)', letterSpacing: '-0.02em' }}>
                Select Your Crop
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--ink-soft)' }}>
                Choose from 6 crops popular in Telangana
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {crops.map((crop, i) => {
              const Illustration = cropIllustrations[crop.id];
              const isSelected = selectedCrop?.id === crop.id;
              return (
                <motion.button
                  key={crop.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleCropSelect(crop)}
                  className={`crop-card bg-white rounded-3xl p-6 text-center flex flex-col items-center gap-3 transition-all duration-300 ${
                    isSelected ? 'selected' : ''
                  }`}
                  style={{
                    border: isSelected ? `2px solid var(--gold)` : '1.5px solid #F3F4F6',
                    boxShadow: isSelected ? '0 0 0 4px rgba(239,159,39,0.18), 0 8px 24px rgba(239,159,39,0.18)' : '0 4px 20px rgba(15,61,31,0.05)',
                  }}
                  aria-pressed={isSelected}
                >
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${crop.color}12 0%, ${crop.color}06 100%)` }}>
                    {Illustration && <Illustration size={64} />}
                  </div>
                  <div>
                    <p className="font-display font-bold text-base" style={{ color: 'var(--green-deep)' }}>
                      {crop.name}
                    </p>
                    <p className="text-xs font-telugu mt-1" style={{ color: 'var(--ink-soft)' }}>{crop.telugu}</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: `${crop.color}15`, color: crop.color }}>
                    {crop.productsCount} products
                  </span>
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: 'var(--gold)' }}>
                      <CheckCircle size={14} className="text-white" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* STEP 2: Recommendations */}
        <AnimatePresence>
          {selectedCrop && (
            <motion.section
              id="recommendations"
              key={selectedCrop.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-20"
            >
              {/* Step 2 header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-display font-bold text-xl text-white"
                  style={{ background: 'linear-gradient(135deg, var(--gold), #d4891a)' }}>
                  2
                </div>
                <div>
                  <h2 className="font-display font-bold text-3xl" style={{ color: 'var(--green-deep)', letterSpacing: '-0.02em' }}>
                    Recommendations for {selectedCrop.name}
                  </h2>
                  <p className="text-sm mt-1" style={{ color: 'var(--ink-soft)' }}>
                    Expert-curated products with dosage and application guidance
                  </p>
                </div>
              </div>

              {/* Crop hero banner */}
              <div className="rounded-3xl p-8 lg:p-10 mb-10 flex items-center gap-6 lg:gap-10 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${selectedCrop.color}10, ${selectedCrop.color}05)`,
                  border: `1.5px solid ${selectedCrop.color}25`,
                }}>
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'white', boxShadow: `0 8px 24px ${selectedCrop.color}25` }}>
                  {cropIllustrations[selectedCrop.id] && (() => {
                    const Illustration = cropIllustrations[selectedCrop.id];
                    return <Illustration size={88} />;
                  })()}
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl lg:text-3xl" style={{ color: 'var(--green-deep)', letterSpacing: '-0.02em' }}>
                    {selectedCrop.name} Farming
                  </h3>
                  <p className="text-sm font-telugu mt-1" style={{ color: 'var(--ink-soft)' }}>{selectedCrop.telugu}</p>
                  <p className="text-sm lg:text-base mt-3 leading-relaxed" style={{ color: 'var(--ink-soft)', lineHeight: 1.7, maxWidth: '600px' }}>
                    {selectedCrop.description}
                  </p>
                </div>
              </div>

              {/* Filter tabs */}
              <div className="flex flex-wrap gap-2.5 mb-10">
                {categoryFilters.map(filter => {
                  const count = filter === 'All' ? solutions.length : solutions.filter(s => s.category === filter).length;
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                        isActive ? 'text-white shadow-md' : 'bg-white hover:bg-gray-50'
                      }`}
                      style={isActive
                        ? { background: 'var(--green-mid)', boxShadow: '0 4px 12px rgba(26,92,42,0.25)' }
                        : { color: 'var(--ink-soft)', border: '1.5px solid #E5E7EB' }}
                    >
                      {filter}
                      <span className="opacity-70 text-xs">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Solution cards */}
              <div className="grid md:grid-cols-2 gap-7">
                {filtered.map((solution, i) => {
                  const product = getProductById(solution.productId);
                  if (!product) return null;
                  const waMessage = encodeURIComponent(
                    `Hi, I need ${product.name} for my ${selectedCrop.name} crop. Dosage: ${solution.dosage}. Please advise.`
                  );

                  return (
                    <motion.div
                      key={solution.productId + '-' + i}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-3xl overflow-hidden"
                      style={{ border: '1.5px solid #F3F4F6', boxShadow: '0 4px 24px rgba(15,61,31,0.06)' }}
                    >
                      {/* Card header */}
                      <div className="p-7 flex items-center gap-6"
                        style={{ borderBottom: '1px solid #F3F4F6', background: 'linear-gradient(135deg, var(--cream), #fff)' }}>
                        <div className="flex-shrink-0">
                          <ProductBottle product={product} size="sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2"
                            style={{ background: 'var(--cream-dark)', color: 'var(--ink-soft)' }}>
                            {solution.category}
                          </span>
                          <h3 className="font-display font-bold text-xl leading-tight" style={{ color: 'var(--green-deep)', letterSpacing: '-0.01em' }}>
                            {product.name}
                          </h3>
                          <p className="text-xs font-mono mt-1.5 break-words" style={{ color: 'var(--ink-soft)' }}>
                            {product.formulation}
                          </p>
                          <Link
                            to={`/products/${product.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold mt-3 transition-colors hover:opacity-80"
                            style={{ color: 'var(--green-mid)' }}
                          >
                            Full product details <ArrowRight size={11} />
                          </Link>
                        </div>
                      </div>

                      {/* Why recommended */}
                      <div className="px-7 py-5">
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                          {solution.whyRecommended}
                        </p>
                      </div>

                      {/* Info grid */}
                      <div className="px-7 pb-7 space-y-3">
                        {/* Dosage */}
                        <div className="p-4 rounded-2xl"
                          style={{ background: 'rgba(26,92,42,0.05)', border: '1px solid rgba(26,92,42,0.12)' }}>
                          <div className="flex items-center gap-2 mb-1.5">
                            <CheckCircle size={14} style={{ color: 'var(--green-mid)' }} />
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--green-mid)' }}>
                              Recommended Dosage
                            </span>
                          </div>
                          <p className="text-sm font-mono font-semibold" style={{ color: 'var(--green-deep)' }}>
                            {solution.dosage}
                          </p>
                        </div>

                        {/* Timing */}
                        <div className="p-4 rounded-2xl"
                          style={{ background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.12)' }}>
                          <div className="flex items-center gap-2 mb-1.5">
                            <Clock size={14} style={{ color: '#2563EB' }} />
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#2563EB' }}>
                              When to Apply
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: '#1E3A8A' }}>{solution.timing}</p>
                        </div>

                        {/* Safety */}
                        <div className="p-4 rounded-2xl"
                          style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                          <div className="flex items-center gap-2 mb-1.5">
                            <AlertTriangle size={14} style={{ color: '#D97706' }} />
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#D97706' }}>
                              Safety Tips
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed" style={{ color: '#92400E' }}>{solution.safetyTip}</p>
                        </div>

                        {/* Farmer tip */}
                        <div className="p-4 rounded-2xl"
                          style={{ background: 'var(--cream)', border: '1px solid var(--cream-dark)' }}>
                          <div className="flex items-center gap-2 mb-1.5">
                            <Lightbulb size={14} style={{ color: 'var(--gold)' }} />
                            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--gold)' }}>
                              Expert Farmer Tip
                            </span>
                          </div>
                          <p className="text-sm italic leading-relaxed" style={{ color: 'var(--ink-soft)' }}>{solution.farmerTip}</p>
                        </div>

                        {/* CTA */}
                        <a
                          href={`https://wa.me/919347959693?text=${waMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gold flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm mt-2"
                        >
                          <MessageCircle size={16} />
                          Get on WhatsApp
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-base" style={{ color: 'var(--ink-soft)' }}>
                    No {activeFilter.toLowerCase()} products for this crop. Try "All".
                  </p>
                </div>
              )}

              {/* Change crop */}
              <button
                onClick={() => { setSelectedCrop(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="mt-12 inline-flex items-center gap-2 text-sm font-bold transition-colors hover:opacity-80 px-5 py-3 rounded-xl"
                style={{ color: 'var(--green-mid)', background: 'white', border: '1.5px solid var(--cream-dark)' }}
              >
                <ChevronLeft size={16} />
                Choose a different crop
              </button>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Empty state instruction */}
        {!selectedCrop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center py-16 px-6 rounded-3xl relative overflow-hidden"
            style={{ background: 'white', border: '2px dashed #D1D5DB' }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(239,159,39,0.12)' }}>
              <ChevronDown size={28} style={{ color: 'var(--gold)' }} className="animate-bounce" />
            </div>
            <h3 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--green-deep)' }}>
              Tap a crop above to get started
            </h3>
            <p className="text-base max-w-md mx-auto" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
              We'll show you exactly which Zenviro products to use, how much to apply, and when.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
