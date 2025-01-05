export interface Participant {
    id?: number;
    name: string;
    last_name: string;
    identification: string;
    email: string;
    phone: string;
}

export interface Course {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
}

export interface TypeParticipant {
    id: number;
    name: string;
    description: string;
}

export interface Enrollment {
    id: number;
    participant_id: number;
    type_participant_id: number;
    course_id: number;
    status: string;
    courses: Course[];
    type_participant: TypeParticipant;
}

export interface ParticipantDetailResponse {
    message: string;
    data: {
        participant: Participant;
        enrollments: Enrollment[];
    };
    code: number;
}

export interface ParticipantResponse {
    message: string;
    data: Participant;
    code: number;
}

export interface ParticipantsResponse {
    message: string;
    data: Participant[];
    code: number;
}
