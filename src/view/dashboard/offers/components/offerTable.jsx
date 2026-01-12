import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import Dialog from '../../../components/dialog'
import LoadingProcess from '../../../components/loadingProcess/loadingProcess'
import { OffersContext } from "../../../../context/offersContext"
import reqres from "../../../../utils/reqres"

export default function OfferTable() {
    const { offers, setOffers } = useContext(OffersContext)
    const navigate = useNavigate()
    const [deleteDialog, setDeleteDialog] = useState(false)
    const [selectedOffer, setSelectedOffer] = useState(null)
    const [loading, setLoadin] = useState(false)
    const [resStatus, setResStatus] = useState(null)

    async function deleteOffer() {
        setLoadin(true)
        const res = await reqres('offers/' + selectedOffer, 'DELETE')
        setLoadin(false)
        setDeleteDialog(false)
        setResStatus(res)
        setTimeout(() => setResStatus(null), 1500)
        if (res['status'] === 'failed') return
        setOffers(offers => offers.filter(offer => offer.id !== selectedOffer))
    }

    return (<>
        <table
            className='w-full bg-white text-left'>
            <thead
                className='bg-[#f8fafc] h-13 text-md text-[#5e758d] border-t border-b border-t-[#dae0e7] border-b-[#e9edf3]'>
                <tr
                    className='[&>th]:whitespace-nowrap [&>th]:px-8'>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>QUALITY</th>
                    <th>RESOLUTION</th>
                    <th>SPATIAL AUDIO</th>
                    <th className='text-right'>ACTIONS</th>
                </tr>
            </thead>
            <tbody
                className='[&>tr]:h-15 [&>tr]:border-b [&>tr]:border-[#e9edf3]'>
                {offers?.map(offer => (<tr
                    key={offer.id}
                    className='[&>td]:px-8'>
                    <td className='font-bold'>{offer.name}</td>
                    <td className='font-bold'>{offer.price} {offer.price_currency}</td>
                    <td className='flex pt-4.5'><p
                        className='px-4 rounded-full'
                        style={{
                            'color': getQualityCol(offer.quality),
                            'backgroundColor': `${getQualityCol(offer.quality)}30`
                        }}
                    >{offer.quality}</p></td>
                    <td className="text-[#5f758d]"
                    >{offer.resolution}</td>
                    <td className='px-20!'>
                        {getVerification(offer.have_spatial_audio === 1)}
                    </td>
                    <td
                        className='text-right'>
                        <ActionButton icon='edit' className='mr-2 text-(--primary-col)' onClick={() => navigate(`${offer.id}/edit`)} />
                        <ActionButton icon='delete' className='text-(--secondary-col)' onClick={() => {
                            setDeleteDialog(true)
                            setSelectedOffer(offer.id)
                        }} />
                    </td>
                </tr>))}
            </tbody>
        </table>
        {deleteDialog ? <Dialog icon='warning' iconColor='#dc2727' title='Delete Offer' confirmColor='bg-red-700' show={true}
            cancelText='Cancel' confirmText={loading ? (<LoadingProcess size={20} borderSize={4} />) : 'Confirm Delete'}
            content='Are you sure you want to delete this offer? This action cannot be undone.'
            onCancel={() => setDeleteDialog(false)}
            onConfirm={() => deleteOffer()}
        /> : null}
        <Dialog icon={resStatus?.status === 'failed' ? 'close' : 'check'}
            iconColor={resStatus?.status === 'failed' ? '#dc2727' : '#2abc75'}
            title={resStatus?.status === 'failed' ? 'Failed' : 'Success'}
            content={resStatus?.status === 'failed' ? resStatus['error'] : null}
            show={resStatus}
        />
    </>
    )
}

function getQualityCol(quality) {
    switch (quality) {
        case 'Good': return '#000000'
        case 'Great': return '#0085dd'
        case 'Best': return '#8500dd'
        default: return '#dd8500'
    }
}

function ActionButton({ icon, onClick, className }) {
    return (<button
        onClick={onClick}>
        <span className={`material-symbols-outlined ${className}`}>
            {icon}
        </span>
    </button>)
}

function getVerification(verified) {
    return (
        <span className={`material-symbols-outlined ${verified ? 'text-green-500' : 'text-red-500'}`}>
            {verified ? 'check_circle' : 'close'}
        </span>
    )
}

