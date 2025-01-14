import { messageError } from '@/helpers/toastNotification';
import axios, { AxiosError } from 'axios';

export function handleAxiosError(error: unknown): void {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ data?: Record<string, string[]> }>;
        if (axiosError.response?.status === 422 || axiosError.response?.status === 400) {
            const errors = axiosError.response.data.data;            

            if (errors) {
                // const errorList = Object.values(errors)
                //     .flat()
                //     .map((message) => `<li>${message}</li>`)
                //     .join('');

                // const errorHtml = `<ul>${errorList}</ul>`;

                // Verificar si el errors es un string o un objeto
                let errorList = '';
                if (typeof errors === 'string') {
                    errorList = `<li>${errors}</li>`;
                } else {
                    errorList = Object.values(errors)
                        .flat()
                        .map((message) => `<li>${message}</li>`)
                        .join('');
                }

                const errorHtml = `<ul>${errorList}</ul>`;

                messageError(errorHtml);
            }
        }
    }
}
