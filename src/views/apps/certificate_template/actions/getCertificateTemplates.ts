import { ref } from 'vue';
import type { CertificateTemplate, CertificateTemplatesResponse } from '../types/certificate-template';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError } from '@/helpers/toastNotification';

export function useGetCertificateTemplates() {
    const certificateTemplates = ref<CertificateTemplate[]>([]);
    const isLoadingFetch = ref(false);

    async function getCertificateTemplates() {
        isLoadingFetch.value = true;
        try {
            const response = await makeFetch.get<CertificateTemplatesResponse, AxiosResponse<CertificateTemplatesResponse>>('certificate-templates');

            if (response.data.code === HTTP_STATUS.OK) {
                certificateTemplates.value = response.data.data;
            }
        } catch (error: any) {
            messageError(error.response.data.data);
        } finally {
            isLoadingFetch.value = false;
        }
    }

    return { getCertificateTemplates, certificateTemplates, isLoadingFetch };
}
