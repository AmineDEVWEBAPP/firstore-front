import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './view/index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import DashboardLogin from './view/dashboard/login/dashboardLogin.jsx'
import AdminLogged from './core/middleware/adminLogged.jsx'
import Dashboard from './view/dashboard/dashboard/dashboard.jsx'
import DashboardHome from './view/dashboard/home/home.jsx'
import Offers from './view/dashboard/offers/offers.jsx'
import Accounts from './view/dashboard/accounts/accounts.jsx'
import Profiles from './view/dashboard/profiles/profiles.jsx'
import Users from './view/dashboard/users/users.jsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='dashboard'>
        <Route element={<AdminLogged page='login' />}>
          <Route path='login' element={<DashboardLogin />} />
        </Route>
        <Route element={<AdminLogged />}>
          <Route element={<Dashboard />}>
            <Route index path='home' element={<DashboardHome />} />
            <Route path='offers' element={<Offers />} />
            <Route path='accounts' element={<Accounts />} />
            <Route path='profiles' element={<Profiles />} />
            <Route path='users' element={<Users />} />
          </Route>
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
