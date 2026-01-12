import { useEffect, useRef } from "react";

export default function ActionDialog({ onEdit, onEmail, onDelete, hidden }) {
    const ref = useRef(null)

    function hiddenActionDialog() {
        if (!ref.current.classList.contains('hidden')) ref.current.classList.add('hidden')
    }

    useEffect(function () {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) hiddenActionDialog()
        }
        window.addEventListener("mousedown", handleClickOutside);
        return () => window.removeEventListener("mousedown", handleClickOutside)
    })

    return (
        <div id='actionDialog' ref={ref}
            className='fixed rounded-xl border-2 border-[#dae0e7] py-3 bg-white top-0 left-0 hidden z-1 min-w-40 sm:min-w-55'>
            <Action icon='edit' text='Edit User' onClick={onEdit} hidden={hidden()?.includes('edit')} />
            <hr className='border-none my-2' />
            <Action icon='forward_to_inbox' text='Email Notice' onClick={onEmail} hidden={hidden()?.includes('email')} />
            <hr className='border-[#dae0e7] my-2' />
            <Action icon='delete' text='Delete User' onClick={onDelete} hidden={hidden()?.includes('delete')} />
        </div>
    )
}

function Action({ icon, text, onClick, hidden }) {
    return (
        <button
            onClick={onClick}
            className={`flex text-nowrap w-full px-5 items-center gap-x-2 ${icon === 'delete' ? 'text-red-500' : ''} ${hidden ? 'hidden' : ''} bg-white`}>
            <span className={`material-symbols-outlined ${icon === 'delete' ? 'text-red-500' : 'text-[#5e758d]'}`}>
                {icon}
            </span>
            {text}
        </button>
    )
}

