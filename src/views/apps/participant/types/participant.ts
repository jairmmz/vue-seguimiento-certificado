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

export interface Certificate {
    id: number;
    participant_id: number;
    type_participant_id: number;
    course_id: number;
    certificate_template_id: number;
    issue_date: string;
    certificate_url: string;
    status: string;
    qr_code: string;
    courses: Course[];
    type_participant: TypeParticipant;
}

export interface ParticipantDetailResponse {
    message: string;
    data: {
        participant: Participant;
        certificates: Certificate[];
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
