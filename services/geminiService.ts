
import { GoogleGenAI, Type } from "@google/genai";
import { Source } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateBlogOutline = async (topic: string): Promise<string[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a structured, SEO-optimized blog outline for the topic: "${topic}". Return the response as a JSON array of strings representing headings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  try {
    return JSON.parse(response.text || '[]');
  } catch (e) {
    return ["Introduction", "Trends", "Best Practices", "Conclusion"];
  }
};

export const generateDraftContent = async (topic: string, outline: string[]): Promise<{ content: string; keywords: string[]; sources: Source[] }> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Write a high-quality, professional blog post about "${topic}" based on this outline: ${outline.join(', ')}. 
    Use Google Search to find real data and trends. 
    Use Markdown. 
    At the end of your response, provide 3-5 keywords in a comma-separated list.`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });

  const rawText = response.text || '';
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  
  const sources: Source[] = chunks
    .filter((chunk: any) => chunk.web && chunk.web.uri)
    .map((chunk: any) => ({
      uri: chunk.web.uri,
      title: chunk.web.title || 'Source'
    }));

  // Simple parser to find keywords at the end if present
  let content = rawText;
  let keywords = [topic, 'AI', 'Trending'];
  
  const lastLine = rawText.split('\n').pop();
  if (lastLine && lastLine.includes(',')) {
    keywords = lastLine.split(',').map(k => k.trim());
    content = rawText.substring(0, rawText.lastIndexOf('\n'));
  }

  return { content, keywords, sources };
};

export const generatePostImage = async (prompt: string): Promise<string | null> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A cinematic, ultra-high-quality professional blog featured image for: ${prompt}. Aesthetic and modern.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed", error);
    return null;
  }
};
