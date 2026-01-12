import { useActionState, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import LoadingProcess from '../../../components/loadingProcess/loadingProcess'
import Dialog from "../../../components/dialog"
import reqres from "../../../../utils/reqres"

export default function UserForm({ initUser }) {
    const [user, setUser] = useState(initUser)
    const offers = useLoaderData()['offers']
    const [selectedOffer, setSelectedOffer] = useState(initUser ? initUser.offer_id : offers[0]['id'])
    const [profiles, setProfiles] = useState([])
    const [isUpdating, setIsUpdating] = useState()
    const [message, formAction, isPending] = useActionState(createUser)


    useEffect(function () {
        let mounted = true
        async function fetchProfiles() {
            if (!mounted) return
            setIsUpdating(true)
            const res = await reqres(`offers/${selectedOffer}/profiles/?available=${initUser ? false : true}`, 'GET')
            setIsUpdating(false)
            if (res['status'] === 'failed') return setProfiles([])
            setProfiles(res)
        }
        fetchProfiles()
        return () => { mounted = false }
    }, [initUser, selectedOffer])


    async function createUser(_, data) {
        const profileId = parseInt(data.get('profile'))
        const email = data.get('User Email Address')
        const phone = data.get('Phone Number')
        const offerId = parseInt(selectedOffer)
        const lastPayTime = new Date(data.get('Time of last payment'))
        lastPayTime.setHours(lastPayTime.getHours() + 2)

        const payload = {
            phone,
            offerId
        }

        if (!initUser) payload['type'] = 'whatsapp'
        if (initUser) payload['lastPayTime'] = lastPayTime.toISOString().slice(0, 19).replace("T", " ")
        if (initUser) {
            if (!isNaN(profileId)) payload['profileId'] = profileId
        } else payload['profileId'] = profileId
        email.length === 0 ? null : payload['email'] = email

        const res = initUser ? await reqres('users/' + user['id'], 'PUT', payload) : await reqres('users', 'POST', payload)
        if (res['status'] === 'failed') return res['error']
        return 'success'
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
                    <TextField label='User Email Address' placeholder='user@example.com' type='email' required={false}
                        value={user?.email} onChange={(e) => setUser(prev => ({ ...prev, 'email': e.target.value }))} />
                    <TextField label='Phone Number' placeholder='+212 (6) 000-000' type='tel' pattern="^^\+[1-9][0-9]{7,14}$"
                        value={user?.phone} onChange={(e) => setUser(prev => ({ ...prev, 'phone': e.target.value }))} />
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
                <div
                    className={`mt-3 ${initUser ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : ''}`}>
                    <TextField label='Assigned Offer' options={offers}
                        value={selectedOffer} onChange={(e) => setSelectedOffer(e.target.value)} />
                    {initUser ?
                        <TextField label='Time of last payment' type='datetime-local'
                            value={new Date(user.last_pay_time).toISOString().slice(0, 16)}
                            onChange={(e) => setUser(prev => ({ ...prev, 'last_pay_time': e.target.value }))} />
                        : null}
                </div>
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
                        {profiles.map(profile => {
                            const disabled = profile.id === user?.profile_id && profile.id === initUser?.profile_id || profile.used === 1
                            const checked = user?.profile_id === profile.id
                            return (
                                <li key={profile.id}
                                    className='border-2 border-[#e3e8f0] p-3 rounded-md flex items-center gap-3 bg-white mb-2'>
                                    <input type='radio' name='profile' value={profile.id} id={profile.id}
                                        required
                                        disabled={disabled}
                                        checked={checked}
                                        onChange={(e) => { setUser(prev => ({ ...prev, 'profile_id': parseInt(e.target.value) })) }}
                                        className='size-5' />
                                    <label htmlFor={profile.id} className={`w-full ${disabled ? 'text-[#a0a0a0]' : ''}`}>
                                        <b>{profile.name}</b>
                                        <br />
                                        <a href={profile.payment_url}
                                            className='text-[#64748b] hover:text-(--primary-col) hover:underline'>
                                            {profile.payment_url}
                                        </a>
                                    </label >
                                </li>)
                        })}
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
                            <p>{initUser ? 'Update' : 'Save'} User</p></>)}
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