
import { AuthProvider } from './auth/AuthContext.tsx';
import { PrivateRoute } from './auth/PrivateRout.tsx'
import SignIn from './auth/SignIn.tsx'
import Layout from './layouts/DashboardLayout.tsx';
import { createBrowserRouter,RouterProvider } from 'react-router';
import { ClientDashboardPage } from './pages/Dashboard.tsx';
import { ClientOrdersPage } from './pages/Orders.tsx';
import { AppProvider } from '@toolpad/core';


const router = createBrowserRouter([
  {
        path: '/',
        element:<PrivateRoute><Layout/></PrivateRoute>,
        children: [
          {
            index: true,
            element: <ClientDashboardPage />,
          },
          {
            path: 'orders',
            element: <ClientOrdersPage />,
          }
          
        ]},
          {
             path: 'login',
              element: <SignIn></SignIn>,
          }
    
    ]
  
);


function App() {

  return (
    <AuthProvider>
      <AppProvider>
          <RouterProvider router={router} />  
      </AppProvider>
    </AuthProvider>
    
  )
}

export default App
