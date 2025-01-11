import { defineStore } from 'pinia';
import type { Registration } from '../types/registration';

export const useRegistrationStore = defineStore('registration', {
    state: () => ({
        Registration: null as Registration | null,
        Registrations: [] as Registration[],
        isLoadingSave: false,
        isRegistrationModalOpen: false,
        isRegistrationModalDeleteOpen: false,
    }),
    getters: {
        
    },
    actions: {
        
    },
});
