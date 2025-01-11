import type { Registration, RegistrationResponse } from '../types/registration';
import { useRouter } from 'vue-router';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageSuccess } from '@/helpers/toastNotification';
import { storeToRefs } from 'pinia';
import { useRegistrationStore } from '../store/registration';
import { handleAxiosError } from '@/utils/errorHandling';

export function useCreateRegistration() {
    const { isLoadingSave } = storeToRefs(useRegistrationStore());
    const router = useRouter();

    async function createRegistration(registration: Registration) {
        isLoadingSave.value = true;
        try {
            const response = await makeFetch.post<RegistrationResponse, AxiosResponse<RegistrationResponse>>('registrations', registration);

            if (response.data.code === HTTP_STATUS.CREATED) {
                messageSuccess(response.data.message);
                router.push({ name: 'registration-index' });
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLoadingSave.value = false;
        }
    }

    return { createRegistration };
}
