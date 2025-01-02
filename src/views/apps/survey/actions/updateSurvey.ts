import type { AxiosResponse } from 'axios';
import makeFetch from '@/makeFetch';
import { Survey, SurveyResponse } from '../types/survey';
import { storeToRefs } from 'pinia';
import { useSurveyStore } from '../store/survey';
import { messageError, messageSuccess } from '@/helpers/toastNotification';
import { useRouter } from 'vue-router';

export function useUpdateSurvey() {
    const { isLoadingSave } = storeToRefs(useSurveyStore());
    const router = useRouter();

    async function updateSurvey(survey: Survey) {
        isLoadingSave.value = true;
        try {
            const response = await makeFetch.patch<SurveyResponse, AxiosResponse<SurveyResponse>>(`surveys/${survey.id}`, survey);
            if (response.data.code === 200) {
                messageSuccess(response.data.message);
                router.push({ name: 'survey-index' });
            }
        } catch (error: any) {
            messageError(error.response.data.message);
        } finally {
            isLoadingSave.value = false;
        }
    }

    return { updateSurvey };
}
