import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { getWeather } from './tools/weather.js';
import {
  CallToolRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { fetchFlights } from './tools/flights.js';
import { getAirportsResource } from './resources/airports.js';
import { getCitiesResource } from './resources/cities.js';
import { getTouristResource } from './resources/tourist.js';
import { calculateDistance } from './tools/distance.js';
import { getWeatherAnalysisPrompt } from './prompts/weather-analysis.js';
import { getTravelSuggestionsPrompt } from './prompts/travel-suggestions.js';
import { getRecommendations } from './tools/recommendations.js';

const server = new Server(
  {
    name: 'mcp-weather-travel-assistan',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      prompts: {},
      resources: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, () => {
  return {
    tools: [
      {
        name: 'get_weather',
        description: 'Gets current weather and forecast for a specific city',
        inputSchema: {
          type: 'object',
          properties: {
            city: {
              type: 'string',
              description: 'City name',
            },
          },
          required: ['city'],
        },
      },
      {
        name: 'fetch_flights',
        description: 'Fetches available flights for a given route',
        inputSchema: {
          type: 'object',
          properties: {
            from: {
              type: 'string',
              description: 'Departure city',
            },
            to: {
              type: 'string',
              description: 'Destination city',
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Travel date in YYYY-MM-DD format',
            },
          },
          required: ['from', 'to', 'date'],
        },
      },
      {
        name: 'calculate_distance',
        description: 'Calculates distance between two cities',
        inputSchema: {
          type: 'object',
          properties: {
            from: {
              type: 'string',
              description: 'Departure city name',
            },
            to: {
              type: 'string',
              description: 'Destination city name',
            },
          },
          required: ['from', 'to'],
        },
      },
      {
        name: 'get_recomendations',
        description:
          'Provides travel recommendations based on destination, travel date, and duration',
        inputSchema: {
          type: 'object',
          properties: {
            destination: {
              type: 'string',
              description: 'Destination city name',
            },
            travelDate: {
              type: 'string',
              description: 'Travel date in YYYY-MM-DD format',
            },
            duration: {
              type: 'integer',
              description: 'Duration of stay in days',
            },
          },
          required: ['destination', 'travelDate'],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!args || Object.values(args).length === 0)
    throw new Error('Arguments are required');

  switch (name) {
    case 'get_weather': {
      const result = await getWeather(args as any);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    case 'fetch_flights': {
      const result = await fetchFlights(args as any);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    case 'calculate_distance': {
      const result = await calculateDistance(args as any);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    case 'get_recomendations': {
      const result = await getRecommendations(args as any);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

server.setRequestHandler(ListResourcesRequestSchema, () => {
  return {
    resources: [
      {
        name: 'airports',
        description: 'Airports Database',
        mimeType: 'application/json',
        uri: 'airports',
      },
      {
        name: 'cities',
        description: 'Cities Database',
        mimeType: 'application/json',
        uri: 'cities',
      },
      {
        name: 'tourist-info',
        description: 'Tourist Information Database',
        mimeType: 'application/json',
        uri: 'tourist-info',
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case 'airports': {
      const result = await getAirportsResource();

      return {
        contents: [
          {
            uri: 'airports',
            mimeType: 'application/json',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    case 'cities': {
      const result = await getCitiesResource();

      return {
        contents: [
          {
            uri: 'cities',
            mimeType: 'application/json',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    case 'tourist-info':
      const result = await getTouristResource();

      return {
        contents: [
          {
            uri: 'tourist-info',
            mimeType: 'application/json',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };

    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
});

server.setRequestHandler(ListPromptsRequestSchema, () => {
  return {
    prompts: [
      {
        name: 'weather_analysis_prompt',
        description: 'A prompt to analyze weather data for a specific city',
        arguments: [
          {
            name: 'city',
            type: 'string',
            description: 'The city to analyze weather for',
            required: true,
          },
          {
            name: 'days',
            type: 'integer',
            description: 'Number of days to analyze weather data for',
            required: false,
          },
        ],
      },
      {
        name: 'travel_suggestions_prompt',
        description:
          'A prompt to get travel suggestions based on weather and tourist resources',
        arguments: [
          {
            name: 'city',
            type: 'string',
            description: 'The city to get travel suggestions for',
            required: true,
          },
          {
            name: 'travelDate',
            type: 'string',
            description: 'The date of travel in YYYY-MM-DD format',
            required: true,
          },
          {
            name: 'preferences',
            type: 'string',
            description:
              'User preferences for travel suggestions (e.g., cultural, adventure)',
            required: false,
          },
        ],
      },
    ],
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (!args || Object.values(args).length === 0)
    throw new Error('Arguments are required');

  switch (name) {
    case 'weather_analysis_prompt': {
      const result = getWeatherAnalysisPrompt(args as any);

      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: result,
            },
          },
        ],
      };
    }

    case 'travel_suggestions_prompt': {
      const result = await getTravelSuggestionsPrompt(args as any);

      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: result,
            },
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown prompt: ${name}`);
  }
});

const transport = new StdioServerTransport();

await server.connect(transport);
