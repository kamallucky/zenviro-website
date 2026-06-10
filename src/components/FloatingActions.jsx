import { useLocation } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { COMPANY, telHref, waHref } from '../config/company';
import { useLang } from '../i18n';

// Floating WhatsApp button (all viewports) + sticky call/WhatsApp bar (mobile).
export default function FloatingActions() {
  const { t } = useLang();
  const { pathname } = useLocation();
  const message = `Hi ${COMPANY.name}, I would like to know more about your products.`;

  return (
    <>
      <a
        href={waHref(message)}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics="whatsapp-product-enquiry"
        aria-label="Chat with Zenviro Agro Chemicals on WhatsApp"
        className="fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#1faf57] text-white shadow-[0_12px_32px_-8px_rgb(31_175_87/0.65)] transition-transform duration-300 hover:scale-110 sm:bottom-8 sm:right-8"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
        <span aria-hidden="true" className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#1faf57]/40 [animation-duration:2.4s]" />
      </a>

      {pathname !== '/contact' && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 px-4 py-3 backdrop-blur-lg sm:hidden">
          <div className="flex gap-2">
            <a href={telHref()} className="btn-primary flex-1 !py-3 text-sm" data-analytics="contact-sales">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t('callNow')}
            </a>
            <a
              href={waHref(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn flex-1 bg-[#1faf57] !py-3 text-sm text-white hover:bg-[#178a45]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t('whatsapp')}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
