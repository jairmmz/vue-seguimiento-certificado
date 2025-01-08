export interface CertificateTemplate {
    id?: number;
    name: string;
    template_file: string;
    template_file_url?: string;
}

export interface CertificateTemplateResponse {
    message: string;
    data: CertificateTemplate;
    code: number;
}

export interface CertificateTemplatesResponse {
    message: string;
    data: CertificateTemplate[];
    code: number;
}
