import { defineStore } from 'pinia';
import { GroupQuestions } from '../types/group-questions';

export const useGroupQuestionsStore = defineStore('group-questions', {
    state: () => ({
        groupQuestions: null as GroupQuestions | null,
        groupsQuestions: [] as GroupQuestions[],
        isLoadingGetGroupQuestions: false,
    }),
    getters: {
        
    },
    actions: {
        
    },
});
