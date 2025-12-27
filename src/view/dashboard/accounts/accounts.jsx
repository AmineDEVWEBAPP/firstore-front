import { useState } from "react"
import AccountServices from "../../../core/services/account_services"
import AccountsTable from "./components/accountsTable/accountsTable"
import CreateAccountDialog from './components/createAccountDialog/createAccountDialog.jsx'
import OfferServices from "../../../core/services/offer_services.js"
import { AccountsProvider } from "../../../context/accountsContext.jsx"

// eslint-disable-next-line react-refresh/only-export-components
export async function initAccounts() {
    const accounts = await AccountServices.getAccounts()
    const offers = await OfferServices.get()
    return { accounts, offers }
}

export default function Accounts() {
    const [createDialog, setCreateDialog] = useState(false)
  

    return (<>
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
                className='text-white bg-(--primary-col) font-bold flex items-center rounded-lg h-10 px-3'>
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
    </>)
}