import { ref } from 'vue';
import type { ParticipantResponse } from '../types/participant';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError, messageSuccess } from '@/helpers/toastNotification';

export function useDeleteParticipant() {
    const isLoadingFetch = ref(false);

    async function deleteParticipant(id: number) {
        isLoadingFetch.value = true;
        try {
            const response = await makeFetch.delete<ParticipantResponse, AxiosResponse<ParticipantResponse>>(`participants/${id}`);

            if (response.data.code === HTTP_STATUS.OK) {
                messageSuccess(response.data.message);
            }
        } catch (error: any) {
            if (error.response.data.code != HTTP_STATUS.UNAUTHORIZED) {
                console.log(error.response.data.data);
            }
        } finally {
            isLoadingFetch.value = false;
        }
    }

    return { deleteParticipant, isLoadingFetch };
}
