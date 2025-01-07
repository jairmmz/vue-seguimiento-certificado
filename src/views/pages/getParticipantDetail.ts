import { Certificate, Participant, ParticipantDetailResponse } from '../apps/participant/types/participant';
import { ref } from 'vue';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError } from '@/helpers/toastNotification';

export function useGetParticipant() {
    const participant = ref<Participant>();
    const certificates = ref<Certificate[]>([]);
    const existParticipant = ref<boolean>(false);
    const isLoadingFetch = ref(false);

    async function getParticipantDetail(identification: string) {
        isLoadingFetch.value = true;
        try {
            const response = await makeFetch.get<ParticipantDetailResponse, AxiosResponse<ParticipantDetailResponse>>(`participants/show-detail/${identification}`);

            if (response.data.code === HTTP_STATUS.OK) {
                participant.value = response.data.data.participant;
                certificates.value = response.data.data.certificates;
            }
            existParticipant.value = true
        } catch (error: any) {
            if (error.response?.status === HTTP_STATUS.BAD_REQUEST)
            {
                messageError('El número de identificación no existe');
            } else {
                messageError('Ha ocurrido un error al obtener el detalle del participante');
            }
            participant.value = {} as Participant;
            certificates.value = [];
            existParticipant.value = false;
        } finally {
            isLoadingFetch.value = false;
        }
    }

    return { getParticipantDetail, participant, certificates, isLoadingFetch, existParticipant };
}
