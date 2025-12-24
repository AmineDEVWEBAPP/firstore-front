import { redirect } from "react-router-dom"
import AdminServices from "../services/admin_services"

export default async function adminAuth() {
    const logged = await AdminServices.logged()
    if (logged) throw redirect('/dashboard/home')
}