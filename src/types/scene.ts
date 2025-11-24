import type { ShapeType } from "../constants/shapes";

export interface SceneObject {
  id: number;
  type: ShapeType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  textureId: number | null;
  textureUrl?: string;
  params?: Record<string, number>;
}

export interface LoadedScene {
  id: number;
  name: string;
  objects: {
    id: number;
    type: ShapeType;
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
    textureId: number | null;
    params?: Record<string, number>;
  }[];
}

export interface SceneObjectCSharp {
  Id: number
  Type: ShapeType;
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
  TextureId?: string | null;
  Params?: string;
}