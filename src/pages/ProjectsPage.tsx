import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectManager } from '../services/ProjectManager';
import type { Project } from '../types/project';
import { useSnackbar } from '../context/SnackbarContext';
import ProjectList from '../components/projects/ProjectList';
import ProjectForm from '../components/projects/ProjectForm';
import { motion } from 'framer-motion';
import { FolderPlus } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { showMessage } = useSnackbar();
  const projectManager = new ProjectManager();

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await projectManager.getMyProjects();
      setProjects(data);
    } catch (err) {
      setError('Not able to load projects.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [projectManager]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (name: string, description: string) => {
    try {
      const newProject = await projectManager.createProject({
        name,
        description: description || 'New Project.'
      });
      setProjects(prev => [...prev, newProject]);
      showMessage(`Project "${newProject.name}" created successfully!`, 'success');
      navigate(`/projects/${newProject.id}/scenes`);
    } catch (err) {
      console.error(err);
      showMessage('Error creating project.', 'error');
    }
  };

  const handleDeleteProject = async (id: number, name: string) => {
    if (!window.confirm(`Delete project "${name}"?`)) return;
    try {
      await projectManager.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      showMessage(`Project "${name}" deleted.`, 'info');
    } catch (err) {
      console.error(err);
      showMessage('Error deleting project.', 'error');
    }
  };

  const handleEditProject = async (id: number, name: string, description: string) => {
    try {
      const updated = await projectManager.updateProject(id, { name, description });
      setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
      showMessage(`Project "${updated.name}" updated.`, 'success');
    } catch (err) {
      console.error(err);
      showMessage('Error updating project.', 'error');
    }
  };

  const handleViewScenes = (projectId: number) => {
    navigate(`/projects/${projectId}/scenes`);
  };

  if (isLoading)
    return (
      <div className="flex h-[80vh] items-center justify-center text-lg text-gray-400 animate-pulse">
        Loading projects...
      </div>
    );

  if (error)
    return (
      <div className="flex h-[80vh] items-center justify-center text-red-500 text-lg">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-10"
      >
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">My Projects</h1>
            <p className="text-gray-400 mt-1">
              Create and manage your projects with ease
            </p>
          </div>
          <div className="hidden sm:flex">
            <FolderPlus className="text-blue-400 mr-2" size={28} />
          </div>
        </header>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-lg shadow-black/30">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FolderPlus size={22} className="text-blue-400" />
            Create New Project
          </h2>

          <ProjectForm onCreate={handleCreateProject} />
        </section>

        <section className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/30 border border-gray-700/50">
          <h2 className="text-2xl font-semibold mb-6">Project List</h2>
          {projects.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              You don't have any projects yet. Create your first one above 👆
            </p>
          ) : (
            <ProjectList
              projects={projects}
              onDelete={handleDeleteProject}
              onEdit={handleEditProject}
              onViewScenes={handleViewScenes}
            />
          )}
        </section>
      </motion.div>
    </div>
  );
};
