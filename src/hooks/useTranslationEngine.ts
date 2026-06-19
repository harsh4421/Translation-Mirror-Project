import { useEffect } from 'react';
import { useSpeechStore } from '../store/speechStore';
import { getDictionary } from '../services/dictionaryService';
import { tokenize, normalize, removeFiller } from '../utils/tokenizer';
import type { TranslationItem, TargetLanguage } from '../types';

export function useTranslationEngine() {
  const {
    transcriptHistory,
    targetLanguage,
    addTranslationItem,
  } = useSpeechStore();

  useEffect(() => {
    const lastItem = transcriptHistory[transcriptHistory.length - 1];
    if (!lastItem) return;

    const already = useSpeechStore.getState().translationHistory.find(
      (t) => t.originalId === lastItem.id
    );
    if (already) return;

    // Use base dictionary without userDictionary to simplify the app
    const dict = getDictionary([]);

    const translate = (text: string, target: TargetLanguage): string => {
      if (target === 'english') return text;

      const tokens = tokenize(text);
      const cleaned = removeFiller(tokens);

      const translated = cleaned.map((token) => {
        const norm = normalize(token);
        const entry = dict[norm];
        if (entry && entry[target]) {
          return entry[target]!;
        }
        // Try stemmed
        const stemmed = norm.replace(/(ing|ed|s|es|ly|er|est)$/, '');
        const stemEntry = dict[stemmed];
        if (stemEntry && stemEntry[target]) {
          return stemEntry[target]!;
        }
        return token;
      });

      const result = translated.filter(Boolean).join(' ').trim();
      return result || text;
    };

    const result = translate(lastItem.text, targetLanguage);

    const translationItem: TranslationItem = {
      id: `tl-${Date.now()}-${Math.random()}`,
      originalId: lastItem.id,
      originalText: lastItem.text,
      translatedText: result,
      sourceLanguage: lastItem.language,
      targetLanguage,
      timestamp: new Date(),
    };

    addTranslationItem(translationItem);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcriptHistory, targetLanguage]);
}
