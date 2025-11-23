import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { OrbitControlsProvider, useOrbitControls } from '../../context/OrbitControlsContext';
import type { SceneSettings } from '../../types/scene';

interface SceneProps {
  settings: SceneSettings;
  children?: React.ReactNode;
}

const Scene: React.FC<SceneProps> = ({ settings, children }) => {

  return (
    <OrbitControlsProvider>
      <Canvas
        camera={{ position: [5, 5, 5], fov: 75 }}
        style={{ height: '100vh', background: settings?.backgroundColor }}
      >
        <SceneContent settings={settings}>{children}</SceneContent>
      </Canvas>
    </OrbitControlsProvider>
  );
};

const SceneContent: React.FC<{ settings: SceneSettings; children?: React.ReactNode }> = ({ settings, children }) => {
  const { controlsRef } = useOrbitControls();

  return (
    <>
      <OrbitControls ref={controlsRef} />
      
      {settings.preset && <Environment preset={settings.preset} background blur={settings.presetBlur} />}

      <ambientLight intensity={settings.lightIntensity} color={settings.sceneColor} />
      <directionalLight position={settings.directionalLightPosition} intensity={1} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={settings.sceneColor} />
      </mesh>

      {children}
    </>
  );
};

export default Scene;
