import { useState } from "react"
import AccountsTable from "./components/accountsTable"
import CreateAccountDialog from './components/createAccountDialog.jsx'
import { AccountsProvider } from "../../../context/accountsContext.jsx"
import reqres from "../../../utils/reqres.js"
import { redirect } from "react-router-dom"
import { showSideBar } from "../../../utils/sideBarController.js"
import DrawerBtn from "../../components/drawerBtn.jsx"
import { Helmet } from "react-helmet-async"

// eslint-disable-next-line react-refresh/only-export-components
export async function initAccounts() {
    const [accounts, offers] = await Promise.all([reqres('accounts', 'GET'), reqres('offers', 'GET')])
    if (accounts['status'] === 'failed' || offers['status'] === 'failed') throw redirect('/notfound')
    return { accounts, offers }
}

export default function Accounts() {
    const [createDialog, setCreateDialog] = useState(false)


    return (
        <div className='p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-7xl mx-auto'>
            <Helmet>
                <title>Manage accounts</title>
            </Helmet>
            <header className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
                <div className='flex items-center gap-4'>
                    <DrawerBtn onClick={showSideBar} />
                    <div>
                        <h1 className='text-lg sm:text-2xl md:text-3xl tracking-tight text-[#101418] font-bold'>
                            Accounts Management
                        </h1>
                        <p className='mt-1 text-xs sm:text-sm text-[#5e758d]'>
                            Manage your digital product inventory.
                            <span className='hidden md:inline'> Add new accounts, verify status.</span>
                        </p>
                    </div>
                </div>
                <button onClick={() => setCreateDialog(true)}
                    className='text-white bg-(--primary-col) font-bold flex items-center rounded-lg h-10 px-3 sm:px-4 gap-2 max-w-40'>
                    <span className="material-symbols-outlined text-lg">add</span>
                    Create New
                </button>
            </header>
            <div
                className='mt-10 bg-white shadow border-[#f0f2f5] border rounded-lg py-6 overflow-scroll'>
                <AccountsProvider>
                    <AccountsTable />
                    <CreateAccountDialog show={createDialog} onCancel={() => setCreateDialog(false)} />
                </AccountsProvider>
            </div>
        </div>)
}


