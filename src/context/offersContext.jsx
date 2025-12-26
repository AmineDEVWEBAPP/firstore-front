import { createContext, useMemo, useState } from "react"
import { useLoaderData } from "react-router-dom"

// eslint-disable-next-line react-refresh/only-export-components
export const OffersContext = createContext([])

export default function OffersProvider({ children }) {
    const { 'offers': init } = useLoaderData()
    const [offers, setOffers] = useState(init)

    const bestSeller = useMemo(() => {
        if (offers.length === 0) return []
        return offers.reduce((best, current) =>
            current.used_profiles_count > best.used_profiles_count
                ? current
                : best
        );
    }, [offers]);

    const offersWithAudio = useMemo(
        () => offers.filter(o => o.have_spatial_audio === 1),
        [offers]
    );

    const offerWith4k = useMemo(
        () => offers.filter(o => o.resulotion === '4K (Ultra HD) + HDR'),
        [offers]
    );
    return (
        <OffersContext
            value={{ offers, setOffers, bestSeller, offersWithAudio, offerWith4k }}
        >{children}
        </OffersContext>
    )
}