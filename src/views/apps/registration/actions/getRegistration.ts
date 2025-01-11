import { ref } from 'vue';
import type { Registration, RegistrationResponse } from '../types/registration';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError } from '@/helpers/toastNotification';

export function useGetRegistration() {
    const registration = ref<Registration>({} as Registration);
    const isLoadingFetchGetRegistration = ref(false);

    async function getRegistration(id: number) {
        isLoadingFetchGetRegistration.value = true;
        try {
            const response = await makeFetch.get<RegistrationResponse, AxiosResponse<RegistrationResponse>>(`registrations/show/${id}`);

            if (response.data.code === HTTP_STATUS.OK) {
                registration.value = response.data.data;
            }
        } catch (error: any) {
            messageError(error.response.data.data);
        } finally {
            isLoadingFetchGetRegistration.value = false;
        }
    }

    return { getRegistration, registration, isLoadingFetchGetRegistration };
}
