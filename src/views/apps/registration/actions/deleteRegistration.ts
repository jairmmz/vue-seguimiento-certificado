import { ref } from 'vue';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError, messageSuccess } from '@/helpers/toastNotification';
import { CoursesParticipantsResponse } from '../types/registration';

export function useDeleteRegistration() {
    const isLoadingFetchDeleteRegistration = ref(false);

    async function deleteRegistration(id: number) {
        isLoadingFetchDeleteRegistration.value = true;
        try {
            const response = await makeFetch.delete<CoursesParticipantsResponse, AxiosResponse<CoursesParticipantsResponse>>(`registrations/${id}`);

            if (response.data.code === HTTP_STATUS.OK) {
                messageSuccess(response.data.message);
            }
        } catch (error: any) {
            if (error.response.data.code != HTTP_STATUS.UNAUTHORIZED) {
                console.log(error.response.data.data);
            }
        } finally {
            isLoadingFetchDeleteRegistration.value = false;
        }
    }

    return { deleteRegistration, isLoadingFetchDeleteRegistration };
}
