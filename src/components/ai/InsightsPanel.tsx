import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Languages, Clock, Hash } from 'lucide-react';
import { useSpeechStore, selectSessionData } from '../../store/speechStore';
import { getTopWords } from '../../utils/tokenizer';

const InsightsPanel: React.FC = () => {
  const { wordCount, sessionStartTime, sourceLanguage } = useSpeechStore(selectSessionData);
  const transcriptHistory = useSpeechStore((s) => s.transcriptHistory);
  
  if (transcriptHistory.length === 0) return null;

  // Calculate duration
  const durationStr = sessionStartTime 
    ? `${Math.max(1, Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 60000))}m`
    : '0m';

  // Calculate top keywords
  const allTexts = transcriptHistory.map(t => t.text);
  const topKeywords = getTopWords(allTexts, 3).map(k => k.word);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 pt-8 border-t border-border/50 flex flex-wrap items-center gap-6"
    >
      <div className="flex items-center gap-2 text-text-primary font-semibold text-sm">
        <Sparkles className="w-4 h-4 text-accent" />
        AI Insights
      </div>

      <div className="flex flex-wrap gap-3">
        {topKeywords.length > 0 && (
          <div className="ai-chip">
            <Hash className="w-3 h-3 opacity-60" />
            Key Topics: {topKeywords.join(', ')}
          </div>
        )}
        
        <div className="ai-chip">
          <Languages className="w-3 h-3 opacity-60" />
          {sourceLanguage.split('-')[0].toUpperCase()} Detected
        </div>
        
        <div className="ai-chip">
          <Clock className="w-3 h-3 opacity-60" />
          {durationStr} Session
        </div>
        
        <div className="ai-chip">
          <FileTextIcon className="w-3 h-3 opacity-60" />
          {wordCount} Words
        </div>
      </div>
    </motion.div>
  );
};

// Simple icon for words
const FileTextIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <line x1="10" y1="9" x2="8" y2="9"/>
  </svg>
);

export default InsightsPanel;
