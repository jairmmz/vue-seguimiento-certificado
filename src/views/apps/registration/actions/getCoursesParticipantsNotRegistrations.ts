import { ref } from 'vue';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { CoursesParticipants, CoursesParticipantsResponse } from '../types/registration';

export function useGetCoursesParticipantsNotRegistrations() {
    const coursesParticipantsNotRegistrations = ref<CoursesParticipants>();
    const isLoadingFetchCoursesParticipantsNotRegistrations = ref(false);

    async function getCoursesParticipantsNotRegistrations(coursesId: number) {
        isLoadingFetchCoursesParticipantsNotRegistrations.value = true;
        try {
            const response = await makeFetch.get<CoursesParticipantsResponse, AxiosResponse<CoursesParticipantsResponse>>(
                `/registrations/courses-participants-not-registrations/${coursesId}`,
            );

            if (response.data.code === HTTP_STATUS.OK) {
                coursesParticipantsNotRegistrations.value = response.data.data;
            }
        } catch (error: any) {
            if (error.response.data.code != HTTP_STATUS.UNAUTHORIZED) {
                console.log(error.response.data.data);
            }
        } finally {
            isLoadingFetchCoursesParticipantsNotRegistrations.value = false;
        }
    }

    return { getCoursesParticipantsNotRegistrations, coursesParticipantsNotRegistrations, isLoadingFetchCoursesParticipantsNotRegistrations };
}
