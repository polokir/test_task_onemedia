export interface AuthRequest extends Request {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    refreshToken?: string;
  };
}