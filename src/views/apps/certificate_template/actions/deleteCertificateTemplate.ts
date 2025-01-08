import { ref } from 'vue';
import type { CertificateTemplateResponse } from '../types/certificate-template';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageError, messageSuccess } from '@/helpers/toastNotification';

export function useDeleteCertificateTemplate() {
    const isLoadingFetch = ref(false);

    async function deleteCertificateTemplate(id: number) {
        isLoadingFetch.value = true;
        try {
            const response = await makeFetch.delete<CertificateTemplateResponse, AxiosResponse<CertificateTemplateResponse>>(`certificate-templates/${id}`);

            if (response.data.code === HTTP_STATUS.OK) {
                messageSuccess(response.data.message);
            }
        } catch (error: any) {
            messageError(error.response.data.data);
        } finally {
            isLoadingFetch.value = false;
        }
    }

    return { deleteCertificateTemplate, isLoadingFetch };
}
