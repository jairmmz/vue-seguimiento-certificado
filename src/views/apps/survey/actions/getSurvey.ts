import type { AxiosResponse } from 'axios';
import makeFetch from '@/makeFetch';
import { Survey, SurveyResponse } from '../types/survey';
import { messageError } from '@/helpers/toastNotification';
import { ref } from 'vue';

export function useGetSurvey() {
    const isLoadingGet = ref(false);

    async function getSurvey(survey_id: number) {
        isLoadingGet.value = true;
        try {
            const response = await makeFetch.get<SurveyResponse, AxiosResponse<SurveyResponse>>(`surveys/${survey_id}`);
            return response.data.data
        } catch (error: any) {
            messageError(error.response.data.message);
        } finally {
            isLoadingGet.value = false;
        }
    }

    return { getSurvey, isLoadingGet };
}
