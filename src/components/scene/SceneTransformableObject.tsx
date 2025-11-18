import React, { useRef } from 'react';
import { TransformControls } from '@react-three/drei';
import { useThree, type ThreeEvent} from '@react-three/fiber';
import * as THREE from 'three';
import { useOrbitControls } from '../../context/OrbitControlsContext';

interface SceneTransformableObjectProps extends React.ComponentPropsWithoutRef<'mesh'> {
  id: number;
  children: React.ReactElement<any, any>;
  mode: 'translate' | 'rotate' | 'scale';
  isSelected: boolean;
  onSelect: (id: number) => void;
  onUpdateTransform: (
    id: number,
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number]
  ) => void;
}

const SceneTransformableObject: React.FC<SceneTransformableObjectProps> = ({
  id,
  children,
  position,
  rotation,
  scale,
  mode,
  isSelected,
  onSelect,
  onUpdateTransform,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { gl } = useThree();
   const { controlsRef } = useOrbitControls();

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(id);
  };

  const handleObjectChange = () => {
    if (meshRef.current) {
      const obj = meshRef.current;
      onUpdateTransform(
        id,
        [obj.position.x, obj.position.y, obj.position.z],
        [obj.rotation.x, obj.rotation.y, obj.rotation.z],
        [obj.scale.x, obj.scale.y, obj.scale.z]
      );
    }
  };

  return (
    <>
      {React.cloneElement(children, {
        ref: meshRef,
        onClick: handleClick,
        position,
        rotation,
        scale,
        children: React.Children.map(children.props.children, (child: any) => {
          if (child.type === 'meshStandardMaterial') {
            return React.cloneElement(child, {
              color: isSelected ? 'yellow' : children.props.color,
            });
          }
          return child;
        }),
      })}

      {isSelected && meshRef.current && (
        <TransformControls
          object={meshRef.current}
          mode={mode}
          onMouseUp={() => {
            handleObjectChange();
            if (controlsRef.current) controlsRef.current.enabled = true;
          }}
          onMouseDown={() => {
            onSelect(id);
            gl.domElement.style.pointerEvents = 'none';
            if (controlsRef.current) controlsRef.current.enabled = false;
          }}
        />
      )}
    </>
  );
};

export default SceneTransformableObject;
