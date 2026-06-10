import { Link } from 'react-router-dom';
import { Sprout, ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';
import { useLang } from '../i18n';

export default function NotFound() {
  const { t } = useLang();
  return (
    <>
      <Seo
        title="Page Not Found | Zenviro Agro Chemicals"
        description="The page you are looking for does not exist. Explore Zenviro Agro Chemicals products, pricing and catalog."
        path="/404"
      />
      <section className="section bg-cream">
        <div className="container-site flex flex-col items-center gap-6 py-20 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-forest/8 text-forest ring-1 ring-forest/15">
            <Sprout className="h-10 w-10" aria-hidden="true" />
          </span>
          <p className="font-display text-7xl font-extrabold text-forest-dark">404</p>
          <h1 className="text-2xl font-extrabold text-forest-dark sm:text-3xl">
            This field is empty
          </h1>
          <p className="max-w-md text-sm text-ink-soft sm:text-base">
            The page you are looking for doesn't exist or has moved. Head back to explore our
            crop nutrition and protection range.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t('home')}
            </Link>
            <Link to="/products" className="btn-outline">{t('exploreProducts')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
