import { Role } from './roles.enum';
export interface JwtPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface JwtRefreshPayload extends JwtPayload {
  refreshToken: string;
}