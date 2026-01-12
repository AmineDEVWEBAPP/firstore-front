import { useActionState, useContext, useState } from "react"
import LoadingProcess from "../../../components/loadingProcess/loadingProcess"
import Dialog from "../../../components/dialog"
import SwitchInput from '../../../components/switchInput/switchInput'
import { ProfilesContext } from "../../../../context/profilesContext"
import reqres from "../../../../utils/reqres"

export default function EditProfileDialog({ onCancel, id }) {
    const { profiles, setProfiles } = useContext(ProfilesContext)
    let [targetProfile, setTargetProfile] = useState(profiles.filter(profile => profile.id === id)[0])
    const [message, formAction, isPending] = useActionState(update)
    const [statusDialog, setStatusDialog] = useState(false)

    async function update(_, data) {
        const name = data.get('Profile Name')
        const pinCode = data.get('PIN Code')
        const paymentUrl = data.get('Payment Url')
        const used = data.get('used') === null ? false : data.get('used') === 'on' ? true : false
        const payload = { name, pinCode, used, paymentUrl }
        const res = await reqres('profiles/' + id, 'PATCH', payload)
        setStatusDialog(true)
        if (res['status'] === 'failed') return res['error']
        const newProfiles = await reqres('profiles', 'GET')
        setProfiles(newProfiles)
        return 'success'
    }

    return (
        <div onClick={onCancel} className='flex w-screen bg-[rgb(0,0,0,0.5)] backdrop-blur-xs h-screen fixed inset-0 z-10 items-center justify-center p-4'>
            <div onClick={(e) => e.stopPropagation()} className='bg-[#f0f7ff] rounded-xl w-full max-w-md'>
                <form action={formAction} className='flex flex-col'>
                    <div className='p-4 md:p-6'>
                        <h2 className='text-lg font-bold'>Edit Profile</h2>
                        <p className='text-sm text-[#5e758d]'>Update existing credentials and operational status.</p>
                        <TextField label='Profile Name' value={targetProfile.name} onChange={(e) => setTargetProfile(prev => ({ ...prev, 'name': e.target.value }))} placeholder='profile name' className='mt-4' />
                        <TextField label='PIN Code' type='number' value={targetProfile.pin_code} onChange={(e) => setTargetProfile(prev => ({ ...prev, 'pin_code': e.target.value }))} placeholder='pin code' className='mt-3' />
                        <TextField label='Payment Url' value={targetProfile.payment_url} type='url' onChange={(e) => setTargetProfile(prev => ({ ...prev, 'payment_url': e.target.value }))} placeholder='Payment Url' className='mt-3' />
                        <SwitchField checked={targetProfile.used === 1 || targetProfile.used} name='used' onChange={(e) => setTargetProfile(prev => ({ ...prev, 'used': e.target.checked }))} />
                    </div>
                    <hr className='border-[#dfdfdf]' />
                    <div className='bg-[#f8fbff] p-4 md:p-6 flex flex-col sm:flex-row items-center sm:justify-end gap-3 sm:gap-6 rounded-b-xl'>
                        <button type='button' onClick={onCancel} className='w-full sm:w-auto flex items-center justify-center py-2 rounded-xl font-bold px-5'>Cancel</button>
                        <button disabled={isPending} className={`bg-(--primary-col) text-white flex items-center justify-center py-2 rounded-xl font-bold px-5 min-w-25 shadow w-full sm:w-auto`}>{isPending ? <LoadingProcess size='24' borderSize={4} /> : 'Save'}</button>
                    </div>
                </form>
            </div>
            <Dialog show={statusDialog} icon={message === 'success' ? 'check' : 'close'} iconColor={message === 'success' ? '#2abc75' : '#dc2727'} title={message === 'success' ? 'Success' : 'Failed'} content={message === 'success' ? null : message} onCancel={() => setStatusDialog(false)} />
        </div>
    )
}

function TextField({ label, placeholder, options, value, onChange, className, type = 'text' }) {
    if (!options) return (<div className={`${className} flex flex-col w-full`}>
        <label htmlFor={label}><b>{label}</b></label>
        <input id={label} type={type} name={label} value={value}
            placeholder={placeholder} required onChange={onChange}
            className='border-2 border-[#e4e4e4] bg-white rounded-xl p-3 mt-2 placeholder:text-[#5e758d] focus:border-none' />
    </div>)
    return (<div className={`${className} flex flex-col w-full`}>
        <label><b>{label}</b></label>
        <select name={label} select={'mn'} onChange={onChange} defaultValue={value} className='border-2 border-[#e4e4e4] bg-white rounded-xl p-3 mt-2'>
            {options.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
        </select>
    </div>)
}

function SwitchField({ checked, onChange, name }) {
    return (
        <div
            className='p-3 bg-white flex border-2 border-[#e4e4e4] rounded-xl items-center justify-between mt-6'>
            <div>
                Currently in use
                <p className='text-xs text-[#5e758d]'>
                    make if this profile used.
                </p>
            </div>
            <SwitchInput name={name} checked={checked} onChange={onChange} />
        </div>
    )
}