import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { ShapeType } from "../../constants/shapes";

interface Props {
  type: ShapeType;
  params: any;
  color: string;
  size?: number; 
}

const Shape: React.FC<Props> = ({ type, params, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const getGeometry = () => {
    switch (type) {
      case "box":
        return <boxGeometry args={[params.width, params.height, params.depth]} />;
      case "sphere":
        return <sphereGeometry args={[params.radius, 32, 32]} />;
      case "cylinder":
        return <cylinderGeometry args={[params.radius, params.radius, params.height, 32]} />;
      case "cone":
        return <coneGeometry args={[params.radius, params.height, 32]} />;
      case "torus":
        return <torusGeometry args={[params.radius, params.tube, 16, 100]} />;
      case "plane":
        return <planeGeometry args={[params.width, params.height]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <mesh ref={meshRef}>
      {getGeometry()}
      <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
    </mesh>
  );
};

export const ShapePreviewCanvas: React.FC<Props> = ({ type, params, color, size = 450 }) => {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas camera={{ position: [3, 3, 4], fov: 45 }}>
        <OrbitControls enableZoom={false} enablePan={false} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Shape type={type} params={params} color={color} />
      </Canvas>
    </div>
  );
};
