import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const khemetToGeminiMap: Record<string, { voiceName: string, promptBoost: string }> = {
  "KAIRO":   { voiceName: "Aoede",  promptBoost: "upbeat energetic male" },
  "NEFRA":   { voiceName: "Kore",    promptBoost: "bright clear female" },
  "RAMET":   { voiceName: "Charon",  promptBoost: "deep calm informative male" },
  "NEXAR":   { voiceName: "Puck",    promptBoost: "warm friendly upbeat male" },
  "LYRA":    { voiceName: "Aoede",   promptBoost: "enthusiastic upbeat female" },
  "HORUSEN": { voiceName: "Fenrir",  promptBoost: "casual clear excitable male" },
  "THOREN":  { voiceName: "Iapetus", promptBoost: "confident professional clear male" }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, styleInstructions, voiceKey } = body;
    console.log("=== TTS API CALLED ===", { text, styleInstructions, voiceKey });
    console.log("GOOGLE_API_KEY loaded:", !!process.env.GOOGLE_API_KEY);

    if (!text || !voiceKey) {
      return NextResponse.json({ error: 'Missing text or voiceKey' }, { status: 400 });
    }

    const mapping = khemetToGeminiMap[voiceKey];
    if (!mapping) {
      return NextResponse.json({ error: 'Invalid voiceKey' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY || "";
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing GOOGLE_API_KEY' }, { status: 500 });
    }

    // Explicitly creating GoogleGenerativeAI instance as requested
    const genAI = new GoogleGenerativeAI(apiKey);

    const fullPrompt = `${styleInstructions ? styleInstructions + ' ' : ''}${text} ${mapping.promptBoost}`;

    // Using fetch with the required exact model as specified in the instructions
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [{ text: fullPrompt }]
        }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: mapping.voiceName
              }
            }
          }
        }
      })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API Error:", errorText);
        throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const audioPart = candidate?.content?.parts?.find((p: any) => p.inlineData && p.inlineData.mimeType.startsWith('audio/'));

    if (!audioPart) {
        throw new Error("No audio returned from Gemini");
    }

    const base64Audio = audioPart.inlineData.data;

    return NextResponse.json({ audioBase64: base64Audio, success: true }, { status: 200 });

  } catch (error: any) {
    console.error("TTS Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
