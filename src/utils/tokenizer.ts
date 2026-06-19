import { FILLER_WORDS } from '../services/dictionaryService';

/**
 * Tokenizes text into an array of lowercase word tokens.
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zA-ZÀ-ÿ'\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Normalizes a word: trims, lowercases, removes apostrophes for lookup.
 */
export function normalize(word: string): string {
  return word.toLowerCase().replace(/['']/g, '');
}

/**
 * Removes filler words from a token array.
 */
export function removeFiller(tokens: string[]): string[] {
  return tokens.filter((t) => !FILLER_WORDS.has(t));
}

/**
 * Splits text into sentences by punctuation.
 */
export function splitSentences(text: string): string[] {
  return text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Count words in a string.
 */
export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Build word frequency map.
 */
export function buildWordFrequency(texts: string[]): Record<string, number> {
  const freq: Record<string, number> = {};
  for (const text of texts) {
    const tokens = removeFiller(tokenize(text));
    for (const t of tokens) {
      freq[t] = (freq[t] ?? 0) + 1;
    }
  }
  return freq;
}

/**
 * Get top N words by frequency.
 */
export function getTopWords(texts: string[], n = 10): { word: string; count: number }[] {
  const freq = buildWordFrequency(texts);
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([word, count]) => ({ word, count }));
}
