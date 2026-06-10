import { useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, MessageCircle, ShieldCheck, Send } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import {
  getProductById, getCategoryById, getRelatedProducts, formatINR,
} from '../data/products';
import { COMPANY, DISCLAIMERS, SITE_URL, telHref, waHref, waProductMessage } from '../config/company';
import { useLang } from '../i18n';

export default function ProductDetail() {
  const { t } = useLang();
  const { id } = useParams();
  const product = getProductById(id);

  const jsonLd = useMemo(() => {
    if (!product) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      brand: { '@type': 'Brand', name: COMPANY.name },
      category: getCategoryById(product.category)?.name,
      offers: product.variants.map((v) => ({
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: v.price,
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        name: `${product.name} ${v.size}`,
        url: `${SITE_URL}/products/${product.id}`,
      })),
    };
  }, [product]);

  if (!product) return <Navigate to="/products" replace />;

  const category = getCategoryById(product.category);
  const related = getRelatedProducts(product);

  return (
    <>
      <Seo
        title={`${product.name} | ${category.name} | ${COMPANY.name}`}
        description={`${product.name} (${product.teluguName}) — ${product.description} Pack sizes from ${product.variants[product.variants.length - 1].size}. Contact ${COMPANY.name} for enquiries.`}
        path={`/products/${product.id}`}
        jsonLd={jsonLd}
      />

      <nav aria-label="Breadcrumb" className="border-b border-line/70 bg-beige">
        <div className="container-site flex items-center gap-1.5 py-4 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-forest">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link to="/products" className="hover:text-forest">Products</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span aria-current="page" className="font-semibold text-forest">{product.name}</span>
        </div>
      </nav>

      <section className="section bg-cream">
        <div className="container-site grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.21, 0.65, 0.32, 1] }}
          >
            <div className="tilt-zone">
              <div className="tilt-card relative overflow-hidden rounded-3xl border border-line/80 bg-linear-to-br from-mist via-white to-beige p-10 shadow-(--shadow-card) sm:p-14">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgb(72_168_104/0.12),transparent_60%)]" />
                <span aria-hidden="true" className="absolute inset-x-16 bottom-10 h-7 rounded-[50%] bg-forest/15 blur-lg" />
                <img
                  src={product.image}
                  alt={`${product.name} (${product.teluguName}) product pack`}
                  className="tilt-pop relative mx-auto h-72 w-auto max-w-full rounded-xl object-contain drop-shadow-[0_28px_32px_rgb(23_33_28/0.3)] sm:h-96"
                />
              </div>
            </div>
          </motion.div>

          <Reveal y={20} className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-type">{category.name}</span>
              {product.type && <span className="badge-gold">{product.type}</span>}
            </div>

            <div>
              <h1 className="text-4xl font-extrabold text-forest-dark sm:text-5xl">{product.name}</h1>
              <p lang="te" className="mt-2 font-telugu text-lg text-ink-soft">{product.teluguName}</p>
              {product.tagline && (
                <p className="mt-3 text-base font-semibold text-leaf">{product.tagline}</p>
              )}
            </div>

            <p className="max-w-xl text-base leading-relaxed text-ink-soft">{product.description}</p>

            <div className="card overflow-hidden">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">{product.name} pack sizes and prices</caption>
                <thead>
                  <tr className="border-b border-line bg-mist text-[0.7rem] font-bold uppercase tracking-wider text-ink-soft">
                    <th scope="col" className="px-5 py-3">Pack Size</th>
                    <th scope="col" className="px-5 py-3 text-right">Price</th>
                    <th scope="col" className="px-5 py-3 text-right"><span className="sr-only">Enquire</span></th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((v) => (
                    <tr key={v.size} className="border-b border-line/60 last:border-0">
                      <td className="px-5 py-3.5 font-semibold text-ink">{v.size}</td>
                      <td className="px-5 py-3.5 text-right font-display text-base font-extrabold text-forest">
                        {formatINR(v.price)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <a
                          href={waHref(waProductMessage(product.name, v.size))}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-analytics="whatsapp-product-enquiry"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#178a45] hover:underline"
                          aria-label={`WhatsApp enquiry for ${product.name} ${v.size}`}
                        >
                          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          {t('enquireNow')}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-ink-soft">{DISCLAIMERS.price}</p>

            <div className="flex flex-wrap gap-3">
              <Link
                to={`/contact?product=${encodeURIComponent(`${product.name} (${product.variants[0].size})`)}&type=product`}
                className="btn-primary"
                data-analytics="contact-sales"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                {t('enquireNow')}
              </Link>
              <a
                href={waHref(waProductMessage(product.name, product.variants[0].size))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-[#1faf57] text-white hover:bg-[#178a45] hover:-translate-y-0.5"
                data-analytics="whatsapp-product-enquiry"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t('whatsapp')}
              </a>
              <a href={telHref()} className="btn-outline" data-analytics="contact-sales">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {t('callNow')}
              </a>
            </div>

            <aside className="flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/8 px-4 py-3.5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#8a6d12]" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-ink">
                <strong>Safety note:</strong> {DISCLAIMERS.productSafety}
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-mist !pt-16">
          <div className="container-site">
            <Reveal>
              <h2 className="mb-8 text-2xl font-extrabold text-forest-dark sm:text-3xl">
                More from the {category.name}
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.07} className="h-full">
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
