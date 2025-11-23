import type { Command } from './Command';
import { SceneManager } from '../SceneManager';
import type { SceneObject } from '../../types/scene';

export class CopyObjectCommand implements Command {
    private sceneManager: SceneManager;
    private originalObjectId: number;
    private copiedObjectId: number | null = null;

    constructor(sceneManager: SceneManager, originalObject: SceneObject) {
        this.sceneManager = sceneManager;
        this.originalObjectId = originalObject.id;
    }

    execute() {
        const original = this.sceneManager.getObject(this.originalObjectId);
        if (!original) return;

        const copiedObject: SceneObject = {
            ...original,
            id: this.sceneManager.getNextId(),
            position: [
                original.position[0] + 1,
                original.position[1],
                original.position[2],
            ],
        };

        this.sceneManager.copyObject(this.originalObjectId);
        this.copiedObjectId = copiedObject.id;
    }

    undo() {
        if (this.copiedObjectId !== null) {
            this.sceneManager.removeObject(this.copiedObjectId);
        }
    }
}