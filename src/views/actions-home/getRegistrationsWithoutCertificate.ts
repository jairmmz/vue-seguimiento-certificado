import { ref } from 'vue';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { ParticipantsCourses, ParticipantsCoursesResponse } from '../types-home';

export function useGetRegistrationsWithoutCertificate() {
    const participantsCourses = ref<ParticipantsCourses[]>([]);
    const isLoadingFetchRegistrations = ref(false);

    async function getRegistrationsWithoutCertificate() {
        isLoadingFetchRegistrations.value = true;
        try {
            const response = await makeFetch.get<ParticipantsCoursesResponse, AxiosResponse<ParticipantsCoursesResponse>>(
                'home-admin/get-registrations-without-certificate',
            );

            if (response.data.code === HTTP_STATUS.OK) {
                participantsCourses.value = response.data.data;
            }
        } catch (error: any) {
            if (error.response.data.code != HTTP_STATUS.UNAUTHORIZED) {
                console.log(error.response.data.data);
            }
        } finally {
            isLoadingFetchRegistrations.value = false;
        }
    }

    return { getRegistrationsWithoutCertificate, participantsCourses, isLoadingFetchRegistrations };
}
