import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SocietyDetails from '@/pages/SocietyDetails'
import Profile from '@/pages/profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/society/:id',
    element: <SocietyDetails />
  },
  {
    path: '/profile/:id',
    element: <Profile />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
