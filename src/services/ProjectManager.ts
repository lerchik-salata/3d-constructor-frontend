import { projectsApi } from '../api/projectsApi';
import type { CreateProjectDto } from '../api/projectsApi';
import type { Project } from '../types/project';

export class ProjectManager {
  async getMyProjects(): Promise<Project[]> {
    return await projectsApi.getMyProjects();
  }

  async getProjectById(id: number): Promise<Project> {
    return await projectsApi.getProjectById(id);
  }

  async createProject(data: CreateProjectDto): Promise<Project> {
    return await projectsApi.createProject(data);
  }

  async updateProject(id: number, data: CreateProjectDto): Promise<Project> {
    return await projectsApi.updateProject(id, data);
  }

  async deleteProject(id: number): Promise<void> {
    await projectsApi.deleteProject(id);
  }
}
