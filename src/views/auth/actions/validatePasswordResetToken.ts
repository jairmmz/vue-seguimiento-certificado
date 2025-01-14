import { messageSuccess } from '@/helpers/toastNotification';
import type { AxiosResponse } from 'axios';
import { handleAxiosError } from '@/utils/errorHandling';
import { ValidatePasswordResetToken, ValidatePasswordResetTokenResponse } from '../types/auth';
import makeFetch from '@/makeFetch';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useValidatePasswordResetToken() {
    const isLodingValidatePasswordResetToken = ref(false);
    const isValidatePasswordResetToken = ref(false);
    const router = useRouter();

    async function validatePasswordResetToken(data: ValidatePasswordResetToken) {
        isLodingValidatePasswordResetToken.value = true;
        try {
            const response = await makeFetch.post<
                ValidatePasswordResetTokenResponse,
                AxiosResponse<ValidatePasswordResetTokenResponse>,
                ValidatePasswordResetToken
            >('password-reset/validate', data);

            if (response.data.code === 200) {
                isValidatePasswordResetToken.value = response.data.data;
            }
        } catch (error: any) {
            handleAxiosError(error);
            router.push({ name: 'cover-password-reset' });
        } finally {
            isLodingValidatePasswordResetToken.value = false;
        }
    }

    return { validatePasswordResetToken, isLodingValidatePasswordResetToken, isValidatePasswordResetToken };
}
