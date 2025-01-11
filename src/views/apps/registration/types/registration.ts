import { Course } from '../../course/types/course';
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
    courses: Course[];
    participants: Participant[];
    type_participants: TypeParticipant[];
}

export interface CoursesParticipantsResponse {
    message: string;
    data: CoursesParticipants;
    code: number;
}

export interface RegistrationSelect {
    id?: number;
    course: Course;
    participant: Participant;
    type_participant: TypeParticipant;
}

export interface Registration {
    id?: number;
    course_id: number;
    participant_id: number;
    type_participant_id: number;
}

export interface RegistrationResponse {
    message: string;
    data: Registration[];
    code: number;
}
