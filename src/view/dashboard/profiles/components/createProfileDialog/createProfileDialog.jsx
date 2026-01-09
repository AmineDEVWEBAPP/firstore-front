import { useActionState, useContext, useState } from "react"
import LoadingProcess from "../../../../components/loadingProcess/loadingProcess"
import Dialog from "../../../../components/dialog/dialog"
import { ProfilesContext } from "../../../../../context/profilesContext"
import ProfileServices from "../../../../../services/profile_services"
import { useLoaderData } from "react-router-dom"

export default function CreateProfileDialog({ onCancel, show }) {
    const { accounts } = useLoaderData()
    const { setProfiles } = useContext(ProfilesContext)
    const [message, formAction, isPending] = useActionState(create)
    const [statusDialog, setStatusDialog] = useState(false)

    async function create(_, data) {
        const name = data.get('Profile Name')
        const pinCode = parseInt(data.get('PIN Code'))
        const paymentUrl = data.get('Payment Url')
        const used = data.get('used') === null ? false : data.get('used') === 'on' ? true : false
        const accountId = parseInt(data.get('Assign Account'))
        const payload = { name, pinCode, used, paymentUrl, accountId }
        console.log(payload)
        const res = await ProfileServices.create(payload)
        setStatusDialog(true)
        if (res.status === 'success') {
            const newProfiles = await ProfileServices.getProfiles()
            setProfiles(newProfiles)
            return true
        }
        return false
    }

    return (
        <div
            onClick={onCancel}
            className={`${show ? 'flex' : 'hidden'} w-screen bg-[rgb(0,0,0,0.5)] backdrop-blur-xs h-screen fixed bottom-0 right-0 z-1 items-center justify-center`}>
            <div onClick={(e) => e.stopPropagation()}
                className='bg-[#f0f7ff] rounded-xl w-140'>
                <form action={formAction}
                    className='flex flex-col'>
                    <div className='p-6'>
                        <b className='text-xl'>
                            Edit Profile
                        </b>
                        <p className='text-[#5e758d]'>
                            Update existing credentials and operational status.
                        </p>
                        <TextField label='Profile Name'
                            placeholder='profile name' className='mt-6' />
                        <TextField label='PIN Code' type='number'
                            placeholder='pin code' className='mt-3' />
                        <TextField label='Payment Url' type='url'
                            placeholder='Payment Url' className='mt-3' />
                        <TextField label='Assign Account' options={accounts}
                            className='mt-3' />
                    </div>
                    <hr className='border-[#dfdfdf]' />
                    <div
                        className='bg-[#f8fbff] p-6 items-center justify-end gap-6 flex rounded-b-xl'>
                        <button type='button' onClick={onCancel}
                            className='flex items-center justify-center py-2 rounded-xl font-bold px-5'>
                            Cancel
                        </button>
                        <button disabled={isPending}
                            className={`bg-(--primary-col) text-white flex items-center justify-center py-2 rounded-xl font-bold px-5 min-w-25`}>
                            {isPending ?
                                <LoadingProcess size='24' borderSize={4} />
                                : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
            <Dialog show={statusDialog} icon={message ? 'check' : 'close'}
                iconColor={message ? '#2abc75' : '#dc2727'}
                title={message ? 'success' : 'failed'}
                onCancel={() => setStatusDialog(false)} />
        </div>
    )
}

function TextField({ label, placeholder, options, value, onChange, className, type = 'text' }) {
    if (!options) return (<div
        className={`${className} flex flex-col w-full`}>
        <label for={label}>
            <b>{label}</b>
        </label>
        <input id={label} type={type} name={label} value={value}
            placeholder={placeholder} required onChange={onChange}
            className='border-2 border-[#e4e4e4] bg-white rounded-xl p-3 mt-2 placeholder:text-[#5e758d] focus:border-none' />
    </div>)
    return (<div
        className={`${className} flex flex-col w-full`}>
        <label>
            <b>{label}</b>
        </label>
        <select name={label}
            className='border-2 border-[#e4e4e4] bg-white rounded-xl p-3 mt-2'>
            {options.map(option => <option key={option.id} value={option.id}>
                {option.email}
            </option>)}
        </select>
    </div>)
}
