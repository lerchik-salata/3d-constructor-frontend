import React, { useState } from 'react';
import type { Project } from '../../types/project';
import { Edit3, Save, Trash2, X } from 'lucide-react';

interface ProjectItemProps {
  project: Project;
  onDelete: (id: number, name: string) => void;
  onEdit: (id: number, name: string, description: string) => void;
  onViewScenes: (id: number) => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, onDelete, onEdit, onViewScenes }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(project.name);
  const [editDesc, setEditDesc] = useState(project.description || '');

  const startEdit = () => setIsEditing(true);
  const cancelEdit = () => {
    setIsEditing(false);
    setEditName(project.name);
    setEditDesc(project.description || '');
  };
  const saveEdit = () => {
    onEdit(project.id, editName, editDesc);
    setIsEditing(false);
  };

  return (
    <li className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="New Project Name"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            placeholder="New Description (optional)"
            rows={3}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />

          <div className="flex gap-3 justify-end">
            <button
              onClick={saveEdit}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 hover:bg-green-500 text-white font-medium transition-all flex items-center gap-2"
            >
              <Save className="w-5 h-5" /> Save
            </button>
            <button
              onClick={cancelEdit}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-all flex items-center gap-2"
            >
              <X className="w-5 h-5" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-white">
              {project.name}{' '}
              <span className="text-gray-400 text-sm">(ID: {project.id})</span>
            </h3>
            <span className="text-sm text-gray-400">
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>

          {project.description ? (
            <p className="text-gray-300 mb-4">{project.description}</p>
          ) : (
            <p className="text-gray-500 italic mb-4">No description</p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onViewScenes(project.id)}
              className="px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all"
            >
              View Scenes
            </button>
            <button
              onClick={startEdit}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <Edit3 className="w-5 h-5" /> Edit
            </button>
            <button
              onClick={() => onDelete(project.id, project.name)}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" /> Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default ProjectItem;
