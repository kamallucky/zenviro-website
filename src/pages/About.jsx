import { Link } from 'react-router-dom';
import {
  ShieldCheck, BookOpenCheck, Warehouse, Scale, PhoneCall, Sprout,
  FileText, Phone, MessageCircle, Mail, MapPin, ArrowRight,
} from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { COMPANY, DISCLAIMERS, telHref, mailHref, waHref, mapsHref } from '../config/company';
import { useLang } from '../i18n';
import cropsCollage from '../assets/catalog/crops-collage.webp';

const SAFETY_POINTS = [
  { Icon: BookOpenCheck, title: 'Read the label first', text: 'Always read and follow product label instructions before any use.' },
  { Icon: ShieldCheck, title: 'Use safety practices', text: 'Follow recommended protective practices whenever handling crop protection products.' },
  { Icon: Warehouse, title: 'Store responsibly', text: 'Keep products safely stored, away from children, food and animal feed.' },
  { Icon: Scale, title: 'Follow regulations', text: 'Use products in accordance with applicable local agricultural regulations.' },
  { Icon: PhoneCall, title: 'Ask for guidance', text: 'Contact our team or local agricultural experts whenever you are unsure.' },
  { Icon: Sprout, title: 'Protect your fields', text: 'Responsible usage protects your crops, your soil and the people who work your land.' },
];

export default function About() {
  const { t } = useLang();
  return (
    <>
      <Seo
        title="About Us | Zenviro Agro Chemicals"
        description="Zenviro Agro Chemicals — trusted agricultural nutrition and crop protection products for modern farming, manufactured and marketed from Hyderabad, Telangana. GST 36AAEFZ3738JIZQ."
        path="/about"
      />

      <section className="relative overflow-hidden bg-forest-dark text-cream">
        <div aria-hidden="true" className="absolute inset-0">
          <img src={cropsCollage} alt="" className="h-full w-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-linear-to-r from-forest-dark via-forest-dark/90 to-forest/70" />
        </div>
        <div className="container-site relative py-20 sm:py-24">
          <Reveal>
            <p className="eyebrow !text-gold-soft mb-4">{t('about')}</p>
            <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              {COMPANY.slogan}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
              {COMPANY.name} is focused on trusted agricultural nutrition and crop protection
              products for modern farming needs. With a practical product range across nutrition,
              pesticide, fungicide and premium crop care lines, the company supports farmers,
              dealers and distributors with clear product information, responsible guidance and
              reliable contact support.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-site grid gap-6 sm:grid-cols-3">
          {[
            { label: 'Manufactured & Marketed By', value: COMPANY.name, sub: COMPANY.address.full },
            { label: 'GST Number', value: COMPANY.gst, sub: 'Registered in Telangana, India' },
            { label: 'Positioning', value: 'Trusted Agricultural Nutrition & Crop Protection', sub: COMPANY.taglineTelugu, subTelugu: true },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} className="h-full">
              <div className="card h-full p-7">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink-soft">{item.label}</p>
                <p className="mt-3 font-display text-lg font-extrabold leading-snug text-forest-dark">{item.value}</p>
                <p
                  lang={item.subTelugu ? 'te' : undefined}
                  className={`mt-2 text-sm text-ink-soft ${item.subTelugu ? 'font-telugu' : ''}`}
                >
                  {item.sub}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="safety" className="section scroll-mt-24 bg-charcoal text-cream">
        <div className="container-site">
          <SectionHeader
            dark
            eyebrow="Safety & Responsible Usage"
            title="Crop protection works best when it is used responsibly"
            lead={DISCLAIMERS.safety}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SAFETY_POINTS.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 3) * 0.08} className="h-full">
                <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-gold/30 hover:bg-white/8">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold-soft ring-1 ring-gold/25">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mb-2 text-base font-extrabold">{title}</h3>
                  <p className="text-sm leading-relaxed text-cream/65">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="documents" className="section scroll-mt-24 bg-mist">
        <div className="container-site">
          <SectionHeader
            eyebrow="Documentation"
            title="Product labels & safety documents"
            lead="For product labels, usage guidance, and safety documentation, please contact Zenviro Agro Chemicals — our team will share the relevant information for each product."
          />
          <Reveal className="mx-auto max-w-2xl">
            <div className="card flex flex-col items-center gap-6 p-10 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-forest/8 text-forest ring-1 ring-forest/15">
                <FileText className="h-8 w-8" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-ink-soft">
                We do not publish dosage, composition or application instructions on this website.
                Always rely on the official product label and professional guidance.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={telHref()} className="btn-primary !py-2.5" data-analytics="contact-sales">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {t('callNow')}
                </a>
                <a
                  href={waHref(`Hi ${COMPANY.name}, I would like product label / safety documentation details.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-[#1faf57] !py-2.5 text-white hover:bg-[#178a45]"
                  data-analytics="whatsapp-product-enquiry"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {t('whatsapp')}
                </a>
                <a href={mailHref('Product label / safety documentation request')} className="btn-outline !py-2.5">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email Us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream !pt-0">
        <div className="container-site">
          <Reveal className="overflow-hidden rounded-3xl border border-line/80 bg-white shadow-(--shadow-card)">
            <div className="grid lg:grid-cols-[1fr_1fr]">
              <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
                <h2 className="text-2xl font-extrabold text-forest-dark sm:text-3xl">Visit us</h2>
                <address className="flex flex-col gap-3 text-sm not-italic text-ink-soft">
                  <span className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                    <span>
                      <strong className="text-ink">{COMPANY.name}</strong>
                      <br />
                      {COMPANY.address.line1},<br />
                      {COMPANY.address.line2}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <Phone className="h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                    <span>{COMPANY.phones.join(', ')}</span>
                  </span>
                  <span className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                    {COMPANY.email}
                  </span>
                </address>
                <div className="flex flex-wrap gap-3">
                  <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2.5">
                    Open in Google Maps
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <Link to="/contact" className="btn-primary !py-2.5">
                    {t('contact')}
                  </Link>
                </div>
              </div>
              <iframe
                title="Zenviro Agro Chemicals location map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(COMPANY.address.full)}&output=embed`}
                className="h-72 w-full border-0 lg:h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
