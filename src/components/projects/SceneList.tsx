import React from 'react';
import type { LoadedScene } from '../../types/scene';
import { Edit3, Trash2 } from 'lucide-react';

interface SceneListProps {
  scenes: LoadedScene[];
  onEdit: (id: number) => void;
  onDelete: (id: number, name: string) => void;
}

const SceneList: React.FC<SceneListProps> = ({ scenes, onEdit, onDelete }) => {
  return (
    <section className="scene-list-section max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Scene List ({scenes.length})</h2>

      {scenes.length === 0 ? (
        <p className="text-gray-300">There are no scenes in this project. Create the first one!</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenes.map(scene => (
            <li
              key={scene.id}
              className="scene-item bg-gray-800 rounded-xl shadow-md p-4 flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <div className="scene-info mb-4">
                <h3 className="text-lg font-semibold text-white">{scene.name}</h3>
                <p className="text-gray-400 text-sm">ID: {scene.id}</p>
                <p className="text-gray-400 text-sm">Objects: {scene.objects?.length || 0}</p>
              </div>

              <div className="scene-buttons flex gap-2">
                <button
                  onClick={() => onEdit(scene.id)}
                  className="flex items-center gap-2 px-5 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-medium transition"
                >
                  <Edit3 className="w-5 h-5" /> Edit
                </button>
                <button
                  onClick={() => onDelete(scene.id, scene.name)}
                  className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
                >
                  <Trash2 className="w-5 h-5" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SceneList;
