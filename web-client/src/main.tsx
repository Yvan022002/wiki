import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.tsx'
import  Layout  from './layouts/DashboardLayout.tsx';
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Layout/>,
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
    
    ],
    
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
