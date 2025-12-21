
import { Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { NavigationPageItem } from "@toolpad/core/AppProvider";
import { Outlet} from "react-router";
import { useAuth } from "../auth/AuthContext";
import { DashboardLayout } from "@toolpad/core";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";

const NAVIGATION: NavigationPageItem[] = [
  {segment: '',title: 'Dasboard',icon: <DashboardIcon />,action: <Typography variant="caption" color="textSecondary">Dashboard</Typography>},
  {segment: 'orders',title: 'Orders',icon: <ShoppingCartIcon />,action: <Typography variant="caption" color="textSecondary">Orders</Typography> },
];




const BRANDING = {
  title: 'Wiki',

};


export default function Layout(){
 const authContext= useAuth();
 const session={
        user:authContext.user?{
          name: authContext.user.name,
          email: authContext.user.email
        }:undefined,
      };

 const authentication = {
      signIn:async()=>{
        console.log('Sign in called from DashboardLayout component',authContext.user);
        return Promise.resolve();
      },
      signOut: () => {
        authContext.logout();
      },
    };

    return (
      <ReactRouterAppProvider branding={BRANDING} navigation={NAVIGATION} authentication={authentication} session={session}>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </ReactRouterAppProvider>
    );
}