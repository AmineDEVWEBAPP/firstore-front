import AccountServices from "../core/services/account_services";
import ProfileServices from "../core/services/profile_services";
import UserServices from "../core/services/user_services";

export default class DashboardHomeController {
    static async initData() {
        let [users, profiles, accounts] = await Promise.all([UserServices.getUsers(), ProfileServices.getProfiles(), AccountServices.getAccounts()])
        const losingUsers = users.filter(user => {
            const lastPay = new Date(user.last_pay_time)
            return lastPay.getTime() > new Date().getTime()
        })
        const notUsedProfiles = profiles.filter(profile => profile.used !== 0)
        return { users, losingUsers, notUsedProfiles, accounts }
    }
}