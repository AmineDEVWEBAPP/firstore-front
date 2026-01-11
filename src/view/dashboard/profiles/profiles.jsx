import { useState } from "react"
import { ProfilesProvider } from "../../../context/profilesContext"
import ProfilsTable from "./components/profilesTable"
import CreateProfileDialog from "./components/createProfileDialog"
import reqres from "../../../utils/reqres"
import { redirect } from "react-router-dom"

// eslint-disable-next-line react-refresh/only-export-components
export async function initProfiles() {
    const profiles = await reqres('profiles', 'GET')
    const accounts = await reqres('accounts', 'GET')
    if (profiles['status'] === 'failed' || accounts['status'] === 'failed') throw redirect('/notfound')
    return { profiles, accounts }
}

export default function Profiles() {
    const [createDialog, setCreateDialog] = useState(false)

    return (<div className='p-10'>
        <header
            className='flex justify-between items-end'>
            <div>   <b
                className='text-3xl tracking-tight text-[#101418]'>
                Profiles Management
            </b>
                <p
                    className='mt-1 text-[#5e758d]'>
                    Manage access profiles, track usage, and monitor digital product distribution.
                </p>
            </div>
            <button onClick={() => setCreateDialog(true)}
                className='text-white bg-(--primary-col) font-bold flex items-center rounded-lg h-10 px-3 shadow'>
                <span className="material-symbols-outlined">
                    add
                </span>
                Create New Profile
            </button>
        </header>
        <div
            className='mt-10 bg-white shadow border-[#f0f2f5] border h-145 rounded-lg py-6'>
            <ProfilesProvider>
                <ProfilsTable />
                <CreateProfileDialog show={createDialog} onCancel={() => setCreateDialog(false)} />
            </ProfilesProvider>
        </div>
    </div>)
}