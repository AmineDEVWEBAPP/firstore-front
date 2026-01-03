export default function NewsCard({ title, desc, icon, color }) {
    return (
        <div
            className={`bg-white border border-[#f0f2f5] rounded-2xl shadow p-6 hover:shadow-xl transition-shadow duration-150 flex justify-between items-center`}>
            <div className='gap-4 flex flex-col'>
                <p className='text-[#5f758d] font-bold text-sm' >{desc}</p>
                <b className='text-3xl'>{title}</b>
            </div>
            <span
                style={{
                    'backgroundColor': `${color}20`,
                    'color': color
                }}
                className={`material-symbols-outlined px-2 py-4 rounded-xl`}>
                {icon}
            </span>
        </div>
    )
}