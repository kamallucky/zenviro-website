import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, FileDown } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';
import { categories, products } from '../data/products';
import { DOWNLOADS } from '../config/company';
import { useLang } from '../i18n';

export default function Products() {
  const { t } = useLang();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') ?? 'all';
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const inCategory = activeCategory === 'all' || p.category === activeCategory;
      const matches =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.teluguName ?? '').includes(query.trim()) ||
        (p.type ?? '').toLowerCase().includes(q);
      return inCategory && matches;
    });
  }, [query, activeCategory]);

  const setCategory = (id) => {
    if (id === 'all') searchParams.delete('category');
    else searchParams.set('category', id);
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <>
      <Seo
        title="Products | Zenviro Agro Chemicals"
        description="Browse the full Zenviro Agro Chemicals range — Zenvi Nutrition Line, Pesticide & Fungicide Line and Premium Crop Care Line with pack sizes, prices and direct enquiry."
        path="/products"
      />

      <section className="border-b border-line/70 bg-beige">
        <div className="container-site py-14 sm:py-16">
          <Reveal>
            <p className="eyebrow mb-3">Product Range</p>
            <h1 className="text-3xl font-extrabold text-forest-dark sm:text-4xl lg:text-5xl">
              {t('products')}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-ink-soft sm:text-lg">
              {products.length} products across three lines, with real pack imagery from our
              official catalog and pricing from the published price list.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="relative block w-full max-w-md">
              <span className="sr-only">Search products by name</span>
              <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products — e.g. Titanic, Roxcin…"
                className="input !rounded-full !pl-11"
              />
            </label>
            <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
              {[{ id: 'all', short: 'All' }, ...categories].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  aria-pressed={activeCategory === c.id}
                  className={`rounded-full px-4 py-2 text-[0.8rem] font-semibold transition-all ${
                    activeCategory === c.id
                      ? 'bg-forest text-cream shadow-[0_8px_20px_-8px_rgb(11_61_46/0.5)]'
                      : 'border border-line bg-white text-ink-soft hover:border-leaf hover:text-forest'
                  }`}
                >
                  {c.short}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section !pt-12 bg-cream">
        <div className="container-site">
          <p aria-live="polite" className="mb-6 text-sm font-medium text-ink-soft">
            Showing {filtered.length} of {products.length} products
          </p>
          {filtered.length === 0 ? (
            <EmptyState
              title="No products match your search"
              hint="Try a different name, or clear the search and category filters."
              onReset={() => {
                setQuery('');
                setCategory('all');
              }}
            />
          ) : (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          <Reveal className="mt-16">
            <div className="card flex flex-col items-center gap-5 bg-linear-to-br from-forest to-forest-dark p-10 text-center text-cream sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h2 className="text-xl font-extrabold">Need the complete price list?</h2>
                <p className="mt-1.5 text-sm text-cream/70">
                  View every pack size and price, or download the official PDF documents.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/pricing" className="btn-gold !py-2.5">
                  {t('viewPriceList')}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href={DOWNLOADS.priceList} download data-analytics="download-price-list" className="btn-light !py-2.5">
                  <FileDown className="h-4 w-4" aria-hidden="true" />
                  PDF
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
