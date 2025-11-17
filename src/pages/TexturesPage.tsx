import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ImagePlus } from 'lucide-react';
import { TexturesManager } from '../services/TextureManager';
import type { Texture } from '../types/texture';
import { TextureList } from '../components/textures/TexturesList';

const texturesManager = new TexturesManager();

export const TexturesPage: React.FC = () => {
  const [textures, setTextures] = useState<Texture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTexture, setSelectedTexture] = useState<Texture | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');

  const fetchTextures = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await texturesManager.getAllTextures();
      setTextures(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load textures');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTextures();
  }, []);

  const handleUpload = async () => {
    if (!file || !name) {
      alert('Please provide a name and select a file');
      return;
    }

    const formData = new FormData();
    formData.append('Image', file);
    formData.append('Name', name);

    try {
      const newTexture = await texturesManager.addTexture(formData);
      setTextures(prev => [...prev, newTexture]);
      setFile(null);
      setName('');
      alert('Texture uploaded!');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  const handleUpdate = async () => {
    if (!selectedTexture) return;

    const formData = new FormData();
    if (file) formData.append('Image', file);
    if (name) formData.append('Name', name);

    try {
      const updated = await texturesManager.updateTexture(selectedTexture.id, formData);
      setTextures(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      setSelectedTexture(null);
      setFile(null);
      setName('');
      alert('Texture updated!');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this texture?')) return;
    try {
      await texturesManager.deleteTexture(id);
      setTextures(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  if (isLoading) return <div className="text-center py-20 text-gray-400 animate-pulse">Loading textures...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <section className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <ImagePlus size={22} className="text-blue-400" />
          Upload Texture
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Texture Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="text-gray-300 px-2 py-1 rounded border border-gray-600 w-full sm:w-auto"
          />
          <input
            type="file"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="text-gray-300"
          />

          <button
            onClick={selectedTexture ? handleUpdate : handleUpload}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium"
          >
            {selectedTexture ? 'Update' : 'Upload'}
          </button>
        </div>
      </section>

      <TextureList
        textures={textures}
        onEdit={setSelectedTexture}
        onDelete={handleDelete}
      />
    </motion.div>
  );
};