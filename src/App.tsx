import React, { Suspense } from 'react';
import Dashboard from './pages/Dashboard';

const LoadingScreen = () => (
  <div className="min-h-screen bg-bg-primary flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      <p className="text-sm text-text-secondary">Loading Translation Mirror...</p>
    </div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Dashboard />
    </Suspense>
  );
}

export default App;
