import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SocietyDetails from '@/pages/SocietyDetails'
import Profile from '@/pages/profile'
import ProfileAbout from '@/pages/ProfileAbout'
import NewCourse from '@/pages/NewCourse'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/society/:societyId',
    element: <SocietyDetails />
  },
  {
    path: '/course/create',
    element: <NewCourse />
  },
  {
    path: '/society/:societyId/proposals',
    element: <SocietyDetails />
  },
  {
    path: '/society/:societyId/members',
    element: <SocietyDetails />
  },
  {
    path: '/profile/:id',
    element: <Profile />
  },
  {
    path: '/profile/:id/about',
    element: <ProfileAbout />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
