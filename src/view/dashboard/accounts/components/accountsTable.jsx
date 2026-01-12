import { useContext, useState } from "react"
import Dialog from '../../../components/dialog'
import LoadingProcess from '../../../components/loadingProcess/loadingProcess'
import { AccountsContext } from "../../../../context/accountsContext"
import EditAccountDialog from "./editAccountDialog"
import reqres from "../../../../utils/reqres"

export default function AccountsTable() {
    const { accounts, setAccounts } = useContext(AccountsContext)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState()
    const [loading, setLoadin] = useState(false)
    const [resStatus, setResStatus] = useState(null)
    const [editDialog, setEditDialog] = useState(false)

    async function deleteAccount() {
        setLoadin(true)
        const res = await reqres('accounts/' + selectedAccount, 'DELETE')
        setLoadin(false)
        setDeleteDialog(false)
        setResStatus(res)
        setTimeout(() => setResStatus(null), 1500)
        if (res['status'] === 'failed') return
        setAccounts(accounts => accounts.filter(account => account.id !== selectedAccount))
    }

    return (<>
        <table
            className='w-full bg-white text-left'>
            <thead
                className='bg-[#f8fafc] h-13 text-md text-[#5e758d] border-t border-b border-t-[#dae0e7] border-b-[#e9edf3]'>
                <tr
                    className='[&>th]:whitespace-nowrap [&>th]:px-8'>
                    <th>EMAIL</th>
                    <th>PASSWORD</th>
                    <th>OFFER</th>
                    <th>CREATED AT</th>
                    <th>ACTIVE</th>
                    <th className='text-right'>ACTIONS</th>
                </tr>
            </thead>
            <tbody
                className='[&>tr]:h-15 [&>tr]:border-b [&>tr]:border-[#e9edf3]'>
                {accounts?.map(account => (<tr
                    key={account.id}
                    className='[&>td]:px-8'>
                    <td className='font-bold'>{account.email}</td>
                    <td className='font-bold'>{account.password}</td>
                    <td className='flex pt-4.5'>{account.offer_name}</td>
                    <td className="text-[#5f758d]">{new Date(account.created_at).toLocaleDateString()}</td>
                    <td className='px-13!'>{getStatus(account.it_works === 1)}</td>
                    <td className='text-right'>
                        <ActionButton icon='edit'
                            className='mr-2 text-(--primary-col)'
                            onClick={() => {
                                setSelectedAccount(account.id)
                                setEditDialog(true)
                            }} />
                        <ActionButton icon='delete' className='text-(--secondary-col)'
                            onClick={() => {
                                setSelectedAccount(account.id)
                                setDeleteDialog(true)
                            }} />
                    </td>
                </tr>))}
            </tbody>
        </table>
        <Dialog icon='warning' iconColor='#dc2727'
            title='Delete Account' confirmColor='bg-red-700'
            show={deleteDialog}
            cancelText='Cancel' confirmText={loading ? (<LoadingProcess size={20} borderSize={4} />) : 'Confirm Delete'}
            content='Are you sure you want to delete this Account? This action cannot be undone.'
            onCancel={() => setDeleteDialog(false)}
            onConfirm={() => deleteAccount()} />
        <Dialog
            icon={resStatus?.status === 'failed' ? 'close' : 'check'} show={resStatus}
            iconColor={resStatus?.status === 'failed' ? '#dc2727' : '#2abc75'}
            title={resStatus?.status === 'failed' ? 'Failed' : 'Success'}
            content={resStatus?.status === 'failed' ? resStatus['error'] : null} />
        {editDialog ? <EditAccountDialog onCancel={() => setEditDialog(false)} id={selectedAccount} /> : null}
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
    return (
        <span className={`material-symbols-outlined ${status ? 'text-green-500' : 'text-red-500'}`}>
            {status ? 'check_circle' : 'close'}
        </span>
    )
}

