import { Outlet, redirect, useLoaderData } from "react-router-dom";
import Sidebare from "./components/sidebare";
import reqres from "../../../utils/reqres";

// eslint-disable-next-line react-refresh/only-export-components
export async function initDashboard() {
    const res = await reqres('admin/logged', 'POST')
    if (res['status'] === 'failed') throw redirect('/dashboard/login')
    const adminRes = await reqres('admin', 'GET')
    if (adminRes['status'] === 'failed') throw redirect('/notfound')
    return { 'admin': adminRes }
}

export default function Dashboard() {
    const { admin } = useLoaderData()
    return (<main
        className='flex'>
        <Sidebare />
        <div
            className='body-container'>
            <div className='overflow-y-scroll h-dvh'>
                <Outlet context={{ admin }} />
            </div>
        </div>
    </main>)
}