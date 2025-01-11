import type { Registration, RegistrationResponse } from '../types/registration';
import { useRouter } from 'vue-router';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageSuccess } from '@/helpers/toastNotification';
import { storeToRefs } from 'pinia';
import { useRegistrationStore } from '../store/registration';
import { handleAxiosError } from '@/utils/errorHandling';

export function useUpdateRegistration() {
    const { isLoadingSave } = storeToRefs(useRegistrationStore());
    const router = useRouter();

    async function updateRegistration(registration: Registration) {
        isLoadingSave.value = true;
        try {
            const response = await makeFetch.put<RegistrationResponse, AxiosResponse<RegistrationResponse>>(`registrations/${registration.id}`, registration);

            if (response.data.code === HTTP_STATUS.OK) {
                messageSuccess(response.data.message);
                router.push({ name: 'registrations-index' });
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLoadingSave.value = false;
        }
    }

    return { updateRegistration };
}
