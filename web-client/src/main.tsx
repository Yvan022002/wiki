import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.tsx'
import  Layout  from './layouts/DashboardLayout.tsx';
import { PrivateRoute } from './auth/PrivateRout.tsx'
import SignIn from './auth/SignIn.tsx'
import { AppProvider } from '@toolpad/core/AppProvider'
import { AuthProvider } from './auth/AuthContext.tsx'
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element:<PrivateRoute><Layout/></PrivateRoute>,
        children: [
          {
            index: true,
            element: <h1>Welcome to the Dashboard</h1>,
          },
          {
            path: 'orders',
            element: <h1>Here are the orders</h1>,
          }
        ]
      },
      {
        path: '/login',
        element: <SignIn></SignIn>,
      },
    
    ],
    
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </AuthProvider>
  </StrictMode>,
)
