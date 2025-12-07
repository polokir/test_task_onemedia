export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: Role;
    created_at: Date;
    updated_at: Date;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role?: Role;
}