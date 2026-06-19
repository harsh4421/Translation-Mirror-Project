import React from 'react';
import { Sparkles } from 'lucide-react';
import { useSpeechStore } from '../../store/speechStore';
import { SOURCE_LANGUAGES, TARGET_LANGUAGES } from '../../types';

const Hero: React.FC = () => {
  const sourceLanguage = useSpeechStore((s) => s.sourceLanguage);
  const setSourceLanguage = useSpeechStore((s) => s.setSourceLanguage);
  
  const targetLanguage = useSpeechStore((s) => s.targetLanguage);
  const setTargetLanguage = useSpeechStore((s) => s.setTargetLanguage);

  return (
    <div className="flex flex-col items-center text-center mb-12">
      <h1 className="text-hero font-bold tracking-tight text-text-primary mb-4">
        Real-Time Translation Workspace
      </h1>
      
      <p className="text-section text-text-secondary max-w-2xl mx-auto mb-8 font-light">
        Speak naturally and watch your words transform instantly across languages.
      </p>

      {/* Inline Language Selectors */}
      <div className="flex items-center justify-center gap-3 p-2 rounded-2xl bg-bg-surface border border-border/50 shadow-sm">
        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value as any)}
          className="bg-transparent text-text-primary text-sm font-medium focus:outline-none cursor-pointer hover:bg-bg-card px-3 py-2 rounded-xl transition-colors"
        >
          {SOURCE_LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>
        
        <span className="text-text-secondary">→</span>
        
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value as any)}
          className="bg-transparent text-text-primary text-sm font-medium focus:outline-none cursor-pointer hover:bg-bg-card px-3 py-2 rounded-xl transition-colors"
        >
          {TARGET_LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Hero;
