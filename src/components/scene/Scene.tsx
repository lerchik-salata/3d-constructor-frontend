import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { OrbitControlsProvider, useOrbitControls } from '../../context/OrbitControlsContext';

interface SceneProps {
  children?: React.ReactNode;
}

const Scene: React.FC<SceneProps> = ({ children }) => {
  return (
    <OrbitControlsProvider>
      <Canvas
        camera={{ position: [5, 5, 5], fov: 75 }}
        style={{ height: '100vh', background: '#222' }}
      >
        <SceneContent>{children}</SceneContent>
      </Canvas>
    </OrbitControlsProvider>
  );
};

const SceneContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { controlsRef } = useOrbitControls();

  return (
    <>
      <OrbitControls ref={controlsRef} />
      <Environment preset="city" background blur={0.5} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {children}
    </>
  );
};


export default Scene;
