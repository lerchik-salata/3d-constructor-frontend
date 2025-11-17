import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { Texture } from '../../types/texture';

interface TextureListProps {
  textures: Texture[];
  onEdit: (texture: Texture) => void;
  onDelete: (id: number) => void;
}

export const TextureList: React.FC<TextureListProps> = ({ textures, onEdit, onDelete }) => {
  if (textures.length === 0) {
    return <p className="text-gray-400 text-center py-8">No textures yet. Upload one above 👆</p>;
  }

  return (
    <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/50 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">Texture List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {textures.map(tex => (
          <div key={tex.id} className="bg-gray-900 p-4 rounded-xl border border-gray-700/50 shadow">
            <img
              src={tex.imageUrl}
              alt="texture"
              className="rounded-lg mb-3 w-full h-40 object-cover"
            />

            <div className="flex items-center justify-between">
              <button
                onClick={() => onEdit(tex)}
                className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300"
              >
                <Edit size={16} /> Edit
              </button>

              <p>
                {tex.name}
              </p>

              <button
                onClick={() => onDelete(tex.id)}
                className="flex items-center gap-1 text-red-400 hover:text-red-300"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};