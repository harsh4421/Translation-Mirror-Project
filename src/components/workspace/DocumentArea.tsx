import React from 'react';
import TranscriptDocument from '../speech/TranscriptDocument';
import TranslationDocument from '../translation/TranslationDocument';

const DocumentArea: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full relative z-10">
      <TranscriptDocument />
      <TranslationDocument />
    </div>
  );
};

export default DocumentArea;
