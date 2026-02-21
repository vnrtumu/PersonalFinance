import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    setAuth: async (user, accessToken, refreshToken) => {
        await AsyncStorage.setItem('access_token', accessToken);
        await AsyncStorage.setItem('refresh_token', refreshToken);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        set({ isAuthenticated: true, user, accessToken });
    },
    setAvatar: async (avatarUrl) => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const updatedUser = { ...user, avatar_url: avatarUrl };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        set((state) => ({ user: updatedUser }));
    },
    logout: async () => {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
        await AsyncStorage.removeItem('user');
        set({ isAuthenticated: false, user: null, accessToken: null });
    },
    initialize: async () => {
        const user = await AsyncStorage.getItem('user');
        const token = await AsyncStorage.getItem('access_token');
        if (user && token) {
            set({ isAuthenticated: true, user: JSON.parse(user), accessToken: token });
        }
    },
}));
