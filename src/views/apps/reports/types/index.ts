export interface ParticipantsByCourse {
    name: string;
    registrations_count: number;
}

export interface ParticipantsByCourseResponse {
    message: string;
    data: ParticipantsByCourse[];
    code: number;
}
