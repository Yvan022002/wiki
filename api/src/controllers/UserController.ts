import { Request, Response} from "express";
import { User } from "../models/User";
import { ConnexionDto, InscriptionDto, UserService } from "../services/UserService";
import { Router } from "express";

const userService = new UserService();

 export async function Login(req: Request, res: Response){
        try {
            const credentials: ConnexionDto = req.body;
            const { user, token } = await userService.loginUser(credentials);
           return res.status(200).send({message: "User logged in", user: user, token: token});
        } catch (error) {
           return res.status(401).send({message: error instanceof Error ? error.message : error});
        }
    }

  export async function Register(req: Request, res: Response){
        try {
            const credentials: InscriptionDto = req.body;
            const user = await userService.registerUser(credentials);
          return  res.status(201).send({message: "User registered", user: user});
        } catch (error) {
            return res.status(401).send({message: error instanceof Error ? error.message : error});
        }   
    }



