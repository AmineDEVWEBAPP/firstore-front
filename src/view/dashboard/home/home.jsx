import { redirect, useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import ActionCard from "./components/actionCard/actionCard";
import NewsCard from "./components/newsCard/newsCard";
import reqres from "../../../utils/reqres";
import DrawerBtn from '../../components/drawerBtn'
import { showSideBar } from "../../../utils/sideBarController";

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
    return (
        <div className='flex flex-col p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-7xl mx-auto'>
            <title>Home Dashboard</title>
            <header className='flex items-center gap-4'>
                <DrawerBtn onClick={showSideBar} />
                <div>
                    <h1 className='text-lg md:text-2xl lg:text-3xl font-bold tracking-tight text-[#101418]'>
                        Welcome back, {admin.name}
                    </h1>
                    <p className='mt-1 text-sm md:text-base text-[#5e758d]'>
                        Here's what's happening with your platform.
                    </p>
                </div>
            </header>
            {/* news */}
            <section className='mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-10'>
                <NewsCard type='payment' count={losingUsers.length} />
                <NewsCard type='users' count={users.length} onClick={() => navigate('/dashboard/users')} />
                <NewsCard type='profiles' count={notUsedProfiles.length} onClick={() => navigate('/dashboard/profiles')} />
                <NewsCard type='accounts' count={accounts.length} onClick={() => navigate('/dashboard/accounts')} />
            </section>
            {/* Quick actions */}
            <section className='mt-8'>
                <h2 className='text-base md:text-lg font-semibold'>Quick Actions</h2>
                <div className='bg-white border border-[#f0f2f5] rounded-2xl mt-3 p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'>
                    <ActionCard text='New Offer' onClick={() => navigate('/dashboard/offers/create')} />
                    <ActionCard text='New User' onClick={() => navigate('/dashboard/users/create')} />
                    <ActionCard text='New Account' onClick={() => navigate('/dashboard/accounts/create')} />
                    <ActionCard text='Update Profile' onClick={() => navigate('/dashboard/profiles/create')} />
                </div>
            </section>
        </div>
    )
}