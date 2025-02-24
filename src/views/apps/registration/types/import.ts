export interface ImportParticipants {
    file: string;
}

export interface ImportParticipantsResponse {
    message: string;
    data: ImportParticipants | null;
    code: number;
}
