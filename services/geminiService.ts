import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.warn("API_KEY is not set.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
}

export const generateWeddingWish = async (
  relationship: string,
  tone: string
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "May your life together be full of love and your love be full of life.";

  try {
    const prompt = `Write a short, heartwarming wedding wish (max 2 sentences) for a couple named Aarav and Diya. 
    The guest is a ${relationship} of the couple. The tone should be ${tone}.
    Keep it elegant and suitable for an Indian wedding guestbook.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text || "Congratulations on your special day!";
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "Wishing you a lifetime of love and happiness.";
  }
};