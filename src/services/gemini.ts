import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface Message {
  role: "user" | "model";
  text: string;
  image?: string;
}

export async function getAgriculturalAdvice(prompt: string, image?: string): Promise<string> {
  try {
    const model = "gemini-3-flash-preview";
    
    let contents: any;
    
    if (image) {
      const base64Data = image.split(",")[1];
      const mimeType = image.split(";")[0].split(":")[1];
      
      contents = {
        parts: [
          { inlineData: { data: base64Data, mimeType } },
          { text: prompt || "Analyze this agricultural image and provide advice or diagnosis." }
        ]
      };
    } else {
      contents = prompt;
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: `You are AgroSolve AI, an expert agricultural consultant. 
        Your goal is to provide accurate, practical, and sustainable farming advice.
        You can help with:
        - Crop selection and management
        - Pest and disease diagnosis (especially when given images)
        - Soil health and fertilization
        - Irrigation techniques
        - Sustainable and organic farming practices
        - Weather-related farming decisions
        
        Always prioritize safety and environmental sustainability. If you're unsure about a diagnosis, suggest consulting a local agricultural extension officer.
        Keep your tone professional, warm, and encouraging. Use clear, accessible language.`,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while connecting to the AI service. Please check your connection and try again.";
  }
}
