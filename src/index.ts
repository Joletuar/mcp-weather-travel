import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { getWeather } from './tools/weather.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { fetchFlights } from './tools/flights.js';

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

server.setRequestHandler(ListToolsRequestSchema, async () => {
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
            text: JSON.stringify(result),
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
            text: JSON.stringify(result),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

const transport = new StdioServerTransport();

await server.connect(transport);
