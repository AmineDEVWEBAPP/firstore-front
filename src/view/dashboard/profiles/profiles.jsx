import { useState } from "react"
import { ProfilesProvider } from "../../../context/profilesContext"
import ProfilsTable from "./components/profilesTable"
import CreateProfileDialog from "./components/createProfileDialog"
import reqres from "../../../utils/reqres"
import { redirect } from "react-router-dom"
import { showSideBar } from "../../../utils/sideBarController"
import DrawerBtn from "../../components/drawerBtn"

// eslint-disable-next-line react-refresh/only-export-components
export async function initProfiles() {
    const profiles = await reqres('profiles', 'GET')
    const accounts = await reqres('accounts', 'GET')
    if (profiles['status'] === 'failed' || accounts['status'] === 'failed') throw redirect('/notfound')
    return { profiles, accounts }
}

export default function Profiles() {
    const [createDialog, setCreateDialog] = useState(false)

    return (<div className='p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-7xl mx-auto'>
        <title>Manage Profiles</title>
        <header className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
            <div className='flex items-center gap-4'>
                <DrawerBtn onClick={showSideBar} />
                <div>
                    <h1 className='text-xl sm:text-2xl md:text-3xl tracking-tight text-[#101418] font-bold'>
                        Profiles Management
                    </h1>
                    <p className='mt-1 text-xs sm:text-sm text-[#5e758d] flex gap-x-1'>
                        Manage access profiles, track usage <p className='hidden md:block'>,and monitor digital product distribution.</p>
                    </p>
                </div>
            </div>
            <button
                onClick={() => setCreateDialog(true)}
                className='text-white bg-(--primary-col) font-bold flex items-center justify-center rounded-lg h-10 px-3 sm:px-4 gap-2 shadow max-w-40'>
                <span className="material-symbols-outlined text-lg">
                    add
                </span>
                <span>Create New</span>
            </button>
        </header>
        <div
            className='mt-10 bg-white shadow border-[#f0f2f5] border rounded-lg py-6 overflow-scroll'>
            <ProfilesProvider>
                <ProfilsTable />
                <CreateProfileDialog show={createDialog} onCancel={() => setCreateDialog(false)} />
            </ProfilesProvider>
        </div>
    </div>)
}