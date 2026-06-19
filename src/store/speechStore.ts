import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  SpeechState,
  TranscriptItem,
  TranslationItem,
  SourceLanguage,
  TargetLanguage,
  ThemeMode,
  MicStatus,
  ViewState,
  UserDictionaryEntry,
} from '../types';
import { localStorageService } from '../services/localStorageService';

const savedPrefs = localStorageService.loadPreferences();
const savedHistory = localStorageService.loadHistory();
// Ensure we load the dictionary if it exists. Since we didn't add it back to local storage yet, 
// we will just initialize an empty array for now and add it to preferences later.
const initialDictionary = savedPrefs?.userDictionary || [];

interface SpeechActions {
  setIsListening: (v: boolean) => void;
  setIsSupported: (v: boolean) => void;
  setInterimText: (v: string) => void;
  setSourceLanguage: (v: SourceLanguage) => void;
  setTargetLanguage: (v: TargetLanguage) => void;
  setMicStatus: (v: MicStatus) => void;
  addTranscriptItem: (item: TranscriptItem) => void;
  addTranslationItem: (item: TranslationItem) => void;
  clearTranscript: () => void;
  setTheme: (v: ThemeMode) => void;
  setActiveView: (v: ViewState) => void;
  addUserDictionaryEntry: (entry: UserDictionaryEntry) => void;
  removeUserDictionaryEntry: (id: string) => void;
}

interface SimplifiedSpeechState {
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
  wordCount: number;
  sessionStartTime: Date | null;
}

type FullState = SimplifiedSpeechState & SpeechActions;

export const useSpeechStore = create<FullState>()(
  subscribeWithSelector((set, get) => ({
    isListening: false,
    isSupported: true,
    interimText: '',
    sourceLanguage: (savedPrefs?.sourceLanguage as SourceLanguage) ?? 'en-US',
    targetLanguage: (savedPrefs?.targetLanguage as TargetLanguage) ?? 'hindi',
    transcriptHistory: savedHistory?.transcriptHistory ?? [],
    translationHistory: savedHistory?.translationHistory ?? [],
    userDictionary: initialDictionary as UserDictionaryEntry[],
    theme: (savedPrefs?.theme as ThemeMode) ?? 'dark',
    micStatus: 'idle',
    activeView: 'live',
    wordCount: 0,
    sessionStartTime: null,

    setActiveView: (v) => set({ activeView: v }),

    setIsListening: (v) => {
      set((state) => {
        if (v && !state.isListening) {
          return { isListening: true, sessionStartTime: new Date() };
        }
        if (!v && state.isListening) {
          return { isListening: false };
        }
        return { isListening: v };
      });
    },
    setIsSupported: (v) => set({ isSupported: v }),
    setInterimText: (v) => set({ interimText: v }),
    
    setSourceLanguage: (v) => {
      set({ sourceLanguage: v });
      localStorageService.savePreferences({ ...get(), sourceLanguage: v });
    },
    
    setTargetLanguage: (v) => {
      set({ targetLanguage: v });
      localStorageService.savePreferences({ ...get(), targetLanguage: v });
    },
    
    setMicStatus: (v) => set({ micStatus: v }),

    addTranscriptItem: (item) => {
      set((state) => {
        const newHistory = [...state.transcriptHistory, item];
        const addedWords = item.text.split(/\s+/).filter(Boolean).length;
        localStorageService.saveHistory({
          transcriptHistory: newHistory,
          translationHistory: state.translationHistory,
        });
        return { 
          transcriptHistory: newHistory,
          wordCount: state.wordCount + addedWords 
        };
      });
    },

    addTranslationItem: (item) => {
      set((state) => {
        const newHistory = [...state.translationHistory, item];
        localStorageService.saveHistory({
          transcriptHistory: state.transcriptHistory,
          translationHistory: newHistory,
        });
        return { translationHistory: newHistory };
      });
    },

    clearTranscript: () => {
      set({
        transcriptHistory: [],
        translationHistory: [],
        interimText: '',
        wordCount: 0,
        sessionStartTime: null,
      });
      localStorageService.saveHistory({ transcriptHistory: [], translationHistory: [] });
    },

    setTheme: (v) => {
      set({ theme: v });
      localStorageService.savePreferences({ ...get(), theme: v });
      if (v === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    },

    addUserDictionaryEntry: (entry) => {
      set((state) => {
        const newDict = [...state.userDictionary, entry];
        localStorageService.savePreferences({ ...get(), userDictionary: newDict });
        return { userDictionary: newDict };
      });
    },

    removeUserDictionaryEntry: (id) => {
      set((state) => {
        const newDict = state.userDictionary.filter(e => e.id !== id);
        localStorageService.savePreferences({ ...get(), userDictionary: newDict });
        return { userDictionary: newDict };
      });
    },
  }))
);

export const selectIsListening = (s: FullState) => s.isListening;
export const selectTranscriptHistory = (s: FullState) => s.transcriptHistory;
export const selectTranslationHistory = (s: FullState) => s.translationHistory;
export const selectSessionData = (s: FullState) => ({
  wordCount: s.wordCount,
  sessionStartTime: s.sessionStartTime,
  sourceLanguage: s.sourceLanguage,
  targetLanguage: s.targetLanguage
});
