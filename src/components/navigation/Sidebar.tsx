import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mic2, FileText, Globe2, Book, Settings, 
  ChevronLeft, Moon, Sun, UserCircle 
} from 'lucide-react';
import { useSpeechStore } from '../../store/speechStore';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { id: 'live', label: 'Live Session', icon: Mic2, active: true },
  { id: 'transcripts', label: 'Transcripts', icon: FileText, active: false },
  { id: 'translations', label: 'Translations', icon: Globe2, active: false },
  { id: 'dictionary', label: 'Dictionary', icon: Book, active: false },
  { id: 'settings', label: 'Settings', icon: Settings, active: false },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const theme = useSpeechStore((s) => s.theme);
  const setTheme = useSpeechStore((s) => s.setTheme);
  const activeView = useSpeechStore((s) => s.activeView);
  const setActiveView = useSpeechStore((s) => s.setActiveView);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-full border-r border-border bg-bg-surface/50 backdrop-blur-xl flex flex-col relative z-20 flex-shrink-0"
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
        {!isCollapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 shadow-sm">
              <Mic2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-text-primary whitespace-nowrap tracking-tight">Translation Mirror</span>
          </motion.div>
        )}
        <button 
          onClick={onToggle}
          className="p-2 rounded-xl text-text-secondary hover:bg-bg-card transition-colors ml-auto flex-shrink-0"
        >
          <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }}>
            <ChevronLeft className="w-4 h-4" />
          </motion.div>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive 
                  ? 'bg-bg-card shadow-sm text-text-primary border border-border/50' 
                  : 'text-text-secondary hover:bg-bg-card/50 hover:text-text-primary'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary transition-colors'}`} />
              {!isCollapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">
                  {item.label}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50 space-y-4">
        {!isCollapsed && (
          <div className="px-2 py-3 rounded-xl bg-bg-card border border-border/50 shadow-sm flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-text-primary">Storage</span>
              <span className="text-[11px] text-text-secondary">Using 2.1 MB local</span>
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-accent/20 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin-slow" />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2 overflow-hidden">
              <UserCircle className="w-8 h-8 text-text-secondary flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-text-primary whitespace-nowrap">Guest User</span>
                <span className="text-xs text-text-secondary whitespace-nowrap">Local Session</span>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-xl text-text-secondary hover:bg-bg-card transition-colors flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''}`}
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
