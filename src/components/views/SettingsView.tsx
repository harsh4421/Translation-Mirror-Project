import React from 'react';
import { Settings2, Moon, Sun, Monitor, Trash2 } from 'lucide-react';
import { useSpeechStore } from '../../store/speechStore';
import { SOURCE_LANGUAGES, TARGET_LANGUAGES } from '../../types';

const SettingsView: React.FC = () => {
  const theme = useSpeechStore((s) => s.theme);
  const setTheme = useSpeechStore((s) => s.setTheme);
  const sourceLanguage = useSpeechStore((s) => s.sourceLanguage);
  const setSourceLanguage = useSpeechStore((s) => s.setSourceLanguage);
  const targetLanguage = useSpeechStore((s) => s.targetLanguage);
  const setTargetLanguage = useSpeechStore((s) => s.setTargetLanguage);

  const handleFlush = () => {
    if (window.confirm('Are you sure you want to delete all stored preferences and history? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto pt-8">
      <div className="mb-8">
        <h1 className="text-section font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage your application preferences and local storage.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
            <Monitor className="w-5 h-5 text-accent" />
            <h2 className="font-semibold text-text-primary">Appearance</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Theme Mode</p>
              <p className="text-xs text-text-secondary mt-1">Switch between light and dark aesthetics.</p>
            </div>
            
            <div className="flex items-center p-1 rounded-xl bg-bg-surface border border-border">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  theme === 'light' 
                    ? 'bg-bg-card shadow-sm text-text-primary' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  theme === 'dark' 
                    ? 'bg-bg-card shadow-sm text-text-primary' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>
            </div>
          </div>
        </div>

        {/* Defaults */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/50">
            <Settings2 className="w-5 h-5 text-accent" />
            <h2 className="font-semibold text-text-primary">Default Languages</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Source Language</p>
                <p className="text-xs text-text-secondary mt-1">Default language you will speak.</p>
              </div>
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value as any)}
                className="bg-bg-surface border border-border rounded-xl px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent cursor-pointer"
              >
                {SOURCE_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">Target Language</p>
                <p className="text-xs text-text-secondary mt-1">Default language for translations.</p>
              </div>
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value as any)}
                className="bg-bg-surface border border-border rounded-xl px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent cursor-pointer"
              >
                {TARGET_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-card p-6 border-error/20 bg-error/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-error">Flush Local Storage</p>
              <p className="text-xs text-text-secondary mt-1">Delete all saved preferences, dictionaries, and history.</p>
            </div>
            <button
              onClick={handleFlush}
              className="btn-ghost border border-error/30 text-error hover:bg-error hover:text-white"
            >
              <Trash2 className="w-4 h-4" />
              Flush Data
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsView;
