import { User } from "@/src/models/User";
import mongoose, { Schema,Document } from "mongoose";
import { InscriptionDto } from "@/src/services/UserService";
import {connectToDatabase} from "./DB";

const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
});
export const dbUserModel = mongoose.model<User>("User", UserSchema);

export class UserRepository {
    private userModel= dbUserModel;
    constructor() {
        connectToDatabase();
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }
    async getUserById(id: string): Promise<User | null> {
        return this.userModel.findById(id);
    }
    async getUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email });
    }
    async createUser(userDto: InscriptionDto): Promise<User> {
        const user = new this.userModel(userDto);
        return user.save();
    }

}
