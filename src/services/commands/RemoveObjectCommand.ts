import type { Command } from './Command';
import { SceneManager } from '../SceneManager';
import type { SceneObject } from '../../types/scene';

export class RemoveObjectCommand implements Command {
  private sceneManager: SceneManager;
  private objectId: number;
  private removedObject: SceneObject | null = null;
  private removedIndex: number = -1;

  constructor(sceneManager: SceneManager, objectId: number) {
    this.sceneManager = sceneManager;
    this.objectId = objectId;
  }

  execute() {
    const obj = this.sceneManager.getObject(this.objectId);
    if (!obj) return;

    this.removedObject = { ...obj };
    this.removedIndex = this.sceneManager.getObjects().findIndex(o => o.id === this.objectId);

    this.sceneManager.removeObject(this.objectId);
  }

  undo() {
    if (!this.removedObject) return;
    this.sceneManager.insertObjectAt(this.removedObject, this.removedIndex);
  }
}
