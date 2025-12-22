import { Document } from 'mongoose';

export enum UserRole {
  CLIENT = 'client',
  OWNER = 'owner',
  ADMIN = 'admin',
}
export interface User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  
}