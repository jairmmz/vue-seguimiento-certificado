import { messageError } from '@/helpers/toastNotification';
import type { AxiosResponse } from 'axios';
import makeFetch from '@/makeFetch';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { GroupQuestions, GroupsQuestionsResponse } from '../types/group-questions';
import { Survey } from '../../types/survey';

export function useGetGroupQuestions() {
    const groupQuestions = ref<GroupQuestions[]>([]);
    const survey = ref<Survey>({} as Survey);
    const isLoadingFetchGroupQuestions = ref(false);

    async function getGroupQuestions(id: number) {
        isLoadingFetchGroupQuestions.value = true;
        try {
            const response = await makeFetch.get<GroupsQuestionsResponse, AxiosResponse<GroupsQuestionsResponse>>(`survey/${id}/configuration`);

            if (response.data.code === 200) {
                groupQuestions.value = response.data.data.groupQuestions;
                survey.value = response.data.data.survey;
            }
        } catch (error: any) {
            messageError(error.response.data.data);
        } finally {
            isLoadingFetchGroupQuestions.value = false;
        }
    }

    return { getGroupQuestions, groupQuestions, survey, isLoadingFetchGroupQuestions };
}
