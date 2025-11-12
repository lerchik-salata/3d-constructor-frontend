import React from 'react';
import type { Project } from '../../types/project';
import ProjectItem from './ProjectItem';

interface ProjectListProps {
  projects: Project[];
  onDelete: (id: number, name: string) => void;
  onEdit: (id: number, name: string, description: string) => void;
  onViewScenes: (id: number) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onDelete, onEdit, onViewScenes }) => {
  return (
    <section className="max-w-4xl mx-auto mt-12">
      <h2 className="text-3xl font-semibold text-white mb-6 text-center">
        Project List <span className="text-blue-400">({projects.length})</span>
      </h2>

      {projects.length === 0 ? (
        <p className="text-gray-400 text-center bg-gray-800 p-6 rounded-xl">
          There are no projects yet — create the first one!
        </p>
      ) : (
        <ul className="space-y-6">
          {projects.map(project => (
            <ProjectItem
              key={project.id}
              project={project}
              onDelete={onDelete}
              onEdit={onEdit}
              onViewScenes={onViewScenes}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProjectList;
