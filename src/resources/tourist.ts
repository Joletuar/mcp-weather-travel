interface TouristAttraction {
  name: string;
  description: string;
  city: string;
  category: 'Cultural' | 'Natural' | 'Historical' | 'Entertainment';
  bestTimeToVisit: string;
  entryFee: number;
  tips: string;
}

interface TravelTip {
  category: string;
  tips: string[];
}

const touristAttractions: TouristAttraction[] = [
  {
    name: 'Mitad del Mundo',
    description:
      'A monument marking the equator line, where you can stand in both hemispheres at once.',
    city: 'Quito',
    category: 'Cultural',
    bestTimeToVisit: 'June to September',
    entryFee: 5,
    tips: 'Visit early in the morning to avoid crowds and take sunscreen.',
  },
  {
    name: 'Galápagos Islands',
    description:
      'A unique archipelago known for its diverse wildlife and stunning landscapes.',
    city: 'Puerto Ayora',
    category: 'Natural',
    bestTimeToVisit: 'December to May',
    entryFee: 100,
    tips: 'Book tours in advance and bring comfortable walking shoes.',
  },
  {
    name: 'Cotopaxi National Park',
    description:
      'A park featuring the Cotopaxi volcano, one of the highest active volcanoes in the world.',
    city: 'Latacunga',
    category: 'Natural',
    bestTimeToVisit: 'June to September',
    entryFee: 10,
    tips: 'Dress warmly and be prepared for high altitudes.',
  },
  {
    name: 'Cuenca Historic Center',
    description:
      'A UNESCO World Heritage Site with colonial architecture and cobblestone streets.',
    city: 'Cuenca',
    category: 'Historical',
    bestTimeToVisit: 'Year-round',
    entryFee: 0,
    tips: 'Take a walking tour to fully appreciate the history and architecture.',
  },
  {
    name: 'Baños de Agua Santa',
    description:
      'A town known for its hot springs, waterfalls, and adventure sports.',
    city: 'Baños',
    category: 'Entertainment',
    bestTimeToVisit: 'October to February',
    entryFee: 3,
    tips: 'Try the swing at the end of the world and enjoy the thermal baths.',
  },
];

const travelTips: TravelTip[] = [
  {
    category: 'Cultural',
    tips: [
      'Visit early in the morning to avoid crowds and take sunscreen.',
      'Explore local museums to learn about Ecuadorian culture.',
    ],
  },
  {
    category: 'Natural',
    tips: [
      'Book tours in advance and bring comfortable walking shoes.',
      'Dress warmly and be prepared for high altitudes.',
      'Respect wildlife and follow park guidelines.',
    ],
  },
  {
    category: 'Historical',
    tips: [
      'Take a walking tour to fully appreciate the history and architecture.',
      'Visit local markets to experience traditional Ecuadorian crafts.',
    ],
  },
  {
    category: 'Entertainment',
    tips: [
      'Try the swing at the end of the world and enjoy the thermal baths.',
      'Participate in local festivals for a unique experience.',
    ],
  },
];

export async function getTouristResource() {
  return {
    attractions: touristAttractions,
    tips: travelTips,
  };
}
