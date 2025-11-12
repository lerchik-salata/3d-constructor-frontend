import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';
import { ProjectManager } from '../services/ProjectManager';
import { SceneManager } from '../services/SceneManager';
import type { LoadedScene } from '../types/scene';
import type { Project } from '../types/project';
import SceneList from '../components/projects/SceneList';
import SceneActions from '../components/projects/SceneActions';

export const ProjectScenesPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();

  const [project, setProject] = useState<Project | null>(null);
  const [scenes, setScenes] = useState<LoadedScene[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const id = projectId ? parseInt(projectId, 10) : null;

  const projectManager = new ProjectManager();
  const sceneManager = new SceneManager();

  const fetchData = useCallback(async () => {
    if (!id) {
      setError('Invalid project ID.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const projectData = await projectManager.getProjectById(id);
      const scenesData = await sceneManager.getScenesByProjectId(id);
      setProject(projectData);
      setScenes(scenesData);
    } catch (err) {
      console.error(err);
      setError('Error loading project or scenes data.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditScene = (sceneId: number) => {
    navigate(`/projects/${id}/scenes/${sceneId}/edit`);
  };

  const handleDeleteScene = async (sceneId: number, sceneName: string) => {
    if (!id) return;
    if (!window.confirm(`Delete scene "${sceneName}"?`)) return;

    try {
      await sceneManager.deleteScene(sceneId, id);
      setScenes(prev => prev.filter(scene => scene.id !== sceneId));
      showMessage(`Scene "${sceneName}" deleted.`, 'info');
    } catch (err) {
      console.error(err);
      showMessage('Error deleting scene.', 'error');
    }
  };

  const handleCreateNewScene = async (sceneName: string) => {
    if (!id || !sceneName.trim()) return;

    try {
      const newScene = await sceneManager.createNewScene(id, sceneName);
      setScenes(prev => [...prev, newScene]);
      showMessage(`Scene "${newScene.name}" created!`, 'success');
      handleEditScene(newScene.id);
    } catch (err) {
      console.error(err);
      showMessage('Error creating new scene.', 'error');
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-300 text-lg animate-pulse">
        Loading project and scenes...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-400 bg-gray-800 p-6 rounded-xl max-w-xl mx-auto mt-10">
        Error: {error}
      </div>
    );

  if (!project)
    return (
      <div className="text-center text-gray-400 bg-gray-800 p-6 rounded-xl max-w-xl mx-auto mt-10">
        Project not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white py-10 px-6">
      <header className="max-w-5xl mx-auto mb-10">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-300 transition-all"
          >
            ← Back to Projects
          </button>

          <div className="text-right">
            <h1 className="text-3xl font-semibold">{project.name}</h1>
            {project.description && (
              <p className="text-gray-400 text-sm mt-1">{project.description}</p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-800 my-6" />
      </header>

      <main className="max-w-5xl mx-auto space-y-10">
        <SceneActions onCreate={handleCreateNewScene} />

        <SceneList
          scenes={scenes}
          onEdit={handleEditScene}
          onDelete={handleDeleteScene}
        />
      </main>
    </div>
  );
};
