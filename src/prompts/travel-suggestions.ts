import { getCitiesResource } from '../resources/cities.js';

export interface Props {
  destination: string;
  travelDate: string;
  preferences?: string;
}

export async function getTravelSuggestionsPrompt(props: Props) {
  const { destination, travelDate, preferences } = props;

  const cities = await getCitiesResource();

  const prompt = `
    You are a highly knowledgeable travel assistant. Using the context provided below, generate comprehensive and detailed travel suggestions for the user:
    
    Context:
    - Destination: ${destination}
    - Travel Date: ${travelDate}
    - Preferences: ${preferences || 'None provided'}
    - Available Cities: ${cities.map((city) => city.name).join(', ')}

    Your response should include the following sections:

    1. **Destination Overview**:
       - Provide a detailed description of the destination, including its history, culture, and any unique characteristics that make it worth visiting.

    2. **Top Attractions and Activities**:
       - List the must-visit attractions, landmarks, or natural wonders in the destination.
       - Suggest activities tailored to the user's preferences (if provided), such as outdoor adventures, cultural experiences, or relaxation spots.

    3. **Local Cuisine and Dining Recommendations**:
       - Highlight the local cuisine and any signature dishes the destination is known for.
       - Recommend specific restaurants, cafes, or food markets, including their specialties and why they are worth visiting.

    4. **Cultural and Seasonal Events**:
       - Identify any festivals, cultural events, or seasonal activities happening around the travel date.
       - Provide details about the events, including dates, locations, and what makes them special.

    5. **Transportation and Accommodation Tips**:
       - Offer advice on the best ways to get around the destination, such as public transport, car rentals, or walking routes.
       - Suggest areas or neighborhoods to stay in, along with types of accommodations (e.g., hotels, hostels, vacation rentals) and any notable options.

    6. **Insider Tips and Recommendations**:
       - Share lesser-known attractions or hidden gems that the user might enjoy.
       - Provide practical advice, such as the best times to visit popular spots, local customs to be aware of, or packing tips based on the season.

    Ensure that your suggestions are personalized and relevant to the user's preferences if they are provided. Be as detailed and specific as possible to create a rich and engaging travel plan.
  `;

  return prompt;
}
