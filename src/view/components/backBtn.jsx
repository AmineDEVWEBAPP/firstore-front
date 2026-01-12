export default function BackBtn() {
    return <button onClick={() => history.back()}
        className='flex rounded lg:hidden'>
        <span className="material-symbols-outlined text-[#384655]">
            arrow_back
        </span>
    </button>

}