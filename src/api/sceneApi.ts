import { apiClient } from './';
import type { LoadedScene, SceneObjectCSharp } from '../types/scene';

export interface SceneData {
  Name: string;
  Objects: SceneObjectCSharp[];
}

export const sceneApi =  {
    saveScene: async (sceneData: SceneData, projectId: number): Promise<LoadedScene> => {
        const response = await apiClient.post<LoadedScene>(`/projects/${projectId}/scenes`, sceneData);
        return response.data;
    },

    getScene: async (sceneId: number, projectId: number): Promise<LoadedScene> => {
        const response = await apiClient.get<LoadedScene>(`/projects/${projectId}/scenes/${sceneId}`);
        return response.data;
    },

    getScenesByProjectId: async (projectId: number): Promise<LoadedScene[]> => {
        const response = await apiClient.get<LoadedScene[]>(`/projects/${projectId}/scenes`);
        console.log('API response for scenes by project ID:', response.data);
        return response.data;
    },

    updateScene: async (sceneId: number, sceneData: SceneData, projectId: number): Promise<LoadedScene> => {
        const response = await apiClient.put<LoadedScene>(`/projects/${projectId}/scenes/${sceneId}`, sceneData);
        return response.data;
    },

    deleteScene: async (sceneId: number, projectId: number): Promise<void> => {
        await apiClient.delete(`/projects/${projectId}/scenes/${sceneId}`);
    }
}