import { MenuItem } from '@/src/models/MenuItem';
import { Document } from 'mongoose';
export interface Restaurant extends Document {
    ownerId: string;
    name: string;
    address: string;
    phone: string;
    photoUrl?: string;
    rating?: number;
}