import { useEffect, useRef, useCallback } from 'react';
import { useSpeechStore } from '../store/speechStore';
import type { TranscriptItem } from '../types';

// ── Web Speech API Type Declarations ──────────────────────────────────────────
interface SpeechRecognitionResultItem {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: SpeechRecognitionResultItem;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

export function useSpeechRecognition() {
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const {
    isListening,
    sourceLanguage,
    setIsListening,
    setInterimText,
    addTranscriptItem,
    setMicStatus,
    setIsSupported,
  } = useSpeechStore();

  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  useEffect(() => {
    setIsSupported(isSupported);
  }, [isSupported, setIsSupported]);

  const buildRecognition = useCallback((): SpeechRecognitionInstance | null => {
    if (!isSupported) return null;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = sourceLanguage;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setMicStatus('listening');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => { // eslint-disable-line
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;

        if (result.isFinal) {
          if (transcript.trim()) {
            const item: TranscriptItem = {
              id: `tr-${Date.now()}-${Math.random()}`,
              text: transcript.trim(),
              timestamp: new Date(),
              language: sourceLanguage,
            };
            addTranscriptItem(item);
          }
        } else {
          interim += transcript;
        }
      }
      setInterimText(interim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setMicStatus('error');
      setIsListening(false);
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setInterimText('');
      if (useSpeechStore.getState().isListening) {
        try {
          recognition.start();
        } catch {
          setMicStatus('idle');
          setIsListening(false);
        }
      } else {
        setMicStatus('idle');
        setIsListening(false);
      }
    };

    return recognition;
  }, [
    isSupported,
    sourceLanguage,
    setMicStatus,
    addTranscriptItem,
    setInterimText,
    setIsListening,
  ]);

  const startListening = useCallback(() => {
    if (!isSupported) return;
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    recognitionRef.current = buildRecognition();
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (e) {
      console.error('Failed to start recognition', e);
    }
  }, [isSupported, buildRecognition, setIsListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsListening(false);
    setMicStatus('idle');
    setInterimText('');
  }, [setInterimText, setIsListening, setMicStatus]);

  // Restart recognition when source language changes while listening
  useEffect(() => {
    if (isListening) {
      stopListening();
      setTimeout(() => startListening(), 300);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceLanguage]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
    };
  }, []);

  return { startListening, stopListening, isSupported };
}
