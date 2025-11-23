import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Scene from '../components/scene/Scene';
import SceneObjectsRenderer from '../components/scene/SceneObjectsRenderer';
import SceneControlsPanel from '../components/scene/SceneControlsPanel';
import SceneEditorHeader from '../components/scene/SceneEditorHeader';
import { SceneManager } from '../services/SceneManager';
import { ProjectManager } from '../services/ProjectManager';
import type { SceneObject } from '../types/scene';
import { useSnackbar } from '../context/SnackbarContext';
import { projectsApi } from '../api/projectsApi';
import { textureApi } from '../api/textureApi';
import type { Texture } from '../types/texture';
import SceneSettingsPanel from '../components/scene/SceneSettingsPanel';
import type { ProjectSettings } from '../types/project';
import { CommandManager } from '../services/CommandManager';
import { ChangeColorCommand } from '../services/commands/ChangeColorCommand';
import { AddObjectCommand } from '../services/commands/AddObjectCommand';
import { ChangeTextureCommand } from '../services/commands/ChangeTextureCommand';

const initialSettings: ProjectSettings = {
    preset: 'city',
    presetBlur: 0.5,
    backgroundColor: '#222222',
    sceneColor: '#FFFFFF',
    lightIntensity: 1,
    directionalLightPosition: [0, 1, 0],
};

const SceneEditorPage: React.FC = () => {
    const { projectId, sceneId } = useParams<{ projectId: string, sceneId: string }>(); 
    const navigate = useNavigate();

    const [sceneSettings, setSceneSettings] = useState<ProjectSettings>(initialSettings);

    const currentProjectId = projectId ? parseInt(projectId) : null;
    const currentSceneId = sceneId ? parseInt(sceneId) : null;
    const isNewScene = !currentSceneId; 

    const [sceneManager] = useState(() => new SceneManager([])); 
    const [projectsManager] = useState(() => new ProjectManager());
    const [objects, setObjects] = useState<SceneObject[]>([]); 
    const [textures, setTextures] = useState<Texture[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [mode, setMode] = useState<'translate' | 'rotate' | 'scale'>('translate');
    const [sceneName, setSceneName] = useState<string>(isNewScene ? 'New Scene' : 'Loading...');
    const { showMessage } = useSnackbar();

    const [commandManager] = useState(() => new CommandManager(5));

    useEffect(() => {
        const loadInitialScene = async () => {
            if (!currentProjectId) {
                showMessage('Error: Project ID is missing from URL.', 'error');
                return;
            }

            const loadedTextures = await textureApi.getAllTextures();
            setTextures(loadedTextures);
            sceneManager.setTextures(loadedTextures);

            const loadedProject = await projectsApi.getProjectById(currentProjectId);
            setSceneSettings(loadedProject.settings);
            console.log('Loaded project settings:', loadedProject);

            if (isNewScene) {
                sceneManager.setObjects([]);
                setObjects([]);
                setSceneName('New Scene');
                showMessage('Started working on new scene.', 'info');
            } else {
                showMessage(`Loading scene ID: ${currentSceneId}...`);
                try {
                    const { objects: loadedObjects, name } = await sceneManager.loadScene(currentSceneId!, currentProjectId);
                    
                    setObjects([...loadedObjects]);
                    console.log('Scene objects after load:', sceneManager.getObjects());
                    setSelectedId(null);

                    setSceneName(name);
                    showMessage(`Scene "${name}" loaded.`, 'success');

                } catch (err: unknown) {
                    console.error(err);
                    showMessage(`Error loading scene ID ${currentSceneId}`, 'error');
                    sceneManager.setObjects([]);
                    setObjects([]);
                    setSceneName(`Error loading ID ${currentSceneId}`);
                }
            }
        };

        loadInitialScene();
    }, [currentSceneId, currentProjectId]);


    const handleSaveScene = async () => {
        if (!sceneName.trim() || !currentProjectId) {
            showMessage("Scene name and project ID are required.", 'error');
            return;
        }

        showMessage('Saving scene...');
        try {
            let savedScene;

            if (isNewScene) {
                savedScene = await sceneManager.createScene(sceneName, currentProjectId);
                showMessage(`Scene "${savedScene.name}" created!`, 'success');

                navigate(`/projects/${currentProjectId}/scenes/${savedScene.id}/edit`, { replace: true });

            } else {
                console.log('Updating existing scene...');
                savedScene = await sceneManager.updateScene(currentSceneId!, sceneName, currentProjectId);
                showMessage(`Scene "${savedScene.name}" updated.`, 'success');
            }
            
            setSceneName(savedScene.name);

        } catch (err: unknown) {
            console.error(err);
            showMessage(err instanceof Error ? err.message : 'Unknown error occurred while saving', 'error');
        }
    };
    
    const handleChangeColor = (id: number, color: string) => {
        sceneManager.updateObjectColor(id, color); 
        setObjects([...sceneManager.getObjects()]);
        // const cmd = new ChangeColorCommand(sceneManager, id, color);
        // commandManager.executeCommand(cmd);
        // setObjects([...sceneManager.getObjects()]);
    };

    const currentSelectedColor = objects.find(obj => obj.id === selectedId)?.color || '#FFFFFF';

    const handleChangeTexture = (id: number, texture: number | null) => {
        const cmd = new ChangeTextureCommand(sceneManager, id, texture);
        commandManager.executeCommand(cmd);
        setObjects([...sceneManager.getObjects()]);
    }

    const currentSelectedTexture = objects.find(obj => obj.id === selectedId)?.textureId || null;

    const handleAddObject = (type: SceneObject['type']) => {
        const cmd = new AddObjectCommand(sceneManager, type);
        commandManager.executeCommand(cmd);
        setObjects([...sceneManager.getObjects()]);
    };

    const handleUpdateTransform = (
        id: number,
        position: [number, number, number],
        rotation: [number, number, number],
        scale: [number, number, number]
    ) => {
        sceneManager.updateObjectTransform(id, position, rotation, scale);
        setObjects([...sceneManager.getObjects()]);
    };

    const handleUpdateProjectSettings = async (newSettings: ProjectSettings) => {
        if (!currentProjectId) return;

        try {
            showMessage('Saving project settings...', 'info');

            const updatedProject = await projectsManager.updateProject(currentProjectId, {
                settings: newSettings
            });

            setSceneSettings(updatedProject.settings);
            showMessage('Project settings saved', 'success');
        } catch (err: unknown) {
            console.error(err);
            showMessage(err instanceof Error ? err.message : 'Error saving project settings', 'error');
        }
    };

    return (
        <div>
            <SceneEditorHeader
                projectId={currentProjectId}
                sceneName={sceneName}
                commandManager={commandManager}
                onUpdateObjects={() => setObjects([...sceneManager.getObjects()])}
            />

            <Scene settings={sceneSettings}>
                <SceneObjectsRenderer
                    objects={objects}
                    selectedId={selectedId}
                    mode={mode}
                    setSelectedId={setSelectedId}
                    updateObjectTransform={handleUpdateTransform}
                />
            </Scene>

            <SceneControlsPanel
                sceneName={sceneName}
                setSceneName={setSceneName}
                addObject={handleAddObject}
                mode={mode}
                setMode={setMode}
                saveScene={handleSaveScene}
                selectedObjectId={selectedId}
                changeObjectColor={handleChangeColor}
                selectedObjectColor={currentSelectedColor}
                textures={textures}
                changeObjectTexture={handleChangeTexture}
                selectedObjectTexture={currentSelectedTexture}
            />

            <SceneSettingsPanel settings={sceneSettings} onChange={setSceneSettings} onSave={handleUpdateProjectSettings} />
        </div>
    );
};

export default SceneEditorPage;