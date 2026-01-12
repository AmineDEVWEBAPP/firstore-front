import { useActionState, useContext, useState } from "react"
import { useLoaderData } from "react-router-dom"
import LoadingProcess from "../../../components/loadingProcess/loadingProcess"
import Dialog from "../../../components/dialog"
import { AccountsContext } from "../../../../context/accountsContext"
import reqres from "../../../../utils/reqres"

export default function CreateAccountDialog({ show, onCancel }) {
    const { setAccounts } = useContext(AccountsContext)
    const [message, formAction, isPending] = useActionState(create)
    const [statusDialog, setStatusDialog] = useState(false)

    async function create(_, data) {
        const email = data.get('Email Address')
        const password = data.get('Password')
        const offerId = parseInt(data.get('Assign Offer'))
        const res = await reqres('accounts', 'POST', { email, password, offerId })
        setStatusDialog(true)
        if (res['status'] === 'failed') return res['error']
        const newAccounts = await reqres('accounts', 'GET')
        if (newAccounts['status'] === 'failed') return newAccounts['error']
        setAccounts(newAccounts)
        return 'success'
    }

    return (
        <div onClick={onCancel} className={`${show ? 'flex' : 'hidden'} w-screen bg-[rgb(0,0,0,0.5)] backdrop-blur-xs h-screen fixed inset-0 z-10 items-center justify-center p-4`}>
            <div onClick={(e) => e.stopPropagation()} className='bg-[#f0f7ff] rounded-xl w-full max-w-md'>
                <form action={formAction} className='flex flex-col'>
                    <div className='p-4 md:p-6'>
                        <h2 className='text-lg font-bold'>Create Account</h2>
                        <p className='text-sm text-[#5e758d]'>Enter credentials and assign an initial offer.</p>
                        <TextField label='Email Address' type='email' placeholder='account@example.com' className='mt-4' />
                        <TextField label='Password' placeholder='password' className='mt-3' />
                        <TextField label='Assign Offer' className='mt-3' options={[]} />
                    </div>
                    <hr className='border-[#dfdfdf]' />
                    <div className='bg-[#f8fbff] p-4 md:p-6 flex flex-col sm:flex-row items-center sm:justify-end gap-3 sm:gap-6 rounded-b-xl'>
                        <button type='button' onClick={onCancel} className='w-full sm:w-auto flex items-center justify-center py-2 rounded-xl font-bold px-5'>Cancel</button>
                        <button disabled={isPending} className={`bg-(--primary-col) text-white flex items-center justify-center py-2 rounded-xl font-bold px-5 min-w-25 shadow w-full sm:w-auto`}>
                            {isPending ? <LoadingProcess size='24' borderSize={4} /> : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
            <Dialog show={statusDialog} icon={message === 'success' ? 'check' : 'close'}
                iconColor={message === 'success' ? '#2abc75' : '#dc2727'}
                title={message === 'success' ? 'Success' : 'Failed'}
                content={message === 'success' ? null : message}
                onCancel={() => setStatusDialog(false)} />
        </div>
    )
}

function TextField({ label, placeholder, options, className, type = 'text' }) {
    const { offers } = useLoaderData()


    if (!options) return (<div className={`${className} flex flex-col w-full`}>
        <label htmlFor={label}><b>{label}</b></label>
        <input id={label} type={type} name={label} placeholder={placeholder} required
            className='border-2 border-[#e4e4e4] bg-white rounded-xl p-3 mt-2 placeholder:text-[#5e758d] focus:border-none' />
    </div>)
    return (<div className={`${className} flex flex-col w-full`}>
        <label><b>{label}</b></label>
        <select name={label} className='border-2 border-[#e4e4e4] bg-white rounded-xl p-3 mt-2'>
            {offers.map(offer => (<option key={offer.id} value={offer.id}>{offer.name}</option>))}
        </select>
    </div>)
}
