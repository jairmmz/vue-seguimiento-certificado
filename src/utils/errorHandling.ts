import { messageError } from '@/helpers/toastNotification';
import axios, { AxiosError } from 'axios';

export function handleAxiosError(error: unknown): void {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ data?: Record<string, string[]> }>;
        if (axiosError.response?.status === 422) {
            const errors = axiosError.response.data.data;
            if (errors) {
                const errorList = Object.values(errors)
                    .flat()
                    .map((message) => `<li>${message}</li>`)
                    .join('');
                
                const errorHtml = `<ul>${errorList}</ul>`;

                messageError(errorHtml);
            }
        }
    }
}
