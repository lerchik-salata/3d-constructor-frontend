import React, { createContext, useContext, useRef } from 'react';
import { OrbitControls } from 'three-stdlib';

interface OrbitControlsContextValue {
  controlsRef: React.RefObject<OrbitControls | null>;
}

const OrbitControlsContext = createContext<OrbitControlsContextValue | null>(null);

export const useOrbitControls = () => {
  const context = useContext(OrbitControlsContext);
  if (!context) throw new Error('useOrbitControls must be used within OrbitControlsProvider');
  return context;
};

export const OrbitControlsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const controlsRef = useRef<OrbitControls | null>(null);

  return (
    <OrbitControlsContext.Provider value={{ controlsRef }}>
      {children}
    </OrbitControlsContext.Provider>
  );
};
