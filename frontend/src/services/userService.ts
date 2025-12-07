import axiosInstance from "../api/axios";
import {User} from "../types/auth.types";


export const userService = {
    async getAllUsers(): Promise<User[]> {
        const response = await axiosInstance.get('/users');
        return response.data;
    },

    async updateUser(id:number, user: Partial<User>): Promise<User> {
        const response = await axiosInstance.put(`/users/${id}`, user);
        return response.data;
    },

    async deleteUser(id:number): Promise<void> {
        return await axiosInstance.delete(`/users/${id}`);
    },
}