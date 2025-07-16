interface City {
  name: string;
  province: string;
  population: number;
  elevation: number;
  timezone: string;
  description: string;
  highlights: string[];
  bestTimeToVisit: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

const cities: City[] = [
  {
    name: 'Quito',
    province: 'Pichincha',
    population: 2000000,
    elevation: 2850,
    timezone: 'GMT-5',
    description:
      'The capital city of Ecuador, known for its well-preserved colonial center.',
    highlights: ['Historic Center', 'El Panecillo', 'Teleférico'],
    bestTimeToVisit: 'June to September',
    coordinates: {
      lat: -0.1807,
      lon: -78.4678,
    },
  },
  {
    name: 'Guayaquil',
    province: 'Guayas',
    population: 2800000,
    elevation: 4,
    timezone: 'GMT-5',
    description:
      "Ecuador's largest city and main port, known for its vibrant culture.",
    highlights: ['Malecón 2000', 'Las Peñas', 'Parque Seminario'],
    bestTimeToVisit: 'July to November',
    coordinates: {
      lat: -2.1894,
      lon: -79.8891,
    },
  },
  {
    name: 'Cuenca',
    province: 'Azuay',
    population: 400000,
    elevation: 2560,
    timezone: 'GMT-5',
    description:
      'A charming city in the Andes, famous for its colonial architecture.',
    highlights: ['New Cathedral', 'Turi Viewpoint', 'Cajas National Park'],
    bestTimeToVisit: 'May to September',
    coordinates: {
      lat: -2.9006,
      lon: -79.0045,
    },
  },
  {
    name: 'Ambato',
    province: 'Tungurahua',
    population: 180000,
    elevation: 2577,
    timezone: 'GMT-5',
    description:
      "Known as the 'City of Flowers and Fruits', located in the central Andes.",
    highlights: [
      'Parque de la Familia',
      'Quinta de Juan León Mera',
      'Carnival Festival',
    ],
    bestTimeToVisit: 'February to April',
    coordinates: {
      lat: -1.2417,
      lon: -78.6197,
    },
  },
  {
    name: 'Manta',
    province: 'Manabí',
    population: 220000,
    elevation: 6,
    timezone: 'GMT-5',
    description: 'A coastal city known for its beaches and seafood.',
    highlights: ['Playa El Murciélago', 'Montecristi', 'Port of Manta'],
    bestTimeToVisit: 'December to May',
    coordinates: {
      lat: -0.9677,
      lon: -80.7089,
    },
  },
];

export async function getCitiesResource(): Promise<City[]> {
  return cities;
}
