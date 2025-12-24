import { NavLink } from "react-router-dom"

export default function Sidebare() {

    return (
        <div
            className='h-screen w-85 bg-white p-4 relative shadow'>
            {/* top header */}
            <div
                className='flex items-center gap-x-4 mb-13'>
                <div
                    className='bg-blue-200 w-15 h-15 rounded-full flex items-center justify-center'>
                    <span
                        style={{ 'font-size': '40px' }}
                        className="material-symbols-outlined text-(--primary-col)">
                        person
                    </span>
                </div>
                <div>
                    <b
                        className="text-xl">
                        Amine
                    </b>
                    <p
                        className='text-sm text-gray-400'>
                        Supper Admin
                    </p>
                </div>
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
            <LogoutButton/>
        </div>
    )
}

function NavButton({ icon, name, page, className }) {
    return (
        <NavLink
            to={page}
            className={({ isActive }) => `${className} flex items-center w-full p-2 rounded-md gap-x-2 ${isActive ? 'text-(--primary-col) bg-blue-100' : 'text-[#384655] bg-white'}`}>
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