import { getTravelSuggestionsPrompt } from '../prompts/travel-suggestions.js';
import { getCitiesResource } from '../resources/cities.js';
import { getTouristResource } from '../resources/tourist.js';
import { getWeather } from './weather.js';

interface Props {
  destination: string;
  travelDate: string;
  duration?: number;
}

interface Recommendation {
  destionation: string;
  travelDate: string;
  weatherAdvice: string;
  packingSuggestions: string[];
  activities: string[];
  accommodationTips: string;
  budgeEstimate: string;
  bestTimeToVisit: string;
}

function getSeason(): string {
  const month = new Date().getMonth() + 1;

  switch (true) {
    case month >= 3 && month <= 5:
      return 'Spring';
    case month >= 6 && month <= 8:
      return 'Summer';
    case month >= 9 && month <= 11:
      return 'Autumn';
    default:
      return 'Winter';
  }
}

export async function getRecommendations(props: Props) {
  const { destination, travelDate, duration = 7 } = props;

  try {
    const cities = await getCitiesResource();
    const tourist = await getTouristResource();

    const city = cities.find(
      (city) => city.name.toLowerCase() === destination.toLowerCase()
    );

    if (!city) {
      throw new Error(`City ${destination} not found`);
    }

    const attractions = tourist.attractions.filter(
      (attraction) => attraction.city.toLowerCase() === city.name.toLowerCase()
    );

    const weather = await getWeather({ city: city.name });

    if (!weather) {
      throw new Error(`Weather data for ${city.name} is not available`);
    }

    const suggestionPropmtResponse = await getTravelSuggestionsPrompt({
      destination: city.name,
      travelDate,
      preferences: `Duration: ${duration} days, Season: ${getSeason()}, Weather: ${
        weather.current.description
      } at ${weather.current.temperature}°C. City ${city.name}.`,
    });

    const baseBudget = 1000;
    const budgeMultiplier = duration / 7;
    const budgetEstimate = `$${(baseBudget * budgeMultiplier).toFixed(2)}`;

    const recommendations: Recommendation = {
      destionation: city.name,
      travelDate,
      weatherAdvice: `The current weather in ${city.name} is ${weather.current.description} with a temperature of ${weather.current.temperature}°C. Humidity is at ${weather.current.humidity}% and wind speed is ${weather.current.windSpeed} km/h.`,
      packingSuggestions: [
        'Light clothing for warm weather',
        'Comfortable walking shoes',
        'Sunscreen and sunglasses',
        'A light jacket for cooler evenings',
      ],
      activities: attractions.map((attraction) => attraction.name),
      accommodationTips: `Consider booking accommodations near the city center for easy access to attractions. Popular options include hotels, hostels, and vacation rentals.`,
      budgeEstimate: budgetEstimate,
      bestTimeToVisit: city.bestTimeToVisit,
    };

    return {
      ...recommendations,
      propmtAnalysis: suggestionPropmtResponse,
      cityDescription: city.description,
      highlights: city.highlights,
    };
  } catch (error) {
    console.error('Error fetching recommendations:', error);

    throw new Error('Failed to fetch recommendations');
  }
}
