interface Props {
  city: string;
  days?: number;
}

export function getWeatherAnalysisPrompt(props: Props) {
  const { city, days = 7 } = props;

  return `Provide a detailed and comprehensive analysis of the weather forecast for ${city}, Ecuador, over the next ${days} days. The analysis should include the following sections:

1. **Daily Weather Breakdown**:
   - For each day, provide:
     - High and low temperatures (in Celsius and Fahrenheit).
     - Expected precipitation levels (in millimeters and inches).
     - Wind speeds (in kilometers per hour and miles per hour) and directions.
     - Humidity levels (as a percentage).
     - UV index and its implications for outdoor activities.
     - Sunrise and sunset times.

2. **Significant Weather Events**:
   - Highlight any major weather events such as storms, heatwaves, heavy rainfall, or snow.
   - Provide warnings or alerts if applicable, including potential risks to safety.

3. **Trends and Patterns**:
   - Identify and explain any noticeable trends, such as a gradual increase or decrease in temperature, recurring precipitation, or consistent wind patterns.
   - Discuss how these trends might affect outdoor activities or travel plans.

4. **Impact on Outdoor Activities**:
   - Assess how the forecasted weather conditions could influence common tourist activities in Ecuador, such as exploring the Galápagos Islands, hiking in the Andes, or visiting the Amazon rainforest.
   - Recommend the best times of day for outdoor activities based on the forecast.

5. **Tailored Recommendations for Tourists**:
   - Suggest appropriate clothing and gear for the forecasted conditions (e.g., raincoats, sunscreen, warm layers).
   - Provide advice on precautions to take, such as staying hydrated during heatwaves or avoiding outdoor activities during storms.
   - Highlight any specific attractions or activities in ${city}, Ecuador, that are particularly suited to the forecasted weather.

6. **Clarity and Actionability**:
   - Ensure the report is written in clear, concise language that is easy to understand.
   - Use bullet points or subheadings to organize information for quick reference.
   - Include actionable advice that tourists can follow to make the most of their visit to ${city}, Ecuador.

The goal is to create a weather analysis that is not only informative but also practical and helpful for tourists planning their activities in ${city}, Ecuador.`;
}
