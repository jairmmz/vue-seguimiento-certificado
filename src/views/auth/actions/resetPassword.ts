import { messageSuccess } from '@/helpers/toastNotification';
import type { AxiosResponse } from 'axios';
import { handleAxiosError } from '@/utils/errorHandling';
import { ResetPassword, UserResponse } from '../types/auth';
import makeFetch from '@/makeFetch';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useResetPassword() {
    const isLodingResetPassword = ref(false);
    const router = useRouter();

    async function resetPassword(data: ResetPassword) {
        isLodingResetPassword.value = true;
        try {
            const response = await makeFetch.post<UserResponse, AxiosResponse<UserResponse>, ResetPassword>('password-reset/recover', data);

            if (response.data.code === 200) {
                messageSuccess(response.data.message);
                setTimeout(() => {
                    router.push({ name: 'boxed-signin' });
                }, 2000);
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLodingResetPassword.value = false;
        }
    }

    return { resetPassword, isLodingResetPassword };
}
