import type { CertificateTemplate, CertificateTemplateResponse } from '../types/certificate-template';
import { useRouter } from 'vue-router';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageSuccess } from '@/helpers/toastNotification';
import { storeToRefs } from 'pinia';
import { useCertificateTemplateStore } from '../store/certificate-template';
import { handleAxiosError } from '@/utils/errorHandling';

export function useCreateCertificateTemplate() {
    const { isLoadingSave } = storeToRefs(useCertificateTemplateStore());
    const router = useRouter();

    async function createCertificateTemplate(certificateTemplate: CertificateTemplate) {
        isLoadingSave.value = true;
        try {
            const response = await makeFetch.post<CertificateTemplateResponse, AxiosResponse<CertificateTemplateResponse>>
            ('certificate-templates', certificateTemplate, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data.code === HTTP_STATUS.CREATED) {
                messageSuccess(response.data.message);
                router.push({ name: 'certificate-templates-index' });
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLoadingSave.value = false;
        }
    }

    return { createCertificateTemplate };
}
