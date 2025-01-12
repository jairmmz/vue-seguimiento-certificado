import type { Certificate, CertificateResponse } from '../types/certificate';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageSuccess } from '@/helpers/toastNotification';
import { storeToRefs } from 'pinia';
import { useCertificateStore } from '../store/certificate';
import { handleAxiosError } from '@/utils/errorHandling';

export function useUpdateCertificate() {
    const { isLoadingSave } = storeToRefs(useCertificateStore());

    async function updateCertificate(certificate: Certificate, certificateId: number) {
        isLoadingSave.value = true;
        try {
            const response = await makeFetch.post<CertificateResponse, AxiosResponse<CertificateResponse>>(`certificates/update/${certificateId}`, certificate, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data.code === HTTP_STATUS.OK) {
                messageSuccess(response.data.message);
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLoadingSave.value = false;
        }
    }

    return { updateCertificate };
}
