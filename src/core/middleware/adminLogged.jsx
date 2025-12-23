import { useEffect, useState } from "react"
import AdminServices from "../services/admin_services"
import { Outlet } from "react-router-dom"
import LoadingProcess from "../../view/components/loadingProcess/loadingProcess"

export default function AdminLogged({ page }) {
    const [isLogged, setIsLogged] = useState(null)

    useEffect(function () {
        const promise = new Promise(function (resolve) {
            const logged = AdminServices.logged()
            resolve(logged)
        })
        promise.then(logged => {
            if (logged) {
                setIsLogged(true)
            } else {
                setIsLogged(false)
            }
        })
    })

    if (isLogged === null)
        return (<div
            className='flex h-screen items-center justify-center'
        ><LoadingProcess /></div>)

    if (page === 'login') {
        if (isLogged) return toHome()
        return (<Outlet />)
    } else {
        if (isLogged) return (<Outlet />)
        toLogin()
    }
}

function toLogin() {
    history.replaceState(null, null, '/dashboard/login')
    location.reload()
}


function toHome() {
    history.replaceState(null, null, '/dashboard')
    location.reload()
}