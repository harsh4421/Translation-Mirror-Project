import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Square } from 'lucide-react';
import { useSpeechStore } from '../../store/speechStore';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

const RecordButton: React.FC = () => {
  const { startListening, stopListening, isSupported } = useSpeechRecognition();
  const isListening = useSpeechStore((s) => s.isListening);

  if (!isSupported) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mb-4">
          <Mic className="w-8 h-8 text-error" />
        </div>
        <p className="text-error font-medium">Browser not supported for Web Speech API</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 relative">
      {isListening && (
        <motion.div
          className="absolute inset-0 bg-accent/20 rounded-full blur-3xl z-0"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
      )}
      
      <button
        onClick={isListening ? stopListening : startListening}
        className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-glass ${
          isListening 
            ? 'bg-bg-card border-2 border-accent text-accent shadow-[0_0_40px_rgba(37,99,235,0.3)]' 
            : 'bg-accent text-white hover:bg-accent-hover hover:scale-105'
        }`}
      >
        {isListening ? (
          <Square className="w-8 h-8 fill-current" />
        ) : (
          <Mic className="w-10 h-10" />
        )}
        
        {isListening && (
          <motion.div
            className="absolute -inset-4 border border-accent/30 rounded-full"
            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </button>

      <div className="mt-6 text-center">
        {isListening ? (
          <motion.p 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent font-medium tracking-wide animate-pulse-slow"
          >
            Listening... Speak naturally.
          </motion.p>
        ) : (
          <p className="text-text-secondary">Tap to start transcription</p>
        )}
      </div>
    </div>
  );
};

export default RecordButton;
