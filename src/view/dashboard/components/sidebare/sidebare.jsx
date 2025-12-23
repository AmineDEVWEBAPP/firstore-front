import { useState } from "react"

export default function Sidebare() {
    const [selected, setSelected] = useState('Dashboard')
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
                        class="material-symbols-outlined text-(--primary-col)">
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
                <SelectButton
                    icon='dashboard' name='Dashboard'
                    selected={selected === 'Dashboard'}
                    onClick={() => setSelected('Dashboard')} />
                <SelectButton icon='sell' name='Offers'
                    selected={selected === 'Offers'}
                    onClick={() => setSelected('Offers')} />
                <SelectButton icon='account_balance' name='Accounts'
                    selected={selected === 'Accounts'}
                    onClick={() => setSelected('Accounts')} />
                <SelectButton icon='account_circle' name='Profiles'
                    selected={selected === 'Profiles'}
                    onClick={() => setSelected('Profiles')} />
                <SelectButton icon='group' name='Users'
                    selected={selected === 'Users'}
                    onClick={() => setSelected('Users')} />
            </div>
            {/* logout  */}
            <SelectButton icon='logout' name='Logout' className={'absolute bottom-4 w-30!'} />
        </div>
    )
}

function SelectButton({ icon, name, selected, className, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`${className} flex items-center w-full p-2 rounded-md gap-x-2 ${selected ? 'text-(--primary-col) bg-blue-100' : 'text-[#5f768d] bg-white'}`}>
            <span class="material-symbols-outlined">
                {icon}
            </span>
            {name}
        </button>
    )
}