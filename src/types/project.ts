import type { Scene } from "three";

export interface Project {
  id: number;
  name: string; 
  description: string;
  createdAt: string; 
  elements: any[];
  scene?: Scene; 
  settings: ProjectSettings;
}

export interface ProjectSettings {
  backgroundColor: string;
  lightIntensity: number;
  directionalLightPosition: [number, number, number];
  preset: 'city' | 'nature' | 'space';
  presetBlur: number;
  sceneColor: string;
}