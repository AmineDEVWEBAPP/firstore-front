import { useLoaderData } from "react-router-dom";
import OfferServices from "../../../../services/offer_services";
import UserServices from "../../../../services/user_services";
import UserForm from "../components/userForm";

// eslint-disable-next-line react-refresh/only-export-components
export async function initEditUser(data) {
    const id = parseInt(data['params']['id'])
    const [offers, user] = await Promise.all([OfferServices.get(), UserServices.findById(id)])
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