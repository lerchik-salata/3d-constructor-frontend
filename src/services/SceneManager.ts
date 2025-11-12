import type { SceneObject, SceneObjectCSharp, LoadedScene } from '../types/scene';
import { sceneApi } from '../api/sceneApi';

interface CreateSceneData {
    Name: string;
    Objects: SceneObjectCSharp[];
}

export class SceneManager {
    private objects: SceneObject[];
    private nextId: number;

    constructor(initialObjects: SceneObject[] = []) {
        this.objects = [];
        this.nextId = 1;
        this.setObjects(initialObjects); 
    }

    async getScenesByProjectId(projectId: number): Promise<LoadedScene[]> {
        return await sceneApi.getScenesByProjectId(projectId);
    }

    async createNewScene(projectId: number, name: string): Promise<LoadedScene> {
        const newScene = {
        Name: name,
        Objects: [],
        };
        return await sceneApi.saveScene(newScene, projectId);
    }

    async deleteScene(sceneId: number, projectId: number): Promise<void> {
        await sceneApi.deleteScene(sceneId, projectId);
    }

    getObjects(): SceneObject[] {
        return this.objects;
    }

    setObjects(newObjects: SceneObject[]) {
        this.objects = [...newObjects];
        this.nextId = newObjects.length ? Math.max(...newObjects.map(o => o.id)) + 1 : 1;
    }

    addObject(type: SceneObject['type']): SceneObject {
        const newObject: SceneObject = {
            id: this.nextId++,
            type,
            position: [0, 2, 0],
            rotation: [0, 0, 0],
            scale: [1, 1, 1],
            color: type === 'Cube' ? 'hotpink' : type === 'Sphere' ? '#3C78D8' : '#6AA84F',
        };
        this.objects.push(newObject);
        console.log('Added object:', newObject);
        return newObject;
    }
    
    updateObjectTransform(id: number, position: [number, number, number], rotation: [number, number, number], scale: [number, number, number]): void {
        const obj = this.objects.find(o => o.id === id);
        if (obj) {
            obj.position = position;
            obj.rotation = rotation;
            obj.scale = scale;
        }
    }

    updateObjectColor(id: number, color: string): void {
        const obj = this.objects.find(o => o.id === id);
        if (obj) {
            obj.color = color;
        }
    }

    mapObjectsToCSharpFormat(): SceneObjectCSharp[] {
        return this.objects.map(obj => ({
            Id: obj.id, 
            Type: obj.type,
            PositionX: obj.position[0],
            PositionY: obj.position[1],
            PositionZ: obj.position[2],
            RotationX: obj.rotation[0],
            RotationY: obj.rotation[1],
            RotationZ: obj.rotation[2],
            ScaleX: obj.scale[0],
            ScaleY: obj.scale[1],
            ScaleZ: obj.scale[2],
            Color: obj.color,
        }));
    }

    async loadScene(sceneId: number, projectId: number): Promise<{ objects: SceneObject[], name: string }> {
        const loadedScene = await sceneApi.getScene(sceneId, projectId);
        
        const newObjects = loadedScene.objects.map((obj) => ({
            id: obj.id || this.nextId++, 
            type: obj.type as SceneObject['type'],
            position: [obj.positionX, obj.positionY, obj.positionZ] as [number, number, number],
            rotation: [obj.rotationX, obj.rotationY, obj.rotationZ] as [number, number, number],
            scale: [obj.scaleX, obj.scaleY, obj.scaleZ] as [number, number, number],
            color: obj.color,
        }));

        this.setObjects(newObjects); 
        return {
            objects: this.objects,
            name: loadedScene.name 
        };
    }
    
    async createScene(sceneName: string, projectId: number): Promise<LoadedScene> {
        const data: CreateSceneData = { 
            Name: sceneName, 
            Objects: this.mapObjectsToCSharpFormat() 
        };
        return await sceneApi.saveScene(data, projectId); 
    }

    async updateScene(sceneId: number, sceneName: string, projectId: number): Promise<LoadedScene> {
        const data: CreateSceneData = { 
            Name: sceneName, 
            Objects: this.mapObjectsToCSharpFormat() 
        };

        const response = await sceneApi.updateScene(sceneId, data, projectId);
        return response;
    }

}