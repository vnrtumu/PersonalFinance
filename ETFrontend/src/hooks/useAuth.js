import { useMutation } from '@tanstack/react-query';
import apiClient from '../services/api';
import { useAuthStore } from '../store/authStore';

export const useLogin = () => {
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: async ({ email, password }) => {
            const formData = new FormData();
            formData.append('username', email);
            formData.append('password', password);

            const response = await apiClient.post('/auth/login', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        },
        onSuccess: async (data, variables) => {
            const { access_token, refresh_token } = data;
            const user = { email: variables.email, name: variables.email.split('@')[0] };
            await setAuth(user, access_token, refresh_token);
        },
    });
};

export const useRegister = () => {
    return useMutation({
        /** @param {{ name: string, email: string, password: string }} userData */
        mutationFn: async (userData) => {
            const response = await apiClient.post('/auth/register', userData);
            return response.data;
        },
    });
};
