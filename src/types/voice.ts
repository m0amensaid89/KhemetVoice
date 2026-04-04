export interface VoiceAnalysis {
  gender: string;
  pitch: string;
  characteristics: string[];
  visualDescription: string;
}

export interface Voice {
  name: string;
  pitch: string;
  characteristics: string;
  audioSampleUrl: string;
  fileUri?: string;
  analysis?: VoiceAnalysis;
  imageUrl?: string;
  imageAltText?: string;
  tooltip?: string;
  symbol: string;
  cardColor?: string;
}
