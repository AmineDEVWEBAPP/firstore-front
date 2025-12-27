import { useLoaderData } from "react-router-dom"
import OfferForm from "../components/offerForm/offerForm";
import OfferServices from "../../../../core/services/offer_services";

// eslint-disable-next-line react-refresh/only-export-components
export async function initEditOffer({ params }) {
    const { id } = params
    const res = await OfferServices.getById(id)
    return { 'offer': res, id }
}

export default function EditOffer() {
    const { offer, id } = useLoaderData()

    return (<>
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
    </>)
}