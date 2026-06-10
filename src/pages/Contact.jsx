import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { COMPANY, DISCLAIMERS, telHref, mailHref, waHref, mapsHref } from '../config/company';
import { products } from '../data/products';
import { useLang } from '../i18n';

const ENQUIRY_TYPES = [
  { id: 'farmer', label: 'Farmer Enquiry' },
  { id: 'dealer', label: 'Dealer Enquiry' },
  { id: 'distributor', label: 'Distributor Enquiry' },
  { id: 'bulk', label: 'Bulk Order' },
  { id: 'product', label: 'Product Question' },
  { id: 'general', label: 'General Question' },
];

export default function Contact() {
  const { t } = useLang();
  const [searchParams] = useSearchParams();
  const [sent, setSent] = useState(false);

  const prefillProduct = searchParams.get('product') ?? '';
  const prefillType = searchParams.get('type') ?? 'farmer';

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
      location: '',
      product: prefillProduct,
      enquiryType: ENQUIRY_TYPES.some((e) => e.id === prefillType) ? prefillType : 'farmer',
      message: '',
    },
  });

  useEffect(() => {
    document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const buildMessage = (data) => {
    const type = ENQUIRY_TYPES.find((e) => e.id === data.enquiryType)?.label ?? 'Enquiry';
    return [
      `Hi ${COMPANY.name}, new ${type.toLowerCase()} from the website:`,
      data.name && `Name: ${data.name}`,
      data.mobile && `Mobile: ${data.mobile}`,
      data.location && `Location: ${data.location}`,
      data.product && `Interested product: ${data.product}`,
      data.message && `Message: ${data.message}`,
    ].filter(Boolean).join('\n');
  };

  const onSubmit = (data) => {
    // No backend — hand the structured enquiry to WhatsApp, our fastest channel.
    window.open(waHref(buildMessage(data)), '_blank', 'noopener,noreferrer');
    setSent(true);
    reset({ ...data, message: '' });
  };

  return (
    <>
      <Seo
        title="Contact Us | Zenviro Agro Chemicals"
        description={`Contact Zenviro Agro Chemicals for farmer, dealer, distributor and bulk order enquiries. Call ${COMPANY.phones[0]}, WhatsApp, or email ${COMPANY.email}.`}
        path="/contact"
      />

      <section className="border-b border-line/70 bg-beige">
        <div className="container-site py-14 sm:py-16">
          <Reveal>
            <p className="eyebrow mb-3">{t('contact')}</p>
            <h1 className="text-3xl font-extrabold text-forest-dark sm:text-4xl lg:text-5xl">
              Request a consultation
            </h1>
            <p className="mt-4 max-w-2xl text-base text-ink-soft sm:text-lg">
              Farmer questions, dealer pricing, distributor partnerships or bulk orders — send an
              enquiry and the Zenviro team will respond promptly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-site grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal id="enquiry-form" className="scroll-mt-28">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="card flex flex-col gap-5 p-7 sm:p-9">
              <h2 className="text-xl font-extrabold text-forest-dark">Send an enquiry</h2>

              {sent && (
                <p role="status" className="flex items-start gap-3 rounded-xl border border-leaf/30 bg-leaf/8 px-4 py-3.5 text-sm text-ink">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-leaf" aria-hidden="true" />
                  Your enquiry has been opened in WhatsApp — press send there to reach us instantly.
                  You can also call us directly on {COMPANY.phones[0]}.
                </p>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">Name *</label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    className="input"
                    placeholder="Your full name"
                    aria-invalid={errors.name ? 'true' : undefined}
                    {...register('name', { required: 'Please enter your name' })}
                  />
                  {errors.name && <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="mobile" className="mb-1.5 block text-sm font-semibold text-ink">Mobile Number *</label>
                  <input
                    id="mobile"
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    className="input"
                    placeholder="10-digit mobile number"
                    aria-invalid={errors.mobile ? 'true' : undefined}
                    {...register('mobile', {
                      required: 'Please enter your mobile number',
                      pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' },
                    })}
                  />
                  {errors.mobile && <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">{errors.mobile.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">Email</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="input"
                    placeholder="you@example.com"
                    aria-invalid={errors.email ? 'true' : undefined}
                    {...register('email', {
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                    })}
                  />
                  {errors.email && <p role="alert" className="mt-1.5 text-xs font-medium text-red-700">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="location" className="mb-1.5 block text-sm font-semibold text-ink">Location</label>
                  <input
                    id="location"
                    type="text"
                    autoComplete="address-level2"
                    className="input"
                    placeholder="Village / Mandal / District"
                    {...register('location')}
                  />
                </div>
                <div>
                  <label htmlFor="product" className="mb-1.5 block text-sm font-semibold text-ink">Interested Product</label>
                  <input
                    id="product"
                    type="text"
                    className="input"
                    list="product-options"
                    placeholder="e.g. Titanic, Roxcin…"
                    {...register('product')}
                  />
                  <datalist id="product-options">
                    {products.map((p) => (
                      <option key={p.id} value={p.name} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label htmlFor="enquiryType" className="mb-1.5 block text-sm font-semibold text-ink">Enquiry Type *</label>
                  <select id="enquiryType" className="input" {...register('enquiryType')}>
                    {ENQUIRY_TYPES.map((e) => (
                      <option key={e.id} value={e.id}>{e.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="input resize-y"
                  placeholder="Tell us about your crop, quantity or question…"
                  {...register('message')}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="btn-primary" data-analytics="contact-sales">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {t('sendEnquiry')}
                </button>
                <a
                  href={waHref(`Hi ${COMPANY.name}, I would like to make an enquiry.${prefillProduct ? ` Interested product: ${prefillProduct}.` : ''}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-[#1faf57] text-white hover:bg-[#178a45] hover:-translate-y-0.5"
                  data-analytics="whatsapp-product-enquiry"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Zenviro
                </a>
                <a href={telHref()} className="btn-outline" data-analytics="contact-sales">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {t('callNow')}
                </a>
              </div>
              <p className="text-xs leading-relaxed text-ink-soft">
                Submitting opens WhatsApp with your enquiry pre-filled — nothing is sent until you
                confirm there. {DISCLAIMERS.price}
              </p>
            </form>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={0.05}>
              <div className="card p-7">
                <h2 className="mb-5 text-lg font-extrabold text-forest-dark">Contact details</h2>
                <address className="flex flex-col gap-4 text-sm not-italic text-ink-soft">
                  <span className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                    <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="hover:text-forest">
                      <strong className="text-ink">{COMPANY.name}</strong>
                      <br />
                      {COMPANY.address.line1},<br />
                      {COMPANY.address.line2}
                    </a>
                  </span>
                  <span className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                    <span className="flex flex-col gap-1">
                      {COMPANY.phones.map((p) => (
                        <a key={p} href={telHref(p)} className="font-semibold text-ink hover:text-leaf">{p}</a>
                      ))}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-leaf" aria-hidden="true" />
                    <a href={mailHref()} className="break-all font-semibold text-ink hover:text-leaf">{COMPANY.email}</a>
                  </span>
                </address>
                <p className="mt-5 rounded-lg bg-mist px-3.5 py-2.5 text-xs text-ink-soft">
                  GST: <strong className="text-ink">{COMPANY.gst}</strong>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card overflow-hidden bg-forest-dark p-7 text-cream">
                <h2 className="mb-2 text-lg font-extrabold">Dealers & bulk buyers</h2>
                <p className="mb-5 text-sm leading-relaxed text-cream/70">
                  Bulk and dealer discounts available on the full Zenviro range. Talk to sales for
                  partner pricing.
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a href={telHref()} className="btn-gold !px-5 !py-2.5 text-xs" data-analytics="dealer-enquiry">
                    <Phone className="h-4 w-4" aria-hidden="true" /> Call Sales
                  </a>
                  <a
                    href={waHref(`Hi ${COMPANY.name}, I am interested in dealer/bulk pricing. Please share details.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-light !px-5 !py-2.5 text-xs"
                    data-analytics="bulk-order-enquiry"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp Sales
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <iframe
                title="Zenviro Agro Chemicals location map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(COMPANY.address.full)}&output=embed`}
                className="h-64 w-full rounded-2xl border border-line/80 shadow-(--shadow-card)"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
