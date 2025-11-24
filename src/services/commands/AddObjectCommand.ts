import type { Command } from './Command';
import { SceneManager } from '../SceneManager';
import type { ShapeType } from '../../constants/shapes';

export class AddObjectCommand implements Command {
  private newObjectId: number | null = null;
  private sceneManager: SceneManager;
  private type: ShapeType;
  private params: Record<string, number>;
  private color: string | undefined;

  constructor(sceneManager: SceneManager, type: ShapeType, params: Record<string, number>, color?: string) {
    this.sceneManager = sceneManager;
    this.type = type;
    this.params = params;
    this.color = color;
  }

  execute() {
    const obj = this.sceneManager.addObject(this.type, this.params, this.color);
    this.newObjectId = obj.id;
  }

  undo() {
    if (this.newObjectId !== null) {
      this.sceneManager.removeObject(this.newObjectId);
    }
  }
}
