import React from 'react';
import type { CommandManager } from '../../services/CommandManager';

interface SceneEditorHeaderProps {
    projectId: number | null;
    sceneName: string;
    commandManager: CommandManager;
    onUpdateObjects: () => void;
}

const SceneEditorHeader: React.FC<SceneEditorHeaderProps> = ({
    projectId,
    sceneName,
    commandManager,
    onUpdateObjects,
}) => {
    return (
        <header className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-b-lg shadow-md mb-4">
            <div className="text-lg md:text-xl font-bold">
                Project ID: <span className="font-mono">{projectId}</span>
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
            </div>
        </header>
    );
};

export default SceneEditorHeader;
