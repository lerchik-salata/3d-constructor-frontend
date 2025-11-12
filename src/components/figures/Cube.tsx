import React from 'react';

interface CubeProps extends React.ComponentPropsWithoutRef<'mesh'> {
  color?: string;
}

const Cube: React.FC<CubeProps> = ({ color = 'hotpink', ...props }) => {
  return (
    <mesh {...props} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Cube;
