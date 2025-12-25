export default function SearchInput() {
    return (
        <div
            className='relative'>
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa8bc]" style={{ "font-size": "20px" }}>search</span>
            <input
                className='h-9 border border-[#dae0e7] rounded-lg text-sm text-[#101418] placeholder-[#9aa8bc] focus:border-primary focus:ring-1 focus:ring-primary py-1 pl-9 '
                type='search' placeholder="Search in table..." />
        </div>
    )
}