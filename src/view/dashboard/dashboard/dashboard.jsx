import { Outlet, useLoaderData } from "react-router-dom";
import Sidebare from "./components/sidebare/sidebare";
import AdminServices from "../../../core/services/admin_services";

// eslint-disable-next-line react-refresh/only-export-components
export async function dashboardInit() {
    const [admin] = await Promise.all([AdminServices.get()])
    return { admin }
}

export default function Dashboard() {
    const { admin } = useLoaderData()
    return (<main
        className='flex'>
        <Sidebare />
        <div
            className='body-container'>
            <div className='overflow-y-scroll h-dvh p-10'>
                <Outlet context={{ admin }} />
            </div>
        </div>
    </main>)
}