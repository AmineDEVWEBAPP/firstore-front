import { useState } from "react";
import './style.css'

export default function TextField({ type }) {
    const [isVisible, setState] = useState(false)

    const isEmail = type === 'email';
    const id = `admin-login-${isEmail ? type : 'password'}-input`
    const placeholder = isEmail ? 'user@example.com' : '••••••••';
    const iconName = isEmail ? 'attach_email' : 'vpn_key';
    return (
        <div
            className='relative flex items-center h-10 md:h-12 border border-gray-200 rounded-full focus-within:border-(--primary-col) focus-within:shadow-md hover:shadow-sm transition-shadow duration-150'>
            <span
                className="material-symbols-outlined text-[#9CA3AF] absolute top-1.9 left-2 text-field-icon">
                {iconName}
            </span>
            <input
                className={`px-7 md:px-8 ${isEmail ? 'rounded-full' : 'rounded-l-full'} outline-0 h-full flex items-center justify-center placeholder-gray-400 bg-gray-50 w-full text-sm md:text-base`}
                id={id}
                type={`${!isEmail && isVisible ? 'text' : type}`}
                name={type}
                placeholder={placeholder}
                required
            />
            {!isEmail ? (<PasswordIcon
                onClick={() => setState(!isVisible)}
                iconName={isVisible ? 'visibility' : 'visibility_off'} />) : null}
        </div>
    )
}

function PasswordIcon({ onClick, iconName }) {
    return (
        <div
            className='w-12 md:w-14 bg-gray-50 rounded-r-full h-full flex items-center justify-center'>
            <span
                onClick={onClick}
                className="material-symbols-outlined cursor-pointer rounded-full hover:bg-gray-200 text-[#9CA3AF] text-field-icon">
                {iconName}
            </span>
        </div>
    )
}