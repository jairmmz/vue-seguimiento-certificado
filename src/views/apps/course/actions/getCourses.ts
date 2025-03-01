import { ref } from 'vue';
import type { Course, CoursesResponse } from '../types/course';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';

export function useGetCourses() {
    const courses = ref<Course[]>([]);
    const isLoadingFetch = ref(false);

    async function getCourses() {
        isLoadingFetch.value = true;
        try {
            const response = await makeFetch.get<CoursesResponse, AxiosResponse<CoursesResponse>>('courses');

            if (response.data.code === HTTP_STATUS.OK) {
                courses.value = response.data.data;
            }
        } catch (error: any) {
            if (error.response.data.code != HTTP_STATUS.UNAUTHORIZED) {
                console.log(error.response.data.data);
            }
        } finally {
            isLoadingFetch.value = false;
        }
    }

    return { getCourses, courses, isLoadingFetch };
}
