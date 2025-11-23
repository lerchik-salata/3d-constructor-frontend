import type { Command } from './Command';
import { SceneManager } from '../SceneManager';
import type { SceneObject } from '../../types/scene';

export class AddObjectCommand implements Command {
  private newObjectId: number | null = null;
  private sceneManager: SceneManager;
  private type: SceneObject['type'];

  constructor(sceneManager: SceneManager, type: SceneObject['type']) {
    this.sceneManager = sceneManager;
    this.type = type;
  }

  execute() {
    const obj = this.sceneManager.addObject(this.type);
    this.newObjectId = obj.id;
  }

  undo() {
    if (this.newObjectId !== null) {
      this.sceneManager.removeObject(this.newObjectId);
    }
  }
}
