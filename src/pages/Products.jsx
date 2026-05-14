import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, PackageSearch, X, Bug, Microscope, Sprout, TrendingUp, Atom, Leaf } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const sortOptions = [
  { value: 'featured', label: 'Featured First' },
  { value: 'az', label: 'Name A → Z' },
  { value: 'category', label: 'By Category' },
];

const categoryIcons = {
  insecticides: Bug,
  fungicides: Microscope,
  herbicides: Sprout,
  'plant-growth': TrendingUp,
  micronutrients: Atom,
  biostimulants: Leaf,
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [sort, setSort] = useState('featured');

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 250);
    return () => clearTimeout(t);
  }, [search]);

  // Sync category from URL
  useEffect(() => {
    const cat = searchParams.get('category');
    setActiveCategory(cat || 'all');
  }, [searchParams]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'all') setSearchParams({});
    else setSearchParams({ category: cat });
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.formulation.toLowerCase().includes(q) ||
        p.crops.some(c => c.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (sort === 'az') list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'category') list.sort((a, b) => a.category.localeCompare(b.category));
    if (sort === 'featured') list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [activeCategory, debouncedSearch, sort]);

  const categoryLabel = activeCategory === 'all' ? 'All Products' :
    categories.find(c => c.id === activeCategory)?.label || activeCategory;

  return (
    <div style={{ background: 'var(--cream)' }} className="min-h-screen">
      {/* PAGE HEADER — full-bleed, generous padding */}
      <header style={{ background: 'var(--green-deep)' }} className="pt-32 pb-20 relative overflow-hidden">
        {/* Decorative radial glows */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 90% 30%, rgba(239,159,39,0.12) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 40% 50% at 10% 80%, rgba(99,153,34,0.08) 0%, transparent 60%)' }} />

        {/* Field lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hdr-field" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
              <line x1="0" y1="0" x2="0" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hdr-field)"/>
        </svg>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
              style={{ background: 'rgba(239,159,39,0.15)', color: 'var(--gold)', border: '1px solid rgba(239,159,39,0.25)' }}>
              <Leaf size={12} />
              Our Product Range
            </div>
            <h1 className="font-display font-bold text-white leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-0.025em' }}>
              16 Premium Products,
              <br />
              <span style={{ color: 'var(--gold)' }}>One Trusted Partner.</span>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
              From flagship insecticides to precision micronutrients — every product is hand-picked for Telangana's farms.
            </p>
          </motion.div>
        </div>
      </header>

      {/* SEARCH + FILTERS — premium spacious layout */}
      <section className="sticky top-[84px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-100" style={{ boxShadow: '0 2px 12px rgba(15,61,31,0.04)' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          {/* Search bar — premium with gradient glow on focus */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-5 mb-6">
            <div className="relative flex-1 max-w-2xl group">
              {/* Glow ring on focus */}
              <div
                className="absolute -inset-0.5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, var(--green-leaf) 0%, var(--gold) 50%, var(--green-mid) 100%)',
                  filter: 'blur(8px)',
                }}
              />

              {/* Icon container */}
              <div className="absolute left-0 top-0 bottom-0 flex items-center pl-2 pointer-events-none z-10">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: search
                      ? 'linear-gradient(135deg, var(--green-mid) 0%, var(--green-deep) 100%)'
                      : 'linear-gradient(135deg, rgba(26,92,42,0.1) 0%, rgba(99,153,34,0.08) 100%)',
                    boxShadow: search ? '0 4px 12px rgba(26,92,42,0.25)' : 'none',
                  }}
                >
                  <Search size={18} style={{ color: search ? '#fff' : 'var(--green-mid)' }} className="transition-colors" />
                </div>
              </div>

              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by product, crop, or category…"
                className="relative w-full pr-14 py-4 rounded-2xl text-base font-medium outline-none transition-all duration-300"
                style={{
                  background: '#FFFFFF',
                  color: 'var(--ink)',
                  border: '2px solid #E5E7EB',
                  boxShadow: '0 4px 16px rgba(15,61,31,0.06)',
                  paddingLeft: '62px',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--green-mid)'; e.target.style.boxShadow = '0 8px 24px rgba(26,92,42,0.12)'; }}
                onBlur={e => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = '0 4px 16px rgba(15,61,31,0.06)'; }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110 z-10"
                  style={{
                    background: 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)',
                    border: '1px solid #FCA5A5',
                  }}
                  aria-label="Clear search"
                >
                  <X size={14} style={{ color: '#DC2626' }} strokeWidth={2.5} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl border border-gray-200" style={{ background: '#FAF6EE' }}>
                <SlidersHorizontal size={16} style={{ color: 'var(--ink-soft)' }} />
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="text-sm font-medium outline-none cursor-pointer bg-transparent pr-2"
                  style={{ color: 'var(--ink)' }}
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm font-semibold whitespace-nowrap" style={{ color: 'var(--ink-soft)' }}>
                <span className="font-display font-bold text-2xl" style={{ color: 'var(--green-deep)' }}>{filtered.length}</span>
                <span>product{filtered.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Category pills — generously spaced */}
          <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
            <button
              onClick={() => handleCategoryChange('all')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeCategory === 'all' ? 'text-white shadow-md' : 'hover:bg-gray-100'
              }`}
              style={activeCategory === 'all'
                ? { background: 'var(--green-mid)', boxShadow: '0 4px 12px rgba(26,92,42,0.25)' }
                : { background: '#F3F4F6', color: 'var(--ink-soft)', border: '1.5px solid transparent' }}
            >
              All <span className="opacity-70 text-xs">({products.length})</span>
            </button>
            {categories.map(cat => {
              const Icon = categoryIcons[cat.id];
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    isActive ? 'text-white shadow-md' : 'hover:bg-gray-100'
                  }`}
                  style={isActive
                    ? { background: 'var(--green-mid)', boxShadow: '0 4px 12px rgba(26,92,42,0.25)' }
                    : { background: '#F3F4F6', color: 'var(--ink-soft)' }}
                >
                  <Icon size={14} />
                  {cat.label}
                  <span className="opacity-70 text-xs">({cat.count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID — generous spacing */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {activeCategory !== 'all' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-10"
          >
            <h2 className="font-display font-bold text-3xl mb-2" style={{ color: 'var(--green-deep)', letterSpacing: '-0.02em' }}>
              {categoryLabel}
            </h2>
            <p className="text-base" style={{ color: 'var(--ink-soft)' }}>
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'} in this category
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ background: 'var(--cream-dark)' }}>
                <PackageSearch size={42} style={{ color: 'var(--ink-soft)' }} />
              </div>
              <h3 className="font-display font-bold text-2xl mb-3" style={{ color: 'var(--green-deep)' }}>
                No products match
              </h3>
              <p className="text-base mb-8 max-w-md" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                We couldn't find products matching "<span className="font-semibold">{debouncedSearch || activeCategory}</span>". Try different search terms or browse all products.
              </p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('all'); setSearchParams({}); }}
                className="px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--green-mid)', color: 'white', boxShadow: '0 4px 16px rgba(26,92,42,0.25)' }}
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7"
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
