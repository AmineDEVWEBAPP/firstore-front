import { redirect } from "react-router-dom"
import AdminServices from "../services/admin_services"
import { dashboardInit } from "../../view/dashboard/dashboard/dashboard.jsx"

export default async function adminLogged() {
    const logged = await AdminServices.logged()
    if (!logged) throw redirect('/dashboard/login')
    return await dashboardInit()
}