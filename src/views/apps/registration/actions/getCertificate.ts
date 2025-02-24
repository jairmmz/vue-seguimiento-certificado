import { ref } from 'vue';
import makeFetch from '@/makeFetch';
import type { CertificateDetail, CertificateDetailResponse } from '../types/certificate';
import type { AxiosResponse } from 'axios';
import { HTTP_STATUS } from '@/constans/httpStatusCodes';
import { handleAxiosError } from '@/utils/errorHandling';

export function useGetCertificate() {
    const isLoadingFetchGetCertificate = ref(false);
    const certificate = ref<CertificateDetail | null>(null);

    async function getCertificate(registrationId: number) {
        isLoadingFetchGetCertificate.value = true;
        try {
            const response = await makeFetch.get<CertificateDetailResponse, AxiosResponse<CertificateDetailResponse>>(`certificates/show/${registrationId}`);

            if (response.data.code === HTTP_STATUS.OK) {
                certificate.value = response.data.data;
            }
        } catch (error: any) {
            handleAxiosError(error);
        } finally {
            isLoadingFetchGetCertificate.value = false;
        }
    }

    return { getCertificate, certificate, isLoadingFetchGetCertificate };
}
