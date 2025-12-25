export default function ActionCard({ text, onClick }) {
    return (
        <div
            className='border border-gray-500 border-dashed rounded-2xl h-40 flex flex-col gap-y-3 items-center justify-center'>
            <button
                onClick={onClick}>
                <span
                    style={{
                        'fontSize': '40px'
                    }}
                    className={`material-symbols-outlined ${getBgCol(text)} rounded-full p-3 ${getTextCol(text)}`}>
                    add_circle
                </span>
            </button>
            {text}
        </div>
    )
}

function getTextCol(type) {
    switch (type) {
        case 'New Offer': return 'text-(--primary-col)'
        case 'New User': return 'text-(--secondary-col)'
        case 'New Account': return 'text-violet-500'
        case 'Update Profile': return 'text-(--primary-col)'
    }
}

function getBgCol(type) {
    switch (type) {
        case 'New Offer': return 'bg-blue-100'
        case 'New User': return 'bg-orange-100'
        case 'New Account': return 'bg-violet-100'
        case 'Update Profile': return 'bg-blue-100'
    }
}