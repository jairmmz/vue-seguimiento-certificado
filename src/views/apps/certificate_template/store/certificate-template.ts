import { defineStore } from 'pinia';
import type { CertificateTemplate } from '../types/certificate-template';

export const useCertificateTemplateStore = defineStore('certificateTemplate', {
    state: () => ({
        certificateTemplate: null as CertificateTemplate | null,
        certificateTemplates: [] as CertificateTemplate[],
        isLoadingSave: false,
        isCertificateTemplateModalOpen: false,
        isCertificateTemplateModalDeleteOpen: false,
    }),
    getters: {
        
    },
    actions: {
        
    },
});
