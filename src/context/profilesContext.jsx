import { createContext, useState } from "react";
import { useLoaderData } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const ProfilesContext = createContext()

export function ProfilesProvider({ children }) {
    const init = useLoaderData()['profiles']
    const [profiles, setProfiles] = useState(init)
    return <ProfilesContext value={{ profiles, setProfiles }}>
        {children}
    </ProfilesContext>
}