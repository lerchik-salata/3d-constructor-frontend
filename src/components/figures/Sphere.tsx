import React from 'react';

interface SphereProps extends React.ComponentPropsWithoutRef<'mesh'> {
  color?: string;
}

const Sphere: React.FC<SphereProps> = ({ color = '#3C78D8', ...props }) => {
  return (
    <mesh {...props} castShadow receiveShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Sphere;