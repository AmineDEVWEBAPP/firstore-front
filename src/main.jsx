import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './view/index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import DashboardLogin from './view/dashboard/login/dashboardLogin.jsx'
import DashboardHome from './view/dashboard/home/dashboardHome.jsx'
import AdminLogged from './core/middleware/adminLogged.jsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='dashboard'>
        <Route element={<AdminLogged page='login' />}>
          <Route path='login' element={<DashboardLogin />} />
        </Route>
        <Route element={<AdminLogged />}>
          <Route path='' element={<DashboardHome />} />
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
