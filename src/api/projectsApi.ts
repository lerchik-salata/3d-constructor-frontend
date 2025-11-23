import { apiClient } from './';
import type { Project, ProjectSettings } from '../types/project';

export interface CreateProjectDto {
    name: string;
    description: string;
    settings?: ProjectSettings;
}

export interface UpdateProjectDto {
    name?: string;
    description?: string;
    settings?: ProjectSettings;
}

export const projectsApi =  {

    getAllProjects: async (): Promise<Project[]> => {
        const response = await apiClient.get<Project[]>('/projects');
        return response.data;
    },

    getMyProjects: async (): Promise<Project[]> => {
        const response = await apiClient.get<Project[]>('/projects/my');
        return response.data;
    },

    getProjectById: async (projectId: number): Promise<Project> => {
        const response = await apiClient.get<Project>(`/projects/${projectId}`);
        return response.data;
    },

    createProject: async (projectData: CreateProjectDto): Promise<Project> => {
        const response = await apiClient.post<Project>('/projects', projectData);
        return response.data;
    },

    deleteProject: async (projectId: number): Promise<void> => {
        await apiClient.delete(`/projects/${projectId}`);
    },

    updateProject: async (projectId: number, projectData: UpdateProjectDto): Promise<Project> => {
        const response = await apiClient.put<Project>(`/projects/${projectId}`, projectData);
        return response.data;
    }
}