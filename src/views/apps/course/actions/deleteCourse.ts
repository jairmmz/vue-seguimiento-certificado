import { ref } from 'vue';
import type { CourseResponse } from '../types/course';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageSuccess } from '@/helpers/toastNotification';
import { handleAxiosError } from '@/utils/errorHandling';

export function useDeleteCourse() {
    const isLoadingFetch = ref(false);

    async function deleteCourse(id: number) {
        isLoadingFetch.value = true;
        try {
            const response = await makeFetch.delete<CourseResponse, AxiosResponse<CourseResponse>>(`courses/${id}`);

            if (response.data.code === HTTP_STATUS.OK) {
                messageSuccess(response.data.message);
            }
        } catch (error: any) {
            if (error.response.data.code != HTTP_STATUS.UNAUTHORIZED) {
                handleAxiosError(error);
            }
        } finally {
            isLoadingFetch.value = false;
        }
    }

    return { deleteCourse, isLoadingFetch };
}
