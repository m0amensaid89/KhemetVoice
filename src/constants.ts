/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Voice } from '@/types/voice';

// Raw data from the user request
const rawData = [
    {
      "name": "KAIRO",
      "pitch": "Middle",
      "characteristics": ["Upbeat"],
      "audioSampleUrl": "https://raw.githubusercontent.com/m0amensaid89/KhemetVoice/main/public/KAIRO.wav",
      "fileUri": "https://generativelanguage.googleapis.com/v1beta/files/pjb8nmxvv87i",
      "cardColor": "#6c63ff",
      "analysis": {
        "gender": "Male",
        "pitch": "Medium",
        "characteristics": ["Young Adult", "Casual", "Energetic", "Approachable"],
        "visualDescription": "..."
      }
    },
    {
      "name": "NEFRA",
      "pitch": "Middle",
      "characteristics": ["Firm"],
      "audioSampleUrl": "https://raw.githubusercontent.com/m0amensaid89/KhemetVoice/main/public/NEFRA.wav",
      "fileUri": "https://generativelanguage.googleapis.com/v1beta/files/5gsff9mzdklz",
      "cardColor": "#9b59b6",
      "analysis": {
        "gender": "Female",
        "pitch": "Medium-High",
        "characteristics": ["Enthusiastic", "Bright", "Young Adult", "Clear", "Optimistic"],
        "visualDescription": "..."
      },
      "imageAltText": "A stylized icon of a mummy, representing the voice Nefra.",
      "tooltip": "The stylized icon of a mummy, representing the voice Nefra.",
      "imageUrl": "https://img.icons8.com/ios-filled/100/ffffff/mummy.png"
    },
    {
      "name": "RAMET",
      "pitch": "Lower",
      "characteristics": ["Informative"],
      "audioSampleUrl": "https://raw.githubusercontent.com/m0amensaid89/KhemetVoice/main/public/RAMET.wav",
      "fileUri": "https://generativelanguage.googleapis.com/v1beta/files/eht4pbht6w16",
      "cardColor": "#4ecdc4",
      "analysis": {
        "gender": "Male",
        "pitch": "Low",
        "characteristics": ["Deep", "Calm", "Resonant", "Professional"],
        "visualDescription": "..."
      }
    },
    {
      "name": "NEXAR",
      "pitch": "Lower middle",
      "characteristics": ["Excitable"],
      "audioSampleUrl": "https://raw.githubusercontent.com/m0amensaid89/KhemetVoice/main/public/NEXAR.wav",
      "fileUri": "https://generativelanguage.googleapis.com/v1beta/files/kbtpe6yz1777",
      "cardColor": "#ff4444",
      "analysis": {
        "gender": "Male",
        "pitch": "Medium-Low",
        "characteristics": ["Warm", "Inquisitive", "Clear articulation", "Mid-30s", "Friendly"],
        "visualDescription": "..."
      }
    },
    {
      "name": "LYRA",
      "pitch": "Higher",
      "characteristics": ["Bright"],
      "audioSampleUrl": "https://raw.githubusercontent.com/m0amensaid89/KhemetVoice/main/public/LYRA.wav",
      "fileUri": "https://generativelanguage.googleapis.com/v1beta/files/l8ohk0ehyuwd",
      "cardColor": "#2d6a4f",
      "analysis": {
        "gender": "Female",
        "pitch": "Medium-High",
        "characteristics": ["Enthusiastic", "Young Adult", "Clear Articulation", "Upbeat"],
        "visualDescription": "..."
      }
    },
    {
      "name": "HORUSEN",
      "pitch": "Lower middle",
      "characteristics": ["Firm"],
      "audioSampleUrl": "https://raw.githubusercontent.com/m0amensaid89/KhemetVoice/main/public/HORUSEN.wav",
      "fileUri": "https://generativelanguage.googleapis.com/v1beta/files/lyp5xb51dqrp",
      "cardColor": "#3a6dd4",
      "analysis": {
        "gender": "Male",
        "pitch": "Medium-Low",
        "characteristics": ["Inquisitive", "Casual", "Clear articulation", "Young adult"],
        "visualDescription": "..."
      }
    },
    {
      "name": "THOREN",
      "pitch": "Lower middle",
      "characteristics": ["Clear"],
      "audioSampleUrl": "https://raw.githubusercontent.com/m0amensaid89/KhemetVoice/main/public/THOREN.wav",
      "fileUri": "https://generativelanguage.googleapis.com/v1beta/files/9dbnvhqx1pm6",
      "cardColor": "#c0c0c0",
      "analysis": {
        "gender": "Male",
        "pitch": "Medium-Low",
        "characteristics": ["Confident", "Professional", "Inviting", "Resonant"],
        "visualDescription": "..."
      }
    }
  ];

// Enhance data with Egyptian symbols
const EGYPTIAN_SYMBOLS = [
  "ankh",
  "nefertiti",
  "insect",
  "lotus",
  "feather",
  "pyramids",
  "monument"
];

export const VOICE_DATA: Voice[] = rawData.map((voice, index) => ({
  ...voice,
  symbol: EGYPTIAN_SYMBOLS[index % EGYPTIAN_SYMBOLS.length],
  imageUrl: (voice as any).imageUrl || `https://img.icons8.com/ios-filled/200/ffffff/${EGYPTIAN_SYMBOLS[index % EGYPTIAN_SYMBOLS.length]}.png?v=10`,
  imageAltText: (voice as any).imageAltText || `Icon representing ${voice.name}`,
  tooltip: (voice as any).tooltip
} as Voice));