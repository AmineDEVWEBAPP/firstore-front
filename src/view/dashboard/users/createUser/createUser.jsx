import UserForm from "../components/userForm";
import reqres from "../../../../utils/reqres";
import BackBtn from "../../../components/backBtn";

// eslint-disable-next-line react-refresh/only-export-components
export async function initCreateUser() {
    const offers = await reqres('offers', 'GET')
    return { offers }
}

export default function CreateUser() {
    return (
        <div className='p-4 sm:p-6 md:p-8 lg:p-10'>
            <title>Create User</title>
            <header className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
                <div className='flex items-center gap-4'>
                    <BackBtn />
                    <div>
                        <h1 className='text-xl sm:text-2xl md:text-3xl tracking-tight text-[#101418] font-bold'>
                            Create New User
                        </h1>
                        <p className='mt-1 text-xs sm:text-sm text-[#5e758d] flex gap-x-1'>
                            Enter user details below to create a new profile <p className='hidden md:block'>and assign system access.</p>
                        </p>
                    </div>
                </div>
            </header>
            <div className='mt-5 lg:mt-10'>
                <UserForm />
            </div>
        </div>
    )
}