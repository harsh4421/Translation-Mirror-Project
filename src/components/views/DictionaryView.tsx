import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Plus, Trash2 } from 'lucide-react';
import { useSpeechStore } from '../../store/speechStore';
import { TARGET_LANGUAGES } from '../../types';

const DictionaryView: React.FC = () => {
  const userDictionary = useSpeechStore((s) => s.userDictionary);
  const addUserDictionaryEntry = useSpeechStore((s) => s.addUserDictionaryEntry);
  const removeUserDictionaryEntry = useSpeechStore((s) => s.removeUserDictionaryEntry);
  const defaultTarget = useSpeechStore((s) => s.targetLanguage);

  const [sourceWord, setSourceWord] = useState('');
  const [targetWord, setTargetWord] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(defaultTarget);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceWord.trim() || !targetWord.trim()) return;

    addUserDictionaryEntry({
      id: `dict-${Date.now()}`,
      sourceWord: sourceWord.toLowerCase().trim(),
      targetWord: targetWord.trim(),
      targetLanguage: selectedLanguage,
    });

    setSourceWord('');
    setTargetWord('');
  };

  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto pt-8">
      <div className="mb-8">
        <h1 className="text-section font-bold text-text-primary">Personal Dictionary</h1>
        <p className="text-sm text-text-secondary mt-1">
          Add custom translations for industry jargon, names, or specific phrases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Entry Form */}
        <div className="glass-card p-6 h-fit md:sticky md:top-24">
          <h2 className="text-sm font-semibold text-text-primary mb-4">Add New Entry</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">Source Word</label>
              <input
                type="text"
                value={sourceWord}
                onChange={(e) => setSourceWord(e.target.value)}
                placeholder="e.g. React"
                className="w-full bg-bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">Target Word</label>
              <input
                type="text"
                value={targetWord}
                onChange={(e) => setTargetWord(e.target.value)}
                placeholder="e.g. रिएक्ट"
                className="w-full bg-bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">Target Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as any)}
                className="w-full bg-bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors appearance-none cursor-pointer"
              >
                {TARGET_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={!sourceWord.trim() || !targetWord.trim()}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <Plus className="w-4 h-4" />
              Add to Dictionary
            </button>
          </form>
        </div>

        {/* Dictionary List */}
        <div className="md:col-span-2 space-y-4">
          {userDictionary.length === 0 ? (
            <div className="glass-card p-12 flex flex-col items-center justify-center text-center opacity-50">
              <Book className="w-12 h-12 text-text-secondary mb-4" />
              <p className="text-text-secondary font-medium">Your dictionary is empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userDictionary.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-4 flex items-start justify-between group"
                >
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-text-primary truncate" title={entry.sourceWord}>
                      {entry.sourceWord}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-text-secondary capitalize px-1.5 py-0.5 rounded-md bg-bg-surface border border-border">
                        {entry.targetLanguage}
                      </span>
                      <span className="text-sm text-text-secondary truncate" title={entry.targetWord}>
                        {entry.targetWord}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeUserDictionaryEntry(entry.id)}
                    className="p-1.5 rounded-lg text-text-secondary hover:text-error hover:bg-error/10 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DictionaryView;
