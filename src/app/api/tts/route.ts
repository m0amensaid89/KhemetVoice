import { NextRequest, NextResponse } from "next/server";

const STYLE_MAP: Record<string, string> = {
  Professional: "Clear, measured, professional business tone. Confident and composed.",
  Warm: "Warm, genuine, human warmth. Like talking to a trusted advisor.",
  Energetic: "Upbeat, enthusiastic, forward energy. Exciting but controlled.",
  Formal: "Formal, authoritative, composed. Zero unnecessary warmth.",
  Calm: "Slow, peaceful, reassuring. Very deliberate pacing.",
  Storytelling: "Expressive narrative tone. Slight dramatic flair and rhythm."
};

const HERO_VOICE_MAP: Record<string, string> = {
  KAIRO: "Puck",
  NEFRA: "Aoede",
  RAMET: "Charon",
  NEXAR: "Fenrir",
  LYRA: "Leda",
  HORUSEN: "Alnilam",
  THOREN: "Iapetus"
};

async function generateTTS(text: string, style?: string, voiceName: string = "Iapetus") {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key not configured");
  }

  const promptStyle = STYLE_MAP[style || ""] || style;
  const prompt = `${promptStyle ? `DIRECTOR'S NOTES\n${promptStyle}\n\nTRANSCRIPT:\n` : ""}${text}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: HERO_VOICE_MAP[voiceName] || voiceName,
              },
            },
          },
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error("Gemini TTS error:", err);
    throw new Error("TTS generation failed");
  }

  const data = await response.json();

  const audioData =
    data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

  if (!audioData) {
    throw new Error("No audio in response");
  }

  return audioData;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check for the new format
    if (body.mode && body.speakers) {
      const { mode, speakers } = body;

      if (mode === "single") {
        const audioData = await generateTTS(speakers[0].text, speakers[0].style, speakers[0].voiceName);
        return NextResponse.json({
          audio: audioData,
          mimeType: "audio/wav"
        });
      } else if (mode === "dual") {
        const [audioA, audioB] = await Promise.all([
          generateTTS(speakers[0].text, speakers[0].style, speakers[0].voiceName),
          generateTTS(speakers[1].text, speakers[1].style, speakers[1].voiceName)
        ]);

        return NextResponse.json({
          audioA,
          audioB,
          mimeType: "audio/wav"
        });
      } else {
        return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
      }
    }

    // Fallback to old format
    const { text, style } = body;

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const audioData = await generateTTS(text, style);
    const audioBuffer = Buffer.from(audioData, "base64");

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": audioBuffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error("TTS route error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
