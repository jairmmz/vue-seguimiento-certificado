import { messageSuccess } from '@/helpers/toastNotification';
import type { AxiosResponse } from 'axios';
import { handleAxiosError } from '@/utils/errorHandling';
import { SendPasswordResetLink, UserResponse } from '../types/auth';
import makeFetch from '@/makeFetch';
import { ref } from 'vue';

export function useSendPasswordResetLink() {
    const isLodingSendPasswordResetLink = ref(false);

    async function sendPasswordResetLink(data: SendPasswordResetLink) {
        isLodingSendPasswordResetLink.value = true;
        try {
            const response = await makeFetch.post<UserResponse, AxiosResponse<UserResponse>, SendPasswordResetLink>('password-reset', data);

            if (response.data.code === 200) {
                messageSuccess(response.data.message);
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLodingSendPasswordResetLink.value = false;
        }
    }

    return { sendPasswordResetLink, isLodingSendPasswordResetLink };
}
