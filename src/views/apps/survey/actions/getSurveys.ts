import { messageError } from '@/helpers/toastNotification';
import type { AxiosResponse } from 'axios';
import makeFetch from '@/makeFetch';
import { Survey, SurveysResponse } from '../types/survey';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSurveyStore } from '../store/survey';

export function useGetSurveys() {
    const surveys = ref<Survey[]>([]);
    const isLoadingFetch = ref(false);

    async function getSurveys() {
        isLoadingFetch.value = true;
        try {
            const response = await makeFetch.get<SurveysResponse, AxiosResponse<SurveysResponse>>('surveys');

            if (response.data.code === 200) {
                surveys.value = response.data.data;
            }
        } catch (error: any) {
            messageError(error.response.data.data);
        } finally {
            isLoadingFetch.value = false;
        }
    }

    return { getSurveys, surveys, isLoadingFetch };
}
