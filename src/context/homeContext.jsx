import { createContext, useState } from "react";
import { useLoaderData } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const HomeContext = createContext()

export function HomeProvider({ children }) {
    const { offers } = useLoaderData()
    const [selectedOffer, setSelectedOffer] = useState(offers.filter(offer => offer.most_popular === 1)[0] || offers[0])

    return (
        <HomeContext.Provider
            value={{ offers, selectedOffer, setSelectedOffer }}>
            {children}
        </HomeContext.Provider>
    )
}
