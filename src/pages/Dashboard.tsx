import React, { useEffect } from 'react';
import { useSpeechStore } from '../store/speechStore';
import { useTranslationEngine } from '../hooks/useTranslationEngine';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

import AppLayout from '../layouts/AppLayout';
import LiveSessionView from '../components/views/LiveSessionView';
import TranscriptsView from '../components/views/TranscriptsView';
import TranslationsView from '../components/views/TranslationsView';
import DictionaryView from '../components/views/DictionaryView';
import SettingsView from '../components/views/SettingsView';

const Dashboard: React.FC = () => {
  const theme = useSpeechStore((s) => s.theme);
  const isListening = useSpeechStore((s) => s.isListening);
  const activeView = useSpeechStore((s) => s.activeView);
  const { startListening, stopListening } = useSpeechRecognition();

  // Activate translation engine
  useTranslationEngine();

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLSelectElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space') {
        e.preventDefault();
        if (isListening) stopListening();
        else startListening();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isListening, startListening, stopListening]);

  return (
    <AppLayout>
      {activeView === 'live' && <LiveSessionView />}
      {activeView === 'transcripts' && <TranscriptsView />}
      {activeView === 'translations' && <TranslationsView />}
      {activeView === 'dictionary' && <DictionaryView />}
      {activeView === 'settings' && <SettingsView />}
    </AppLayout>
  );
};

export default Dashboard;
