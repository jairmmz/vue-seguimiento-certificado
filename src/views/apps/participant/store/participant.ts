import { defineStore } from 'pinia';
import type { Participant } from '../types/participant';

export const useParticipantStore = defineStore('participant', {
    state: () => ({
        participant: null as Participant | null,
        participants: [] as Participant[],
        isLoadingSave: false,
        isParticipantModalOpen: false,
        isParticipantModalDeleteOpen: false,
    }),
    getters: {
        
    },
    actions: {
        
    },
});
