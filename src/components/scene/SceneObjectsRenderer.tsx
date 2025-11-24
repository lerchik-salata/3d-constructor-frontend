import React from 'react';
import TransformableObject from './SceneTransformableObject';
import type { SceneObject } from '../../types/scene';
import SceneShape from '../figures/SceneShape';

interface Props {
  objects: SceneObject[];
  selectedId: number | null;
  mode: 'translate' | 'rotate' | 'scale';
  setSelectedId: (id: number) => void;
  updateObjectTransform: (
    id: number,
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number]
  ) => void;
}

const SceneObjectsRenderer: React.FC<Props> = ({
  objects,
  selectedId,
  mode,
  setSelectedId,
  updateObjectTransform,
}) => {
  return (
    <>
      {objects.map(obj => (
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
          <SceneShape
            type={obj.type as any}
            color={obj.color}
            textureUrl={obj.textureUrl}
           params={obj.params ?? {}}
          />
        </TransformableObject>
      ))}
    </>
  );
};

export default SceneObjectsRenderer;
