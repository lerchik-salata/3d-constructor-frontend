export interface SceneObject {
  id: number;
  type: 'Cube' | 'Sphere' | 'Cylinder';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  textureId: number | null;
  textureUrl?: string;
}

export interface LoadedScene {
  id: number;
  name: string;
  objects: {
    id: number;
    type: string;
    positionX: number;
    positionY: number;
    positionZ: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scaleX: number;
    scaleY: number;
    scaleZ: number;
    color: string;
  }[];
}

export interface SceneObjectCSharp {
  Id: number
  Type: string;
  PositionX: number;
  PositionY: number;
  PositionZ: number;
  RotationX: number;
  RotationY: number;
  RotationZ: number;
  ScaleX: number;
  ScaleY: number;
  ScaleZ: number;
  Color: string;
}