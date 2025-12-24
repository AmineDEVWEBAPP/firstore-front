import { Outlet } from "react-router-dom";
import Sidebare from "./components/sidebare/sidebare";

export default function Dashboard() {
    return (<main
        className='flex'>
        <Sidebare/>
       <Outlet/>
    </main>)
}