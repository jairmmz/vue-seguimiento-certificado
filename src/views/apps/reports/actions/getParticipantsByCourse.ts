import { ref } from 'vue';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { handleAxiosError } from '@/utils/errorHandling';
import { ParticipantsByCourse, ParticipantsByCourseResponse } from '../types';

export function useGetParticipantsByCourse() {
    const isLoadingFetchGetParticipantsByCourse = ref(false);
    const participantsByCourse = ref<ParticipantsByCourse[]>([]);

    async function getParticipantsByCourse() {
        isLoadingFetchGetParticipantsByCourse.value = true;
        try {
            const response = await makeFetch.get<ParticipantsByCourseResponse, AxiosResponse<ParticipantsByCourseResponse>>(`reports`);

            if (response.data.code === HTTP_STATUS.OK) {
                participantsByCourse.value = response.data.data;
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLoadingFetchGetParticipantsByCourse.value = false;
        }
    }

    return { getParticipantsByCourse, participantsByCourse, isLoadingFetchGetParticipantsByCourse };
}
