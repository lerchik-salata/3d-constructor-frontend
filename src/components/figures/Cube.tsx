import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { textureApi } from '../../api/textureApi';

interface CubeProps {
  color?: string;
  textureUrl?: string;
}

const Cube: React.FC<CubeProps> = ({ color = 'hotpink', textureUrl, ...props }) => {
  const [map, setMap] = useState<THREE.Texture | null>(null);
  // console.log('Loading texture from URL:', textureUrl);

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
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
};

export default Cube;
