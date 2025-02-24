import axios from 'axios';
import router from '@/router';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from './stores/auth';
import { messageError } from './helpers/toastNotification';
import { HTTP_STATUS } from './constans/httpStatusCodes';

const makeFetch: AxiosInstance = axios.create({
    baseURL: 'http://lara-seguimiento-certificado.test/api/',
});

makeFetch.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const store = useAuthStore();
        const token = store.$state.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

makeFetch.interceptors.response.use(
    (response) => response,
    async (error) => {
        const store = useAuthStore();
        if (error.response.status === HTTP_STATUS.UNAUTHORIZED) {
            store.$reset();
            messageError('Usuario no autenticado');
            setTimeout(() => {
                router.push({ name: 'boxed-signin' });
            }, 1000);
        }

        return Promise.reject(error);
    },
);

export default makeFetch;
