import { Participant, TypeParticipant } from '../../participant/types/participant';

export interface RegistrationCourseParticipant {
    id: number;
    name: string;
    number_participants: number;
    number_organizers: number;
    start_date: string;
    end_date: string;
}

export interface RegistrationCourseParticipantsResponse {
    message: string;
    data: RegistrationCourseParticipant[];
    code: number;
}

export interface CoursesParticipants {
    participants: Participant[];
    type_participants: TypeParticipant[];
}

export interface CoursesParticipantsResponse {
    message: string;
    data: CoursesParticipants;
    code: number;
}

export interface Registration {
    id?: number;
    participant_id: number;
    type_participant_id: number;
}

export interface RegistrationResponse {
    message: string;
    data: Registration[];
    code: number;
}

export interface ParticipantTypeParticipant {
    id: number;
    participant_id: number;
    participant_name: string;
    participant_last_name: string;
    participant_identification: string;
    type_participant_id: number;
    type_participant: number;
}

export interface ParticipantTypeParticipantResponse {
    message: string;
    data: ParticipantTypeParticipant[];
    code: number;
}
