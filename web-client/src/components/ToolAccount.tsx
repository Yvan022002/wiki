import { AppProvider, Account } from "@toolpad/core";
import { useAuth } from "../auth/AuthContext";
import { useMemo} from "react";
export function ToolAccount() {
    const  authContext= useAuth();
    const authentication = useMemo(() => {
    return {
     user: authContext.user?
     {
        displayName: authContext.user.name,
        email: authContext.user.email,
     }: undefined,
      signIn:async()=>{
        console.log('Sign in called from ToolAccount component',authContext.user);
        return Promise.resolve();
      },
      signOut: () => {
        authContext.logout();
      },
    };
  }, [authContext.user]);
  return (
    <AppProvider authentication={authentication}>
        <Account/>
     </AppProvider>
  )
}