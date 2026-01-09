import { useContext } from "react"
import { HomeContext } from "../../../context/homeContext"

export default function DisktopBody() {
    const { offers, selectedOffer, setSelectedOffer } = useContext(HomeContext)

    return (
        <div
            style={{
                'gridTemplateColumns': `repeat(${offers.length}, 1fr)`
            }}
            className='mt-13 hidden lg:grid lg:gap-10 xl:gap-15 w-full'>
            {offers.map(offer => <Cart key={offer['id']} offer={offer} selected={selectedOffer['id'] === offer['id']} onClick={() => setSelectedOffer(offer)} />)}
        </div>
    )
}

function Cart({ offer, selected, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`rounded-xl shadow p-4 xl:p-6 bg-white transition-all duration-150 relative overflow-hidden
            ${selected ? 'scale-110 shadow-lg -translate-y-5' : 'hover:scale-101'}`}>
            <p
                className={`absolute text-white bg-(--secondary-col) px-2 top-0 right-0 rounded-bl-lg ${offer['most_popular'] === 1 ? '' : 'hidden'}`}>
                Most popular
            </p>
            <span
                style={{
                    'display': selected ? '' : 'none'
                }}
                className="material-symbols-outlined absolute bottom-4 xl:bottom-6 right-4 xl:right-6 bg-(--secondary-col) rounded-full text-white">
                check
            </span>
            <b
                className={`text-2xl transition-all duration-150 ${selected ? 'text-(--primary-col)' : ''}`}>
                {offer['name']}
            </b>
            <p
                className='mt-2 mb-7 text-[#5a6b83]'>
                <b
                    className={`font-extrabold text-3xl transition-all duration-150 ${selected ? 'text-(--secondary-col)' : 'text-black'}`}>
                    {offer['price_currency'] + ' ' + offer['price']}
                </b>
                /month
            </p>
            <Info title={offer['resolution']} />
            <Info title={offer['supported_devices']} />
            <Info title='Spatial audio (immersive sound)' checked={offer['have_spatial_audio'] === 1} />
        </div>
    )

    function Info({ title, checked = true }) {
        return (
            <div
                className='flex items-center w-full gap-2 text-nowrap overflow-hidden mt-5'>
                <span
                    className={`material-symbols-outlined resize transition-all duration-150 ${checked ? selected ? 'text-(--primary-col)' : 'text-green-500' : 'text-gray-400'}`}>
                    {checked ? 'check_circle' : 'cancel'}
                    <style>{`
                    .resize{
                    font-size: 20px;
                    @media (width >= 80rem){
                      font-size: 25px;
                    }
                    }
                    `}</style>
                </span>
                {title}
            </div>
        )
    }
}