import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileDown, ZoomIn, MessageCircle, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import Lightbox from '../components/Lightbox';
import { catalogPages } from '../data/catalog';
import { catalogOnlyProducts } from '../data/products';
import { COMPANY, DOWNLOADS, waHref, waProductMessage } from '../config/company';
import { useLang } from '../i18n';
import micronutrientsGroup from '../assets/catalog/micronutrients-group.webp';

export default function Catalog() {
  const { t } = useLang();
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <Seo
        title="Product Catalog | Zenviro Agro Chemicals"
        description="Browse the official Zenviro Agro Chemicals product catalog — combo products, chilli special, all-crops range, chilli & cotton special, micronutrients and plant growth promoters."
        path="/catalog"
      />

      <section className="border-b border-line/70 bg-beige">
        <div className="container-site py-14 sm:py-16">
          <Reveal>
            <p className="eyebrow mb-3">Official Catalog</p>
            <h1 className="text-3xl font-extrabold text-forest-dark sm:text-4xl lg:text-5xl">
              {t('catalog')}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-ink-soft sm:text-lg">
              Pages from the official {COMPANY.name} product catalog — real packaging, product
              groups and the crops they serve. Tap any page to view it in detail.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-7 flex flex-wrap gap-3">
            <a href={DOWNLOADS.catalog} download data-analytics="download-catalog" className="btn-primary !py-2.5">
              <FileDown className="h-4 w-4" aria-hidden="true" />
              {t('downloadCatalog')}
            </a>
            <a href={DOWNLOADS.priceList} download data-analytics="download-price-list" className="btn-outline !py-2.5">
              <FileDown className="h-4 w-4" aria-hidden="true" />
              {t('downloadPriceList')}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-site">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {catalogPages.map((page, i) => (
              <Reveal key={page.id} delay={(i % 4) * 0.07}>
                <button
                  type="button"
                  onClick={() => setLightbox(page)}
                  className="group block w-full overflow-hidden rounded-2xl border border-line/80 bg-white p-2 text-left shadow-(--shadow-card) transition-all duration-500 hover:-translate-y-2 hover:shadow-(--shadow-lift)"
                  aria-label={`View catalog page: ${page.title}`}
                >
                  <span className="relative block overflow-hidden rounded-xl">
                    <img
                      src={page.image}
                      alt={page.alt}
                      loading="lazy"
                      className="w-full transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-forest-dark/0 transition-colors duration-300 group-hover:bg-forest-dark/30">
                      <ZoomIn className="h-8 w-8 text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                    </span>
                  </span>
                  <span className="block px-2.5 pb-2 pt-3">
                    <span className="block text-sm font-bold text-forest-dark">{page.title}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-ink-soft">{page.description}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-mist !pt-0">
        <div className="container-site">
          <Reveal className="mb-10 overflow-hidden rounded-3xl border border-line/80 bg-white shadow-(--shadow-card)">
            <img
              src={micronutrientsGroup}
              alt="Zenviro water-soluble micronutrient bottle range — Boron, Zinc EDTA, Ferro EDDHA, Magnesium Sulphate, Fulvic Power, Amino Power, Seaweed Extract and Humic Power"
              loading="lazy"
              className="w-full"
            />
            <div className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-forest-dark">Micronutrients & Biostimulants</h2>
                <p className="text-sm text-ink-soft">Water-soluble fertilizer range from the official catalog.</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-extrabold text-forest-dark sm:text-3xl">From the catalog</h2>
            <p className="mt-2 text-sm text-ink-soft sm:text-base">
              These products appear in our catalog. Pricing is shared on request — contact our team for details.
            </p>
          </Reveal>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {catalogOnlyProducts.map((p, i) => (
              <Reveal key={p.id} delay={(i % 6) * 0.05} className="h-full">
                <li className="card flex h-full flex-col items-center gap-2 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-(--shadow-lift)">
                  <img
                    src={p.image}
                    alt={`${p.name} product pack`}
                    loading="lazy"
                    className="h-28 w-auto rounded-lg object-contain"
                  />
                  <p className="text-sm font-bold leading-tight text-forest-dark">{p.name}</p>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-ink-soft">{p.label}</p>
                  <a
                    href={waHref(waProductMessage(p.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics="whatsapp-product-enquiry"
                    className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-[#178a45] hover:underline"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    Contact for details
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14 text-center">
            <Link to="/products" className="btn-primary">
              {t('exploreProducts')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <Lightbox item={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
