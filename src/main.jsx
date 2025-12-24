import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './view/index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import DashboardLogin from './view/dashboard/login/dashboardLogin.jsx'
import Dashboard from './view/dashboard/dashboard/dashboard.jsx'
import DashboardHome from './view/dashboard/home/home.jsx'
import Offers from './view/dashboard/offers/offers.jsx'
import Accounts from './view/dashboard/accounts/accounts.jsx'
import Profiles from './view/dashboard/profiles/profiles.jsx'
import Users from './view/dashboard/users/users.jsx'
import DashboardHomeController from './controller/dashboardHome.js'
import adminAuth from './core/middleware/adminAuth.jsx'
import adminLogged from './core/middleware/adminLogged.jsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='dashboard'>
        <Route path='login' element={<DashboardLogin />} loader={adminAuth} />
        <Route element={<Dashboard />} loader={adminLogged}>
          <Route index path='home' element={<DashboardHome />} loader={DashboardHomeController.initData} />
          <Route path='offers' element={<Offers />} />
          <Route path='accounts' element={<Accounts />} />
          <Route path='profiles' element={<Profiles />} />
          <Route path='users' element={<Users />} />
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
