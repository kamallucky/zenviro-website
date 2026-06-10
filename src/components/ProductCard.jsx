import { Link } from 'react-router-dom';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { formatINR, startingPrice, getCategoryById } from '../data/products';
import { waHref, waProductMessage } from '../config/company';
import { useLang } from '../i18n';

export default function ProductCard({ product }) {
  const { t } = useLang();
  const category = getCategoryById(product.category);
  const from = startingPrice(product);
  const multi = product.variants.length > 1;

  return (
    <div className="tilt-zone h-full">
      <article className="tilt-card card flex h-full flex-col overflow-hidden">
        <Link
          to={`/products/${product.id}`}
          aria-label={`${product.name} — ${t('viewDetails')}`}
          className="group relative block bg-linear-to-b from-mist to-beige/60 p-6"
        >
          <span className="absolute left-4 top-4 z-10 flex flex-col items-start gap-1.5">
            <span className="badge-line bg-white/80 backdrop-blur">{category.short}</span>
            {product.type && <span className="badge-gold bg-white/80 backdrop-blur">{product.type}</span>}
          </span>
          <span aria-hidden="true" className="absolute inset-x-10 bottom-5 h-5 rounded-[50%] bg-forest/15 blur-md" />
          <img
            src={product.image}
            alt={`${product.name} product pack`}
            loading="lazy"
            className="tilt-pop relative mx-auto h-44 w-auto max-w-full rounded-lg object-contain drop-shadow-[0_14px_18px_rgb(23_33_28/0.22)] sm:h-48"
          />
        </Link>

        <div className="flex flex-1 flex-col gap-1 px-5 pb-5 pt-4">
          <h3 className="text-lg font-extrabold text-forest-dark">
            <Link to={`/products/${product.id}`} className="hover:text-leaf">
              {product.name}
            </Link>
          </h3>
          {product.teluguName && (
            <p lang="te" className="font-telugu text-sm text-ink-soft">{product.teluguName}</p>
          )}

          <div className="mt-3 flex items-end justify-between gap-2">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-ink-soft">
                {multi ? `${t('startingFrom')} · ${product.variants.length} sizes` : product.variants[0].size}
              </p>
              <p className="text-xl font-extrabold text-forest">{formatINR(from)}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Link to={`/products/${product.id}`} className="btn-outline flex-1 !px-4 !py-2.5 text-[0.8rem]">
              {t('viewDetails')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={waHref(waProductMessage(product.name, product.variants[0].size))}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics="whatsapp-product-enquiry"
              aria-label={`WhatsApp enquiry for ${product.name}`}
              className="btn !p-2.5 bg-[#1faf57] text-white hover:bg-[#178a45] hover:-translate-y-0.5"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
