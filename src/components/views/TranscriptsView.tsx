import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Copy, Trash2, CheckCircle2 } from 'lucide-react';
import { useSpeechStore } from '../../store/speechStore';

const TranscriptsView: React.FC = () => {
  const transcriptHistory = useSpeechStore((s) => s.transcriptHistory);
  const clearTranscript = useSpeechStore((s) => s.clearTranscript);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text = transcriptHistory.map(t => t.text).join(' ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto pt-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-section font-bold text-text-primary">Transcript History</h1>
          <p className="text-sm text-text-secondary mt-1">
            {transcriptHistory.length} recorded blocks in this session
          </p>
        </div>
        
        {transcriptHistory.length > 0 && (
          <div className="flex items-center gap-3">
            <button 
              onClick={handleCopy}
              className="btn-ghost border border-border"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              <span>Copy All</span>
            </button>
            <button 
              onClick={clearTranscript}
              className="btn-ghost text-error hover:text-error hover:bg-error/10 border border-border"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      <div className="glass-card p-8 min-h-[500px]">
        {transcriptHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-20 text-center opacity-50">
            <FileText className="w-16 h-16 text-text-secondary mb-4" />
            <p className="text-text-secondary text-lg font-medium">No transcripts yet</p>
            <p className="text-sm text-text-secondary mt-2">Go to Live Session to start recording.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {transcriptHistory.map((item, i) => {
              // Group by time if they are close, otherwise just list them.
              // For simplicity, we just list them here with their timestamps.
              const timeStr = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              const showTime = i === 0 || (new Date(item.timestamp).getTime() - new Date(transcriptHistory[i-1].timestamp).getTime() > 60000);
              
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
                    <p className="paragraph-text">{item.text}</p>
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

export default TranscriptsView;
