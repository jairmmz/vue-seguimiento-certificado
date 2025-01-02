import { Survey } from '../../types/survey';

export interface GroupQuestions {
    id?: number;
    title: string;
    order: string;
    survey_id: number;
}

export interface GroupQuestionsResponse {
    message: string;
    data: GroupQuestions;
    code: number;
}

export interface GroupsQuestionsResponse {
    message: string;
    data: {
        survey: Survey;
        groupQuestions: GroupQuestions[];
    };
    code: number;
}

export interface Question {
    id?: number;
    question: string;
    type: string;
    order: string;
    required: boolean;
    group_questions_id: number | undefined;
}

export interface QuestionResponse {
    message: string;
    data: Question;
    code: number;
}

export interface QuestionsResponse {
    message: string;
    data: Question[];
    code: number;
}
