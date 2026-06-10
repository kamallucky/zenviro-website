// Single source of truth for all company details (from the official price list).
export const COMPANY = {
  name: 'Zenviro Agro Chemicals',
  teluguName: 'జెన్వీరో అగ్రో కెమికల్స్',
  tagline: 'Trusted Agricultural Nutrition & Crop Protection',
  taglineTelugu: 'నమ్మకమైన పంట పోషణ & పంట రక్షణ ఉత్పత్తులు',
  slogan: 'Pure Farming. Harvesting Happiness.',
  gst: '36AAEFZ3738JIZQ',
  address: {
    line1: 'Sy. No: 6, Injapur Road, Abdullapurmet',
    line2: 'Hyderabad, Rangareddy, Telangana — 501510',
    full: 'Sy. No: 6, Injapur Road, Abdullapurmet, Hyderabad, Rangareddy, Telangana — 501510',
  },
  phones: ['8555021541', '9493804520', '9347959693'],
  email: 'zenviroagrochemicals@gmail.com',
  whatsappNumber: '918555021541',
};

export const DISCLAIMERS = {
  price:
    'All prices are subject to change without prior notice. Bulk and dealer discounts available.',
  priceTelugu: 'ధరలు ముందస్తు సూచన లేకుండా మారవచ్చు • బల్క్ & డీలర్ తగ్గింపులు అందుబాటులో ఉన్నాయి',
  safety:
    'Always read and follow product label instructions. Use crop protection products responsibly and in accordance with applicable regulations.',
  productSafety:
    'Use responsibly. Follow label instructions and local agricultural guidance.',
};

export const DOWNLOADS = {
  catalog: '/downloads/zenviro-product-catalog.pdf',
  priceList: '/downloads/zenviro-price-list.pdf',
};

export const SITE_URL = 'https://www.zenviroagrochemicals.com';

export const telHref = (phone = COMPANY.phones[0]) => `tel:+91${phone}`;

export const mailHref = (subject = '') =>
  `mailto:${COMPANY.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;

export const waHref = (message) =>
  `https://wa.me/${COMPANY.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

export const waProductMessage = (name, size) =>
  `Hi ${COMPANY.name}, I am interested in ${name}${size ? ` (${size})` : ''}. Please share more details.`;

export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY.address.full)}`;
