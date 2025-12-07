import axiosInstance from '../api/axios';
import { AuthResponse, LoginDto, RegisterDto, User } from '../types/auth.types';

export const authService = {
    async register(data: RegisterDto): Promise<AuthResponse> {
        const response = await axiosInstance.post<AuthResponse>('/auth/signup', data);
        return response.data;
    },

    async login(data: LoginDto): Promise<AuthResponse> {
        const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
        return response.data;
    },

    async getProfile(): Promise<User> {
        const response = await axiosInstance.get<User>('/auth/profile');
        return response.data;
    },

    async logout(): Promise<void> {
        await axiosInstance.delete('/auth/logout');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },

    async refresh(): Promise<{ accessToken: string; refreshToken: string }> {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axiosInstance.post('/auth/refresh', { refreshToken });
        return response.data;
    },
};