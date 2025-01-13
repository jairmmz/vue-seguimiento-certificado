import { ref } from 'vue';
import type { RegistrationCourseParticipant, RegistrationCourseParticipantsResponse } from '../types/registration';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';

export function useGetRegistrationCourseParticipants() {
    const registrationCourseParticipants = ref<RegistrationCourseParticipant[]>([]);
    const isLoadingFetch = ref(false);

    async function getRegistrationCourseParticipants() {
        isLoadingFetch.value = true;
        try {
            const response = await makeFetch.get<RegistrationCourseParticipantsResponse, AxiosResponse<RegistrationCourseParticipantsResponse>>('registrations');

            if (response.data.code === HTTP_STATUS.OK) {
                registrationCourseParticipants.value = response.data.data;
            }
        } catch (error: any) {
            if (error.response.data.code != HTTP_STATUS.UNAUTHORIZED) {
                console.log(error.response.data.data);
            }
        } finally {
            isLoadingFetch.value = false;
        }
    }

    return { getRegistrationCourseParticipants, registrationCourseParticipants, isLoadingFetch };
}
