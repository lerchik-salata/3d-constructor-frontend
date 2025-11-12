import React from 'react';
import TransformableObject from './SceneTransformableObject';
import type { SceneObject } from '../../types/scene';
import Cube from '../figures/Cube';
import Sphere from '../figures/Sphere';
import Cylinder from '../figures/Cylinder';

interface Props {
  objects: SceneObject[];
  selectedId: number | null;
  mode: 'translate' | 'rotate' | 'scale';
  setSelectedId: (id: number) => void;
  updateObjectTransform: (id: number, position: [number, number, number], rotation: [number, number, number], scale: [number, number, number]) => void;
}

const ObjectMap = { Cube, Sphere, Cylinder };

const SceneObjectsRenderer: React.FC<Props> = ({ objects, selectedId, mode, setSelectedId, updateObjectTransform }) => {
  return (
    <>
      {objects.map(obj => {
        const Shape = ObjectMap[obj.type];
        if (!Shape) return null;
        return (
          <TransformableObject
            key={obj.id}
            id={obj.id}
            position={obj.position}
            rotation={obj.rotation}
            scale={obj.scale}
            mode={mode}
            isSelected={obj.id === selectedId}
            onSelect={setSelectedId}
            onUpdateTransform={updateObjectTransform}
          >
            <Shape color={obj.color} />
          </TransformableObject>
        );
      })}
    </>
  );
};

export default SceneObjectsRenderer;
