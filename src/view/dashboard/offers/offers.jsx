import NewsCard from "./components/newsCard";
import OfferTable from "./components/offerTable";
import SearchInput from "./components/searchInput";
import OffersProvider, { OffersContext } from "../../../context/offersContext";
import { useContext } from "react";
import { redirect, useNavigate } from "react-router-dom";
import reqres from "../../../utils/reqres";
import DrawerBtn from "../../components/drawerBtn";
import { showSideBar } from "../../../utils/sideBarController";
import { Helmet } from "react-helmet-async";

// eslint-disable-next-line react-refresh/only-export-components
export async function offersInit() {
    const offers = await reqres('offers', 'GET')
    if (offers['status'] === 'failed') throw redirect('/notfound')
    return { offers }
}

export default function Offers() {
    const navigate = useNavigate()

    return (<div className='p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-7xl mx-auto'>
        <Helmet>
            <title>Manage Offers</title>
        </Helmet>
        <header className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
            <div className='flex items-center gap-4'>
                <DrawerBtn onClick={showSideBar} />
                <div>
                    <h1 className='text-xl sm:text-2xl md:text-3xl tracking-tight text-[#101418] font-bold'>
                        Offers Management
                    </h1>
                    <p className='mt-1 text-xs sm:text-sm md:text-base text-[#5e758d]'>
                        Manage digital product listings, prices, and stock levels.
                    </p>
                </div>
            </div>
            <button
                onClick={() => navigate('create')}
                className='text-white bg-(--primary-col) font-bold flex items-center justify-center rounded-lg h-10 px-3 sm:px-4 gap-2 shadow max-w-40'>
                <span className="material-symbols-outlined text-lg">
                    add
                </span>
                <span>Create New</span>
            </button>
        </header>
        <OffersProvider>
            <NewsSection />
            <section className='mt-6 sm:mt-10 bg-white shadow border-[#f0f2f5] border rounded-lg py-4 md:py-6'>
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
    </div>)
}

function NewsSection() {
    const { offers, bestSeller, offersWithAudio, offerWith4k } = useContext(OffersContext)
    return (<section
        className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 md:mt-10 gap-5 md:gap-10'>
        <NewsCard name='Offers In Stock' content={offers.length} />
        <NewsCard name='Best Seller' content={bestSeller.name} />
        <NewsCard name='Offers with Spatial Audio' content={offersWithAudio.length} />
        <NewsCard name='Offers with 4k Resolution' content={offerWith4k.length} />
    </section>)
}