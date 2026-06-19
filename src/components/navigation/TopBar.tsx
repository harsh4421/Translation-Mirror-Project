import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const TopBar: React.FC = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 lg:px-12 border-b border-border/50 bg-bg-app/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Placeholder for left side if needed */}
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-xl text-text-secondary hover:bg-bg-surface transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
