import { ref } from 'vue';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import type { Course, CoursesResponse } from '../apps/course/types/course';

export function useGetCoursesWithoutRegistrations() {
    const courses = ref<Course[]>([]);
    const isLoadingFetchCourses = ref(false);

    async function getCoursesWithoutRegistrations() {
        isLoadingFetchCourses.value = true;
        try {
            const response = await makeFetch.get<CoursesResponse, AxiosResponse<CoursesResponse>>('home-admin/get-courses-without-registration');

            if (response.data.code === HTTP_STATUS.OK) {
                courses.value = response.data.data;
            }
        } catch (error: any) {
            if (error.response.data.code != HTTP_STATUS.UNAUTHORIZED) {
                console.log(error.response.data.data);
            }
        } finally {
            isLoadingFetchCourses.value = false;
        }
    }

    return { getCoursesWithoutRegistrations, courses, isLoadingFetchCourses };
}
