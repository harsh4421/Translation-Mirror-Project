import React, { useState, useRef, useEffect } from 'react';
import { Download, ChevronUp, FileJson, FileText, FileBadge } from 'lucide-react';
import { useSpeechStore } from '../../store/speechStore';
import { exportService } from '../../services/exportService';
import type { ExportFormat } from '../../types';

const ExportMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const transcriptHistory = useSpeechStore((s) => s.transcriptHistory);
  const translationHistory = useSpeechStore((s) => s.translationHistory);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (transcriptHistory.length === 0) return null;

  const handleExport = (format: ExportFormat) => {
    exportService.export(transcriptHistory, translationHistory, format);
    setIsOpen(false);
  };

  return (
    <div className="relative mt-12 flex justify-end" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-ghost bg-bg-surface border border-border"
      >
        <Download className="w-4 h-4 text-text-secondary" />
        <span>Export Session</span>
        <ChevronUp className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-48 bg-bg-card border border-border rounded-xl shadow-glass-dark overflow-hidden z-50 animate-fade-in">
          <div className="p-1">
            <button
              onClick={() => handleExport('txt')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-primary hover:bg-bg-surface transition-colors"
            >
              <FileText className="w-4 h-4 text-text-secondary" />
              Plain Text (.txt)
            </button>
            <button
              onClick={() => handleExport('md')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-primary hover:bg-bg-surface transition-colors"
            >
              <FileBadge className="w-4 h-4 text-text-secondary" />
              Markdown (.md)
            </button>
            <button
              onClick={() => handleExport('json')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-primary hover:bg-bg-surface transition-colors"
            >
              <FileJson className="w-4 h-4 text-text-secondary" />
              JSON (.json)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportMenu;
