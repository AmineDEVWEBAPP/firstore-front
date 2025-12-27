import { createContext, useState } from "react";
import { useLoaderData } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AccountsContext = createContext()

export function AccountsProvider({ children }) {
    const init = useLoaderData()['accounts']
    const [accounts, setAccounts] = useState(init)
    return (
        <AccountsContext value={{ accounts, setAccounts }}>
            {children}
        </AccountsContext>
    )
}