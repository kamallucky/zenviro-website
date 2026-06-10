// Product catalog gallery — pages extracted from the official Zenviro catalog PDF.
import page01 from '../assets/catalog/catalog-page-01.webp';
import page02 from '../assets/catalog/catalog-page-02.webp';
import page03 from '../assets/catalog/catalog-page-03.webp';
import page04 from '../assets/catalog/catalog-page-04.webp';
import page05 from '../assets/catalog/catalog-page-05.webp';
import page06 from '../assets/catalog/catalog-page-06.webp';
import page07 from '../assets/catalog/catalog-page-07.webp';
import page08 from '../assets/catalog/catalog-page-08.webp';

export const catalogPages = [
  {
    id: 'cover',
    title: 'Brand Cover',
    description: 'Zenviro Agro Chemicals — fresh produce, healthy fields.',
    image: page01,
    alt: 'Zenviro Agro Chemicals catalog cover with a basket of fresh vegetables on a green farm backdrop',
  },
  {
    id: 'crops',
    title: 'Pure Farming. Harvesting Happiness.',
    description: 'Crops we serve — chilli, cotton, paddy, maize, groundnut, sugarcane and more.',
    image: page02,
    alt: 'Crop collage showing chilli, sugarcane, groundnut, cotton, maize and fresh produce',
  },
  {
    id: 'micronutrients',
    title: 'Water-Soluble Fertilizers & Micronutrients',
    description: 'Boron, Zinc EDTA, Ferro EDDHA, Magnesium Sulphate and biostimulant range.',
    image: page03,
    alt: 'Zenviro water-soluble fertilizer and micronutrient bottle range with Zenvi Max, Zenvi Pro and Zennutri packs',
  },
  {
    id: 'growth-promoters',
    title: 'Plant Growth Promoters',
    description: 'Yieldora, Zenvi Plus+ and Roottex growth promoter range.',
    image: page04,
    alt: 'Zenviro plant growth promoter products Yieldora, Zenvi Plus Plus and Roottex',
  },
  {
    id: 'combo',
    title: 'Combo Products',
    description: 'Lenin, Titanic and Spider combo packs.',
    image: page05,
    alt: 'Zenviro combo product boxes Lenin, Titanic and Spider',
  },
  {
    id: 'chilli-special',
    title: 'Chilli Special',
    description: 'Exozen, Predator, Terando, Doom X and Tom & Jerry for chilli growers.',
    image: page06,
    alt: 'Zenviro chilli special range with Exozen, Predator, Terando, Doom X and Tom and Jerry products',
  },
  {
    id: 'all-crops',
    title: 'All Crops Range',
    description: 'Roxcin, Toxxic, Pushpa 2 and Black Roock for all crops.',
    image: page07,
    alt: 'Zenviro all-crops range with Roxcin, Toxxic, Pushpa 2 and Black Roock products',
  },
  {
    id: 'chilli-cotton',
    title: 'Chilli & Cotton Special',
    description: 'Terminal, Inflowis, Invidea, Rang Rover, Redox and Revox.',
    image: page08,
    alt: 'Zenviro chilli and cotton special range with Terminal, Inflowis, Invidea, Rang Rover, Redox and Revox',
  },
];
