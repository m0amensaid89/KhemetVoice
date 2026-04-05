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

export interface FilterState {
  gender: string | 'All';
  pitch: string | 'All';
  search: string;
}

export interface AiRecommendation {
  voiceNames: string[];
  systemInstruction: string;
  sampleText: string;
}
