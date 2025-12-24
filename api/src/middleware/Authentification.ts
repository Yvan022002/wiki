import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
import { UserRole } from '../models/User';
dotenv.config();

interface AuthUser extends JwtPayload {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

function isAuthUser(payload: string | JwtPayload): payload is AuthUser {
    return (
        typeof payload !== 'string' &&
        'id' in payload &&
        'role' in payload &&
        Object.values(UserRole).includes((payload as any).role)
    );
}

export function Authentification(req: Request, res: Response, next: NextFunction){
    console.log("Authentification middleware called");
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).send({message: "No token provided"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        console.log("Decoded token:", decoded);
        if (!isAuthUser(decoded)) {
            return res.status(401).send({message: "Invalid token payload"});
        }
        req.user = decoded; 
        next();
    } catch (error) {
        console.log("JWT verification error:", error instanceof Error ? error.message : error);
        return res.status(401).send({message: error instanceof Error ? error.message : "Invalid token"});
    }
}
export function requireRole(role: UserRole) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).send({message: "No user authenticated"});
        }
        if (req.user.role !== role) {
            return res.status(403).send({message: `Access denied. Required role: ${role}`});
        }
        next();
    };
}
export const RequireOwner = requireRole(UserRole.OWNER);
export const RequireAdmin = requireRole(UserRole.ADMIN);
export const RequireClient = requireRole(UserRole.CLIENT);