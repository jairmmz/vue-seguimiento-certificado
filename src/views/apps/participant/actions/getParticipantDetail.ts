import { ref } from 'vue';
import type { Enrollment, Participant, ParticipantDetailResponse } from '../types/participant';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError } from '@/helpers/toastNotification';

export function useGetParticipant() {
    const participant = ref<Participant>();
    const enrollments = ref<Enrollment[]>([]);
    const isLoadingFetch = ref(false);

    async function getParticipantDetail(id: number) {
        isLoadingFetch.value = true;
        try {
            const response = await makeFetch.get<ParticipantDetailResponse, AxiosResponse<ParticipantDetailResponse>>(`participants/show-detail/${id}`);

            if (response.data.code === HTTP_STATUS.OK) {
                participant.value = response.data.data.participant;
                enrollments.value = response.data.data.enrollments;
            }
        } catch (error: any) {
            messageError(error.response.data.data);
        } finally {
            isLoadingFetch.value = false;
        }
    }

    return { getParticipantDetail, participant, enrollments, isLoadingFetch };
}
