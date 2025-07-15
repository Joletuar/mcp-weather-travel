interface Props {
  from: string;
  to: string;
  date: string;
}

interface Flight {
  airline: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: string;
  from: string;
  to: string;
}

export async function fetchFlights(props: Props): Promise<Flight[]> {
  const { from, to, date } = props;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const flights: Flight[] = [
    {
      airline: 'Airline A',
      flightNumber: 'AA123',
      departureTime: '2025-07-01T10:00:00Z',
      arrivalTime: '2025-07-01T12:00:00Z',
      price: 200,
      duration: '2h',
      from: 'Quito',
      to: 'Guayaquil',
    },
    {
      airline: 'Airline B',
      flightNumber: 'BB456',
      departureTime: '2025-07-01T14:00:00Z',
      arrivalTime: '2025-07-01T16:00:00Z',
      price: 250,
      duration: '2h',
      from: 'Cuenca',
      to: 'Guayaquil',
    },
    {
      airline: 'Airline C',
      flightNumber: 'CC789',
      departureTime: '2025-07-01T18:00:00Z',
      arrivalTime: '2025-07-01T20:00:00Z',
      price: 300,
      duration: '2h',
      from: 'Quito',
      to: 'Cuenca',
    },
    {
      airline: 'Airline D',
      flightNumber: 'DD012',
      departureTime: '2025-07-02T08:00:00Z',
      arrivalTime: '2025-07-02T10:00:00Z',
      price: 150,
      duration: '2h',
      from: 'Guayaquil',
      to: 'Quito',
    },
    {
      airline: 'Airline E',
      flightNumber: 'EE345',
      departureTime: '2025-07-02T12:00:00Z',
      arrivalTime: '2025-07-02T14:00:00Z',
      price: 180,
      duration: '2h',
      from: 'Cuenca',
      to: 'Quito',
    },
    {
      airline: 'Airline F',
      flightNumber: 'FF678',
      departureTime: '2025-07-02T16:00:00Z',
      arrivalTime: '2025-07-02T18:00:00Z',
      price: 220,
      duration: '2h',
      from: 'Guayaquil',
      to: 'Cuenca',
    },
  ];

  const result = flights.filter(
    (flight) =>
      flight.from === from &&
      flight.to === to &&
      flight.departureTime.startsWith(date)
  );

  return result.length > 0 ? result : flights;
}
