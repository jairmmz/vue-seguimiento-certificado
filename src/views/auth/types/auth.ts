export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    data: {
        user: User;
        token: string;
    };
    code: number;
}

export interface Register {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface UserProfileUpdate {
    name: string;
    email: string;
}

export interface UserPasswordUpdate {
    current_password: string;
    password: string;
    password_confirmation: string;
}

export interface UserResponse {
    message: string;
    data: User;
    code: number;
}

export interface SendPasswordResetLink {
    email: string;
}

export interface ValidatePasswordResetToken {
    token: string;
    email: string;
}

export interface ValidatePasswordResetTokenResponse {
    message: string;
    data: boolean;
    code: number;
}

export interface ResetPassword {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}