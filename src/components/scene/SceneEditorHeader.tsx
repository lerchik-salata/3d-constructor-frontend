import React from 'react';
import type { CommandManager } from '../../services/CommandManager';
import { sceneApi } from '../../api/sceneApi';
import { NavLink } from 'react-router-dom';

interface SceneEditorHeaderProps {
    projectId: number | null;
    sceneId: number | null;
    sceneName: string;
    commandManager: CommandManager;
    onUpdateObjects: () => void;
}

const SceneEditorHeader: React.FC<SceneEditorHeaderProps> = ({
    projectId,
    sceneId,
    sceneName,
    commandManager,
    onUpdateObjects,
}) => {

    const handleExport = async () => {
        if (!projectId || !sceneId) return;
        try {
            const sceneJson = await sceneApi.exportScene(sceneId, projectId);
            console.log('Exported scene JSON:', sceneJson);
            const blob = new Blob([JSON.stringify(sceneJson, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `${sceneName}.json`;
            a.click();

            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error exporting scene:', err);
        }
    };

    return (
        <header className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 shadow-md">
            <div className="text-lg md:text-xl font-bold">
                Project ID: <span className="font-mono">{projectId}</span>
                <NavLink to={`/projects/${projectId}/scenes`} className="ml-4 bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl shadow hover:bg-purple-100">Back to Scenes</NavLink>
            </div>
            <div className="text-md md:text-lg mt-2 md:mt-0">
                Editing: <span className="font-semibold">{sceneName}</span>
            </div>
            <div className="text-md md:text-lg mt-2 md:mt-0 flex space-x-2">
                <button
                    onClick={() => { commandManager.undo(); onUpdateObjects(); }}
                    disabled={!commandManager.canUndo()}
                    className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl shadow hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Undo
                </button>
                <button
                    onClick={() => { commandManager.redo(); onUpdateObjects(); }}
                    disabled={!commandManager.canRedo()}
                    className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl shadow hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Redo
                </button>
                <button
                    onClick={handleExport}
                    className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl shadow hover:bg-purple-100 transition-colors"
                >
                    Export
                </button>
            </div>
        </header>
    );
};

export default SceneEditorHeader;
