export default function DrawerBtn({ onClick }) {
    return <button onClick={onClick}
        className='flex rounded lg:hidden'>
        <span className="material-symbols-outlined text-[#384655]">
            menu
        </span>
    </button>
}