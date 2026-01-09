import { createContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import UserServices from "../services/user_services";

// eslint-disable-next-line react-refresh/only-export-components
export const UsersContext = createContext()

export function UsersProvider({ children }) {
    const { 'users': initUsers, 'news': initNews } = useLoaderData()

    const [users, setUsers] = useState(initUsers)
    const [news, setNews] = useState(initNews)

    useEffect(function () {
        let mounted = true
        async function fetchData() {
            const res = await UserServices.news()
            if (res['status'] === 'failed') return {}
            if (mounted) setNews(res)
        }
        fetchData()
        return function () { mounted = false }
    }, [users])

    return (
        <UsersContext value={{ users, setUsers, news }}>
            {children}
        </UsersContext>
    )
}