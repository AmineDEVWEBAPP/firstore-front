import UserForm from "../components/userForm";
import OfferServices from '../../../../core/services/offer_services'

// eslint-disable-next-line react-refresh/only-export-components
export async function initCreateUser() {
    const offers = await OfferServices.get()
    return { offers }
}

export default function CreateUser() {
    return (
        <div className='p-10'>
            <header>
                <b
                    className='text-3xl tracking-tight text-[#101418]'>
                    Create New User
                </b>
                <p
                    className='mt-1 text-[#5e758d]'>
                    Enter user details below to create a new profile and assign system access.
                </p>
            </header>
            <div className='mt-10'>
                <UserForm />
            </div>
        </div>
    )
}