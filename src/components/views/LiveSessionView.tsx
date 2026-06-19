import React from 'react';
import Hero from '../workspace/Hero';
import RecordButton from '../workspace/RecordButton';
import DocumentArea from '../workspace/DocumentArea';
import InsightsPanel from '../ai/InsightsPanel';
import ExportMenu from '../common/ExportMenu';

const LiveSessionView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center animate-fade-in relative">
      <Hero />
      
      <div className="w-full flex justify-center mb-16 relative z-20">
        <RecordButton />
      </div>
      
      <div className="w-full max-w-5xl mx-auto flex flex-col">
        <DocumentArea />
        <InsightsPanel />
        <ExportMenu />
      </div>
    </div>
  );
};

export default LiveSessionView;
