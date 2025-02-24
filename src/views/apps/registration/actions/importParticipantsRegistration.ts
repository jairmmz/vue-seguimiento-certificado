import type { ImportParticipants, ImportParticipantsResponse } from '../types/import';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageSuccess } from '@/helpers/toastNotification';
import { handleAxiosError } from '@/utils/errorHandling';
import { ref } from 'vue';

export function useImportParticipantRegistration() {
    const isLoadingSaveImportParticipant  = ref(false);

    async function importParticipantRegistration(file: ImportParticipants, courseId: number) {
        isLoadingSaveImportParticipant.value = true;
        try {
            const response = await makeFetch.post<ImportParticipantsResponse, AxiosResponse<ImportParticipantsResponse>>(`registrations/import-participants/${courseId}`, file, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data.code === HTTP_STATUS.OK) {
                messageSuccess(response.data.message);
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLoadingSaveImportParticipant.value = false;
        }
    }

    return { importParticipantRegistration, isLoadingSaveImportParticipant };
}
