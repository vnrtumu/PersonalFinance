import apiClient from './api';
import { useAuthStore } from '../store/authStore';

export const authService = {
    login: async (email, password) => {
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);

        const response = await apiClient.post('/auth/login', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        const { access_token, refresh_token } = response.data;
        const user = { email, name: email.split('@')[0] };

        await useAuthStore.getState().setAuth(user, access_token, refresh_token);
        return response.data;
    },

    register: async (userData) => {
        const response = await apiClient.post('/auth/register', userData);
        return response.data;
    },
};
