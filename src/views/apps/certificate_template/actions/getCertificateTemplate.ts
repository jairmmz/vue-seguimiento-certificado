import { ref } from 'vue';
import type { CertificateTemplate, CertificateTemplateResponse } from '../types/certificate-template';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError } from '@/helpers/toastNotification';

export function useGetCertificateTemplate() {
    const certificateTemplate = ref<CertificateTemplate>({} as CertificateTemplate);
    const isLoadingFetch = ref(false);

    async function getCertificateTemplate(id: number) {
        isLoadingFetch.value = true;
        try {
            const response = await makeFetch.get<CertificateTemplateResponse, AxiosResponse<CertificateTemplateResponse>>(`certificate-templates/show/${id}`);

            if (response.data.code === HTTP_STATUS.OK) {
                certificateTemplate.value = response.data.data;
            }
        } catch (error: any) {
            messageError(error.response.data.data);
        } finally {
            isLoadingFetch.value = false;
        }
    }

    return { getCertificateTemplate, certificateTemplate, isLoadingFetch };
}
