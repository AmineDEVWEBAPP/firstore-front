import { ProfilesProvider } from "../../../context/profilesContext"
import ProfileServices from "../../../core/services/profile_services"
import ProfilsTable from "./components/profilesTable/profilesTable"

// eslint-disable-next-line react-refresh/only-export-components
export async function initProfiles() {
    const profiles = await ProfileServices.getProfiles()
    return { profiles }
}

export default function Profiles() {
    return (<>
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
            <button onClick={() => { }}
                className='text-white bg-(--primary-col) font-bold flex items-center rounded-lg h-10 px-3'>
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
            </ProfilesProvider>
        </div>
    </>)
}