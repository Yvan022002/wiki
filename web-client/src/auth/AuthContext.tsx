import { createContext, useContext, useEffect, useState} from 'react';
import type { User } from '../models';

interface AuthContextType {
    user: User| null;
    token: string | null;
    login: (newToken: string, newUser: User) => void;
    logout: () => void;
    isOnline: boolean;
    isLoading: boolean;
}
const authContext= createContext<AuthContextType | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {

    const [user, setUser]= useState<User | null>(null);
    const [token, setToken]= useState<string | null>(null);
    const [isOnline, setIsOnline]= useState(false);
    const [isLoading, setLoading]= useState(true);

    const login= (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        setIsOnline(true);
        localStorage.setItem('auth', JSON.stringify({ token: newToken, user: newUser }));
    }
    const logout= () => {
        setToken(null);
        setUser(null);
        setIsOnline(false);
    }

    const value: AuthContextType ={
        user: user,
        token: token,
        login: login,
        logout: logout,
        isOnline: isOnline,
        isLoading: isLoading
    } 
    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            const parsedAuth = JSON.parse(storedAuth);
            console.log('Restoring auth from localStorage:', parsedAuth);
            login(parsedAuth.token, parsedAuth.user);
        }
        setLoading(false);
    },[]);
    

    return (
        <authContext.Provider value={value}>
                {children}
        </authContext.Provider>
        
    );
}
export const useAuth=()=>{
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}