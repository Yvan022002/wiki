import { JwtPayload } from 'jsonwebtoken';
import { UserRole } from "../models/User";

export interface AuthUser extends JwtPayload {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
