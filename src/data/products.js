// Product data — source of truth: official Zenviro Agro Chemicals price list.
// Prices in INR. Taglines come from the product packaging shown in the catalog.
import titanicImg from '../assets/products/titanic-product.webp';
import spiderImg from '../assets/products/spider-product.webp';
import zennutriImg from '../assets/products/zennutri-product.webp';
import zenviMaxImg from '../assets/products/zenvi-max-product.webp';
import zenviProImg from '../assets/products/zenvi-pro-product.webp';
import zenviRhizaImg from '../assets/products/zenvi-rhiza-product.webp';
import yieldoraImg from '../assets/products/yieldora-product.webp';
import zenviPlusImg from '../assets/products/zenvi-plus-product.webp';
import roxcinImg from '../assets/products/roxcin-product.webp';
import toxxicImg from '../assets/products/toxxic-product.webp';
import doomXImg from '../assets/products/doom-x-product.webp';
import tomJerryImg from '../assets/products/tom-jerry-product.webp';
import revoxImg from '../assets/products/revox-product.webp';
import redoxImg from '../assets/products/redox-product.webp';
import blackRoockImg from '../assets/products/black-roock-product.webp';
import rangRoverImg from '../assets/products/rang-rover-product.webp';
import leninImg from '../assets/products/lenin-product.webp';
import terminalImg from '../assets/products/terminal-product.webp';
import inflowisImg from '../assets/products/inflowis-product.webp';
import invideaImg from '../assets/products/invidea-product.webp';
import exozenImg from '../assets/products/exozen-product.webp';
import predatorImg from '../assets/products/predator-product.webp';
import boronImg from '../assets/products/boron-20-product.webp';
import zincImg from '../assets/products/zinc-edta-12-product.webp';
import ferroImg from '../assets/products/ferro-eddha-6-product.webp';
import magnesiumImg from '../assets/products/magnesium-sulphate-product.webp';
import fulvicImg from '../assets/products/fulvic-power-product.webp';
import aminoImg from '../assets/products/amino-power-product.webp';
import seaweedImg from '../assets/products/seaweed-extract-product.webp';
import humicImg from '../assets/products/humic-power-product.webp';
import roottexImg from '../assets/products/roottex-product.webp';
import terandoImg from '../assets/products/terando-product.webp';
import pushpaImg from '../assets/products/pushpa-2-product.webp';

export const categories = [
  {
    id: 'nutrition',
    name: 'Zenvi Nutrition Line',
    teluguName: 'జెన్వీ పోషణ శ్రేణి',
    short: 'Nutrition',
    description:
      'Crop nutrition essentials — bio combos, soil and granule applications, root-zone packs and liquid formulations that support healthy crop growth at every stage.',
  },
  {
    id: 'protection',
    name: 'Pesticide & Fungicide Line',
    teluguName: 'క్రిమి & శిలీంధ్ర నాశకాలు',
    short: 'Protection',
    description:
      'A focused crop protection range covering pest and fungal challenges, including combo packs and broad-spectrum solutions for demanding field conditions.',
  },
  {
    id: 'premium',
    name: 'Premium Crop Care Line',
    teluguName: 'ప్రీమియం పంట సంరక్షణ',
    short: 'Premium Care',
    description:
      'Our premium tier of crop care products, available in multiple pack sizes for everything from smallholdings to large-acreage field programmes.',
  },
];

export const products = [
  // ——— Zenvi Nutrition Line ———
  {
    id: 'titanic',
    name: 'Titanic',
    teluguName: 'టైటానిక్',
    category: 'nutrition',
    type: 'BIO',
    image: titanicImg,
    variants: [{ size: '250 ml × 2 Combo', price: 1550 }],
    featured: true,
    description:
      'A bio combo pack from the Zenvi Nutrition Line, supplied as a twin 250 ml pack for convenient field use.',
  },
  {
    id: 'spider',
    name: 'Spider',
    teluguName: 'స్పైడర్',
    category: 'nutrition',
    type: 'BIO',
    image: spiderImg,
    variants: [{ size: '250 ml × 2 Combo', price: 1350 }],
    featured: true,
    tagline: 'Plant protector',
    description:
      'A bio combo pack positioned as a plant protector, supplied as a twin 250 ml pack in the Zenvi Nutrition Line.',
  },
  {
    id: 'zennutri',
    name: 'Zennutri',
    teluguName: 'జెన్న్యూట్రి',
    category: 'nutrition',
    type: 'SOIL',
    image: zennutriImg,
    variants: [{ size: '10 kg', price: 1950 }],
    featured: true,
    tagline: 'All-crop nutrition specialist',
    description:
      'A 10 kg soil application pack offering complete plant nutrition for all crops at all stages, as described on the product packaging.',
  },
  {
    id: 'zenvi-max',
    name: 'Zenvi Max',
    teluguName: 'జెన్వీ మాక్స్',
    category: 'nutrition',
    type: 'GRANULE',
    image: zenviMaxImg,
    variants: [
      { size: '1 kg', price: 750 },
      { size: '500 g', price: 400 },
      { size: '250 g', price: 250 },
    ],
    featured: true,
    tagline: 'Micronutrients — foliar spray',
    description:
      'A micronutrient granule pack for foliar application, available in three pack sizes to suit different field requirements.',
  },
  {
    id: 'zenvi-pro',
    name: 'Zenvi Pro',
    teluguName: 'జెన్వీ ప్రో',
    category: 'nutrition',
    type: 'GRANULE',
    image: zenviProImg,
    variants: [
      { size: '1 kg', price: 800 },
      { size: '500 g', price: 450 },
      { size: '250 g', price: 290 },
    ],
    featured: true,
    tagline: 'Micronutrient fertilizer',
    description:
      'A micronutrient fertilizer granule from the Zenvi Nutrition Line, available in 1 kg, 500 g and 250 g packs.',
  },
  {
    id: 'zenvi-rhiza',
    name: 'Zenvi Rhiza',
    teluguName: 'జెన్వీ రైజా',
    category: 'nutrition',
    type: 'ROOT',
    image: zenviRhizaImg,
    variants: [{ size: '4 kg', price: 1050 }],
    featured: false,
    description:
      'A 4 kg root-zone application pack from the Zenvi Nutrition Line, designed for soil and root-area use.',
  },
  {
    id: 'yieldora',
    name: 'Yieldora',
    teluguName: 'యీల్డోరా',
    category: 'nutrition',
    type: 'LIQUID',
    image: yieldoraImg,
    variants: [
      { size: '500 ml', price: 850 },
      { size: '250 ml', price: 500 },
      { size: '100 ml', price: 350 },
    ],
    featured: true,
    tagline: 'Crop setting & growth',
    description:
      'A liquid formulation focused on crop setting and growth support, available in three convenient pack sizes.',
  },
  {
    id: 'zenvi-plus',
    name: 'Zenvi Plus +',
    teluguName: 'జెన్వీ ప్లస్ +',
    category: 'nutrition',
    type: 'LIQUID',
    image: zenviPlusImg,
    variants: [{ size: '250 ml', price: 550 }],
    featured: false,
    tagline: 'Growth & fruit setting specialist',
    description:
      'A liquid growth and fruit-setting specialist from the Zenvi Nutrition Line, supplied in a 250 ml pack.',
  },

  // ——— Pesticide & Fungicide Line ———
  {
    id: 'roxcin',
    name: 'Roxcin',
    teluguName: 'రాక్సిన్',
    category: 'protection',
    type: null,
    image: roxcinImg,
    variants: [
      { size: '1 liter', price: 2750 },
      { size: '500 ml', price: 1400 },
      { size: '250 ml', price: 760 },
    ],
    featured: true,
    description:
      'A crop protection product from the Pesticide & Fungicide Line, available in 1 liter, 500 ml and 250 ml packs.',
  },
  {
    id: 'toxxic',
    name: 'Toxxic',
    teluguName: 'టాక్సిక్',
    category: 'protection',
    type: null,
    image: toxxicImg,
    variants: [
      { size: '1 liter', price: 2950 },
      { size: '500 ml', price: 1550 },
      { size: '250 ml', price: 800 },
    ],
    featured: true,
    description:
      'A crop protection product from the Pesticide & Fungicide Line, available in three pack sizes for flexible use.',
  },
  {
    id: 'doom-x',
    name: 'Doom X',
    teluguName: 'డూమ్ ఎక్స్',
    category: 'protection',
    type: null,
    image: doomXImg,
    variants: [{ size: '400 ml', price: 1950 }],
    featured: true,
    tagline: 'Systemic insecticide — thrips specialist',
    description:
      'A systemic insecticide positioned on its packaging as a thrips specialist for long-lasting protection, supplied in a 400 ml pack.',
  },
  {
    id: 'tom-jerry',
    name: 'Tom & Jerry',
    teluguName: 'టామ్ & జెర్రీ',
    category: 'protection',
    type: 'COMBO',
    image: tomJerryImg,
    variants: [{ size: '100 ml × 3 Combo', price: 1950 }],
    featured: true,
    tagline: 'All-in-one pest solution',
    description:
      'A broad-spectrum insecticide combo described on its packaging as an all-in-one pest solution, supplied as a triple 100 ml pack.',
  },
  {
    id: 'revox',
    name: 'Revox',
    teluguName: 'రెవాక్స్',
    category: 'protection',
    type: null,
    image: revoxImg,
    variants: [{ size: '180 ml', price: 1550 }],
    featured: false,
    tagline: 'Systemic insecticide',
    description:
      'A systemic insecticide for broad-spectrum control of sucking pests, as described on the product packaging. Supplied in a 180 ml pack.',
  },
  {
    id: 'redox',
    name: 'Redox',
    teluguName: 'రెడాక్స్',
    category: 'protection',
    type: null,
    image: redoxImg,
    variants: [{ size: '250 ml', price: 2100 }],
    featured: false,
    tagline: 'Systemic insecticide',
    description:
      'A systemic insecticide for broad-spectrum control of sucking pests, as described on the product packaging. Supplied in a 250 ml pack.',
  },
  {
    id: 'black-roock',
    name: 'Black Roock',
    teluguName: 'బ్లాక్ రూక్',
    category: 'protection',
    type: null,
    image: blackRoockImg,
    variants: [{ size: '440 ml', price: 3100 }],
    featured: false,
    tagline: 'Systemic insecticide',
    description:
      'A premium systemic insecticide for broad-spectrum control of sucking pests, supplied in a distinctive 440 ml pack.',
  },
  {
    id: 'rang-rover',
    name: 'Rang Rover',
    teluguName: 'రంగ్ రోవర్',
    category: 'protection',
    type: null,
    image: rangRoverImg,
    variants: [{ size: '250 ml', price: 1900 }],
    featured: false,
    tagline: 'All-pest control solution',
    description:
      'A systemic insecticide positioned on its packaging as an all-pest control solution, supplied in a 250 ml pack.',
  },
  {
    id: 'lenin',
    name: 'Lenin',
    teluguName: 'లెనిన్',
    category: 'protection',
    type: null,
    image: leninImg,
    variants: [{ size: '240 ml × 2', price: 1600 }],
    featured: false,
    description:
      'A crop protection combo from the Pesticide & Fungicide Line, supplied as a twin 240 ml pack.',
  },

  // ——— Premium Crop Care Line ———
  {
    id: 'terminal',
    name: 'Terminal',
    teluguName: 'టెర్మినల్',
    category: 'premium',
    type: null,
    image: terminalImg,
    variants: [
      { size: '1 liter', price: 2700 },
      { size: '500 ml', price: 1400 },
      { size: '250 ml', price: 712 },
    ],
    featured: true,
    tagline: 'Plant protector',
    description:
      'A premium plant protector from the Premium Crop Care Line, available in 1 liter, 500 ml and 250 ml packs.',
  },
  {
    id: 'inflowis',
    name: 'Inflowis',
    teluguName: 'ఇన్ఫ్లోవిస్',
    category: 'premium',
    type: null,
    image: inflowisImg,
    variants: [
      { size: '1 liter', price: 2950 },
      { size: '500 ml', price: 1500 },
      { size: '250 ml', price: 772 },
    ],
    featured: true,
    description:
      'A premium crop care product available in three pack sizes, part of the chilli and cotton focus range in our catalog.',
  },
  {
    id: 'invidea',
    name: 'Invidea',
    teluguName: 'ఇన్విడియా',
    category: 'premium',
    type: null,
    image: invideaImg,
    variants: [
      { size: '1 liter', price: 3200 },
      { size: '500 ml', price: 1650 },
      { size: '250 ml', price: 900 },
    ],
    featured: true,
    description:
      'A premium crop care product available in three pack sizes, part of the chilli and cotton focus range in our catalog.',
  },
  {
    id: 'exozen',
    name: 'Exozen',
    teluguName: 'ఎక్సోజెన్',
    category: 'premium',
    type: null,
    image: exozenImg,
    variants: [
      { size: '1 liter', price: 3100 },
      { size: '500 ml', price: 1600 },
      { size: '250 ml', price: 850 },
    ],
    featured: true,
    tagline: 'Plant protector',
    description:
      'A premium plant protector featured in our chilli special range, available in 1 liter, 500 ml and 250 ml packs.',
  },
  {
    id: 'predator',
    name: 'Predator',
    teluguName: 'ప్రిడేటర్',
    category: 'premium',
    type: null,
    image: predatorImg,
    variants: [
      { size: '1 liter', price: 3100 },
      { size: '500 ml', price: 1600 },
      { size: '250 ml', price: 850 },
    ],
    featured: true,
    description:
      'A premium crop care product featured in our chilli special range, available in three pack sizes.',
  },
];

// Shown in the catalog gallery only — no published pricing. Contact for details.
export const catalogOnlyProducts = [
  { id: 'boron-20', name: 'Boron 20%', label: 'Micronutrient', image: boronImg },
  { id: 'zinc-edta-12', name: 'Zinc EDTA 12%', label: 'Micronutrient', image: zincImg },
  { id: 'ferro-eddha-6', name: 'Ferro EDDHA 6%', label: 'Micronutrient', image: ferroImg },
  { id: 'magnesium-sulphate', name: 'Magnesium Sulphate 9.6%', label: 'Micronutrient', image: magnesiumImg },
  { id: 'fulvic-power', name: 'Fulvic Power', label: 'Biostimulant', image: fulvicImg },
  { id: 'amino-power', name: 'Amino Power', label: 'Biostimulant', image: aminoImg },
  { id: 'seaweed-extract', name: 'Seaweed Extract', label: 'Biostimulant', image: seaweedImg },
  { id: 'humic-power', name: 'Humic Power', label: 'Biostimulant', image: humicImg },
  { id: 'roottex', name: 'Roottex', label: 'Systemic fungicide', image: roottexImg },
  { id: 'terando', name: 'Terando', label: 'Systemic larvicide', image: terandoImg },
  { id: 'pushpa-2', name: 'Pushpa 2', label: 'Plant growth regulator', image: pushpaImg },
];

export const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`;

export const startingPrice = (product) =>
  Math.min(...product.variants.map((v) => v.price));

export const getProductById = (id) => products.find((p) => p.id === id);

export const getCategoryById = (id) => categories.find((c) => c.id === id);

export const getProductsByCategory = (categoryId) =>
  products.filter((p) => p.category === categoryId);

export const getRelatedProducts = (product, limit = 4) =>
  products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);

export const featuredProducts = products.filter((p) => p.featured);
