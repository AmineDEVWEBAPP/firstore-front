import { useActionState, useContext, useState } from 'react'
import './style.css'
import LoadingProcess from '../../../components/loadingProcess/loadingProcess'
import CheckoutServices from '../../../../core/services/checkout_services'
import { HomeContext } from '../../../../context/homeContext'
import Dialog from '../../../components/dialog/dialog'

export default function ConfermForm() {
    const dialingCodes = ['+212']
    const { selectedOffer } = useContext(HomeContext)
    const [message, formAction, isPending] = useActionState(action)
    const [dialog, setDialog] = useState(false)

    async function action(_, data) {
        const dialingCode = data.get('dialingCode')
        const phone = dialingCode + data.get('phoneNumber')
        const payload = { 'offerId': selectedOffer['id'], phone }
        const res = await CheckoutServices.start(payload)
        if (res['status'] === 'failed') {
            setDialog(true)
            return res['error']
        }
        window.location.href = res['url']
    }

    return (
        <form action={formAction}
            className='flex flex-col sm:flex-row items-center mt-14 w-full max-w-140 lg:max-w-160 gap-3'>
            <div
                className='relative w-full'>
                <label for='phoneNumber'
                    className='absolute -top-7'>
                    <b>Enter phone number</b>
                </label>
                <select
                    className='w-15 left-2 h-10 top-1.5 absolute outline-none' required name='dialingCode'>
                    {dialingCodes.map(t => <option key={t}>{t}</option>)}
                </select>
                <input type='tel' placeholder="000-0000" required id='phoneNumber' name='phoneNumber' pattern='^[1-9][0-9]{8,14}$'
                    className='bg-white border-2 border-[#e4e4e4] rounded-md p-3 pl-20 placeholder:text-[#5e758d] w-full focus:outline-(--primary-col)' />
            </div>
            <button type='submit' disabled={isPending}
                className='bg-(--primary-col) shadow rounded-md text-white flex items-center justify-center gap-1 px-7 text-nowrap font-bold text-xl max-w-45 min-h-12 relative overflow-hidden'>
                {isPending ? <LoadingProcess size='30' borderSize='5' />
                    : 'Get Started'}
                <span
                    style={{
                        'display': isPending ? 'none' : ''
                    }}
                    className={`material-symbols-outlined`}>
                    arrow_forward_ios
                </span>
                <span className={`absolute bring h-100 w-7 rotate-30 bg-[rgb(255,255,255,0.4)] shadow-xl shadow-white ${isPending ? 'hidden' : ''}`} />
            </button>
            <Dialog show={dialog} onCancel={() => setDialog(false)}
                icon='close' iconColor='#db2525' title='Failed' content={message} />
        </form>
    )
}