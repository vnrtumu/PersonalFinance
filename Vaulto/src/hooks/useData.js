import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api';

export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const response = await apiClient.get('/categories/');
            return response.data;
        },
    });
};

export const useAddCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (categoryData) => {
            const response = await apiClient.post('/categories/', categoryData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...categoryData }) => {
            const response = await apiClient.put(`/categories/${id}`, categoryData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const response = await apiClient.delete(`/categories/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export const useSummary = () => {
    return useQuery({
        queryKey: ['summary'],
        queryFn: async () => {
            const response = await apiClient.get('/reports/summary');
            return response.data;
        },
    });
};

export const useBudgets = () => {
    return useQuery({
        queryKey: ['budgets'],
        queryFn: async () => {
            const response = await apiClient.get('/budgets/');
            return response.data;
        },
    });
};
