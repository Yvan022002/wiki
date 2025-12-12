
import jwt from 'jsonwebtoken';
export type ConnexionDto = {
    email: string;
    password: string;
}
export type InscriptionDto = {
    name: string;
    email: string;
    password: string;
}

import { UserRepository } from "@/src/Infranstructure/UserRepository";
import { User } from '../models/User';
import dotenv from "dotenv";
dotenv.config();

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }
    async generateToken(user:User): Promise<string> {
        const token = jwt.sign({id: user.id, name: user.name, email: user.email}, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return token;
    }
    async registerUser(credentials: InscriptionDto) {
        const existingUser = await this.userRepository.getUserByEmail(credentials.email);
        if (existingUser) {
            throw new Error("User already exists");
        }
        return this.userRepository.createUser(credentials);
    }
    async loginUser(credentials: ConnexionDto) {

        const user = await this.userRepository.getUserByEmail(credentials.email);
        console.log(user);
        if (!user || user.password !== credentials.password) {
            throw new Error("Invalid email or password");
        }
        const token = await this.generateToken(user);
        return { user, token };
    }
}