import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, MessageCircle, Mail, MapPin, CheckCircle, Send, ExternalLink,
  Sparkles, Clock,
} from 'lucide-react';

const crops = [
  'Chilli', 'Rice', 'Cotton', 'Maize', 'Groundnut', 'Wheat', 'Tomato', 'Brinjal',
  'Grapes', 'Mango', 'Citrus', 'Roses', 'Marigold', 'Other Vegetables', 'Other Fruits',
];

const contactCards = [
  {
    Icon: Phone,
    title: 'Call Us',
    primary: '+91 93479 59693',
    sub: 'Available Mon–Sat, 8 AM – 7 PM',
    href: 'tel:+919347959693',
    color: 'var(--green-mid)',
    bg: 'rgba(26,92,42,0.08)',
  },
  {
    Icon: MessageCircle,
    title: 'WhatsApp',
    primary: 'Chat with us instantly',
    sub: 'Fastest response — within 1 hour',
    href: 'https://wa.me/919347959693?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20Zenviro%20products',
    color: '#25D366',
    bg: 'rgba(37,211,102,0.1)',
    external: true,
  },
  {
    Icon: Mail,
    title: 'Email',
    primary: 'info@zenviroagro.com',
    sub: 'For partnerships and detailed enquiries',
    href: 'mailto:info@zenviroagro.com',
    color: 'var(--gold)',
    bg: 'rgba(239,159,39,0.12)',
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form submission:', data);
    setFormData(data);
    setSubmitted(true);
    reset();
  };

  const getWhatsAppMessage = (data) => {
    if (!data) return '';
    const msg = [
      `Hi Zenviro,`, ``,
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Crop: ${data.crop}`,
      data.product ? `Product Interest: ${data.product}` : null,
      data.message ? `Message: ${data.message}` : null,
      ``,
      `Please help me with more information.`,
    ].filter(Boolean).join('\n');
    return encodeURIComponent(msg);
  };

  return (
    <div style={{ background: 'var(--cream)' }}>
      {/* HEADER */}
      <header style={{ background: 'var(--green-deep)' }} className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 0% 50%, rgba(239,159,39,0.1) 0%, transparent 60%)' }} />
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="ct-field" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(22)">
              <line x1="0" y1="0" x2="0" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ct-field)"/>
        </svg>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
              style={{ background: 'rgba(239,159,39,0.15)', color: 'var(--gold)', border: '1px solid rgba(239,159,39,0.25)' }}>
              <Sparkles size={12} />
              Get In Touch
            </div>
            <h1 className="font-display font-bold text-white leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-0.025em' }}>
              We're Here to Help.
              <br />
              <span style={{ color: 'var(--gold)' }}>Real People, Real Support.</span>
            </h1>
            <p className="text-lg sm:text-xl leading-relaxed max-w-2xl" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
              Have a question about a product? Need expert advice for your crop? Our team responds fast — usually within an hour.
            </p>
          </motion.div>
        </div>
      </header>

      {/* CONTACT CARDS */}
      <section className="py-16 lg:py-20 -mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-3 gap-5">
            {contactCards.map((card, i) => (
              <motion.a
                key={card.title}
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: '1.5px solid #F3F4F6',
                  boxShadow: '0 8px 32px rgba(15,61,31,0.08)',
                }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: card.bg }}>
                    <card.Icon size={24} style={{ color: card.color }} />
                  </div>
                  {card.external && (
                    <ExternalLink size={16} className="opacity-30 transition-opacity group-hover:opacity-70"
                      style={{ color: 'var(--ink-soft)' }} />
                  )}
                </div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--ink-soft)' }}>
                  {card.title}
                </p>
                <p className="font-display font-bold text-lg mb-2 transition-colors"
                  style={{ color: 'var(--green-deep)' }}>
                  {card.primary}
                </p>
                <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>{card.sub}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="pb-28 lg:pb-36">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">

            {/* LEFT: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-3xl p-12 text-center"
                    style={{ border: '1.5px solid #BBF7D0', boxShadow: '0 8px 32px rgba(15,61,31,0.08)' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: 'linear-gradient(135deg, #BBF7D0, #86EFAC)' }}
                    >
                      <CheckCircle size={40} style={{ color: 'var(--green-mid)' }} />
                    </motion.div>
                    <h3 className="font-display font-bold text-3xl mb-3" style={{ color: 'var(--green-deep)', letterSpacing: '-0.02em' }}>
                      Message Received!
                    </h3>
                    <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                      We'll contact you within 24 hours. For faster response, WhatsApp us directly with the details below.
                    </p>

                    {formData && (
                      <a
                        href={`https://wa.me/919347959693?text=${getWhatsAppMessage(formData)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-sm font-bold text-white mb-5 transition-all hover:-translate-y-0.5"
                        style={{ background: '#25D366', boxShadow: '0 8px 24px rgba(37,211,102,0.35)' }}
                      >
                        <MessageCircle size={18} />
                        Send via WhatsApp Now
                      </a>
                    )}
                    <div>
                      <button
                        onClick={() => { setSubmitted(false); setFormData(null); }}
                        className="text-sm font-bold transition-colors hover:opacity-80"
                        style={{ color: 'var(--green-mid)' }}
                      >
                        Send another message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-3xl p-8 lg:p-10"
                    style={{ border: '1.5px solid #F3F4F6', boxShadow: '0 8px 32px rgba(15,61,31,0.08)' }}
                  >
                    <h2 className="font-display font-bold text-3xl mb-2" style={{ color: 'var(--green-deep)', letterSpacing: '-0.02em' }}>
                      Send Us a Message
                    </h2>
                    <p className="text-base mb-8" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                      Tell us about your crop or product needs. We respond within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="space-y-6">
                        {/* Name */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-bold mb-2.5" style={{ color: 'var(--ink)' }}>
                            Your Name <span style={{ color: '#DC2626' }}>*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            placeholder="e.g. Ramesh Kumar"
                            className={`w-full px-5 py-4 rounded-2xl text-base outline-none transition-all duration-300 ${
                              errors.name ? 'border-red-400' : 'border-gray-200'
                            }`}
                            style={{
                              background: 'var(--cream)',
                              color: 'var(--ink)',
                              border: errors.name ? '2px solid #F87171' : '2px solid transparent',
                            }}
                            onFocus={e => !errors.name && (e.target.style.borderColor = 'var(--green-mid)')}
                            onBlur={e => !errors.name && (e.target.style.borderColor = 'transparent')}
                            {...register('name', { required: 'Name is required' })}
                          />
                          {errors.name && (
                            <p className="mt-2 text-xs font-medium" style={{ color: '#DC2626' }}>{errors.name.message}</p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label htmlFor="phone" className="block text-sm font-bold mb-2.5" style={{ color: 'var(--ink)' }}>
                            Mobile Number <span style={{ color: '#DC2626' }}>*</span>
                          </label>
                          <div className="relative flex items-center">
                            <div
                              className="absolute left-0 top-0 bottom-0 flex items-center px-5 pointer-events-none"
                              style={{
                                borderRight: '1.5px solid rgba(15,26,15,0.1)',
                              }}
                            >
                              <span className="text-base font-semibold tabular-nums" style={{ color: 'var(--ink-soft)' }}>+91</span>
                            </div>
                            <input
                              id="phone"
                              type="tel"
                              placeholder="98765 43210"
                              className="w-full py-4 pr-5 rounded-2xl text-base outline-none transition-all duration-300"
                              style={{
                                background: 'var(--cream)',
                                color: 'var(--ink)',
                                border: errors.phone ? '2px solid #F87171' : '2px solid transparent',
                                paddingLeft: '78px',
                              }}
                              onFocus={e => !errors.phone && (e.target.style.borderColor = 'var(--green-mid)')}
                              onBlur={e => !errors.phone && (e.target.style.borderColor = 'transparent')}
                              {...register('phone', {
                                required: 'Mobile number is required',
                                pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian mobile number' },
                              })}
                            />
                          </div>
                          {errors.phone && (
                            <p className="mt-2 text-xs font-medium" style={{ color: '#DC2626' }}>{errors.phone.message}</p>
                          )}
                        </div>

                        {/* Crop */}
                        <div>
                          <label htmlFor="crop" className="block text-sm font-bold mb-2.5" style={{ color: 'var(--ink)' }}>
                            Your Crop <span style={{ color: '#DC2626' }}>*</span>
                          </label>
                          <select
                            id="crop"
                            className="w-full px-5 py-4 rounded-2xl text-base outline-none transition-all duration-300 cursor-pointer"
                            style={{
                              background: 'var(--cream)',
                              color: 'var(--ink)',
                              border: errors.crop ? '2px solid #F87171' : '2px solid transparent',
                            }}
                            onFocus={e => !errors.crop && (e.target.style.borderColor = 'var(--green-mid)')}
                            onBlur={e => !errors.crop && (e.target.style.borderColor = 'transparent')}
                            {...register('crop', { required: 'Please select your crop' })}
                            defaultValue=""
                          >
                            <option value="" disabled>Select your crop...</option>
                            {crops.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          {errors.crop && (
                            <p className="mt-2 text-xs font-medium" style={{ color: '#DC2626' }}>{errors.crop.message}</p>
                          )}
                        </div>

                        {/* Product Interest */}
                        <div>
                          <label htmlFor="product" className="block text-sm font-bold mb-2.5" style={{ color: 'var(--ink)' }}>
                            Product Interest <span className="text-xs font-normal" style={{ color: 'var(--ink-soft)' }}>— optional</span>
                          </label>
                          <input
                            id="product"
                            type="text"
                            placeholder="e.g. Block Rock, Imidacloprid 17.8 SL..."
                            className="w-full px-5 py-4 rounded-2xl text-base outline-none transition-all duration-300"
                            style={{ background: 'var(--cream)', color: 'var(--ink)', border: '2px solid transparent' }}
                            onFocus={e => (e.target.style.borderColor = 'var(--green-mid)')}
                            onBlur={e => (e.target.style.borderColor = 'transparent')}
                            {...register('product')}
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="block text-sm font-bold mb-2.5" style={{ color: 'var(--ink)' }}>
                            Your Message <span className="text-xs font-normal" style={{ color: 'var(--ink-soft)' }}>— optional</span>
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            placeholder="Tell us about your crop problem or what you need..."
                            className="w-full px-5 py-4 rounded-2xl text-base outline-none transition-all duration-300 resize-none"
                            style={{ background: 'var(--cream)', color: 'var(--ink)', border: '2px solid transparent' }}
                            onFocus={e => (e.target.style.borderColor = 'var(--green-mid)')}
                            onBlur={e => (e.target.style.borderColor = 'transparent')}
                            {...register('message')}
                          />
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-gold flex items-center justify-center gap-2 w-full py-4.5 rounded-2xl text-base font-bold disabled:opacity-70 transition-all"
                          style={{ paddingTop: '18px', paddingBottom: '18px' }}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send size={18} />
                              Send Message
                            </>
                          )}
                        </button>

                        <p className="text-xs text-center pt-2" style={{ color: 'var(--ink-soft)' }}>
                          Need faster response?{' '}
                          <a
                            href="https://wa.me/919347959693?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20Zenviro%20products"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold hover:underline"
                            style={{ color: '#25D366' }}
                          >
                            WhatsApp us directly →
                          </a>
                        </p>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* RIGHT: Map + Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Map */}
              <div className="rounded-3xl overflow-hidden"
                style={{ border: '1.5px solid #F3F4F6', boxShadow: '0 8px 32px rgba(15,61,31,0.08)', height: '320px' }}>
                <iframe
                  title="Zenviro Agro Chemicals — Injapur, Rangareddy"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30459.7!2d78.3767!3d17.2543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba89eb7bfe3a9%3A0x85c8bb1e78f3451d!2sInjapur%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Address card */}
              <div className="bg-white rounded-3xl p-7"
                style={{ border: '1.5px solid #F3F4F6', boxShadow: '0 8px 32px rgba(15,61,31,0.08)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(26,92,42,0.08)' }}>
                    <MapPin size={22} style={{ color: 'var(--green-mid)' }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--ink-soft)' }}>
                      Visit Our Facility
                    </p>
                    <p className="font-display font-bold text-lg" style={{ color: 'var(--green-deep)' }}>
                      Injapur, Rangareddy
                    </p>
                    <p className="text-sm mt-1" style={{ color: 'var(--ink-soft)', lineHeight: 1.7 }}>
                      Hyderabad, Telangana<br />India
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-3xl p-7"
                style={{ border: '1.5px solid #F3F4F6', boxShadow: '0 8px 32px rgba(15,61,31,0.08)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(239,159,39,0.12)' }}>
                    <Clock size={22} style={{ color: 'var(--gold)' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--ink-soft)' }}>
                      Business Hours
                    </p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: 'var(--ink-soft)' }}>Monday – Saturday</span>
                        <span className="font-semibold" style={{ color: 'var(--green-deep)' }}>8 AM – 7 PM</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: 'var(--ink-soft)' }}>Sunday</span>
                        <span className="font-semibold" style={{ color: '#DC2626' }}>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
