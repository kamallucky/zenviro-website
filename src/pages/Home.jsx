import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Leaf, ShieldCheck, Sprout, Users, Phone, MessageCircle,
  BadgeCheck, FileDown, Layers, HandCoins, FlaskConical, BookOpenCheck, MapPin,
  CalendarDays,
} from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';
import SectionHeader from '../components/SectionHeader';
import ProductCard from '../components/ProductCard';
import { COMPANY, DISCLAIMERS, DOWNLOADS, telHref, waHref, mailHref } from '../config/company';
import { categories, products, featuredProducts, getProductsByCategory } from '../data/products';
import { crops } from '../data/crops';
import { catalogPages } from '../data/catalog';
import { seasons } from '../data/seasons';
import { useLang } from '../i18n';
import heroBasket from '../assets/catalog/hero-basket.webp';
import cropsCollage from '../assets/catalog/crops-collage.webp';
import predatorImg from '../assets/products/predator-product.webp';
import yieldoraImg from '../assets/products/yieldora-product.webp';
import zennutriImg from '../assets/products/zennutri-product.webp';
import blackRoockImg from '../assets/products/black-roock-product.webp';

const HERO_BADGES = [
  { Icon: BadgeCheck, label: 'Quality-Focused Products' },
  { Icon: HandCoins, label: 'Dealer & Bulk Discounts' },
  { Icon: Users, label: 'Farmer Support' },
  { Icon: ShieldCheck, label: 'Responsible Usage Guidance' },
];

const TRUST_METRICS = [
  { Icon: Leaf, value: '3', label: 'Product Lines', detail: 'Nutrition, protection and premium crop care ranges.' },
  { Icon: Layers, value: `${products.length}+`, label: 'Products & Packs', detail: 'A practical portfolio with multiple pack sizes.' },
  { Icon: HandCoins, value: 'B2B', label: 'Dealer & Bulk Support', detail: 'Dealer and bulk discounts on the full range.' },
  { Icon: Sprout, value: '8+', label: 'Crops Served', detail: 'Chilli, cotton, paddy, maize and more.' },
];

const WHY_POINTS = [
  { Icon: BadgeCheck, title: 'Quality-focused range', text: 'A curated portfolio across crop nutrition, pesticide, fungicide and premium crop care lines.' },
  { Icon: Sprout, title: 'Nutrition & protection', text: 'Products that support crops from root-zone nutrition through to field protection.' },
  { Icon: HandCoins, title: 'Dealer & bulk support', text: 'Bulk and dealer discounts with distributor-friendly product packaging and pricing.' },
  { Icon: Users, title: 'Farmer-focused support', text: 'Clear product information, Telugu naming and direct phone and WhatsApp guidance.' },
  { Icon: ShieldCheck, title: 'Responsible usage', text: 'Label-first communication and safety messaging across every product we market.' },
  { Icon: BookOpenCheck, title: 'Clear pricing', text: 'A published price list with transparent pack sizes — no surprises in the field.' },
];

const CATEGORY_IMAGES = { nutrition: zennutriImg, protection: blackRoockImg, premium: predatorImg };

function Hero() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-forest-dark text-cream">
      <div aria-hidden="true" className="absolute inset-0">
        <img src={cropsCollage} alt="" className="h-full w-full object-cover opacity-[0.14] blur-[2px]" />
        <div className="absolute inset-0 bg-linear-to-br from-forest-dark via-forest-dark/92 to-forest/85" />
        <div className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-leaf/25 blur-[140px]" />
        <div className="absolute -bottom-48 -left-24 h-[30rem] w-[30rem] rounded-full bg-gold/14 blur-[120px]" />
      </div>

      <div className="container-site relative grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.21, 0.65, 0.32, 1] }}
          className="flex flex-col items-start gap-7"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-4 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-gold-soft">
            <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
            {COMPANY.tagline}
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.07] sm:text-5xl lg:text-[3.6rem]">
            Advanced Crop Nutrition &{' '}
            <span className="bg-linear-to-r from-gold-soft via-gold to-gold-soft bg-clip-text text-transparent">
              Protection
            </span>{' '}
            for Healthier Fields
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
            {COMPANY.name} delivers quality-focused crop nutrition and crop protection solutions
            designed to support farmers, dealers and distributors with reliable products,
            responsible guidance and professional agricultural support.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/products" className="btn-gold" data-analytics="explore-products">
              {t('exploreProducts')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/pricing" className="btn-light">
              {t('viewPriceList')}
            </Link>
            <a href={telHref()} className="btn-light" data-analytics="contact-sales">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t('contactSales')}
            </a>
          </div>
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2.5">
            {HERO_BADGES.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-[0.8rem] font-medium text-cream/70">
                <Icon className="h-4 w-4 text-crop" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.21, 0.65, 0.32, 1] }}
          className="relative mx-auto w-full max-w-lg"
          aria-hidden="true"
        >
          <div className="absolute inset-x-8 -bottom-3 h-10 rounded-[50%] bg-black/45 blur-xl" />
          <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgb(201_162_39/0.2),transparent_62%)]" />
          <div className="animate-float-slow relative z-10 overflow-hidden rounded-[2.5rem] shadow-(--shadow-deep) ring-1 ring-white/20">
            <img src={heroBasket} alt="" fetchPriority="high" className="kenburns w-full" />
            <div className="absolute inset-0 bg-linear-to-t from-forest-dark/35 via-transparent to-forest-dark/10" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[2.5rem]" />
          </div>
          <div className="absolute -left-6 top-10 z-20 hidden animate-float rounded-2xl border border-white/15 bg-white/10 p-3 shadow-(--shadow-deep) backdrop-blur-md sm:block [animation-delay:0.8s]">
            <img src={yieldoraImg} alt="" className="h-24 w-auto rounded-lg" />
            <p className="mt-1.5 text-center text-[0.65rem] font-bold uppercase tracking-wider text-cream/85">Yieldora</p>
          </div>
          <div className="absolute -right-4 bottom-16 z-20 hidden animate-float rounded-2xl border border-white/15 bg-white/10 p-3 shadow-(--shadow-deep) backdrop-blur-md sm:block [animation-delay:1.6s]">
            <img src={predatorImg} alt="" className="h-24 w-auto rounded-lg" />
            <p className="mt-1.5 text-center text-[0.65rem] font-bold uppercase tracking-wider text-cream/85">Predator</p>
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-white/10 bg-white/4 backdrop-blur-sm">
        <div className="container-site grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {TRUST_METRICS.map(({ Icon, value, label, detail }, i) => (
            <Reveal key={label} delay={i * 0.08} y={16} className="flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-soft ring-1 ring-gold/25">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <CountUp value={value} className="block font-display text-xl font-extrabold text-cream" />
                <span className="block text-[0.8rem] font-semibold text-cream/85">{label}</span>
                <span className="mt-0.5 hidden text-xs leading-snug text-cream/55 sm:block">{detail}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductLines() {
  const { t } = useLang();
  return (
    <section className="section bg-cream">
      <div className="container-site">
        <SectionHeader
          eyebrow="Product Lines"
          title="Three focused lines. One trusted brand."
          lead="Every Zenviro product belongs to a clearly defined line, so farmers and dealers always know exactly what they are choosing."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat, i) => {
            const count = getProductsByCategory(cat.id).length;
            return (
              <Reveal key={cat.id} delay={i * 0.1} className="h-full">
                <div className="tilt-zone h-full">
                  <article className="tilt-card card flex h-full flex-col overflow-hidden">
                    <div className="relative flex h-52 items-center justify-center bg-linear-to-br from-forest to-leaf p-6">
                      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgb(201_162_39/0.25),transparent_55%)]" />
                      <img
                        src={CATEGORY_IMAGES[cat.id]}
                        alt={`${cat.name} representative product`}
                        loading="lazy"
                        className="tilt-pop relative h-40 w-auto rounded-lg drop-shadow-[0_20px_24px_rgb(0_0_0/0.4)]"
                      />
                      <span className="absolute right-4 top-4 badge bg-white/15 text-cream ring-1 ring-white/25 backdrop-blur">
                        {count} products
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <h3 className="text-xl font-extrabold text-forest-dark">{cat.name}</h3>
                      <p lang="te" className="font-telugu text-sm text-ink-soft">{cat.teluguName}</p>
                      <p className="flex-1 text-sm leading-relaxed text-ink-soft">{cat.description}</p>
                      <Link
                        to={`/products?category=${cat.id}`}
                        className="group inline-flex items-center gap-2 text-sm font-bold text-leaf hover:text-forest"
                      >
                        {t('viewProducts')}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const { t } = useLang();
  return (
    <section className="section bg-mist">
      <div className="container-site">
        <SectionHeader
          eyebrow="Featured Products"
          title="Field-ready favourites"
          lead="A selection from the Zenviro range — real packs, transparent pricing and direct enquiry on every product."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.07} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Link to="/products" className="btn-primary" data-analytics="explore-products">
            {t('exploreProducts')} ({products.length})
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function CropSolutions() {
  return (
    <section id="crop-solutions" className="section scroll-mt-24 bg-cream">
      <div className="container-site">
        <SectionHeader
          eyebrow="Crop Solutions"
          title="Solutions for the crops you grow"
          lead="Explore crop nutrition and crop protection options for your fields. Contact our team for product guidance suited to your crop and season."
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {crops.map((crop, i) => (
            <Reveal key={crop.id} delay={(i % 4) * 0.07}>
              <figure className="group relative h-44 overflow-hidden rounded-2xl shadow-(--shadow-card) sm:h-52">
                <img
                  src={crop.image}
                  alt={`${crop.name} crop`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <figcaption className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-forest-dark/85 via-forest-dark/20 to-transparent p-4">
                  <p className="font-display text-lg font-extrabold text-cream">{crop.name}</p>
                  <p lang="te" className="font-telugu text-xs text-cream/75">{crop.teluguName}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-sm text-ink-soft">
            Looking for the right product for your crop? Our team will guide you on suitable
            options from the Zenviro range.
          </p>
          <Link to="/contact" className="btn-outline">
            Get Crop Guidance
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function SeasonGuide() {
  const [active, setActive] = useState('kharif');
  const season = seasons.find((s) => s.id === active);
  return (
    <section id="season-guide" className="section scroll-mt-24 bg-mist">
      <div className="container-site">
        <SectionHeader
          eyebrow="Crop Season Guide"
          title="What your crop needs, month by month"
          lead="A simple Telangana season guide — from sowing to harvest — with the Zenviro product line that fits each stage."
        />

        <Reveal className="mb-10 flex justify-center">
          <div className="inline-flex rounded-full border border-line bg-white p-1.5 shadow-(--shadow-card)" role="tablist" aria-label="Crop seasons">
            {seasons.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={active === s.id}
                onClick={() => setActive(s.id)}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                  active === s.id ? 'bg-forest text-cream shadow-md' : 'text-ink-soft hover:text-forest'
                }`}
              >
                {s.name}
                <span lang="te" className="font-telugu ml-1.5 text-xs font-medium opacity-75">{s.teluguName}</span>
                <span className="ml-2 hidden text-xs font-medium opacity-65 sm:inline">{s.months}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-ink-soft">{season.description}</p>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {season.stages.map((stage, i) => (
            <Reveal key={`${season.id}-${stage.crop}`} delay={i * 0.07} className="h-full">
              <article className="card flex h-full flex-col gap-3 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-(--shadow-lift)">
                <div className="flex items-center justify-between gap-2">
                  <span className="badge-gold">
                    <CalendarDays className="h-3 w-3" aria-hidden="true" />
                    {stage.months}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-forest-dark">{stage.crop}</h3>
                <p className="text-[0.8rem] font-bold uppercase tracking-wider text-leaf">{stage.focus}</p>
                <p className="flex-1 text-sm leading-relaxed text-ink-soft">{stage.tip}</p>
                <Link
                  to={`/products?category=${stage.category}`}
                  className="group mt-1 inline-flex items-center gap-1.5 text-[0.8rem] font-bold text-forest hover:text-leaf"
                >
                  {stage.categoryLabel}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-ink-soft">
            General seasonal guidance for Telangana growing conditions. Always read and follow
            product label instructions — contact our team for guidance specific to your field and crop stage.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function CatalogPreview() {
  const { t } = useLang();
  const preview = catalogPages.slice(2, 5);
  return (
    <section className="section bg-forest-dark text-cream">
      <div className="container-site">
        <SectionHeader
          dark
          eyebrow="Product Catalog"
          title="Browse the official Zenviro catalog"
          lead="Real packaging, real product ranges — from micronutrient bottles to chilli and cotton specials."
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {preview.map((page, i) => (
            <Reveal key={page.id} delay={i * 0.1}>
              <Link to="/catalog" className="group block overflow-hidden rounded-2xl border border-white/12 bg-white/5 p-2 backdrop-blur transition-transform duration-500 hover:-translate-y-2">
                <img
                  src={page.image}
                  alt={page.alt}
                  loading="lazy"
                  className="w-full rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <p className="px-2 py-3 text-sm font-semibold text-cream/85">{page.title}</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/catalog" className="btn-gold">
            View Full Catalog
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a href={DOWNLOADS.catalog} download data-analytics="download-catalog" className="btn-light">
            <FileDown className="h-4 w-4" aria-hidden="true" />
            {t('downloadCatalog')}
          </a>
          <a href={DOWNLOADS.priceList} download data-analytics="download-price-list" className="btn-light">
            <FileDown className="h-4 w-4" aria-hidden="true" />
            {t('downloadPriceList')}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function WhyZenviro() {
  return (
    <section className="section bg-cream">
      <div className="container-site">
        <SectionHeader
          eyebrow="Why Zenviro"
          title="Built for farmers. Structured for dealers."
          lead="A modern agrochemical brand with clear information, responsible messaging and a product range that works for the whole supply chain."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_POINTS.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.08} className="h-full">
              <article className="card group h-full p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-(--shadow-lift)">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-forest/8 text-forest ring-1 ring-forest/10 transition-colors group-hover:bg-gold/15 group-hover:text-[#8a6d12] group-hover:ring-gold/30">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-base font-extrabold text-forest-dark">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SafetyStrip() {
  return (
    <section className="bg-charcoal text-cream">
      <div className="container-site flex flex-col items-start gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
        <Reveal className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-soft ring-1 ring-gold/25">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold">Safety & Responsible Usage</h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-cream/70">{DISCLAIMERS.safety}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Link to="/about#safety" className="btn-light shrink-0">
            Read Safety Guidance
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function DealerCTA() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-forest text-cream">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-leaf/30 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/18 blur-[110px]" />
      </div>
      <div className="container-site relative section !py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <Reveal>
            <p className="eyebrow !text-gold-soft justify-center">
              <FlaskConical className="h-4 w-4" aria-hidden="true" />
              Dealers & Distributors
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Partner with {COMPANY.name}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-cream/75 sm:text-lg">
              Grow your agricultural business with a distributor-friendly product range,
              transparent pricing and direct support. <strong className="text-gold-soft">Bulk and dealer discounts available.</strong>
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-wrap justify-center gap-3">
            <a href={telHref()} className="btn-gold" data-analytics="dealer-enquiry">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Sales
            </a>
            <a
              href={waHref(`Hi ${COMPANY.name}, I am interested in a dealer/distributor partnership. Please share details.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-[#1faf57] text-white hover:bg-[#178a45] hover:-translate-y-0.5"
              data-analytics="whatsapp-product-enquiry"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Now
            </a>
            <Link to="/contact?type=dealer" className="btn-light" data-analytics="bulk-order-enquiry">
              {t('sendEnquiry')}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="section bg-beige">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <p className="eyebrow mb-4">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Visit or Reach Us
          </p>
          <h2 className="mb-4 text-3xl font-extrabold text-forest-dark sm:text-4xl">
            Talk to the Zenviro team
          </h2>
          <p className="mb-6 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
            Farmer questions, dealer enquiries or bulk orders — we respond on phone, WhatsApp and email.
          </p>
          <address className="flex flex-col gap-3 text-sm not-italic text-ink">
            <span className="font-semibold">{COMPANY.name}</span>
            <span className="text-ink-soft">{COMPANY.address.full}</span>
            <span className="flex flex-wrap gap-x-4 gap-y-1">
              {COMPANY.phones.map((p) => (
                <a key={p} href={telHref(p)} className="font-semibold text-leaf hover:text-forest">{p}</a>
              ))}
            </span>
            <a href={mailHref()} className="font-semibold text-leaf hover:text-forest">{COMPANY.email}</a>
            <span className="text-xs text-ink-soft">GST: {COMPANY.gst}</span>
          </address>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-4">
          <div className="card flex flex-col gap-4 p-8">
            <h3 className="text-lg font-extrabold text-forest-dark">Send a quick enquiry</h3>
            <p className="text-sm text-ink-soft">
              Use our enquiry form for product, dealer, distributor or bulk order questions —
              we will get back to you promptly.
            </p>
            <Link to="/contact" className="btn-primary w-full sm:w-auto" data-analytics="contact-sales">
              Open Enquiry Form
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="text-xs leading-relaxed text-ink-soft">{DISCLAIMERS.price}</p>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="Zenviro Agro Chemicals | Crop Nutrition & Crop Protection Products"
        description="Explore Zenviro Agro Chemicals product lines including agricultural nutrition, pesticide, fungicide, and premium crop care solutions with clear pricing, dealer support, and responsible usage guidance."
        path="/"
      />
      <Hero />
      <ProductLines />
      <Featured />
      <CropSolutions />
      <SeasonGuide />
      <CatalogPreview />
      <WhyZenviro />
      <SafetyStrip />
      <DealerCTA />
      <ContactBand />
    </>
  );
}
