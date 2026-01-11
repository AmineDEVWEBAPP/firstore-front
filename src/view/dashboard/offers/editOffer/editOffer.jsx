import { redirect, useLoaderData } from "react-router-dom"
import OfferForm from "../components/offerForm";
import reqres from "../../../../utils/reqres";

// eslint-disable-next-line react-refresh/only-export-components
export async function initEditOffer({ params }) {
    const { id } = params
    const offer = await reqres('offers/' + id, 'GET')
    if (offer['status'] === 'failed') throw redirect('/notfound')
    return { offer, id }
}

export default function EditOffer() {
    const { offer, id } = useLoaderData()

    return (<div className='p-10'>
        <div>
            <b
                className='text-3xl tracking-tight text-[#101418]'>
                Edit Offer
            </b>
            <p
                className='mt-1 text-[#5e758d]'>
                Update details for existing digital product offer ID {id}
            </p>
        </div>
        <div
            className='mt-10'>
            <OfferForm initOffer={offer} />
        </div>
    </div>)
}