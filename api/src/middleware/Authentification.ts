import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
import { error } from 'node:console';
dotenv.config();

export function Authentification(req: Request, res: Response, next: NextFunction){
    console.log("Authentification middleware called");
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).send({message: "No token provided"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) 
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({message: "Invalid token"});
    }
}