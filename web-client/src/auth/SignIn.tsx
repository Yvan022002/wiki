import { SignInPage, type AuthProvider, type AuthResponse } from '@toolpad/core/SignInPage';
import { login } from '../api';
import { PageContainer} from '@toolpad/core';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router';

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
            }
           
            return { success: res.success };
        } catch (error: any) {
            return { error: error?.message || 'Erreur de connexion' };
        }
    };

    return (
            <PageContainer>
                <SignInPage
                    providers={[{ id: 'credentials', name: 'Email' },{ id: 'google', name: 'Google' }]}
                    signIn={handleSignIn}
                    slotProps={{
                        emailField: { autoFocus: false },
                        passwordField: { autoFocus: false }
                    }}
                />
            </PageContainer>
    );
}