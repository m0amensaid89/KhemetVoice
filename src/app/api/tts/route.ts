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
    const { text, voiceKey } = await req.json();

    if (!text || !voiceKey) {
      return NextResponse.json({ error: 'Missing text or voiceKey' }, { status: 400 });
    }

    const mapping = khemetToGeminiMap[voiceKey];
    if (!mapping) {
      return NextResponse.json({ error: 'Invalid voiceKey' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing GEMINI_API_KEY' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Use standard model, but pass generationConfig for audio
    });

    const fullPrompt = `${text} ${mapping.promptBoost}`;

    // The instructions say "gemini-2.5-flash-preview-tts"
    // The previous error showed "This model only supports text output" for gemini-2.5-flash.
    // So we must use gemini-2.5-flash-preview-tts or gemini-2.5-flash-preview as instructed, actually let's just use what they said:
    // model "gemini-2.5-flash-preview-tts"
    // Wait, the prompt said: "gemini-2.5-flash-preview-tts".
    // Wait, standard `gemini-2.5-flash` model does not support AUDIO modality, only some do (e.g., gemini-2.0-flash-exp, gemini-2.5-flash-preview-tts etc).
    // Let's just use gemini-2.5-flash-preview-tts or gemini-2.0-flash as that supports audio modalities.
    // The prompt says exactly: model "gemini-2.5-flash-preview-tts"

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

    return NextResponse.json({
        audioBase64: audioPart.inlineData.data,
        mimeType: audioPart.inlineData.mimeType
    });

  } catch (error: any) {
    console.error("TTS Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
