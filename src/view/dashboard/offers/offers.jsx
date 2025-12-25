import NewsCard from "./newsCard/newsCard";
import OfferTable from "./offerTable/offerTable";
import SearchInput from "./searchInput/searchInput";
import OfferServices from "../../../core/services/offer_services";
import OffersProvider, { OffersContext } from "../../../context/offersContext";
import { useContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export async function offersInit() {
    const offers = await OfferServices.get()
    if (offers.status === 'failed' || offers.length === 0)
        return { 'offers': [], 'bestSeller': [], 'offersWithAudio': [], 'offerWith4k': [] }
    return { offers }
}

export default function Offers() {
    return (<>
        <header
            className='flex justify-between items-end'>
            <div>
                <b
                    className='text-3xl tracking-tight text-[#101418]'>
                    Offers Management
                </b>
                <p
                    className='mt-1 text-[#5e758d]'>
                    Manage digital product listings, prices, and stock levels.
                </p>
            </div>
            <button
                className='text-white bg-(--primary-col) font-bold flex items-center rounded-lg h-10 px-3'>
                <span className="material-symbols-outlined">
                    add
                </span>
                Create New
            </button>
        </header>
        <OffersProvider>
            <NewsSection />
            <section className='mt-10 bg-white shadow border-[#f0f2f5] border h-145 rounded-lg py-6'>
                <div
                    className='px-6 mb-6 flex justify-between'>
                    <SearchInput />
                    <div
                        className='flex gap-2'>
                        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#dae0e7] px-3 py-2 text-sm font-medium text-[#5e758d]">
                            <span className="material-symbols-outlined" style={{ "font-size": "20px" }}>filter_list</span>
                            Filter
                        </button>
                        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#dae0e7] px-3 py-2 text-sm font-medium text-[#5e758d]">
                            <span className="material-symbols-outlined" style={{ "font-size": "20px" }}>sort</span>
                            Sort
                        </button>
                    </div>
                </div>
                <OfferTable />
            </section>
        </OffersProvider>
    </>)
}

function NewsSection() {
    const { offers, bestSeller, offersWithAudio, offerWith4k } = useContext(OffersContext)
    return (<section
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-10'>
        <NewsCard name='Offers In Stock' content={offers.length} />
        <NewsCard name='Best Seller' content={bestSeller.name} />
        <NewsCard name='Offers with Spatial Audio' content={offersWithAudio.length} />
        <NewsCard name='Offers with 4k Resolution' content={offerWith4k.length} />
    </section>)
}