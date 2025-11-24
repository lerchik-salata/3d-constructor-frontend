import { apiClient } from ".";

export interface CustomShapeDto {
  id?: number;
  name: string;
  type: string;
  color: string;
  params: any;
}

export interface BasicShapeDto {
  id: number;
  name: string;
  type: string;
}

export const ShapesApi = {
  getBasicShapes: async (): Promise<BasicShapeDto[]> => {
    const res = await apiClient.get('/shapes/basic/all');
    return res.data;
  },

  getCustomShapes: async (): Promise<CustomShapeDto[]> => {
    const res = await apiClient.get('/shapes/custom');
    return res.data;
  },

  createCustomShape: async (shape: CustomShapeDto): Promise<CustomShapeDto> => {
    const res = await apiClient.post('/shapes/custom', shape);
    return res.data;
  },

  updateCustomShape: async (id: number, shape: CustomShapeDto): Promise<CustomShapeDto> => {
    const res = await apiClient.put(`/shapes/custom/${id}`, shape);
    return res.data;
  },

  deleteCustomShape: async (id: number): Promise<void> => {
    await apiClient.delete(`/shapes/custom/${id}`);
  },
};
