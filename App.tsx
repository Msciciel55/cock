
import React from 'react';
import { CelestialClock } from './components/CelestialClock';

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      <CelestialClock />
    </div>
  );
};

export default App;
