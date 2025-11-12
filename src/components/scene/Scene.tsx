import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

interface SceneProps {
  children?: React.ReactNode;
}

const Scene: React.FC<SceneProps> = ({ children }) => {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 75 }}
      style={{ height: '100vh', background: '#222' }}
    >
      <OrbitControls />

      <Environment preset="city" background blur={0.5} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {children}
    </Canvas>
  );
};

export default Scene;
