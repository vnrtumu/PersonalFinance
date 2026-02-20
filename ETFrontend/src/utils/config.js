import { Platform } from 'react-native';
import { ENV } from './env';

const localhost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

const CONFIGS = {
    dev: {
        API_URL: `http://${localhost}:8000/api/v1`,
    },
    prod: {
        API_URL: 'https://pfbackend-7ea6.onrender.com/api/v1',
    }
};

export const APP_CONFIG = CONFIGS[ENV] || CONFIGS.prod;
