# Zenviro Agro Chemicals — Website

Production-ready website for **Zenviro Agro Chemicals**, Injapur, Rangareddy, Hyderabad.

## Tech Stack

- **React 18** + **Vite** (fast builds, HMR)
- **Tailwind CSS** (via `@tailwindcss/vite`)
- **Framer Motion** (page transitions, scroll animations)
- **Lucide React** (consistent icons)
- **React Router v7** (client-side routing)
- **React Hook Form** (contact form + validation)

## Pages

| Route | Page |
|---|---|
| `/` | Home — Hero, Trust Bar, Categories, Block Rock Spotlight, Why Zenviro, Nutrition, Safety, Testimonials |
| `/products` | Product catalog with live search + category filters |
| `/products/:id` | Individual product detail page with related products |
| `/crop-finder` | Interactive crop-to-product recommendation tool |
| `/about` | Brand story, values, safety guidelines |
| `/contact` | Contact form + Google Maps + direct WhatsApp/phone |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build → dist/
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Page wrapper — scroll-to-top on route change
│   ├── Navbar.jsx          # Sticky glass nav + mobile slide-out menu
│   ├── Footer.jsx          # 4-column footer with newsletter
│   ├── Logo.jsx            # SVG Z-leaf logo + ZENVIRO wordmark
│   ├── ProductCard.jsx     # Reusable card with WhatsApp CTA
│   └── WhatsAppButton.jsx  # Floating sticky WhatsApp button
├── pages/
│   ├── Home.jsx            # Full landing page
│   ├── Products.jsx        # Filterable/searchable product catalog
│   ├── ProductDetail.jsx   # Product detail + related products
│   ├── CropFinder.jsx      # Crop → product recommendation tool
│   ├── About.jsx           # About + values + safety
│   └── Contact.jsx         # Form (React Hook Form) + map
├── data/
│   ├── products.js         # All 16 products with full details
│   └── cropSolutions.js    # 6 crops × expert product recommendations
└── index.css               # CSS variables, design tokens, animations
```

## Products (16 total)

| Category | Products |
|---|---|
| Insecticides | Block Rock, Imidacloprid 17.8 SL, Profenofos 50% EC |
| Fungicides | Hexaconazole 5% SC, Mancozeb 75% WP |
| Herbicides | Glyphosate 41% SL, Pendimethalin 30% EC |
| Plant Growth | Seaweed Extract, NPK 19:19:19 |
| Micronutrients | Zinc EDTA 12%, Boron 20%, Ferro EDDHA 6%, Magnesium Sulphate 9.6% |
| Biostimulants | Amino Power, Humic Power, Fulvic Power |

## Brand Details

- **Phone / WhatsApp**: +91 93479 59693
- **Email**: info@zenviroagro.com
- **Location**: Injapur, Rangareddy, Hyderabad, Telangana, India
- **Tagline (EN)**: Nurturing Crops. Protecting Futures.
- **Tagline (Telugu)**: మొక్కకు రక్షణ | పంటకు భరోసా
- **Footer line**: Innovating Today | Sustaining Tomorrow
