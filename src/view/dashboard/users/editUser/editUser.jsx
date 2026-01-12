import { redirect, useLoaderData } from "react-router-dom";
import UserForm from "../components/userForm";
import reqres from "../../../../utils/reqres";
import BackBtn from "../../../components/backBtn";

// eslint-disable-next-line react-refresh/only-export-components
export async function initEditUser(data) {
    const id = parseInt(data['params']['id'])
    const [offers, user] = await Promise.all([reqres('offers', 'GET'), reqres('users/' + id, 'GET')])
    if (offers['status'] === 'failed' || user['status'] === 'failed') throw redirect('/notfound')
    return { offers, user }
}
export default function EditUser() {
    const user = useLoaderData()['user']
    return (
        <div className='p-4 sm:p-6 md:p-8 lg:p-10'>
            <header className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
                <div className='flex items-center gap-4'>
                    <BackBtn />
                    <div>
                        <h1 className='text-xl sm:text-2xl md:text-3xl tracking-tight text-[#101418] font-bold'>
                            Edit User
                        </h1>
                        <p className='mt-1 text-xs sm:text-sm text-[#5e758d]'>
                            Edit user details, profile and assigned offer
                        </p>
                    </div>
                </div>
            </header>
            <div className='mt-5 lg:mt-10'>
                <UserForm initUser={user} />
            </div>
        </div>
    )
}