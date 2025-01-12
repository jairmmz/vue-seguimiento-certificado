export interface Certificate {
    registration_id: number;
    certificate_file?: string;
}

export interface CertificateResponse {
    message: string;
    data: Certificate;
    code: number;
}

export interface CertificatesResponse {
    message: string;
    data: Certificate[];
    code: number;
}

export interface CertificateDetail {
    id: number;
    registration_id: number;
    certificate_file: string;
    certificate_file_url: string;
    status: string;
    qr_code: string;
}

export interface CertificateDetailResponse {
    message: string;
    data: CertificateDetail | null;
    code: number;
}
