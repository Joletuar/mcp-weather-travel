interface Airport {
  code: string;
  name: string;
  city: string;
  province: string;
  type: 'International' | 'Domestic' | 'Regional';
  terminals: number;
  airlines: string[];
  destinations: string[];
}

const airports: Airport[] = [
  {
    code: 'UIO',
    name: 'Mariscal Sucre International Airport',
    city: 'Quito',
    province: 'Pichincha',
    type: 'International',
    terminals: 1,
    airlines: ['Avianca', 'LATAM', 'American Airlines', 'KLM'],
    destinations: ['Bogotá', 'Miami', 'Amsterdam', 'Lima'],
  },
  {
    code: 'GYE',
    name: 'José Joaquín de Olmedo International Airport',
    city: 'Guayaquil',
    province: 'Guayas',
    type: 'International',
    terminals: 1,
    airlines: ['Avianca', 'LATAM', 'Copa Airlines', 'JetBlue'],
    destinations: ['Panama City', 'New York', 'Madrid', 'Lima'],
  },
  {
    code: 'CUE',
    name: 'Mariscal Lamar Airport',
    city: 'Cuenca',
    province: 'Azuay',
    type: 'Regional',
    terminals: 1,
    airlines: ['LATAM', 'Avianca'],
    destinations: ['Quito', 'Guayaquil'],
  },
  {
    code: 'GPS',
    name: 'Seymour Airport',
    city: 'Baltra Island',
    province: 'Galápagos',
    type: 'Regional',
    terminals: 1,
    airlines: ['LATAM', 'Avianca'],
    destinations: ['Quito', 'Guayaquil'],
  },
  {
    code: 'SCY',
    name: 'San Cristóbal Airport',
    city: 'San Cristóbal Island',
    province: 'Galápagos',
    type: 'Regional',
    terminals: 1,
    airlines: ['LATAM', 'Avianca'],
    destinations: ['Quito', 'Guayaquil'],
  },
];

export async function getAirportsResource(): Promise<Airport[]> {
  return airports;
}
