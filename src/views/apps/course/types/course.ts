export interface Course {
    id?: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
}

export interface CourseResponse {
    message: string;
    data: Course;
    code: number;
}

export interface CoursesResponse {
    message: string;
    data: Course[];
    code: number;
}
