export default function NewsCard({ type, count, onClick }) {
    return (<div
        className={`bg-white border border-[#f0f2f5] rounded-2xl shadow ${getShadowCol(type)} p-6  hover:shadow-xl transition-shadow duration-150`}>
        {/* header */}
        <div
            className='flex justify-between'>
            <span
                className={`material-symbols-outlined ${getBgCol(type)} px-2 py-4 rounded-xl ${getTextCol(type)}`}>
                {getIcon(type)}
            </span>
            <button
                onClick={onClick}
                className={`${getBgCol(type)} flex items-center px-3 h-6 rounded-2xl ${getTextCol(type)} text-sm`}>
                {getButtonText(type)}
            </button>
        </div>
        {/* body */}
        <div
            className='flex justify-between items-center mt-3'>
            <p
                className='text-gray-500 text-sm'>
                {getText(type)}
            </p>
            <b
                className='text-3xl'>
                {count}
            </b>
        </div>
    </div>)
}

function getText(type) {
    switch (type) {
        case 'payment': return 'Didn\'t pay'
        case 'users': return 'Total Users'
        case 'profiles': return 'Not used profiles'
        case 'accounts': return 'Total Accounts'
    }
}

function getIcon(type) {
    switch (type) {
        case 'payment': return 'person_alert'
        case 'users': return 'group'
        case 'profiles': return 'account_circle'
        case 'accounts': return 'settings_account_box'
    }
}

function getTextCol(type) {
    switch (type) {
        case 'payment': return 'text-(--secondary-col)'
        case 'users': return 'text-(--primary-col)'
        case 'profiles': return 'text-violet-500'
        case 'accounts': return 'text-green-500'
    }
}

function getBgCol(type) {
    switch (type) {
        case 'payment': return 'bg-orange-100'
        case 'users': return 'bg-blue-100'
        case 'profiles': return 'bg-violet-100'
        case 'accounts': return 'bg-green-100'
    }
}

function getShadowCol(type){
        switch (type) {
        case 'payment': return 'shadow-orange-100'
        case 'users': return 'shadow-blue-100'
        case 'profiles': return 'shadow-violet-100'
        case 'accounts': return 'shadow-green-100'
    }
}

function getButtonText(type) {
    switch (type) {
        case 'payment': return 'Send emails'
        case 'users': return 'view'
        case 'profiles': return 'view'
        case 'accounts': return 'view'
    }
}