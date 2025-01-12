import type { CertificateResponse } from '../types/certificate';
import makeFetch from '@/makeFetch';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { messageSuccess } from '@/helpers/toastNotification';
import { handleAxiosError } from '@/utils/errorHandling';
import { ref } from 'vue';

export function useDeleteCertificate() {
    const isLoadingFetchDeleteCertificate = ref(false);

    async function deleteCertificate(certificateId: number) {
        isLoadingFetchDeleteCertificate.value = true;
        try {
            const response = await makeFetch.delete<CertificateResponse, AxiosResponse<CertificateResponse>>(`certificates/${certificateId}`);

            if (response.data.code === HTTP_STATUS.OK) {
                messageSuccess(response.data.message);
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLoadingFetchDeleteCertificate.value = false;
        }
    }

    return { deleteCertificate, isLoadingFetchDeleteCertificate };
}
