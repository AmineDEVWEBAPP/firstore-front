export default function NewsCard({ title, desc, icon, color }) {
    return (
        <div
            className={`bg-white border border-[#f0f2f5] rounded-2xl shadow p-4 sm:p-6 hover:shadow-xl transition-shadow duration-150 flex justify-between items-center`}>
            <div className='gap-3 flex flex-col'>
                <p className='text-[#5f758d] font-bold text-sm sm:text-sm'>{desc}</p>
                <p className='text-2xl sm:text-3xl font-semibold'>{title}</p>
            </div>
            <span
                style={{
                    'backgroundColor': `${color}20`,
                    'color': color
                }}
                className={`material-symbols-outlined text-2xl sm:text-3xl px-2 py-3 rounded-xl`}>
                {icon}
            </span>
        </div>
    )
}