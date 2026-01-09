import { useContext, useState } from "react";
import Dialog from '../../../components/dialog/dialog'
import ActionDialog from './actionDialog'
import { UsersContext } from "../../../../context/usersContext";
import UserServices from '../../../../services/user_services'
import LoadingProcess from '../../../components/loadingProcess/loadingProcess'
import { useNavigate } from "react-router-dom";

export default function UsersTable() {
    const { users, setUsers } = useContext(UsersContext)
    const [selected, setSelected] = useState(users.length !== 0 ? users[0]['id'] : null)
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resStatus, setResStatus] = useState(false)
    const navigate = useNavigate()
    const [loadingEmailDialog, setLoadingEmailDialog] = useState(false)

    async function deleteUser() {
        setLoading(true)
        const res = await UserServices.delete(selected)
        setLoading(false)
        setDeleteDialog(false)
        if (res['status'] === 'success')
            setResStatus(res['status'])
        else setResStatus(res['error'])
        setTimeout(() => setResStatus(null), 1500)
        if (res['status'] === 'success')
            setUsers(users.filter(user => user.id != selected))
    }

    async function sendEmail() {
        setLoadingEmailDialog(true)
        const res = await UserServices.sendEmail(selected)
        setLoadingEmailDialog(false)
        if (res['status'] === 'success')
            setResStatus(res['status'])
        else setResStatus(res['error'])
        setTimeout(() => setResStatus(null), 1500)
    }

    function showActionDialog(btnId) {
        const actionBtn = document.getElementById(btnId)
        const actionDialog = document.getElementById('actionDialog')

        const rect = actionBtn.getBoundingClientRect()
        const offsetTop = rect.top + window.scrollY;
        const offsetLeft = rect.left + window.scrollX;

        actionDialog.style.transform =
            `translate(${offsetLeft}px, ${offsetTop}px)`
        actionDialog.classList.remove(`hidden`)
    }

    return (<>
        <table
            className='w-full bg-white text-left'>
            <thead
                className='bg-[#f8fafc] h-13 text-md text-[#5e758d] border-t border-b border-t-[#dae0e7] border-b-[#e9edf3]'>
                <tr
                    className='[&>th]:whitespace-nowrap [&>th]:tracking-wider [&>th]:py-4 [&>th]:px-6'>
                    <th>DETAILS</th>
                    <th>TYPE</th>
                    <th>SUBSCRIPTION</th>
                    <th>ACCOUNT ACCESS</th>
                    <th>PROFILE</th>
                    <th>LAST PAYMENT</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody
                className='  divide-y divide-[#dae0e7] '>
                {users.map(user => (<tr key={user.id}
                    className='[&>td]:px- group [&>td]:py-4 [&>td]:px-6 [&>td]:align-top'>
                    <td><Details data={user} /></td>
                    <td><Type type={user['type'].toLowerCase()} /></td>
                    <td><b>{user.offer_name}</b></td>
                    <td><AccountDetails data={user} /></td>
                    <td><ProfileDetails data={user} /></td>
                    <td><LastPay time={user.last_pay_time} /></td>
                    <td className='flex ml-10'>
                        <button id={user.id}
                            onClick={function () {
                                setSelected(user.id)
                                showActionDialog(user.id)
                            }}
                            className='bg-white flex p-1 rounded-full'>
                            <span className="material-symbols-outlined">
                                more_vert
                            </span>
                        </button>
                    </td>
                </tr>))}
            </tbody>
        </table>
        <ActionDialog
            onDelete={() => setDeleteDialog(true)}
            onEdit={() => navigate(`${selected}/edit`)}
            onEmail={sendEmail}
            hidden={() => {
                let user = users.filter(user => user.id === selected)[0];
                let email = user?.email
                if (!email) return ['email']
                return []
            }} />
        {deleteDialog ? <Dialog icon='warning' iconColor='#dc2727'
            title='Delete User' confirmColor='bg-red-700'
            cancelText='Cancel' confirmText={loading ? (<LoadingProcess size={20} borderSize={4} />) : 'Confirm Delete'}
            content={`Are you sure you want to delete this User? ${users.filter(user => user.id === selected)[0]['phone']}.`}
            onCancel={() => setDeleteDialog(false)}
            onConfirm={() => deleteUser()} /> : null}
        <Dialog icon={resStatus === 'success' ? 'check' : 'close'} show={resStatus}
            iconColor={resStatus === 'success' ? '#2abc75' : '#dc2727'}
            title={resStatus === 'success' ? 'success' : 'failed'}
            content={resStatus === 'success' ? null : resStatus} />
        <Dialog icon='email' iconColor='#007bff' title='Sending Email'
            content={<LoadingProcess />} show={loadingEmailDialog} />
    </>
    )
}

function Details({ data }) {
    const { email, phone, created_at } = data
    return (<>
        <big className='font-bold'>{email}</big>
        <div
            className={`flex ${email ? 'text-[#5e758d] text-md' : 'font-bold text-xl'} items-center gap-1`}>
            <span
                style={{
                    'fontSize': `${email ? '16px' : '20px'}`
                }}
                className="material-symbols-outlined rotate-100">
                phone_enabled
            </span>
            {phone}
        </div>
        <p className='text-[#677f97] text-xs mt-2'>
            {new Date(created_at).toDateString()}
        </p>
    </>)
}

function Type({ type }) {
    return (
        <span
            className={`flex items-center gap-1.5 border-2 rounded-full py-0.5 px-3
        ${type == 'whatsapp' ? 'bg-[#dcfce7] text-[#196736] border-[#baf7cf]' : 'bg-[#f3e8ff] text-[#6c22a8] border-[#e8d5ff]'}`}>
            <span
                style={{
                    'fontSize': '18px'
                }}
                className="material-symbols-outlined">
                {type === 'card' ? 'credit_card' : 'chat'}
            </span>
            {type === 'card' ? 'Card' : 'WhatsApp'}
        </span>
    )
}

function AccountDetails({ data }) {
    const { account_email, account_password } = data
    return (
        <div
            className='flex flex-col border-2 border-[#dae0e7] bg-[#f5f7f8] p-2 rounded-md text-nowrap'>
            <Row type='Email' data={account_email} />
            <hr className='border-[#cccdce] my-2' />
            <Row type='Pass' data={account_password} />
        </div>
    )

    function Row({ type, data }) {
        return (<>
            <div
                className='flex items-center justify-between gap-1'>
                <b className='text-[#5e758d]'>{type}</b> {data}
            </div>
        </>)
    }
}

function ProfileDetails({ data }) {
    const { profile_name, profile_pin_code } = data
    return (
        <div
            className='flex gap-1.5'>
            <span
                style={{
                    'fontSize': '22px'
                }}
                className="material-symbols-outlined text-[#5e758d]">
                account_box
            </span>
            <div>
                <b>{profile_name}</b>
                <div
                    className='flex gap-2 text-[#5e758d] text-sm items-center mt-1.5'>
                    <b>PIN</b>
                    <div
                        className='bg-[#fdf8c2] text-[#7c400a] px-2 border-2 border-[#fdf39d] rounded-md'>
                        {profile_pin_code}
                    </div>
                </div>
            </div>
        </div>
    )
}

function LastPay({ time }) {

    const expired = function () {
        const userTime = new Date(time)
        userTime.setMonth(userTime.getMonth() + 1)
        return new Date().getTime >= userTime.getTime()
    }

    const color = expired() ? '#f16565' : '#007bff'

    return (
        <span
            style={{
                'color': color,
                'backgroundColor': `${color}15`,
                'borderColor': `${color}30`
            }}
            className='flex items-center gap-1.5 border-2 rounded-full py-0.5 px-3 text-nowrap'>
            {new Date(time).toLocaleString()}
        </span>
    )
}