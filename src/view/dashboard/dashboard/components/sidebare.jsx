import { NavLink, useLoaderData } from "react-router-dom"
import Logo from '../../../components/logo'
import { hiddenSideBar, showSideBar } from "../../../../utils/sideBarController"
import DrawerBtn from "../../../components/drawerBtn"
import { useEffect } from "react"

export default function Sidebare() {
    const { admin } = useLoaderData()


    useEffect(function () {
        const mediaQuery = window.matchMedia('(min-width: 1024px)');

        const handleChange = (e) => {
            if (e.matches) {
                showSideBar();
            } else {
                hiddenSideBar();
            }
        }

        handleChange(mediaQuery);

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.addEventListener('change', handleChange)

    }, [])


    return (
        <div id='side-bar-container'
            className='hidden lg:flex fixed z-2 lg:static w-screen h-screen lg:w-60 *:transition-all *:duration-300'>
            <div id='side-bar'
                className='h-screen w-0 lg:w-60 bg-white lg:p-4 relative shadow-xl overflow-hidden'>
                {/* top header */}
                <div
                    className='mb-7 lg:mb-13 flex flex-col items-center'>
                    <div
                        className='flex w-full items-center gap-x-2'>
                        <DrawerBtn onClick={hiddenSideBar} />
                        <Logo />
                    </div>
                    <p
                        className='text-[10.5px] text-gray-400 mt-3 ml-4'>
                        {admin.email}
                    </p>
                </div>
                {/* buttons */}
                <div
                    className='gap-y-3 flex flex-col'>
                    <NavButton icon='dashboard' name='Dashboard' page='home' />
                    <p
                        className='text-[#5f768d] text-sm ml-2 my-2 mt-4'
                    >MANAGEMENT</p>
                    <NavButton icon='sell' name='Offers' page='offers' />
                    <NavButton icon='account_balance' name='Accounts' page='accounts' />
                    <NavButton icon='account_circle' name='Profiles' page='profiles' />
                    <NavButton icon='group' name='Users' page='users' />
                </div>
                {/* logout button */}
                <LogoutButton />
            </div>
            <span id='side-bar-bg' onClick={hiddenSideBar}
                className='w-full h-full bg-[rgb(0,0,0,0.5)] backdrop-blur-xs lg:hidden' />
        </div>
    )
}

function NavButton({ icon, name, page, className }) {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    return (
        <NavLink
            to={page} onClick={function () {
                if (!mediaQuery['matches']) hiddenSideBar()
            }}
            className={({ isActive }) => `${className} flex items-center w-full p-2 rounded-md gap-x-2 ${isActive ? 'text-(--primary-col) bg-blue-100' : 'text-[#384655] bg-white hover:bg-blue-50'} min-w-40`}>
            <span className="material-symbols-outlined">
                {icon}
            </span>
            {name}
        </NavLink>
    )
}

function LogoutButton({ onClick }) {
    return (<button
        onClick={onClick}
        className='flex gap-x-2 text-[#5f768d] absolute bottom-4'>
        <span className="material-symbols-outlined">
            logout
        </span>
        Logout
    </button>)
}