import { Router } from "express";
import { Authentification } from "../middleware/Authentification";
import { Login, Register } from "../controllers/UserController";

const userRouter = Router();
userRouter.post("/login", Login);
userRouter.post("/register", Register);

export default userRouter;