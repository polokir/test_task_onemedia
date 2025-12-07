import axiosInstance from "../api/axios";
import {Record} from "../types/records.types";


export const recordsService = {

    async getRecords(): Promise<Record[]> {
        const response = await axiosInstance.get('/records');
        return response.data;
    },

    async createRecord(record:Record): Promise<Record> {
        const response = await axiosInstance.post<Record>('/records', record);
        return response.data;
    },

    async deleteRecord(id:number): Promise<void> {
        const response = await axiosInstance.delete(`/records/${id}`);
        return response.data;
    },

    async updateRecord(id:number, record:Partial<Record>): Promise<Record> {
        const response = await axiosInstance.put(`/records/${id}`, record);
        return response.data;
    }
}