import { redirect } from "react-router-dom"
import AdminServices from "../services/admin_services"
import DashboardController from "../../controller/dashboard"

export default async function adminLogged() {
    const logged = await AdminServices.logged()
    if (!logged) throw redirect('/dashboard/login')
    return  await DashboardController.init()
}