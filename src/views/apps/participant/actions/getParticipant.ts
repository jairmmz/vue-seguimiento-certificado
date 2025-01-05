import { ref } from 'vue';
import type { Participant, ParticipantResponse } from '../types/participant';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError } from '@/helpers/toastNotification';

export function useGetParticipant() {
    const participant = ref<Participant>({} as Participant);
    const isLoadingFetch = ref(false);

    async function getParticipant(id: number) {
        isLoadingFetch.value = true;
        try {
            const response = await makeFetch.get<ParticipantResponse, AxiosResponse<ParticipantResponse>>(`participants/show/${id}`);

            if (response.data.code === HTTP_STATUS.OK) {
                participant.value = response.data.data;
            }
        } catch (error: any) {
            messageError(error.response.data.data);
        } finally {
            isLoadingFetch.value = false;
        }
    }

    return { getParticipant, participant, isLoadingFetch };
}
