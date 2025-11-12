import React, { useState } from 'react';

interface ProjectFormProps {
  onCreate: (name: string, description: string) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate(name, description);
    setName('');
    setDescription('');
  };

  return (
    <section className="max-w-md mx-auto mt-10 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">
        Create New Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-300 text-sm mb-2">
            Project Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm mb-2">
            Project Description (optional)
          </label>
          <textarea
            placeholder="Short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all duration-200"
          />
        </div>

        <button
          type="submit"
          disabled={!name}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
            name
              ? 'bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98]'
              : 'bg-gray-600 cursor-not-allowed opacity-60'
          }`}
        >
          Create Project
        </button>
      </form>
    </section>
  );
};

export default ProjectForm;
