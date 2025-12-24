import { Outlet, useLoaderData } from "react-router-dom";
import Sidebare from "./components/sidebare/sidebare";

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