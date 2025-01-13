import { ref } from 'vue';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import type { Participant, ParticipantsResponse } from '../apps/participant/types/participant';

export function useGetParticipantsWithoutRegistration() {
    const participants = ref<Participant[]>([]);
    const isLoadingFetchParticipant = ref(false);

    async function getParticipantsWithoutRegistration() {
        isLoadingFetchParticipant.value = true;
        try {
            const response = await makeFetch.get<ParticipantsResponse, AxiosResponse<ParticipantsResponse>>('home-admin/get-participants-without-registration');

            if (response.data.code === HTTP_STATUS.OK) {
                participants.value = response.data.data;
            }
        } catch (error: any) {
            if (error.response.data.code != HTTP_STATUS.UNAUTHORIZED) {
                console.log(error.response.data.data);
            }
        } finally {
            isLoadingFetchParticipant.value = false;
        }
    }

    return { getParticipantsWithoutRegistration, participants, isLoadingFetchParticipant };
}
