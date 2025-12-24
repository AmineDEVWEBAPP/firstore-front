import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import ActionCard from "./components/actionCard/actionCard";
import NewsCard from "./components/newsCard/newsCard";

export default function DashboardHome() {
    const navigate = useNavigate()
    const { losingUsers, users, notUsedProfiles, accounts } = useLoaderData()
    const { admin } = useOutletContext()
    return (<div
        className='flex flex-col'>
        <header>
            <b
                className='text-2xl'>
                Welcome back, {admin.name}
            </b>
            <p
                className='text-gray-500'>
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
                className='bg-white rounded-2xl mt-3 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                <ActionCard text='New Offer' onClick={() => navigate('/dashboard/offers/create')} />
                <ActionCard text='New User' onClick={() => navigate('/dashboard/users/create')} />
                <ActionCard text='New Account' onClick={() => navigate('/dashboard/accounts/create')} />
                <ActionCard text='Update Profile' onClick={() => navigate('/dashboard/profiles/edit')} />
            </div>
        </section>
    </div>)
}