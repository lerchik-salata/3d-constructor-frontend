import type { Command } from './Command';
import { SceneManager } from '../SceneManager';

export class TransformObjectCommand implements Command {
  private sceneManager: SceneManager;
  private objectId: number;
  private oldTransform: { position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] };
  private newTransform: { position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] };

  constructor(
    sceneManager: SceneManager,
    objectId: number,
    newTransform: { position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }
  ) {
    this.sceneManager = sceneManager;
    this.objectId = objectId;
    this.newTransform = newTransform;

    const obj = sceneManager.getObject(objectId);
    this.oldTransform = {
      position: [...obj?.position || [0,0,0]] as [number, number, number],
      rotation: [...obj?.rotation || [0,0,0]] as [number, number, number],
      scale: [...obj?.scale || [1,1,1]] as [number, number, number],
    };
  }

  execute() {
    const { position, rotation, scale } = this.newTransform;
    this.sceneManager.updateObjectTransform(this.objectId, position, rotation, scale);
  }

  undo() {
    const { position, rotation, scale } = this.oldTransform;
    this.sceneManager.updateObjectTransform(this.objectId, position, rotation, scale);
  }
}
