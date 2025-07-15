import axios from 'axios';

interface Props {
  city: string;
}

interface WeatherData {
  current: {
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
  };
  forecast: {
    date: string;
    temperature: number;
    description: string;
  }[];
}

const cityCoordinates: Record<string, { lat: number; lon: number }> = {
  Quito: { lat: -0.1807, lon: -78.4678 },
  Guayaquil: { lat: -2.1709, lon: -79.9224 },
  Cuenca: { lat: -2.9006, lon: -79.0045 },
  SantoDomingo: { lat: -0.2536, lon: -79.1754 },
  Machala: { lat: -3.2581, lon: -79.9554 },
  Manta: { lat: -0.9677, lon: -80.7089 },
  Portoviejo: { lat: -1.0546, lon: -80.4545 },
  Ambato: { lat: -1.2417, lon: -78.6195 },
  Riobamba: { lat: -1.6636, lon: -78.6546 },
  Loja: { lat: -3.9931, lon: -79.2042 },
};

const getWeatherDescription = (code: number): string => {
  const desciptions: Record<number, string> = {
    200: 'Clear sky',
    201: 'Few clouds',
    202: 'Scattered clouds',
    203: 'Broken clouds',
    204: 'Shower rain',
    205: 'Rain',
    206: 'Thunderstorm',
    207: 'Snow',
    208: 'Mist',
  };

  return desciptions[code] || desciptions[200]!;
};

export async function getWeather(props: Props) {
  const { city } = props;

  const coordinate = cityCoordinates[city];

  if (!coordinate) {
    throw new Error(
      `[MCP-Weather-Error]: Coordinates for the city "${city}" were not found.`
    );
  }

  try {
    const resp = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinate.lat}&longitude=${coordinate.lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    );

    const { current, hourly } = resp.data;

    const forecast: WeatherData['forecast'] = [];
    const today = new Date();

    for (let i = 0; i <= 3; i++) {
      const date = new Date(hourly.time[i]);

      if (date.getDate() === today.getDate()) {
        forecast.push({
          date: date.toISOString().split('T')[0] || '',
          temperature: hourly.temperature_2m[i],
          description: getWeatherDescription(current.weathercode),
        });
      }
    }

    const weatherData: WeatherData = {
      current: {
        temperature: current.temperature_2m,
        description: getWeatherDescription(current.weathercode),
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
      },
      forecast: forecast,
    };

    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);

    throw new Error(`Could no get weather for ${city}`);
  }
}
