import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileDown, MessageCircle, Info, HandCoins } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import EmptyState from '../components/EmptyState';
import { categories, products, formatINR } from '../data/products';
import { COMPANY, DISCLAIMERS, DOWNLOADS, waHref, waProductMessage } from '../config/company';
import { useLang } from '../i18n';

export default function Pricing() {
  const { t } = useLang();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories
      .filter((c) => activeCategory === 'all' || c.id === activeCategory)
      .map((c) => ({
        ...c,
        items: products.filter(
          (p) =>
            p.category === c.id &&
            (!q || p.name.toLowerCase().includes(q) || (p.teluguName ?? '').includes(query.trim())),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [query, activeCategory]);

  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <Seo
        title="Price List | Zenviro Agro Chemicals"
        description="Official Zenviro Agro Chemicals price list — every product, pack size and price across the Zenvi Nutrition, Pesticide & Fungicide and Premium Crop Care lines. Dealer and bulk discounts available."
        path="/pricing"
      />

      <section className="border-b border-line/70 bg-forest-dark text-cream">
        <div className="container-site py-14 sm:py-16">
          <Reveal>
            <p className="eyebrow !text-gold-soft mb-3">— Product Price List —</p>
            <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">{t('pricing')}</h1>
            <p className="mt-4 max-w-2xl text-base text-cream/75 sm:text-lg">
              {COMPANY.tagline} · <span lang="te" className="font-telugu">{COMPANY.taglineTelugu}</span>
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-7 flex flex-wrap items-center gap-3">
            <a href={DOWNLOADS.priceList} download data-analytics="download-price-list" className="btn-gold !py-2.5">
              <FileDown className="h-4 w-4" aria-hidden="true" />
              {t('downloadPriceList')}
            </a>
            <a href={DOWNLOADS.catalog} download data-analytics="download-catalog" className="btn-light !py-2.5">
              <FileDown className="h-4 w-4" aria-hidden="true" />
              {t('downloadCatalog')}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section !pt-10 bg-cream">
        <div className="container-site">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full max-w-md">
              <span className="sr-only">Search price list by product name</span>
              <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the price list…"
                className="input !rounded-full !pl-11"
              />
            </label>
            <div role="group" aria-label="Filter price list by category" className="flex flex-wrap gap-2">
              {[{ id: 'all', short: 'All Lines' }, ...categories].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCategory(c.id)}
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
          </div>

          <div className="mb-8 flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/8 px-4 py-3.5">
            <HandCoins className="mt-0.5 h-5 w-5 shrink-0 text-[#8a6d12]" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-ink">
              <strong>Bulk & dealer discounts available.</strong>{' '}
              <Link to="/contact?type=dealer" className="font-semibold text-leaf underline-offset-2 hover:underline" data-analytics="dealer-enquiry">
                Contact us for dealer pricing
              </Link>
              . <span lang="te" className="font-telugu text-ink-soft">{DISCLAIMERS.priceTelugu}</span>
            </p>
          </div>

          {total === 0 ? (
            <EmptyState
              title="No products match your search"
              hint="Try a shorter name or clear the filters."
              onReset={() => {
                setQuery('');
                setActiveCategory('all');
              }}
            />
          ) : (
            <div className="flex flex-col gap-12">
              {groups.map((group) => (
                <Reveal key={group.id}>
                  <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-xl font-extrabold text-forest-dark sm:text-2xl">
                      {group.name}{' '}
                      <span lang="te" className="ml-1 font-telugu text-sm font-medium text-ink-soft">
                        {group.teluguName}
                      </span>
                    </h2>
                    <span className="badge-line">{group.items.length} products</span>
                  </div>

                  {/* desktop table */}
                  <div className="card hidden overflow-hidden md:block">
                    <table className="w-full text-left text-sm">
                      <caption className="sr-only">{group.name} prices</caption>
                      <thead>
                        <tr className="border-b border-line bg-mist text-[0.7rem] font-bold uppercase tracking-wider text-ink-soft">
                          <th scope="col" className="px-6 py-3.5">Product</th>
                          <th scope="col" className="px-6 py-3.5">Type</th>
                          <th scope="col" className="px-6 py-3.5">Pack Size</th>
                          <th scope="col" className="px-6 py-3.5 text-right">Price</th>
                          <th scope="col" className="px-6 py-3.5 text-right"><span className="sr-only">Actions</span></th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.items.flatMap((p) =>
                          p.variants.map((v, vi) => (
                            <tr key={`${p.id}-${v.size}`} className="border-b border-line/60 transition-colors last:border-0 hover:bg-mist/60">
                              <td className="px-6 py-3.5">
                                {vi === 0 ? (
                                  <Link to={`/products/${p.id}`} className="font-bold text-forest-dark hover:text-leaf">
                                    {p.name}
                                    <span lang="te" className="ml-2 font-telugu text-xs font-normal text-ink-soft">{p.teluguName}</span>
                                  </Link>
                                ) : (
                                  <span className="sr-only">{p.name}</span>
                                )}
                              </td>
                              <td className="px-6 py-3.5">
                                {vi === 0 && p.type ? <span className="badge-gold">{p.type}</span> : null}
                              </td>
                              <td className="px-6 py-3.5 font-medium text-ink">{v.size}</td>
                              <td className="px-6 py-3.5 text-right font-display text-[0.95rem] font-extrabold text-forest">
                                {formatINR(v.price)}
                              </td>
                              <td className="px-6 py-3.5 text-right">
                                <a
                                  href={waHref(waProductMessage(p.name, v.size))}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-analytics="whatsapp-product-enquiry"
                                  aria-label={`WhatsApp enquiry for ${p.name} ${v.size}`}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#178a45] hover:underline"
                                >
                                  <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                  {t('enquireNow')}
                                </a>
                              </td>
                            </tr>
                          )),
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* mobile cards */}
                  <ul className="grid gap-4 md:hidden">
                    {group.items.map((p) => (
                      <li key={p.id} className="card p-5">
                        <div className="mb-3 flex items-start justify-between gap-2">
                          <div>
                            <Link to={`/products/${p.id}`} className="font-bold text-forest-dark hover:text-leaf">
                              {p.name}
                            </Link>
                            <p lang="te" className="font-telugu text-xs text-ink-soft">{p.teluguName}</p>
                          </div>
                          {p.type && <span className="badge-gold shrink-0">{p.type}</span>}
                        </div>
                        <ul className="flex flex-col gap-2">
                          {p.variants.map((v) => (
                            <li key={v.size} className="flex items-center justify-between rounded-lg bg-mist px-3.5 py-2.5 text-sm">
                              <span className="font-medium text-ink">{v.size}</span>
                              <span className="font-display font-extrabold text-forest">{formatINR(v.price)}</span>
                            </li>
                          ))}
                        </ul>
                        <a
                          href={waHref(waProductMessage(p.name, p.variants[0].size))}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-analytics="whatsapp-product-enquiry"
                          className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#178a45]"
                        >
                          <MessageCircle className="h-4 w-4" aria-hidden="true" />
                          {t('enquireNow')}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-14 flex items-start gap-3 rounded-xl border border-line bg-white px-5 py-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-ink-soft" aria-hidden="true" />
            <div className="text-sm leading-relaxed text-ink-soft">
              <p className="font-semibold text-ink">{DISCLAIMERS.price}</p>
              <p className="mt-1">{DISCLAIMERS.safety}</p>
              <p className="mt-1 text-xs">GST: {COMPANY.gst} · {COMPANY.name}, {COMPANY.address.full}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
