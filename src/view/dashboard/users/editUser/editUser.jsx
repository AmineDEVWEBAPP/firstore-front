import { redirect, useLoaderData } from "react-router-dom";
import UserForm from "../components/userForm";
import reqres from "../../../../utils/reqres";

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
        <div className='p-10'>
            <header>
                <b
                    className='text-3xl tracking-tight text-[#101418]'>
                    Edit User User
                </b>
                <p
                    className='mt-1 text-[#5e758d]'>
                    Edit user details and profile and offer.
                </p>
            </header>
            <div className='mt-10'>
                <UserForm initUser={user} />
            </div>
        </div>
    )
}