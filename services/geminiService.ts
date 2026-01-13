
import { GoogleGenAI, Type } from "@google/genai";
import { Recommendation } from "../types";

export const getBookRecommendation = async (topic: string): Promise<Recommendation> => {
  // Fixed: Always use a new instance and access process.env.API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Bir kitap kurdu olarak, "${topic}" temalı bir kitap önerisi yap. JSON formatında dön: title, author, description. Dil Türkçe olsun.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          author: { type: Type.STRING },
          description: { type: Type.STRING },
        },
        required: ["title", "author", "description"]
      }
    }
  });

  try {
    // Fixed: Using the .text property as a getter and trimming the result before parsing
    const jsonStr = response.text?.trim() || "{}";
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return {
      title: "Hayati Oku",
      author: "Angora Akademi",
      description: "Kendini geliştirme yolculuğunda sana rehberlik edecek eşsiz bir eser."
    };
  }
};
