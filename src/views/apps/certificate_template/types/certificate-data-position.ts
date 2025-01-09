export interface DynamicField {
    id: string;
    name: string;
    label: string;
    x: number;
    y: number;
    type: 'text' | 'date';
}

export interface TemplatePosition {
    fieldId: string;
    x: number;
    y: number;
}