import type { Course, CourseResponse } from '../types/course';
import { useRouter } from 'vue-router';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageSuccess } from '@/helpers/toastNotification';
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import { handleAxiosError } from '@/utils/errorHandling';

export function useCreateCourse() {
    const { isLoadingSave } = storeToRefs(useCourseStore());
    const router = useRouter();

    async function createCourse(course: Course) {
        isLoadingSave.value = true;
        try {
            const response = await makeFetch.post<CourseResponse, AxiosResponse<CourseResponse>>('courses', course);

            if (response.data.code === HTTP_STATUS.CREATED) {
                messageSuccess(response.data.message);
                router.push({ name: 'course-index' });
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLoadingSave.value = false;
        }
    }

    return { createCourse };
}
