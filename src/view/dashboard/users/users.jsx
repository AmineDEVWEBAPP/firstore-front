import NewsCard from "./components/newsCard";
import UsersTable from "./components/usersTable";
import { UsersContext, UsersProvider } from "../../../context/usersContext";
import { useContext } from "react";
import { redirect, useNavigate } from "react-router-dom";
import reqres from "../../../utils/reqres";
import { showSideBar } from "../../../utils/sideBarController";
import DrawerBtn from "../../components/drawerBtn";

// eslint-disable-next-line react-refresh/only-export-components
export async function initUsers() {
    const [users, news] = await Promise.all([reqres('users', 'GET'), reqres('users/news', 'GET')])
    const reqError = users['status'] === 'failed' || news['status'] === 'failed'
    if (reqError) throw redirect('/notfound')
    return { users, news }
}

export default function Users() {
    const navigate = useNavigate()

    return (<UsersProvider>
        <title>Manage users</title>
        <div className='px-4 sm:px-6 md:px-10 pt-6 sm:pt-10 bg-[#f8fbff] pb-6 sm:pb-7 border-b-2 border-[#e4e4e4]'>
            <header className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
                <div className='flex items-center gap-4'>
                    <DrawerBtn onClick={showSideBar} />
                    <div>
                        <h1 className='text-xl sm:text-2xl md:text-3xl tracking-tight text-[#101418] font-bold'>
                            Users Management
                        </h1>
                        <p className='mt-1 text-xs sm:text-sm text-[#5e758d] flex gap-x-1'>
                            Manage registered users, assign accounts<p className='hidden md:block'>, and track subscriptions.</p>
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('create')}
                    className='text-white bg-(--primary-col) font-bold flex items-center justify-center rounded-lg h-10 px-3 sm:px-4 gap-2 shadow max-w-40'>
                    <span className="material-symbols-outlined text-lg">
                        add
                    </span>
                    <span>Create New</span>
                </button>
            </header>
            <NewsSection />
        </div>
        <div className='px-4 sm:px-6 md:px-10 py-6 sm:pt-7'>
            <section className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6'>
                <TypeFilter selected='all' />
                <div className='flex-1'>
                    <SearchInput />
                </div>
                <button
                    className='text-[#5e758d] flex items-center whitespace-nowrap gap-2 font-bold text-[15px]'>
                    <span className="material-symbols-outlined">
                        filter_list
                    </span>
                    More Filters
                </button>
            </section>
            <div className='mt-6 bg-white shadow border-[#f0f2f5] border rounded-lg overflow-hidden'>
                <div className='w-full overflow-x-auto'>
                    <UsersTable />
                </div>
            </div>
        </div>
    </UsersProvider>)
}

function NewsSection() {
    const { news } = useContext(UsersContext)

    return <section
        className='mt-5 lg:mt-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-10'>
        <NewsCard title={news.count} desc='TOTAL USERS' icon='group' color='#047dff' />
        <NewsCard title={news.need_payment} desc='NEED PAYMENT' icon='payments' color='#ff6f03' />
        <NewsCard title={news.whatsapp_count} desc='WHATSAPP USERS' icon='chat' color='#15a349' />
        <NewsCard title={news.card_count} desc='CARD USERS' icon='credit_card' color='#9334ea' />
    </section>
}

function TypeFilter({ selected }) {
    return (
        <div
            className='border-2 border-[#e4e4e4] bg-white rounded-xl text-nowrap p-1 font-bold text-[15px] gap-1 flex [&>button]:rounded-md [&>button]:px-4 [&>button]:py-2'>
            <button
                className={selected === 'all' ? 'bg-blue-100 text-blue-500' : 'text-[#5e758d] bg-white'}>
                All Users
            </button>
            <button
                className={selected === 'whatsapp' ? 'bg-blue-100 text-blue-500' : 'text-[#5e758d] bg-white'}>
                WhatsApp Type
            </button>
            <button
                className={selected === 'card' ? 'bg-blue-100 text-blue-500' : 'text-[#5e758d] bg-white'}>
                Card Type
            </button>
        </div>
    )
}

function SearchInput() {
    return (
        <div
            className='flex relative w-full items-center'>
            <span
                style={{
                    'fontSize': '26px'
                }}
                className="material-symbols-outlined absolute text-[#5e758d] pl-2">
                search
            </span>
            <input type='text' placeholder="Search by email, phone, or account..."
                className='bg-white shadow rounded-xl placeholder-[#5e758d] w-full p-2.5 pl-10' />
        </div>
    )
}