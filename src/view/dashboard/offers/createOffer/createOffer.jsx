import OfferForm from "../components/offerForm";
import BackBtn from '../../../components/backBtn'

export default function CreateOffer() {
    return (<div className='p-4 sm:p-6 md:p-8 lg:p-10'>
        <title>Create Offer</title>
        <div
            className='flex items-center gap-2'>
            <BackBtn />
            <div>
                <h1 className='text-xl sm:text-2xl md:text-3xl tracking-tight text-[#101418] font-bold'>
                    Create New Offer
                </h1>
                <p className='mt-1 text-xs sm:text-sm md:text-base text-[#5e758d]'>
                    Enter details for the new digital product offer below.
                </p>
            </div>
        </div>
        <div className='mt-6 md:mt-10'>
            <OfferForm />
        </div>
    </div>)
}