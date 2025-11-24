import type { Command } from './Command';
import { SceneManager } from '../SceneManager';
import type { ShapeType } from '../../constants/shapes';

export class AddObjectCommand implements Command {
  private newObjectId: number | null = null;
  private sceneManager: SceneManager;
  private type: ShapeType;
  private params: Record<string, number>;

  constructor(sceneManager: SceneManager, type: ShapeType, params: Record<string, number>) {
    this.sceneManager = sceneManager;
    this.type = type;
    this.params = params;
  }

  execute() {
    const obj = this.sceneManager.addObject(this.type, this.params);
    this.newObjectId = obj.id;
  }

  undo() {
    if (this.newObjectId !== null) {
      this.sceneManager.removeObject(this.newObjectId);
    }
  }
}
