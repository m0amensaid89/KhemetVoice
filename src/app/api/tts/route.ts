import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const khemetToGeminiMap: Record<string, { voiceName: string; promptBoost: string }> = {
  "KAIRO":   { voiceName: "Aoede",  promptBoost: "upbeat energetic male" },
  "NEFRA":   { voiceName: "Kore",    promptBoost: "bright clear female" },
  "RAMET":   { voiceName: "Charon",  promptBoost: "deep calm informative male" },
  "NEXAR":   { voiceName: "Puck",    promptBoost: "warm friendly upbeat male" },
  "LYRA":    { voiceName: "Aoede",   promptBoost: "enthusiastic upbeat female" },
  "HORUSEN": { voiceName: "Fenrir",  promptBoost: "casual clear excitable male" },
  "THOREN":  { voiceName: "Iapetus", promptBoost: "confident professional clear male" }
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("=== TTS API CALLED ===", body);

    const { text, voiceKey } = body;
    if (!text || !voiceKey) {
      return NextResponse.json({ error: "Missing text or voiceKey" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const mapping = khemetToGeminiMap[voiceKey.toUpperCase()] || khemetToGeminiMap["THOREN"];
    const fullPrompt = `${text} ${mapping.promptBoost}`;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-tts" });

    // We cannot pass responseModalities to `generateContent` via SDK directly in an intuitive way without overriding config
    // Actually, generating TTS via @google/generative-ai SDK requires passing it in the generationConfig or using a raw fetch.
    // The prompt explicitly states: "POST Route Handler using @google/generative-ai and model 'gemini-2.5-flash-preview-tts'"
    // and "Set responseModalities to ['AUDIO']". The SDK does support `responseModalities`.

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: {
        // @ts-ignore - The SDK might not have types for responseModalities and speechConfig yet
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: mapping.voiceName,
            }
          }
        }
      }
    });

    const response = await result.response;

    // The SDK structure for inlineData might be inside the response object.
    // Usually it's in candidates[0].content.parts[0].inlineData.data
    const audioBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!audioBase64) {
      throw new Error("No audio returned from Gemini");
    }

    return NextResponse.json({ audioBase64: audioBase64 });
  } catch (error) {
    console.error("TTS route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
