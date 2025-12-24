import { Outlet } from "react-router-dom";
import Sidebare from "./components/sidebare/sidebare";

export default function Dashboard() {
    return (<main
        className='flex'>
        <Sidebare/>
    <div
    className='body-container'>
        <div className='overflow-y-scroll h-dvh p-10'>
         <Outlet/>
      </div>
    </div>
    </main>)
}