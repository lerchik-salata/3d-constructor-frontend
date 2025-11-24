import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { textureApi } from '../../api/textureApi';
import type { ShapeType } from '../../constants/shapes';

interface SceneShapeProps {
  type: ShapeType;
  color?: string;
  textureUrl?: string;
  params?: Record<string, number>
}

const SceneShape: React.FC<SceneShapeProps> = ({
  type,
  color = '#ffffff',
  textureUrl,
  params,
  ...props
}) => {
  const [map, setMap] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!textureUrl) return;
    let objectUrl: string | null = null;

    const loadTexture = async () => {
      try {
        const blob = await textureApi.getTextureStream(textureUrl);
        objectUrl = URL.createObjectURL(blob);

        const texture = new THREE.TextureLoader().load(objectUrl, (tex) => {
          tex.needsUpdate = true;
        });

        setMap(texture);
      } catch (err) {
        console.error('Failed to load texture', err);
      }
    };

    loadTexture();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setMap(null);
    };
  }, [textureUrl]);

  const material = map
    ? new THREE.MeshStandardMaterial({ map })
    : new THREE.MeshStandardMaterial({ color });

  const geometryParams = { ...params }; 

  const geometry = (() => {
    switch (type) {
      case 'cube':
        return <boxGeometry args={[geometryParams.width, geometryParams.height, geometryParams.depth]} />;
      case 'sphere':
        return <sphereGeometry args={[geometryParams.radius, 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[geometryParams.radius, geometryParams.radius, geometryParams.height, 32]} />;
      case 'cone':
        return <coneGeometry args={[geometryParams.radius, geometryParams.height, 32]} />;
      case 'torus':
        return <torusGeometry args={[geometryParams.radius, geometryParams.tube, 16, 100]} />;
      case 'plane':
        return <planeGeometry args={[geometryParams.width, geometryParams.height]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  })();

  return (
    <mesh {...props} castShadow receiveShadow material={material}>
      {geometry}
    </mesh>
  );
};

export default SceneShape;
