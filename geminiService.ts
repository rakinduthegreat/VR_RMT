
import { GoogleGenAI, Type } from "@google/genai";
import { VehicleData, VehicleReport } from "../types";

// Note: In a deployed environment like GitHub Pages, process.env.API_KEY must be 
// available at build time or handled via a secrets manager.
const API_KEY = process.env.API_KEY || '';

export const generateVehicleReport = async (data: VehicleData): Promise<VehicleReport> => {
  if (!API_KEY) {
    throw new Error("System Configuration Error: API Key is missing. Please contact administrator.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `
    Task: Professional Vehicle Valuation for Sri Lanka Insurance General LTD.
    Vehicle Details:
    - Brand: ${data.brand}
    - Model: ${data.model}
    - Year: ${data.year}
    - Chassis: ${data.chassisNumber || 'N/A'}
    - Engine: ${data.engineNumber || 'N/A'}

    Requirements:
    1. Research current Sri Lankan market prices (LKR) for ${data.year} ${data.brand} ${data.model}.
    2. Provide 3 distinct valuation tiers: Excellent, Good, Average.
    3. For each tier, provide a Min and Max Market Value.
    4. Calculate Sum Insured as 85% of the Market Value.
    5. List standard fittings and fuel types (PETROL, DIESEL, HEV, PHEV, BEV).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            brand: { type: Type.STRING },
            name: { type: Type.STRING },
            year: { type: Type.STRING },
            fuelType: { type: Type.STRING },
            engineCapacity: { type: Type.STRING },
            seatingCapacity: { type: Type.NUMBER },
            marketRanges: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  condition: { type: Type.STRING },
                  minValue: { type: Type.NUMBER },
                  maxValue: { type: Type.NUMBER },
                  minSumInsured: { type: Type.NUMBER },
                  maxSumInsured: { type: Type.NUMBER }
                },
                required: ["condition", "minValue", "maxValue", "minSumInsured", "maxSumInsured"]
              }
            },
            fittings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  available: { type: Type.BOOLEAN }
                },
                required: ["name", "available"]
              }
            },
            otherFittings: { type: Type.ARRAY, items: { type: Type.STRING } },
            disclaimer: { type: Type.STRING }
          },
          required: ["brand", "name", "year", "fuelType", "marketRanges", "fittings"]
        }
      }
    });

    if (!response.text) throw new Error("Empty response from AI engine");
    return JSON.parse(response.text);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate valuation report. Please try again later.");
  }
};
