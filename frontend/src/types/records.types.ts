export interface Record {
    id: number;
    user_id: number;
    title: string;
    content: string;
    user?: number;
    created_at: Date;
}