import { getCitiesResource } from '../resources/cities.js';

interface Props {
  from: string;
  to: string;
}

interface Distance {
  from: string;
  to: string;
  distanceKm: number;
  distanceMiles: number;
  estimatedTime: string;
  transportOptions: string[];
}

const calculateSimpleDistance = ({
  lat1,
  lon1,
  lat2,
  lon2,
}: {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}): number => {
  const latDiff = Math.abs(lat1 - lat2);
  const lonDiff = Math.abs(lon1 - lon2);

  const distanceKm = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 111;

  return Math.round(distanceKm);
};

export async function calculateDistance(props: Props) {
  const { from, to } = props;

  try {
    const cities = await getCitiesResource();

    const fromCity = cities.find(
      (city) => city.name.toLowerCase() === from.toLowerCase()
    );
    const toCity = cities.find(
      (city) => city.name.toLowerCase() === to.toLowerCase()
    );

    if (!fromCity || !toCity) {
      throw new Error(`Cities not found: ${from ? to : from} `);
    }

    const distanceKm = calculateSimpleDistance({
      lat1: fromCity.coordinates.lat,
      lon1: fromCity.coordinates.lon,
      lat2: toCity.coordinates.lat,
      lon2: toCity.coordinates.lon,
    });

    const distanceMiles = Math.round(distanceKm * 0.621371);

    let estimatedTime = 'N/A';
    let transportOptions: string[] = [];

    if (distanceKm < 50) {
      estimatedTime = 'Less than 1 hour';
      transportOptions = ['Walking', 'Biking', 'Car'];
    } else if (distanceKm < 200) {
      estimatedTime = '1-3 hours';
      transportOptions = ['Car', 'Bus', 'Train'];
    } else {
      estimatedTime = '3+ hours';
      transportOptions = ['Train', 'Flight'];
    }

    const distance: Distance = {
      from: fromCity.name,
      to: toCity.name,
      distanceKm,
      distanceMiles,
      estimatedTime,
      transportOptions,
    };

    return distance;
  } catch (error) {
    console.error('Error calculating distance:', error);

    throw new Error('Failed to calculate distance');
  }
}
