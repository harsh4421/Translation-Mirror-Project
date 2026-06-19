import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSpeechStore } from '../../store/speechStore';
import { Globe2, Copy, CheckCircle2 } from 'lucide-react';

const TranslationDocument: React.FC = () => {
  const translationHistory = useSpeechStore((s) => s.translationHistory);
  const targetLanguage = useSpeechStore((s) => s.targetLanguage);
  const [copied, setCopied] = React.useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [translationHistory]);

  const handleCopy = () => {
    const text = translationHistory.map(t => t.translatedText).join(' ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card flex flex-col h-[500px] overflow-hidden group">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-bg-surface/30">
        <div className="flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-accent" />
          <h2 className="text-sm font-semibold text-text-primary tracking-wide uppercase">
            {targetLanguage} Translation
          </h2>
        </div>
        
        {translationHistory.length > 0 && (
          <button 
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors opacity-0 group-hover:opacity-100"
            title="Copy Translation"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-accent/5">
        {translationHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <Globe2 className="w-12 h-12 text-text-secondary mb-4" />
            <p className="text-text-secondary max-w-[200px]">Translations will appear here instantly...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="paragraph-text text-text-primary">
              {translationHistory.map((item) => (
                <motion.span
                  key={item.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mr-1.5"
                >
                  {item.translatedText}
                </motion.span>
              ))}
            </p>
            <div ref={bottomRef} className="h-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationDocument;
