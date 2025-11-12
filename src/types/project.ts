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
}