import type { Registration, RegistrationResponse } from '../types/registration';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageSuccess } from '@/helpers/toastNotification';
import { storeToRefs } from 'pinia';
import { useRegistrationStore } from '../store/registration';
import { handleAxiosError } from '@/utils/errorHandling';

export function useCreateRegistration() {
    const { isLoadingSave } = storeToRefs(useRegistrationStore());

    async function createRegistration(registration: Registration, courseId: number) {
        isLoadingSave.value = true;
        try {
            const response = await makeFetch.post<RegistrationResponse, AxiosResponse<RegistrationResponse>>(`registrations/${courseId}`, registration);

            if (response.data.code === HTTP_STATUS.CREATED) {
                messageSuccess(response.data.message);
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLoadingSave.value = false;
        }
    }

    return { createRegistration };
}
