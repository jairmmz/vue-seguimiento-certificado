import { ref } from 'vue';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { ParticipantsWithoutRegistration, ParticipantsWithoutRegistrationResponse } from '../types-home';

export function useGetIndex() {
    const participantsWithoutRegistration = ref<ParticipantsWithoutRegistration>({} as ParticipantsWithoutRegistration);
    const isLoadingFetchData = ref(false);

    async function indexData() {
        isLoadingFetchData.value = true;
        try {
            const response = await makeFetch.get<ParticipantsWithoutRegistrationResponse, AxiosResponse<ParticipantsWithoutRegistrationResponse>>('home-admin');

            if (response.data.code === HTTP_STATUS.OK) {
                participantsWithoutRegistration.value = response.data.data;
            }
        } catch (error: any) {
            if (error.response.data.code != HTTP_STATUS.UNAUTHORIZED) {
                console.log(error.response.data.data);
            }
        } finally {
            isLoadingFetchData.value = false;
        }
    }

    return { indexData, participantsWithoutRegistration, isLoadingFetchData };
}
