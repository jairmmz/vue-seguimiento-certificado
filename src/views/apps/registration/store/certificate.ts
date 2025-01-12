import { defineStore } from 'pinia';
import type { Certificate } from '../types/certificate';

export const useCertificateStore = defineStore('certificate', {
    state: () => ({
        Certificate: null as Certificate | null,
        Certificates: [] as Certificate[],
        isLoadingSave: false,
        isCertificateModalOpen: false,
        isCertificateModalDeleteOpen: false,
    }),
    getters: {
        
    },
    actions: {
        
    },
});
