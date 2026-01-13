import { redirect, useLoaderData } from "react-router-dom"
import OfferForm from "../components/offerForm";
import reqres from "../../../../utils/reqres";
import BackBtn from "../../../components/backBtn";
import { Helmet } from "react-helmet-async";

// eslint-disable-next-line react-refresh/only-export-components
export async function initEditOffer({ params }) {
    const { id } = params
    const offer = await reqres('offers/' + id, 'GET')
    if (offer['status'] === 'failed') throw redirect('/notfound')
    return { offer, id }
}

export default function EditOffer() {
    const { offer, id } = useLoaderData()

    return (<div className='p-4 sm:p-6 md:p-8 lg:p-10'>
        <Helmet>
            <title>Edit Offer</title>
        </Helmet>
        <div
            className='flex items-center gap-2'>
            <BackBtn />
            <div>
                <h1 className='text-xl sm:text-2xl md:text-3xl tracking-tight text-[#101418] font-bold'>
                    Edit Offer
                </h1>
                <p className='mt-1 text-xs sm:text-sm md:text-base text-[#5e758d]'>
                    Update details for existing digital product offer ID {id}
                </p>
            </div>
        </div>
        <div
            className='mt-10'>
            <OfferForm initOffer={offer} />
        </div>
    </div>)
}