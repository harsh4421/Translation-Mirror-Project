import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Copy, CheckCircle2 } from 'lucide-react';
import { useSpeechStore } from '../../store/speechStore';

const TranslationsView: React.FC = () => {
  const translationHistory = useSpeechStore((s) => s.translationHistory);
  const targetLanguage = useSpeechStore((s) => s.targetLanguage);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text = translationHistory.map(t => t.translatedText).join(' ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto pt-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-section font-bold text-text-primary capitalize">{targetLanguage} Translations</h1>
          <p className="text-sm text-text-secondary mt-1">
            {translationHistory.length} translated blocks in this session
          </p>
        </div>
        
        {translationHistory.length > 0 && (
          <button 
            onClick={handleCopy}
            className="btn-ghost border border-border"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
            <span>Copy All</span>
          </button>
        )}
      </div>

      <div className="glass-card p-8 min-h-[500px]">
        {translationHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-20 text-center opacity-50">
            <Globe2 className="w-16 h-16 text-text-secondary mb-4" />
            <p className="text-text-secondary text-lg font-medium">No translations yet</p>
            <p className="text-sm text-text-secondary mt-2">Go to Live Session to start translating.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {translationHistory.map((item, i) => {
              const timeStr = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const showTime = i === 0 || (new Date(item.timestamp).getTime() - new Date(translationHistory[i-1].timestamp).getTime() > 60000);
              
              return (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="w-16 flex-shrink-0 pt-1">
                    {showTime && <span className="text-xs text-text-secondary font-medium">{timeStr}</span>}
                  </div>
                  <div className="flex-1">
                    <p className="paragraph-text text-text-primary">{item.translatedText}</p>
                    <p className="text-xs text-text-secondary mt-1 border-l-2 border-border pl-2 opacity-60">
                      Original: {item.originalText}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationsView;
