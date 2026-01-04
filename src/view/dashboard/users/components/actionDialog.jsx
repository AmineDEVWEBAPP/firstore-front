import { useEffect, useRef } from "react";

export default function ActionDialog({ onEdit, onEmail, onDelete }) {
    const ref = useRef(null)

    function hiddenActionDialog() {
        if (!ref.current.classList.contains('hidden')) ref.current.classList.add('hidden')
    }

    useEffect(function () {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) hiddenActionDialog()
        }

        window.addEventListener("mousedown", handleClickOutside);
        return document.removeEventListener("mousedown", handleClickOutside)
    })

    return (
        <div id='actionDialog' ref={ref}
            className='fixed rounded-xl border-2 border-[#dae0e7] py-3 bg-white top-0 -left-30 hidden'>
            <Action icon='edit' text='Edit User' onClick={onEdit} />
            <hr className='border-none my-2' />
            <Action icon='forward_to_inbox' text='Send Email' onClick={onEmail} />
            <hr className='border-[#dae0e7] my-2' />
            <Action icon='delete' text='Delete User' onClick={onDelete} />
        </div>
    )
}

function Action({ icon, text, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex text-nowrap w-full px-5 items-center gap-x-2 ${icon === 'delete' ? 'text-red-500' : ''} bg-white`}>
            <span className={`material-symbols-outlined ${icon === 'delete' ? 'text-red-500' : 'text-[#5e758d]'}`}>
                {icon}
            </span>
            {text}
        </button>
    )
}

