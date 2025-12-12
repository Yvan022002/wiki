import { SignInPage } from '@toolpad/core/SignInPage';

export default function SignIn() {
    return (
            <SignInPage 
                signIn={()=>{}}
                slotProps={
                    {
                    emailField: {autoFocus:false},
                    passwordField:{autoFocus:false}
                }
                }
            />
    );
}