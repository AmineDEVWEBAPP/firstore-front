export default function NewsCard({ name, content }) {
    return (
        <div className={`bg-white border border-[#f0f2f5] rounded-2xl p-4 md:p-6 shadow ${getShadowCol(name)} hover:shadow-xl transition-shadow duration-150`}>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='text-2xl md:text-3xl font-semibold'>
                        {content}
                    </p>
                    <p className='text-sm md:text-base text-[#5e758d] mt-1'>
                        {name}
                    </p>
                </div>
                <span className={`material-symbols-outlined ${getBgCol(name)} p-2 md:p-3 rounded-xl ${getTextCol(name)} text-lg md:text-2xl`}>
                    {getIcon(name)}
                </span>
            </div>
        </div>
    )
}

function getIcon(name) {
    switch (name) {
        case 'Offers In Stock': return 'inventory_2'
        case 'Offers with Spatial Audio': return 'spatial_audio_off'
        case 'Offers with 4k Resolution': return '4k'
        case 'Best Seller': return 'crown'
    }
}

function getTextCol(name) {
    switch (name) {
        case 'Offers In Stock': return 'text-green-500'
        case 'Offers with Spatial Audio': return 'text-(--primary-col)'
        case 'Offers with 4k Resolution': return 'text-(--secondary-col)'
        case 'Best Seller': return 'text-violet-500'
    }
}

function getBgCol(name) {
    switch (name) {
        case 'Offers In Stock': return 'bg-green-100'
        case 'Offers with Spatial Audio': return 'bg-blue-100'
        case 'Offers with 4k Resolution': return 'bg-orange-100'
        case 'Best Seller': return 'bg-violet-100'
    }
}

function getShadowCol(name) {
    switch (name) {
        case 'Offers In Stock': return 'shadow-green-100'
        case 'Offers with Spatial Audio': return 'shadow-blue-100'
        case 'Offers with 4k Resolution': return 'shadow-orange-100'
        case 'Best Seller': return 'shadow-violet-100'
    }
}