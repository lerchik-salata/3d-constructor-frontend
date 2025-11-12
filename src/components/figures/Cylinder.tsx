import React from 'react';

interface CylinderProps extends React.ComponentPropsWithoutRef<'mesh'> {
  color?: string;
}

const Cylinder: React.FC<CylinderProps> = ({ color = '#6AA84F', ...props }) => {
  return (
    <mesh {...props} castShadow receiveShadow>
      <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Cylinder;
