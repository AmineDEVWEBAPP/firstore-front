import { useState } from "react"
import AccountsTable from "./components/accountsTable"
import CreateAccountDialog from './components/createAccountDialog.jsx'
import { AccountsProvider } from "../../../context/accountsContext.jsx"
import reqres from "../../../utils/reqres.js"
import { redirect } from "react-router-dom"

// eslint-disable-next-line react-refresh/only-export-components
export async function initAccounts() {
    const [accounts, offers] = await Promise.all([reqres('accounts', 'GET'), reqres('offers', 'GET')])
    if (accounts['status'] === 'failed' || offers['status'] === 'failed') throw redirect('/notfound')
    return { accounts, offers }
}

export default function Accounts() {
    const [createDialog, setCreateDialog] = useState(false)


    return (<div className='p-10'>
        <header
            className='flex justify-between items-end'>
            <div>   <b
                className='text-3xl tracking-tight text-[#101418]'>
                Accounts Management
            </b>
                <p
                    className='mt-1 text-[#5e758d]'>
                    Manage your digital product inventory. Add new accounts, verify status.
                </p>
            </div>
            <button onClick={() => setCreateDialog(true)}
                className='text-white bg-(--primary-col) font-bold flex items-center rounded-lg h-10 px-3 shadow'>
                <span className="material-symbols-outlined">
                    add
                </span>
                Create New Account
            </button>
        </header>
        <div
            className='mt-10 bg-white shadow border-[#f0f2f5] border h-145 rounded-lg py-6'>
            <AccountsProvider>
                <AccountsTable />
                <CreateAccountDialog show={createDialog} onCancel={() => setCreateDialog(false)} />
            </AccountsProvider>
        </div>
    </div>)
}


