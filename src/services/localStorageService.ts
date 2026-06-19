import type { TranscriptItem, TranslationItem } from '../types';

const KEYS = {
  PREFERENCES: 'tm_preferences',
  HISTORY: 'tm_history',
};

interface Preferences {
  sourceLanguage: string;
  targetLanguage: string;
  theme: string;
  userDictionary?: any[];
}

interface History {
  transcriptHistory: TranscriptItem[];
  translationHistory: TranslationItem[];
}

function safeGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('[LocalStorage] Write failed:', e);
  }
}

export const localStorageService = {
  savePreferences(prefs: Partial<Preferences>): void {
    const existing = safeGet<Preferences>(KEYS.PREFERENCES) ?? {};
    safeSet(KEYS.PREFERENCES, { ...existing, ...prefs });
  },

  loadPreferences(): Preferences | null {
    return safeGet<Preferences>(KEYS.PREFERENCES);
  },

  saveHistory(history: History): void {
    // Only keep last 100 items for performance
    safeSet(KEYS.HISTORY, {
      transcriptHistory: history.transcriptHistory.slice(-100),
      translationHistory: history.translationHistory.slice(-100),
    });
  },

  loadHistory(): History | null {
    const raw = safeGet<History>(KEYS.HISTORY);
    if (!raw) return null;
    // Rehydrate Date objects
    return {
      transcriptHistory: (raw.transcriptHistory ?? []).map((i) => ({
        ...i,
        timestamp: new Date(i.timestamp),
      })),
      translationHistory: (raw.translationHistory ?? []).map((i) => ({
        ...i,
        timestamp: new Date(i.timestamp),
      })),
    };
  },

  flush(): void {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  },
};
