import { useActionState, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import LoadingProcess from '../../../components/loadingProcess/loadingProcess'
import OfferServices from "../../../../core/services/offer_services"
import UserServices from "../../../../core/services/user_services"
import Dialog from "../../../components/dialog/dialog"

export default function UserForm() {
    const offers = useLoaderData()['offers']
    const [selectedOffer, setSelectedOffer] = useState(offers[0]['id'])
    const [profiles, setProfiles] = useState([])
    const [isUpdating, setIsUpdating] = useState()
    const [message, formAction, isPending] = useActionState(createUser)

    useEffect(function () {
        let mounted = true
        async function fetchProfiles() {
            if (!mounted) return
            setIsUpdating(true)
            const res = await OfferServices.getProfiles(selectedOffer, { available: true })
            setIsUpdating(false)
            if (res['status'] === 'failed') return setProfiles([])
            setProfiles(res)
        }
        fetchProfiles()
        return () => { mounted = false }
    }, [selectedOffer])

    async function createUser(_, data) {
        const profileId = parseInt(data.get('profile'))
        const email = data.get('User Email Address')
        const phone = data.get('Phone Number')
        const offerId = parseInt(selectedOffer)

        const payload = {
            profileId,
            phone,
            offerId,
            'type': 'whatsapp'
        }
        email.length === 0 ? null : payload['email'] = email
        const res = await UserServices.create(payload)
        if (res['status'] === 'success') return 'success'
        return res['error']
    }

    return (
        <form action={formAction}
            className='w-full bg-white shadow rounded-xl border border-[#f0f2f5] flex flex-col'>
            <div
                className='p-6'>
                <div
                    className='flex gap-2 font-bold text-xl'>
                    <span
                        style={{
                            'fontSize': '33px'
                        }}
                        className="material-symbols-outlined text-(--primary-col)">
                        person
                    </span>
                    Personal Information
                </div>
                <div
                    className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-3'>
                    <TextField label='User Email Address' placeholder='user@example.com' type='email' required={false} />
                    <TextField label='Phone Number' placeholder='+212 (6) 000-000' type='tel' pattern="^^\+[1-9][0-9]{7,14}$" />
                </div>
                <hr className='my-5 border-[#ececec]' />
                <div
                    className='flex text-xl items-center gap-2'>
                    <span
                        style={{
                            'fontSize': '33px'
                        }}
                        className="material-symbols-outlined text-(--primary-col)">
                        sell
                    </span>
                    <b>
                        Offer & Profile Assignment
                    </b>
                </div>
                <TextField label='Assigned Offer' options={offers} className='mt-3' onChange={(e) => setSelectedOffer(e.target.value)} />
                <div
                    className='mt-3 bg-[#f8fafc] border-2 border-[#e3e8f0] rounded-xl p-4'>
                    <div
                        className='flex items-center justify-between'>
                        <div className='flex items-center gap-5'>
                            <b
                                className='text-[19px]'
                            >Profiles linked to this Selected Offer</b>
                            {isUpdating ? <UpdatingProcess /> : null}
                        </div>
                        <p className='text-[#808ea0]'>
                            Select one profile
                        </p>
                    </div>
                    <ul className='mt-3 max-h-65 overflow-scroll'>
                        {profiles.map(profile => (
                            <li key={profile.id}
                                className='border-2 border-[#e3e8f0] p-3 rounded-md flex items-center gap-3 bg-white mb-2'>
                                <input type='radio' name='profile' value={profile.id} id={profile.id} required
                                    className='size-5' />
                                <label htmlFor={profile.id} className='w-full'>
                                    <b>{profile.name}</b>
                                    <br />
                                    <a href={profile.payment_url}
                                        className='text-[#64748b] hover:text-(--primary-col) hover:underline'>
                                        {profile.payment_url}
                                    </a>
                                </label >
                            </li>))}
                    </ul>
                </div>
            </div>
            <div
                className='border-t border-[#e6e3e3] flex items-center justify-end bg-[#f9fafb] h-20 gap-10 px-6'>
                <button type='button' onClick={() => history.back()}
                    className='bg-white border border-[#e4e4e4] shadow rounded-md py-2 px-4 font-bold'>
                    Cancel
                </button>
                <button disabled={isPending || isUpdating}
                    className='bg-(--primary-col) shadow rounded-md py-2 px-4 text-white flex font-bold gap-1 text-nowrap'>
                    {isPending ? <LoadingProcess size='21' borderSize='4' className='mx-10 my-0.5' /> :
                        (<><span className="material-symbols-outlined">
                            save
                        </span>
                            <p>Save User</p></>)}
                </button>
            </div>
            {message === undefined ? null : <Dialog icon={message === 'success' ? 'check' : 'close'}
                confirmText='back' confirmColor='bg-(--primary-col)'
                iconColor={message === 'success' ? '#2abc75' : '#dc2727'}
                title={message === 'success' ? 'success' : 'failed'}
                content={message === 'success' ? null : message}
                onCancel={() => history.back()}
                onConfirm={() => history.back()}
            />}
        </form>
    )
}


function TextField({ label, placeholder, options, className, value, type = 'text', onChange, required = true, pattern }) {
    return (
        <div
            className={`${className} flex flex-col w-full`}>
            <label>
                <b>{label}</b>
            </label>
            {options ? <select name={label} onChange={onChange} value={value} defaultValue={value} required={required} id={label}
                className='border-2 border-[#e4e4e4] rounded-xl p-3 mt-2'>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>)
                )}
            </select> :
                <input id={label} type={type} name={label} placeholder={placeholder} value={value} onChange={onChange} required={required} pattern={pattern}
                    className='border-2 border-[#e4e4e4] rounded-xl p-3 mt-2 placeholder:text-[#5e758d] focus:border-none' />}
        </div>
    )
}

function UpdatingProcess() {
    return (
        <div
            className='text-md border-2 border-[#c3dffe] rounded-full flex items-center gap-2 text-(--primary-col) font-bold px-3'>
            <LoadingProcess size='17' borderSize={3} />
            Updating...
        </div>
    )
}