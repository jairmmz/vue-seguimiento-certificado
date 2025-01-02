import { messageError, messageSuccess } from '@/helpers/toastNotification';
import type { AxiosResponse } from 'axios';
import makeFetch from '@/makeFetch';
import { Survey, SurveyResponse, SurveysResponse } from '../types/survey';
import { storeToRefs } from 'pinia';
import { useSurveyStore } from '../store/survey';
import { useRouter } from 'vue-router';

export function useCreateSurvey() {
    const { isLoadingSave } = storeToRefs(useSurveyStore());
    const router = useRouter();

    async function createSurvey(survey: Survey) {
        isLoadingSave.value = true;
        try {
            const response = await makeFetch.post<SurveyResponse, AxiosResponse<SurveyResponse>>('surveys', survey);
            console.log(response.data);
            if (response.data.code === 201) {
                messageSuccess(response.data.message);
                router.push({ name: 'survey-index' });
            }
        } catch (error: any) {
            messageError(error.response.data.message);
        } finally {
            isLoadingSave.value = false;
        }
    }

    return { createSurvey };
}
