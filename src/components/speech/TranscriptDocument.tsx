import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSpeechStore } from '../../store/speechStore';
import { FileText, Copy, CheckCircle2 } from 'lucide-react';

const TranscriptDocument: React.FC = () => {
  const transcriptHistory = useSpeechStore((s) => s.transcriptHistory);
  const interimText = useSpeechStore((s) => s.interimText);
  const [copied, setCopied] = React.useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [transcriptHistory, interimText]);

  const handleCopy = () => {
    const text = transcriptHistory.map(t => t.text).join(' ');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card flex flex-col h-[500px] overflow-hidden group">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-bg-surface/30">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-text-secondary" />
          <h2 className="text-sm font-semibold text-text-primary tracking-wide uppercase">Live Transcript</h2>
        </div>
        
        {transcriptHistory.length > 0 && (
          <button 
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors opacity-0 group-hover:opacity-100"
            title="Copy Transcript"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {transcriptHistory.length === 0 && !interimText ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <FileText className="w-12 h-12 text-text-secondary mb-4" />
            <p className="text-text-secondary max-w-[200px]">Waiting for audio input...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="paragraph-text">
              {transcriptHistory.map((item) => (
                <motion.span
                  key={item.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mr-1.5"
                >
                  {item.text}
                </motion.span>
              ))}
              
              {interimText && (
                <motion.span
                  key="interim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="interim-text ml-1"
                >
                  {interimText}
                </motion.span>
              )}
            </p>
            <div ref={bottomRef} className="h-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptDocument;
