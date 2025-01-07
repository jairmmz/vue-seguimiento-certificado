import { defineStore } from 'pinia';
import type { Course } from '../types/course';

export const useCourseStore = defineStore('course', {
    state: () => ({
        course: null as Course | null,
        courses: [] as Course[],
        isLoadingSave: false,
        isCourseModalOpen: false,
        isCourseModalDeleteOpen: false,
    }),
    getters: {
        
    },
    actions: {
        
    },
});
