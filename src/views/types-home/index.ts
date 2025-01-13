export interface ParticipantsWithoutRegistration {
    participantData: {
        numberParticipants: number;
        lastParticipant: Participant;
    };
    courseData: {
        numberCourses: number;
        lastCourse: Course;
    };
    registrationData: {
        numberRegistrations: number;
        lastRegistration: Registration;
    };
    certificateData: {
        numberCertificates: number;
        lastCertificate: Certificate;
    };
}

export interface Course {
    id?: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}

export interface Participant {
    id?: number;
    name: string;
    last_name: string;
    identification: string;
    email: string;
    phone: string;
    created_at: string;
    updated_at: string;
}

export interface Certificate {
    id: number;
    registration_id: number;
    certificate_file: string;
    certificate_file_url: string;
    status: string;
    qr_code: string;
    created_at: string;
    updated_at: string;
}

export interface Registration {
    id: number;
    participant_id: number;
    type_participant_id: number;
    course_id: number;
    created_at: string;
    updated_at: string;
}

export interface ParticipantsWithoutRegistrationResponse {
    message: string;
    data: ParticipantsWithoutRegistration;
    code: number;
}

export interface ParticipantsCourses {
    id: number;
    participant: Participant;
    course: Course;
}

export interface ParticipantsCoursesResponse {
    message: string;
    data: ParticipantsCourses[];
    code: number;
}