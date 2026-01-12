import { useContext, useState } from "react"
import { ProfilesContext } from "../../../../context/profilesContext"
import EditProfileDialog from "./editProfileDialog"

export default function ProfilesTable() {
    const { profiles } = useContext(ProfilesContext)
    const [selectedProfile, setSelectedProfile] = useState()
    const [editDialog, setEditDialog] = useState(false)

    return (<>
        <div className='overflow-x-auto'>
            <table className='w-full min-w-[720px] bg-white text-left'>
                <thead className='bg-[#f8fafc] h-13 text-md text-[#5e758d] border-t border-b border-t-[#dae0e7] border-b-[#e9edf3]'>
                    <tr className='[&>th]:whitespace-nowrap [&>th]:px-4 md:[&>th]:px-8'>
                        <th>NAME</th>
                        <th>PINCODE</th>
                        <th>STATUS</th>
                        <th>URL</th>
                        <th>ACCOUNT ID</th>
                        <th className='text-right'>ACTIONS</th>
                    </tr>
                </thead>
                <tbody className='[&>tr]:h-15 [&>tr]:border-b [&>tr]:border-[#e9edf3]'>
                    {profiles?.map(profile => (
                        <tr key={profile.id} className='[&>td]:px-4 md:[&>td]:px-8'>
                            <td className='font-bold max-w-[220px] truncate'>{profile.name}</td>
                            <td>
                                <div className='bg-[#f3f4f6] flex items-center justify-center max-w-[80px] rounded-md px-2'>
                                    {profile.pin_code}
                                </div>
                            </td>
                            <td className='flex pt-4.5'>{getStatus(profile.used)}</td>
                            <td className="text-(--primary-col) hover:underline max-w-[220px] truncate">
                                <a href={profile.payment_url}>
                                    {profile.payment_url}
                                </a>
                            </td>
                            <td>ACC-{profile.account_id}</td>
                            <td className='text-right'>
                                <ActionButton icon='edit' className='mr-2 text-(--primary-col)' onClick={() => {
                                    setSelectedProfile(profile.id)
                                    setEditDialog(true)
                                }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {editDialog ? <EditProfileDialog id={selectedProfile} onCancel={() => setEditDialog(false)} /> : null}
    </>
    )
}

function ActionButton({ icon, onClick, className }) {
    return (<button
        onClick={onClick}>
        <span className={`material-symbols-outlined ${className}`}>
            {icon}
        </span>
    </button>)
}

function getStatus(status) {
    const color = status === 1 ? '#ff7206' : '#25c560'
    const text = status === 1 ? 'Used' : 'Available'
    return (
        <div
            style={{
                'borderColor': `${color}50`,
                'color': `${color}`,
                'backgroundColor': `${color}15`
            }}
            className='flex items-center justify-center gap-2 border rounded-full px-2'>
            <span className='h-1.5 w-1.5 rounded-full' style={{ 'backgroundColor': `${color}` }} />
            {text}
        </div>
    )
}

