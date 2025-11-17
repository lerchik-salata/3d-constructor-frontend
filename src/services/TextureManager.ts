import { textureApi } from '../api/textureApi';
import type { Texture } from '../types/texture';

export class TexturesManager {
  async getAllTextures(): Promise<Texture[]> {
    return await textureApi.getAllTextures();
  }

  async addTexture(formData: FormData): Promise<Texture> {
    return await textureApi.addTexture(formData);
  }

  async updateTexture(id: number, formData: FormData): Promise<Texture> {
    return await textureApi.updateTexture(id, formData);
  }

  async deleteTexture(id: number): Promise<void> {
    await textureApi.deleteTexture(id);
  }
}
