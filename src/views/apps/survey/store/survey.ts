import { defineStore } from 'pinia';
import { Survey } from '../types/survey';

export const useSurveyStore = defineStore('survey', {
    state: () => ({
        survey: null as Survey | null,
        surveys: [] as Survey[],
        isLoadingSave: false,
        isSurveyModalOpen: false,
        isSurveyModalDeleteOpen: false,
    }),
    getters: {
        
    },
    actions: {
        
    },
});
