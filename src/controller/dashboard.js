import AdminServices from "../core/services/admin_services";

export default class DashboardController {
    static async init() {
        const [admin] = await Promise.all([AdminServices.get()])
        return { admin }
    }
}