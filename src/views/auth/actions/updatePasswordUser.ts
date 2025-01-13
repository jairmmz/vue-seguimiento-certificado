import { messageSuccess } from '@/helpers/toastNotification';
import { storeToRefs } from 'pinia';
import type { AxiosResponse } from 'axios';
import { handleAxiosError } from '@/utils/errorHandling';
import { useAuthStore } from '@/stores/auth';
import makeFetch from '@/makeFetch';
import { UserPasswordUpdate, UserResponse } from '../types/auth';
import { ref } from 'vue';

export function useUpdatePasswordUser() {
    const { user } = storeToRefs(useAuthStore());
    const isLoadingSavePassword = ref(false);
    const isSaveChangePassword = ref(false);

    async function updatePasswordUser(payload: UserPasswordUpdate) {
        isLoadingSavePassword.value = true;
        try {
            const response = await makeFetch.patch<UserResponse, AxiosResponse<UserResponse>, UserPasswordUpdate>('users/update-password', payload);

            if (response.data.code === 200) {
                messageSuccess(response.data.message);
                user.value = response.data.data;
                isSaveChangePassword.value = true;
            }
        } catch (error: any) {
            isLoadingSavePassword.value = false;
            handleAxiosError(error);
        } finally {
            isLoadingSavePassword.value = false;
        }
    }

    return { updatePasswordUser, isLoadingSavePassword, isSaveChangePassword };
}
