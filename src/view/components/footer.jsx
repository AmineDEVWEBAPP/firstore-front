import Icon from "../../assets/favicon.svg"
import { WhatsappIcon } from "../../core/config/constants"

export default function Footer() {
    return (
        <div
            className='bg-white border-t-2 border-[#dfe5ee] flex flex-col sm:flex-row justify-between py-10 px-5 md:px-10 lg:px-50 xl:px-90 text-[#60748c]'>
            <div>
                <div
                    className='flex gap-1 md:gap-2 items-center md:text-xl text-black'>
                    <img src={Icon} alt="Logo"
                        className="h-4 md:h-6" />
                    <b>Firstore</b>
                </div>
                <p
                    className='mt-5 mb-2 text-sm'>
                    © 2026–{new Date().getFullYear()} Firstore. All rights reserved.
                </p>
                <p className='text-sm'>Developed by <u>Amine khadir</u></p>
            </div>
            <hr className='my-10 text-[#b7b9bd]' />
            <div className='flex flex-col'>
                <b className='md:text-xl mb-3 text-black'>Contact Us</b>
                <Info icon='mail'>mohammedaminekhadir6@gmail.com</Info>
                <Info icon='call'>+212 675512400</Info>
                <div
                    className='flex items-center gap-1 md:gap-2 mt-2 text-sm'>
                    <WhatsappIcon size='20' />
                    +212 675512400
                </div>
            </div>
        </div>
    )
}

function Info({ icon, children }) {
    return <div
        className='flex items-center gap-1 md:gap-2 mt-2 text-sm'>
        <span
            style={{
                'fontSize': '20px'
            }}
            className="material-symbols-outlined text-(--primary-col)">
            {icon}
        </span>
        {children}
    </div>
}

//  © 

