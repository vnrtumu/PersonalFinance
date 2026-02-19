import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api';

export const useWallets = () => {
    return useQuery({
        queryKey: ['wallets'],
        queryFn: async () => {
            const response = await apiClient.get('/wallets/');
            return response.data;
        },
    });
};

export const useAddWallet = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (walletData) => {
            const response = await apiClient.post('/wallets/', walletData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallets'] });
        },
    });
};
