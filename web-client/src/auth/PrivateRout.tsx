import { Navigate} from "react-router"
import { type JSX } from "react";
import type { Session } from "@toolpad/core";
import { useAuth } from "./AuthContext";
import { CircularProgress } from "@mui/material";
export interface SessionWithToken extends Session{
    token?: string;
};

export function PrivateRoute({children}:{children: JSX.Element}) {
    const authContext= useAuth();
    return authContext.isLoading ? <CircularProgress /> : authContext.isOnline ? children : <Navigate to="login" replace />;
}