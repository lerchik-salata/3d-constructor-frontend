import type { User } from '../types/user';
import { apiClient } from './';

export const authApi = {

    login: async (email: string, password: string): Promise<{ token: string }> => {
        const response = await apiClient.post<{ token: string }>('/auth/login', { email, password });
        return response.data;
    },

    register: async (email: string, password: string): Promise<void> => {
        await apiClient.post('/auth/register', { email, password });
    },

    getMe: async (): Promise<User> => {
        const response = await apiClient.get<User>('/auth/me');
        console.log('Fetched user data:', response.data);
        return response.data;
    }
}