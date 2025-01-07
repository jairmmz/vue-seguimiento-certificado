import { ref } from 'vue';
import type { Participant, ParticipantsResponse } from '../types/participant';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError } from '@/helpers/toastNotification';

export function useGetParticipants() {
    const participants = ref<Participant[]>([]);
    const isLoadingFetch = ref(false);

    async function getParticipants() {
        isLoadingFetch.value = true;
        try {
            const response = await makeFetch.get<ParticipantsResponse, AxiosResponse<ParticipantsResponse>>('participants');

            if (response.data.code === HTTP_STATUS.OK) {
                participants.value = response.data.data;
            }
        } catch (error: any) {
            if (error.response.data.code != HTTP_STATUS.UNAUTHORIZED) {
                messageError(error.response.data.data);
            }
        } finally {
            isLoadingFetch.value = false;
        }
    }

    return { getParticipants, participants, isLoadingFetch };
}
