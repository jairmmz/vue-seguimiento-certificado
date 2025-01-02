import { messageError } from '@/helpers/toastNotification';
import type { AxiosResponse } from 'axios';
import makeFetch from '@/makeFetch';
import { ref } from 'vue';
import { Question, QuestionsResponse } from '../types/group-questions';

export function useGetQuestions() {
    const questions = ref<Question[]>([]);
    const isLoadingQuestions = ref(false);

    async function getQuestions(id: number) {
        isLoadingQuestions.value = true;
        try {
            const response = await makeFetch.get<QuestionsResponse, AxiosResponse<QuestionsResponse>>(`/group-question/${id}/questions`);

            if (response.data.code === 200) {
                questions.value = response.data.data;
            }
        } catch (error: any) {
            messageError(error.response.data.message);
        } finally {
            isLoadingQuestions.value = false;
        }
    }

    return { getQuestions, questions, isLoadingQuestions };
}
