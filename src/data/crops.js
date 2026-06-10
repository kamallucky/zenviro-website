// Crop solutions — imagery from the official product catalog.
// No specific product-to-crop claims are made; guidance is offered via the team.
import chilliImg from '../assets/crops/crop-chilli.webp';
import cottonImg from '../assets/crops/crop-cotton.webp';
import riceImg from '../assets/crops/crop-rice.webp';
import maizeImg from '../assets/crops/crop-maize.webp';
import vegetablesImg from '../assets/crops/crop-vegetables.webp';
import fruitsImg from '../assets/crops/crop-fruits.webp';
import groundnutImg from '../assets/crops/crop-groundnut.webp';
import sugarcaneImg from '../assets/crops/crop-sugarcane.webp';

export const crops = [
  { id: 'chilli', name: 'Chilli', teluguName: 'మిర్చి', image: chilliImg },
  { id: 'cotton', name: 'Cotton', teluguName: 'పత్తి', image: cottonImg },
  { id: 'rice', name: 'Rice', teluguName: 'వరి', image: riceImg },
  { id: 'maize', name: 'Maize', teluguName: 'మొక్కజొన్న', image: maizeImg },
  { id: 'vegetables', name: 'Vegetables', teluguName: 'కూరగాయలు', image: vegetablesImg },
  { id: 'fruits', name: 'Fruits', teluguName: 'పండ్లు', image: fruitsImg },
  { id: 'groundnut', name: 'Groundnut', teluguName: 'వేరుశనగ', image: groundnutImg },
  { id: 'sugarcane', name: 'Sugarcane', teluguName: 'చెరకు', image: sugarcaneImg },
];
