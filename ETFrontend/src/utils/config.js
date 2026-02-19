import { Platform } from 'react-native';

const getApiUrl = () => {
    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:8000/api/v1';
    }
    return 'http://localhost:8000/api/v1';
};

export const APP_CONFIG = {
    API_URL: getApiUrl(),
};
