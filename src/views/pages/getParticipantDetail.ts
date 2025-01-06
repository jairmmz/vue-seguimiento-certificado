import { Enrollment, Participant, ParticipantDetailResponse } from '../apps/participant/types/participant';
import { ref } from 'vue';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError } from '@/helpers/toastNotification';

export function useGetParticipant() {
    const participant = ref<Participant>();
    const enrollments = ref<Enrollment[]>([]);
    const isLoadingFetch = ref(false);

    async function getParticipantDetail(identification: string) {
        isLoadingFetch.value = true;
        try {
            const response = await makeFetch.get<ParticipantDetailResponse, AxiosResponse<ParticipantDetailResponse>>(`participants/show-detail/${identification}`);

            if (response.data.code === HTTP_STATUS.OK) {
                participant.value = response.data.data.participant;
                enrollments.value = response.data.data.enrollments;
            } else {
                participant.value = undefined;
                enrollments.value = [];
            }
        } catch (error: any) {
            if (error.response?.status === HTTP_STATUS.BAD_REQUEST)
            {
                messageError('El número de identificación no existe');
            } else {
                messageError('Ha ocurrido un error al obtener el detalle del participante');
            }
        } finally {
            isLoadingFetch.value = false;
        }
    }

    return { getParticipantDetail, participant, enrollments, isLoadingFetch };
}
