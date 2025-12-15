import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './view/index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import DashboardLogin from './view/dashboard/login/dashboardLogin.jsx'
import DashboardHome from './view/dashboard/home/dashboardHome.jsx'
import DashboardMiddleware from './core/middleware/dashboardMIddleware.jsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='dashboard'>
        <Route path='login' element={<DashboardLogin />} />
        <Route element={<DashboardMiddleware />}>
          <Route path='home' element={<DashboardHome />} />
        </Route>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
