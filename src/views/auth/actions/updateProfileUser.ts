import { messageSuccess } from '@/helpers/toastNotification';
import { storeToRefs } from 'pinia';
import type { AxiosResponse } from 'axios';
import { handleAxiosError } from '@/utils/errorHandling';
import { useAuthStore } from '@/stores/auth';
import makeFetch from '@/makeFetch';
import { UserProfileUpdate, UserResponse } from '../types/auth';
import { ref } from 'vue';

export function useUpdateProfileUser() {
    const { user } = storeToRefs(useAuthStore());
    const isLoadingSaveProfile = ref(false);

    async function updateProfileUser(payload: UserProfileUpdate) {
        isLoadingSaveProfile.value = true;
        try {
            const response = await makeFetch.patch<UserResponse, AxiosResponse<UserResponse>, UserProfileUpdate>('users/update-profile', payload);

            if (response.data.code === 200) {
                messageSuccess(response.data.message);
                user.value = response.data.data;
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLoadingSaveProfile.value = false;
        }
    }

    return { updateProfileUser, isLoadingSaveProfile };
}
