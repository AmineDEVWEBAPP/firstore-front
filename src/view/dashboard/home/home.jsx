import { redirect, useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import ActionCard from "./components/actionCard/actionCard";
import NewsCard from "./components/newsCard/newsCard";
import reqres from "../../../utils/reqres";

// eslint-disable-next-line react-refresh/only-export-components
export async function dashboardHomeinit() {
    const usersReq = reqres('users', 'GET')
    const profilesReq = reqres('profiles', 'GET')
    const accountsReq = reqres('accounts', 'GET')
    let [users, profiles, accounts] = await Promise.all([usersReq, profilesReq, accountsReq])
    const reqError = usersReq['status'] === 'failed' || profilesReq['status'] === 'failed' || accountsReq['status'] === 'failed'
    if (reqError) throw redirect('/notfound')
    const losingUsers = users.filter(user => {
        const lastPay = new Date(user.last_pay_time)
        return lastPay.getTime() > new Date().getTime()
    })
    const notUsedProfiles = profiles.filter(profile => profile.used !== 0)
    return { users, losingUsers, notUsedProfiles, accounts }
}

export default function DashboardHome() {
    const navigate = useNavigate()
    const { losingUsers, users, notUsedProfiles, accounts } = useLoaderData()
    const { admin } = useOutletContext()
    return (<div
        className='flex flex-col p-10'>
        <header>
            <b
                className='text-3xl tracking-tight text-[#101418]'>
                Welcome back, {admin.name}
            </b>
            <p
                className='mt-1 text-[#5e758d]'>
                Here's what's happening with your platform.
            </p>
        </header>
        {/* news */}
        <section
            className='felx mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
            <NewsCard type='payment' count={losingUsers.length} />
            <NewsCard type='users' count={users.length} onClick={() => navigate('/dashboard/users')} />
            <NewsCard type='profiles' count={notUsedProfiles.length} onClick={() => navigate('/dashboard/profiles')} />
            <NewsCard type='accounts' count={accounts.length} onClick={() => navigate('/dashboard/accounts')} />
        </section>
        {/* Quick actions */}
        <section className='mt-10'>
            <b className='text-xl'>
                Quick Actions
            </b>
            <div
                className='bg-white border border-[#f0f2f5] rounded-2xl mt-3 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                <ActionCard text='New Offer' onClick={() => navigate('/dashboard/offers/create')} />
                <ActionCard text='New User' onClick={() => navigate('/dashboard/users/create')} />
                <ActionCard text='New Account' onClick={() => navigate('/dashboard/accounts/create')} />
                <ActionCard text='Update Profile' onClick={() => navigate('/dashboard/profiles/create')} />
            </div>
        </section>
    </div>)
}