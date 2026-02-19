import axios from 'axios';
import { APP_CONFIG } from '../utils/config';
import { useAuthStore } from '../store/authStore';

const apiClient = axios.create({
    baseURL: APP_CONFIG.API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(async (config) => {
    // Get token synchronously from the store
    const token = useAuthStore.getState().accessToken;

    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const url = originalRequest?.url || '';

        // If we get a 401 and it's NOT the login request
        if (status === 401 && !url.includes('/auth/login')) {
            const { logout, isAuthenticated } = useAuthStore.getState();

            // Only force logout if we WERE supposedly authenticated
            if (isAuthenticated && logout) {
                console.log('--- SESSION EXPIRED OR INVALID: LOGGING OUT ---');
                await logout();
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
