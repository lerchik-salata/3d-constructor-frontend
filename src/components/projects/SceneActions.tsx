import React, { useState } from 'react';

interface SceneActionsProps {
  onCreate: (sceneName: string) => void;
}

const SceneActions: React.FC<SceneActionsProps> = ({ onCreate }) => {
  const [sceneName, setSceneName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sceneName.trim()) return;
    onCreate(sceneName.trim());
    setSceneName('');
  };

  return (
    <section className="scene-actions max-w-4xl mx-auto bg-gray-800 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Create New Scene</h2>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Scene Name"
          value={sceneName}
          onChange={e => setSceneName(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          required
        />
        <button
          type="submit"
          disabled={!sceneName.trim()}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-all"
        >
          + Create
        </button>
      </form>
    </section>
  );
};

export default SceneActions;
