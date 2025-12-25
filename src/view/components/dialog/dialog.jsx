export default function Dialog({ icon, iconColor, title, content, cancelText, confirmText, confirmColor, onCancel, onConfirm }) {
    return (
        <div
            onClick={onCancel}
            className='w-screen bg-[rgb(0,0,0,0.5)] backdrop-blur-xs h-screen fixed bottom-0 right-0 z-1 flex items-center justify-center'>
            <div
                onClick={(e) => e.stopPropagation()}
                className='p-6 max-w-100 bg-[#f0f7ff] rounded-xl flex flex-col items-center'>
                <span
                    className={`material-symbols-outlined p-4 rounded-full`}
                    style={{
                        'fontSize': '30px',
                        'color': iconColor,
                        'backgroundColor': `${iconColor}30`
                    }}>
                    {icon}
                </span>
                {title ? <b className='mt-3'>
                    {title}
                </b> : null}
                {content ? <p className='text-[#5d758d] text-center mt-3'>
                    {content}
                </p> : null}
                {cancelText || confirmText ? <div
                    className='justify-between w-full grid grid-cols-2 gap-5 mt-7'>
                    {cancelText ? <button
                        onClick={onCancel}
                        className='border-2 border-(--primary-col) bg-white text-(--primary-col) flex items-center justify-center py-2 rounded-xl font-bold'>
                        {cancelText}
                    </button> : null}
                    {confirmText ? <button
                        onClick={onConfirm}
                        className={`${confirmColor} text-white flex items-center justify-center py-2 rounded-xl font-bold`}>
                        {confirmText}
                    </button> : null}
                </div> : null}
            </div>
        </div>
    )
}