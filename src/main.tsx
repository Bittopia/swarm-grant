import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CourseAreaDetails from './pages/CourseAreaDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/academic-area/:id',
    element: <CourseAreaDetails />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
