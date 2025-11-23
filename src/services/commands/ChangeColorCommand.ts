import type { Command } from './Command';
import { SceneManager } from '../SceneManager';

export class ChangeColorCommand implements Command {
  private oldColor: string;
  private sceneManager: SceneManager;
  private objectId: number;
  private newColor: string;

  constructor(
    sceneManager: SceneManager,
    objectId: number,
    newColor: string
  ) {
    this.sceneManager = sceneManager;
    this.objectId = objectId;
    this.newColor = newColor;
    this.oldColor = sceneManager.getObject(objectId)?.color || '#FFFFFF';
  }

  execute() {
    this.sceneManager.updateObjectColor(this.objectId, this.newColor);
  }

  undo() {
    this.sceneManager.updateObjectColor(this.objectId, this.oldColor);
  }
}
