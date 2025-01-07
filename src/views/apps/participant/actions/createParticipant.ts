import type { Participant, ParticipantResponse } from '../types/participant';
import { useRouter } from 'vue-router';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageSuccess } from '@/helpers/toastNotification';
import { storeToRefs } from 'pinia';
import { useParticipantStore } from '../store/participant';
import { handleAxiosError } from '@/utils/errorHandling';

export function useCreateParticipant() {
    const { isLoadingSave } = storeToRefs(useParticipantStore());
    const router = useRouter();

    async function createParticipant(participant: Participant) {
        isLoadingSave.value = true;
        try {
            const response = await makeFetch.post<ParticipantResponse, AxiosResponse<ParticipantResponse>>('participants', participant);

            if (response.data.code === HTTP_STATUS.CREATED) {
                messageSuccess(response.data.message);
                router.push({ name: 'participant-index' });
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLoadingSave.value = false;
        }
    }

    return { createParticipant };
}
