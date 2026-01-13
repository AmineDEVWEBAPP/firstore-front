import { useActionState, useState } from "react"
import TextField from "./components/textField/textField.jsx"
import SubmitButton from "./components/submitButton/submitButton.jsx"
import { redirect, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async";
import reqres from "../../../utils/reqres.js"

// eslint-disable-next-line react-refresh/only-export-components
export async function initLogin() {
    const res = await reqres('admin/logged', 'POST')
    if (res['status'] !== 'failed') throw redirect('/dashboard/home')
}

export default function DashboardLogin() {
    const navigate = useNavigate()

    const [_, formAction, isPending] = useActionState(login)
    const [resStatus, setResStatus] = useState()

    async function login(_, queryData) {
        const email = queryData.get('email')
        const password = queryData.get('password')
        const res = await reqres('admin/login', 'POST', { email, password })
        if (res['status'] === 'failed') {
            setResStatus('Failed')
        } else navigate('/dashboard/home')
    }


    return (
        <div className='flex min-h-screen justify-center items-center px-4'>
            <Helmet>
                <title>admin login</title>
            </Helmet>
            <div
                className='p-6 sm:p-8 md:p-10 w-[92vw] sm:w-[76vw] md:w-[60vw] lg:w-[44vw] xl:w-[36vw] max-w-180 bg-white rounded-4xl flex flex-col items-center shadow-md md:shadow-lg hover:shadow-xl transition-shadow duration-200'>
                <div
                    className='rounded-full flex justify-center items-center bg-orange-200 p-3'>
                    <span className="material-symbols-outlined text-(--secondary-col)">lock</span>
                </div>
                <p className='text-[12px] md:text-[14px] text-gray-500 mt-5'>Please enter your details to sign in.</p>
                <form
                    action={formAction}
                    className='flex flex-col mt-5 w-full text-[12px] md:text-[14px]'>
                    <label htmlFor='admin-login-email-input' className='mb-1 text-sm md:text-base'>Email Address</label>
                    <TextField type='email' defaultValue='demo@gmail.com' />
                    <div
                        className='mb-1 mt-5 flex items-center justify-between'>
                        <label htmlFor='admin-login-password-input' className='text-sm md:text-base'>Password</label>
                        <a
                            className='text-(--secondary-col) hover:underline decoration-(--secondary-col)'
                            href='#'
                        >Forgot Password?</a>
                    </div>
                    <TextField type='password' defaultValue='demoAdminPassword' />
                    {resStatus === 'Failed' ? <p className='text-red-500'>failed login</p> : null}
                    <SubmitButton isLoading={isPending} />
                </form>
            </div>
        </div>
    )
}