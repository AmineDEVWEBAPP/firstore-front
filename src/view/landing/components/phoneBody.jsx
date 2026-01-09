import { useContext } from "react"
import { HomeContext } from "../../../context/homeContext"

export default function PhoneBody() {
    const { offers, selectedOffer, setSelectedOffer } = useContext(HomeContext)

    return (
        <div
            className='lg:hidden w-full mt-5 max-w-140 overflow-visible'>
            <div
                style={{
                    'display': 'grid',
                    'gridTemplateColumns': `repeat(${offers.length <= 3 ? offers.length : 3}, 1fr)`
                }}
                className={`gap-3 overflow-visible`}>
                {offers.map(offer => <Cart key={offer.id} offer={offer} selected={selectedOffer?.id === offer.id} onClick={() => setSelectedOffer(offer)} />)}
            </div>
            <div
                className='h-full'>
                <Info title='Monthly price'
                    value={selectedOffer['price_currency'] + ' ' + selectedOffer['price']}
                    className='mt-6' />
                <hr className='border-[#c0c0c0]' />
                <Info title='Video and sound quality'
                    value={selectedOffer['quality']} />
                <hr className='border-[#c0c0c0]' />
                <Info title='Resolution'
                    value={selectedOffer['resolution']} />
                <hr className='border-[#c0c0c0]' />
                <Info title='Supported devices'
                    value={selectedOffer['supported_devices']} />
                <hr className='border-[#c0c0c0]' />
                <Info title='Spatial audio (immersive sound)'
                    value={selectedOffer['have_spatial_audio'] === 0 ? 'not included' : 'included'} />
            </div>
        </div>
    )
}

function Cart({ offer, selected, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`${selected ? 'shadow-gray-300 shadow-lg scale-110 text-white bg-linear-to-br from-(--primary-col) to-(--secondary-col)' : 'bg-white'} 
            cursor-pointer rounded-xl shadow transition-all duration-150 h-22 flex flex-col p-3 relative overflow-hidden`}>
            <p
                className='overflow-hidden max-w-21' >
                {offer.name}</p>
            <p className={`text-xs mt-1 max-w-21 ${selected ? '' : 'text-gray-600 font-bold'}`}>
                {offer.resolution}</p>
            <span
                style={{
                    'display': `${selected ? '' : 'none'}`,
                    'fontSize': '17px'
                }}
                className='material-symbols-outlined self-end absolute right-3 bottom-3 text-white'>
                check_circle
            </span>
            <p
                className={`text-[11px] text-white absolute bottom-0 left-0 bg-(--secondary-col) rounded-tr-md px-1 ${offer['most_popular'] === 1 ? '' : 'hidden'}`}>
                Most Popular
            </p>
        </div>
    )
}

function Info({ title, value, className }) {
    return (
        <div
            className={`${className} flex items-center justify-between font-bold my-2 text-sm sm:text-md`}>
            <p
                className='text-xs sm:text-sm text-[#777777]'>
                {title}
            </p>
            {value}
        </div>
    )
}