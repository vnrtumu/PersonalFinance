import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api';
import { useAuthStore } from '../store/authStore';

export const useUploadAvatar = () => {
    const queryClient = useQueryClient();
    const setAvatar = useAuthStore((state) => state.setAvatar);

    return useMutation({
        mutationFn: async (fileData) => {
            const formData = new FormData();
            formData.append('file', {
                uri: fileData.uri,
                type: fileData.type || 'image/jpeg',
                name: fileData.fileName || 'avatar.jpg',
            });

            const response = await apiClient.post('/auth/me/upload-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            // Update the auth store with the new avatar URL
            setAvatar(data.avatar_url);
            // Invalidate queries if necessary
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
};
