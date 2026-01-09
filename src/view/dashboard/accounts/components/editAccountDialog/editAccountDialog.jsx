import { useActionState, useContext, useState } from "react"
import AccountServices from "../../../../../services/account_services"
import LoadingProcess from "../../../../components/loadingProcess/loadingProcess"
import Dialog from "../../../../components/dialog/dialog"
import { AccountsContext } from "../../../../../context/accountsContext"
import SwitchInput from '../../../../components/switchInput/switchInput'

export default function EditAccountDialog({ onCancel, id }) {
    const { accounts, setAccounts } = useContext(AccountsContext)
    let [targetAccount, setTargetAccount] = useState(accounts.filter(account => account.id === id)[0])
    const [message, formAction, isPending] = useActionState(update)
    const [statusDialog, setStatusDialog] = useState(false)

    async function update(_, data) {
        const email = data.get('Email Address')
        const password = data.get('New Password')
        const itWorks = data.get('It Works') === null ? false : data.get('It Works') === 'on' ? true : false
        const payload = { email, password, itWorks }
        const res = await AccountServices.update(id, payload)
        setStatusDialog(true)
        if (res.status === 'success') {
            const newAccounts = await AccountServices.getAccounts()
            setAccounts(newAccounts)
            return true
        }
        return false
    }

    return (
        <div
            onClick={onCancel}
            className='flex w-screen bg-[rgb(0,0,0,0.5)] backdrop-blur-xs h-screen fixed bottom-0 right-0 z-1 items-center justify-center'>
            <div onClick={(e) => e.stopPropagation()}
                className='bg-[#f0f7ff] rounded-xl w-140'>
                <form action={formAction}
                    className='flex flex-col'>
                    <div className='p-6'>
                        <b className='text-xl'>
                            Edit Account
                        </b>
                        <p className='text-[#5e758d]'>
                            Update existing credentials and operational status.
                        </p>
                        <TextField label='Email Address' type='email' value={targetAccount.email}
                            onChange={(e) => setTargetAccount(prev => ({ ...prev, 'email': e.target.value }))}
                            placeholder='account@example.com' className='mt-6' />
                        <TextField label='New Password' value={targetAccount.password}
                            onChange={(e) => setTargetAccount(prev => ({ ...prev, 'password': e.target.value }))}
                            placeholder='password' className='mt-3' />
                        <SwitchField checked={targetAccount.it_works === 1 || targetAccount.it_works} name='It Works'
                            onChange={(e) => setTargetAccount(prev => ({ ...prev, 'it_works': e.target.checked }))} />
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
        <select name={label} select={'mn'} onChange={onChange} defaultValue={value}
            className='border-2 border-[#e4e4e4] bg-white rounded-xl p-3 mt-2'>
            {options.map(option => <option key={option.id} value={option.id}>
                {option.name}
            </option>)}
        </select>
    </div>)
}

function SwitchField({ checked, onChange, name }) {
    return (
        <div
            className='p-3 bg-white flex border-2 border-[#e4e4e4] rounded-xl items-center justify-between mt-6'>
            <div>
                It Works
                <p className='text-xs text-[#5e758d]'>
                    Account is active and functional.
                </p>
            </div>
            <SwitchInput name={name} checked={checked} onChange={onChange} />
        </div>
    )
}