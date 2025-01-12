import { Course } from "../../course/types/course";

export interface Participant {
    id?: number;
    name: string;
    last_name: string;
    identification: string;
    email: string;
    phone: string;
}

export interface TypeParticipant {
    id: number;
    name: string;
    description: string;
}

export interface Registration {
    id: number;
    participant_id: number;
    type_participant_id: number;
    course_id: number;
    courses: Course[];
    type_participant: TypeParticipant;
    certificate: Certificate;
}

export interface Certificate {
    id: number;
    registration_id: number;
    certificate_file: string;
    certificate_file_url: string;
    status: string;
    qr_code: string;
}

export interface ParticipantDetailResponse {
    message: string;
    data: {
        participant: Participant;
        registrations: Registration[];
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
