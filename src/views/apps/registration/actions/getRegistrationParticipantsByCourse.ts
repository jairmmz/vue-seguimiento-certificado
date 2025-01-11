import { ref } from 'vue';
import type { ParticipantTypeParticipant, ParticipantTypeParticipantResponse } from '../types/registration';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError } from '@/helpers/toastNotification';

export function useGetRegistrationParticipantsByCourse() {
    const participantsRegistrations = ref<ParticipantTypeParticipant[]>([]);
    const isLoadingFetchRegistrationParticipants = ref(false);

    async function getRegistrationParticipantsByCourse(id: number) {
        isLoadingFetchRegistrationParticipants.value = true;
        try {
            const response = await makeFetch.get<ParticipantTypeParticipantResponse, AxiosResponse<ParticipantTypeParticipantResponse>>(`registrations/participants-registrations-by-course/${id}`);

            if (response.data.code === HTTP_STATUS.OK) {
                participantsRegistrations.value = response.data.data;
            }
        } catch (error: any) {
            messageError(error.response.data.data);
        } finally {
            isLoadingFetchRegistrationParticipants.value = false;
        }
    }

    return { getRegistrationParticipantsByCourse, participantsRegistrations, isLoadingFetchRegistrationParticipants };
}
