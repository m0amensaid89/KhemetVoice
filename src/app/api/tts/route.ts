import { NextRequest, NextResponse } from "next/server";

const STYLE_PRESETS: Record<string, string> = {
  Professional: "Clear, measured, professional business tone. Confident and composed.",
  Warm: "Warm, genuine, human warmth. Like talking to a trusted advisor.",
  Energetic: "Upbeat, enthusiastic, forward energy. Exciting but controlled.",
  Formal: "Formal, authoritative, composed. Zero unnecessary warmth.",
  Calm: "Slow, peaceful, reassuring. Very deliberate pacing.",
  Storytelling: "Expressive narrative tone. Slight dramatic flair and rhythm.",
};

const VOICE_MAP: Record<string, string> = {
  KAIRO: "Puck",
  NEFRA: "Aoede",
  RAMET: "Charon",
  NEXAR: "Fenrir",
  LYRA: "Leda",
  HORUSEN: "Alnilam",
  THOREN: "Iapetus",
};

async function generateSingleAudio(
  text: string,
  style: string,
  voiceName: string,
  apiKey: string
): Promise<string> {
  const styleNotes = STYLE_PRESETS[style] || style;
  const geminiVoice = VOICE_MAP[voiceName?.toUpperCase()] || "Iapetus";
  const prompt = `DIRECTOR'S NOTES\n${styleNotes}\n\nTRANSCRIPT:\n${text}`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: geminiVoice },
            },
          },
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini TTS error: ${err}`);
  }

  const data = await response.json();
  const audioData = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!audioData) throw new Error("No audio in Gemini response");
  return audioData;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    // Legacy single-speaker format: { text, style }
    if (body.text && !body.mode) {
      const audioData = await generateSingleAudio(
        body.text,
        body.style || "Professional",
        "THOREN",
        apiKey
      );
      const audioBuffer = Buffer.from(audioData, "base64");
      return new NextResponse(audioBuffer, {
        status: 200,
        headers: {
          "Content-Type": "audio/wav",
          "Content-Length": audioBuffer.length.toString(),
        },
      });
    }

    // New format: { mode, speakers: [{ text, style, voiceName }] }
    const { mode, speakers } = body;

    if (!speakers || speakers.length === 0) {
      return NextResponse.json({ error: "No speakers provided" }, { status: 400 });
    }

    if (mode === "single" || speakers.length === 1) {
      const { text, style, voiceName } = speakers[0];
      if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

      const audio = await generateSingleAudio(text, style || "Professional", voiceName, apiKey);
      return NextResponse.json({ audio, mimeType: "audio/wav" });
    }

    if (mode === "dual" && speakers.length === 2) {
      const [spA, spB] = speakers;
      if (!spA.text || !spB.text) {
        return NextResponse.json({ error: "Both speakers need text" }, { status: 400 });
      }

      // Generate both in parallel
      const [audioA, audioB] = await Promise.all([
        generateSingleAudio(spA.text, spA.style || "Professional", spA.voiceName, apiKey),
        generateSingleAudio(spB.text, spB.style || "Warm", spB.voiceName, apiKey),
      ]);

      return NextResponse.json({ audioA, audioB, mimeType: "audio/wav" });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("TTS route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
