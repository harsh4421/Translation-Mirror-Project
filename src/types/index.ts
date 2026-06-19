export interface TranscriptItem {
  id: string;
  text: string;
  timestamp: Date;
  language: string;
}

export interface TranslationItem {
  id: string;
  originalId: string;
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  timestamp: Date;
}

export interface UserDictionaryEntry {
  id: string;
  sourceWord: string;
  targetWord: string;
  targetLanguage: TargetLanguage;
}

export type ViewState = 'live' | 'transcripts' | 'translations' | 'dictionary' | 'settings';

export interface SpeechState {
  isListening: boolean;
  isSupported: boolean;
  interimText: string;
  sourceLanguage: SourceLanguage;
  targetLanguage: TargetLanguage;
  transcriptHistory: TranscriptItem[];
  translationHistory: TranslationItem[];
  userDictionary: UserDictionaryEntry[];
  theme: ThemeMode;
  micStatus: MicStatus;
  activeView: ViewState;
}

export type SourceLanguage = 'en-US' | 'hi-IN' | 'fr-FR' | 'es-ES' | 'de-DE';
export type TargetLanguage = 'english' | 'hindi' | 'french' | 'spanish' | 'german';
export type ThemeMode = 'dark' | 'light';
export type MicStatus = 'idle' | 'listening' | 'error';
export type ExportFormat = 'md' | 'txt' | 'json';

export interface Language {
  code: SourceLanguage;
  label: string;
  flag: string;
}

export interface TargetLanguageOption {
  code: TargetLanguage;
  label: string;
  flag: string;
}

export const SOURCE_LANGUAGES: Language[] = [
  { code: 'en-US', label: 'English (US)', flag: '🇺🇸' },
  { code: 'hi-IN', label: 'Hindi (India)', flag: '🇮🇳' },
  { code: 'fr-FR', label: 'French (France)', flag: '🇫🇷' },
  { code: 'es-ES', label: 'Spanish (Spain)', flag: '🇪🇸' },
  { code: 'de-DE', label: 'German (Germany)', flag: '🇩🇪' },
];

export const TARGET_LANGUAGES: TargetLanguageOption[] = [
  { code: 'english', label: 'English', flag: '🇬🇧' },
  { code: 'hindi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'french', label: 'French', flag: '🇫🇷' },
  { code: 'spanish', label: 'Spanish', flag: '🇪🇸' },
  { code: 'german', label: 'German', flag: '🇩🇪' },
];
