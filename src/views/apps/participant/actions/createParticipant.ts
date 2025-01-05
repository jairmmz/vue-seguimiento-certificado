import type { Participant, ParticipantResponse } from '../types/participant';
import { useRouter } from 'vue-router';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError, messageSuccess } from '@/helpers/toastNotification';
import { storeToRefs } from 'pinia';
import { useParticipantStore } from '../store/participant';

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
            messageError(error.response.data.data);
        } finally {
            isLoadingSave.value = false;
        }
    }

    return { createParticipant };
}
