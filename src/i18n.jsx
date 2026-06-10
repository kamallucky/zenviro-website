// Lightweight EN/Telugu toggle for key UI labels.
// Product Telugu names come from the price list and are always displayed.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const LABELS = {
  en: {
    home: 'Home',
    products: 'Products',
    pricing: 'Pricing',
    cropSolutions: 'Crop Solutions',
    catalog: 'Catalog',
    safety: 'Safety',
    about: 'About',
    contact: 'Contact',
    contactSales: 'Contact Sales',
    getDealerPrice: 'Get Dealer Price',
    exploreProducts: 'Explore Products',
    viewPriceList: 'View Price List',
    viewDetails: 'View Details',
    enquireNow: 'Enquire Now',
    callNow: 'Call Now',
    whatsapp: 'WhatsApp',
    downloadCatalog: 'Download Catalog',
    downloadPriceList: 'Download Price List',
    viewProducts: 'View Products',
    sendEnquiry: 'Send Enquiry',
    startingFrom: 'From',
  },
  te: {
    home: 'హోమ్',
    products: 'ఉత్పత్తులు',
    pricing: 'ధరల జాబితా',
    cropSolutions: 'పంట పరిష్కారాలు',
    catalog: 'కేటలాగ్',
    safety: 'భద్రత',
    about: 'మా గురించి',
    contact: 'సంప్రదించండి',
    contactSales: 'సేల్స్‌ను సంప్రదించండి',
    getDealerPrice: 'డీలర్ ధర పొందండి',
    exploreProducts: 'ఉత్పత్తులను చూడండి',
    viewPriceList: 'ధరల జాబితా చూడండి',
    viewDetails: 'వివరాలు చూడండి',
    enquireNow: 'ఇప్పుడే సంప్రదించండి',
    callNow: 'కాల్ చేయండి',
    whatsapp: 'వాట్సాప్',
    downloadCatalog: 'కేటలాగ్ డౌన్‌లోడ్',
    downloadPriceList: 'ధరల జాబితా డౌన్‌లోడ్',
    viewProducts: 'ఉత్పత్తులు చూడండి',
    sendEnquiry: 'విచారణ పంపండి',
    startingFrom: 'నుండి',
  },
};

const LanguageContext = createContext({ lang: 'en', t: (k) => LABELS.en[k], toggle: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('zenviro-lang') === 'te' ? 'te' : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zenviro-lang', lang);
    } catch {
      // storage unavailable — keep in-memory only
    }
  }, [lang]);

  const t = useCallback((key) => LABELS[lang][key] ?? LABELS.en[key] ?? key, [lang]);
  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'te' : 'en')), []);
  const value = useMemo(() => ({ lang, t, toggle }), [lang, t, toggle]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LanguageContext);
