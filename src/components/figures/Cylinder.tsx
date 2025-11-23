import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { textureApi } from '../../api/textureApi';

interface CylinderProps {
  color?: string;
  textureUrl?: string;
}

const Cylinder: React.FC<CylinderProps> = ({ color = '#6AA84F', textureUrl, ...props }) => {
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

  return (
    <mesh {...props} castShadow receiveShadow material={material}>
      <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
    </mesh>
  );
};

export default Cylinder;
