import { ref } from 'vue';
import type { Course, CourseResponse } from '../types/course';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError } from '@/helpers/toastNotification';

export function useGetCourse() {
    const course = ref<Course>({} as Course);
    const isLoadingFetchGetCourse = ref(false);

    async function getCourse(id: number) {
        isLoadingFetchGetCourse.value = true;
        try {
            const response = await makeFetch.get<CourseResponse, AxiosResponse<CourseResponse>>(`courses/show/${id}`);

            if (response.data.code === HTTP_STATUS.OK) {
                course.value = response.data.data;
            }
        } catch (error: any) {
            messageError(error.response.data.data);
        } finally {
            isLoadingFetchGetCourse.value = false;
        }
    }

    return { getCourse, course, isLoadingFetchGetCourse };
}
