
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import type { Navigation } from '@toolpad/core/AppProvider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';

const NAVIGATION: Navigation = [
  {
    segment: '',
    title: 'Dasboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  }
];
const BRANDING = {
  title: 'Wiki',
};
function App() {
  

  return (
  <AppProvider>
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet/>
    </ReactRouterAppProvider>
  </AppProvider>  
  )
}

export default App
