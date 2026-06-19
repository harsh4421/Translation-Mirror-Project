import React, { useState } from 'react';
import Sidebar from '../components/navigation/Sidebar';
import TopBar from '../components/navigation/TopBar';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-bg-app overflow-hidden">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto px-6 lg:px-12 py-8 scroll-smooth">
          <div className="max-w-[1200px] mx-auto w-full pb-24">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
