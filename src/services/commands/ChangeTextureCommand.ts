import type { Command } from './Command';
import { SceneManager } from '../SceneManager';

export class ChangeTextureCommand implements Command {
  private oldTextureId: number | null;
  private sceneManager: SceneManager;
  private objectId: number;
  private newTextureId: number | null;

  constructor(
    sceneManager: SceneManager,
    objectId: number,
    newTextureId: number | null
  ) {
    this.sceneManager = sceneManager;
    this.objectId = objectId;
    this.newTextureId = newTextureId;
    this.oldTextureId = sceneManager.getObject(objectId)?.textureId || null;
  }

  execute() {
    this.sceneManager.updateObjectTexture(this.objectId, this.newTextureId);
  }

  undo() {
    this.sceneManager.updateObjectTexture(this.objectId, this.oldTextureId);
  }
}
