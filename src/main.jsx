import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './view/index.css'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import DashboardLogin from './view/dashboard/login/dashboardLogin.jsx'
import Dashboard from './view/dashboard/dashboard/dashboard.jsx'
import DashboardHome, { dashboardHomeinit } from './view/dashboard/home/home.jsx'
import Offers, { offersInit } from './view/dashboard/offers/offers.jsx'
import Accounts, { initAccounts } from './view/dashboard/accounts/accounts.jsx'
import Profiles, { initProfiles } from './view/dashboard/profiles/profiles.jsx'
import Users from './view/dashboard/users/users.jsx'
import adminAuth from './core/middleware/adminAuth.jsx'
import adminLogged from './core/middleware/adminLogged.jsx'
import CreateOffer from './view/dashboard/offers/createOffer/createOffer.jsx'
import CreateUser from './view/dashboard/createUser/createUser.jsx'
import EditOffer, { initEditOffer } from './view/dashboard/offers/editOffer/editOffer.jsx'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='dashboard'>
        <Route path='login' element={<DashboardLogin />} loader={adminAuth} />
        <Route element={<Dashboard />} loader={adminLogged}>
          <Route index element={<Navigate to='home' replace />} />
          <Route path='home' element={<DashboardHome />} loader={dashboardHomeinit} />
          <Route path='offers' element={<Offers />} loader={offersInit} />
          <Route path='offers/create' element={<CreateOffer />} />
          <Route path='offers/:id/edit' element={<EditOffer />} loader={initEditOffer} />
          <Route path='accounts' element={<Accounts />} loader={initAccounts} />
          <Route path='profiles' element={<Profiles />} loader={initProfiles}/>
          <Route path='users' element={<Users />} />
          <Route path='users/create' element={<CreateUser />} />
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
