// Seasonal crop guidance for Telangana / South India growing calendars.
// Deliberately stage-level guidance only — no dose or chemical prescriptions.
// Farmers are always directed to product labels and the Zenviro team.

export const seasons = [
  {
    id: 'kharif',
    name: 'Kharif',
    teluguName: 'ఖరీఫ్',
    months: 'June – October',
    description:
      'The monsoon season — main sowing window for cotton, chilli, paddy and maize across Telangana.',
    stages: [
      {
        crop: 'Cotton & Maize',
        months: 'Jun – Jul',
        focus: 'Sowing & root establishment',
        tip: 'A strong root-zone start sets up the whole season. Soil granules and root-promoting biologicals help young plants establish quickly.',
        category: 'nutrition',
        categoryLabel: 'Zenvi Nutrition Line',
      },
      {
        crop: 'Chilli',
        months: 'Jul – Aug',
        focus: 'Nursery & transplanting',
        tip: 'Healthy nursery seedlings transplant better. Balanced nutrition before and after transplant reduces shock and speeds up canopy growth.',
        category: 'nutrition',
        categoryLabel: 'Zenvi Nutrition Line',
      },
      {
        crop: 'Paddy',
        months: 'Aug – Sep',
        focus: 'Tillering & vegetative growth',
        tip: 'Tillering decides yield potential. Support vegetative growth with foliar nutrition and watch early for leaf folder and stem borer pressure.',
        category: 'protection',
        categoryLabel: 'Pesticide & Fungicide Line',
      },
      {
        crop: 'Cotton & Chilli',
        months: 'Sep – Oct',
        focus: 'Flowering, fruiting & pest watch',
        tip: 'Peak window for sucking pests and bollworms. Flowering-stage nutrition supports boll and fruit set while fields are scouted weekly.',
        category: 'premium',
        categoryLabel: 'Premium Crop Care Line',
      },
    ],
  },
  {
    id: 'rabi',
    name: 'Rabi',
    teluguName: 'రబీ',
    months: 'November – March',
    description:
      'The winter season — maize, groundnut and vegetable plantings, with chilli moving through fruiting and harvest.',
    stages: [
      {
        crop: 'Maize',
        months: 'Nov – Dec',
        focus: 'Sowing & early growth',
        tip: 'Cooler nights slow early growth — starter nutrition helps seedlings build leaf area fast. Scout for fall armyworm from the whorl stage.',
        category: 'nutrition',
        categoryLabel: 'Zenvi Nutrition Line',
      },
      {
        crop: 'Groundnut',
        months: 'Nov – Dec',
        focus: 'Sowing & nodulation',
        tip: 'Good nodulation and calcium availability drive pod fill later. Root-zone biologicals and micronutrients pay off from day one.',
        category: 'nutrition',
        categoryLabel: 'Zenvi Nutrition Line',
      },
      {
        crop: 'Chilli',
        months: 'Dec – Feb',
        focus: 'Fruiting & harvest rounds',
        tip: 'Repeated picking drains the plant. Fruiting-stage nutrition between harvest rounds keeps quality and colour consistent to the last picking.',
        category: 'premium',
        categoryLabel: 'Premium Crop Care Line',
      },
      {
        crop: 'Vegetables',
        months: 'Year-round',
        focus: 'Continuous nutrition & protection',
        tip: 'Short-cycle vegetable crops respond quickly to foliar feeding, and need steady scouting for mites, thrips and fungal spots.',
        category: 'protection',
        categoryLabel: 'Pesticide & Fungicide Line',
      },
    ],
  },
];
