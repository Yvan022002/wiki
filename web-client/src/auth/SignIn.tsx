import { SignInPage, type AuthProvider, type AuthResponse } from '@toolpad/core/SignInPage';
import { login } from '../api';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router';
import { Box } from '@mui/material';


export default function SignIn() {
    const authContext= useAuth();
    const navigate= useNavigate();
   
    const handleSignIn = async (provider: AuthProvider, formData: any, callbackUrl?: string): Promise<AuthResponse> => {
        try {
            const email= formData.get('email')
            const password= formData.get('password')
            console.log('Signing in with', email, password);
            const res = await login(email, password);
            if (res.success) {
                authContext.login(res.token!, res.user!);
                navigate('/');
                return { success: res.success };
            }
           
            return { error: res.error };
        } catch (error: any) {
            return { error: error?.message || 'Erreur de connexion' };
        }
    };


    return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh',
                width: '100%',
                margin: 0,
                padding: 0
            }}>
                <SignInPage
                    providers={[{ id: 'credentials', name: 'Email' },{ id: 'google', name: 'Google' }]}
                    signIn={handleSignIn}
                    slotProps={{
                        emailField: { autoFocus: false },
                        passwordField: { autoFocus: false }
                    }}
                />
            </Box>
    );
}