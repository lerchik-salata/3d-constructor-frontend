import type { Texture } from '../types/texture';
import { apiClient } from './';

export const textureApi = {
    getAllTextures: async (): Promise<Texture[]> => {
        const response = await apiClient.get<Texture[]>(`/texture`);
        return response.data;
    },

    addTexture: async (textureData: FormData): Promise<Texture> => {
        const response = await apiClient.post<Texture>(`/texture`, textureData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateTexture: async (textureId: number, textureData: FormData): Promise<Texture> => {
        const response = await apiClient.put<Texture>(`/texture/${textureId}`, textureData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteTexture: async (textureId: number): Promise<void> => {
        await apiClient.delete(`/texture/${textureId}`);
    }

}