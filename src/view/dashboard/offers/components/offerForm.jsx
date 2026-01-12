import { useActionState, useState } from "react"
import SwitchInput from "../../../components/switchInput/switchInput"
import LoadingProcess from "../../../components/loadingProcess/loadingProcess"
import Dialog from "../../../components/dialog"
import reqres from "../../../../utils/reqres"

export default function OfferForm({ initOffer }) {
    const [offer, setOffer] = useState(initOffer)
    const qualitys = ['Good', 'Great', 'Best']
    const resolutions = ['720p (HD)', '1080p (Full HD)', '4K (Ultra HD) + HDR']
    const [devices, setDevices] = useState(new Set(initOffer ? offer['supported_devices'].split(', ') : ['Android']))
    const [message, formAction, isPending] = useActionState(saveOffer)


    async function saveOffer(_, data) {
        const name = data.get('Offer Name')
        const price = parseFloat(data.get('Price'))
        const quality = data.get('Quality Tier')
        const resolution = data.get('Max Resolution')
        const spatialAudio = data.get('Spatial Audio') === null ? false : true
        const maxDevices = parseFloat(data.get('Max Devices'))
        const maxDownloades = parseFloat(data.get('Max Downloads'))

        const payload = {
            name, price, quality, resolution,
            'haveSpatialAudio': spatialAudio,
            'maximumDevices': maxDevices,
            'supportedDevices': [...devices].join(', '),
            'maximumDownloadDevices': maxDownloades,
            'priceCurrency': 'MAD'
        }

        const res = initOffer ? await reqres('offers/' + offer['id'], 'PUT', payload) : await reqres('offers', 'POST', payload)
        if (res['status'] === 'failed') return res['error']
        return 'success'
    }


    return (
        <form action={formAction}
            className='w-full bg-white shadow rounded-xl border border-[#f0f2f5] flex flex-col'>
            <div
                className='p-6'>
                <div
                    className='flex gap-2 font-bold text-xl'>
                    <span
                        style={{
                            'fontSize': '33px'
                        }}
                        className="material-symbols-outlined text-(--primary-col)">
                        edit_note
                    </span>
                    Basic Details
                </div>
                <div
                    className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6'>
                    <TextField value={offer?.name}
                        onChange={(e) => setOffer(prev => ({ ...prev, 'name': e.target.value }))}
                        label='Offer Name' placeholder='e.g, Summer Relax Bundle' />
                    <TextField value={offer?.price}
                        onChange={(e) => setOffer(prev => ({ ...prev, 'price': e.target.value }))}
                        label='Price' placeholder='MAD 0.00' type='number' />
                    <TextField value={offer?.quality}
                        onChange={(e) => setOffer(prev => ({ ...prev, 'quality': e.target.value }))}
                        label='Quality Tier' options={qualitys} />
                </div>
                <hr className='my-7 border-[#ececec]' />
                <div
                    className='flex text-xl items-center gap-2'>
                    <span
                        style={{
                            'fontSize': '13px'
                        }}
                        className="material-symbols-outlined bg-(--primary-col) text-white px-1 py-0.5 rounded-sm">
                        cloud
                    </span>
                    <b>
                        Technical Specifications
                    </b>
                </div>
                <div
                    className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6'>
                    <TextField value={offer?.resulotion}
                        onChange={(e) => setOffer(prev => ({ ...prev, 'resolution': e.target.value }))}
                        label='Max Resolution' options={resolutions} />
                    <TextField type='number' label='Max Devices' placeholder='e,g., 2'
                        value={offer?.maximum_devices}
                        onChange={(e) => setOffer(prev => ({ ...prev, 'maximum_devices': e.target.value }))} />
                    <TextField type='number' label='Max Downloads' placeholder='e,g., 1'
                        value={offer?.maximum_download_devices}
                        onChange={(e) => setOffer(prev => ({ ...prev, 'maximum_download_devices': e.target.value }))} />
                </div>
                <div
                    className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <SwitchField />
                    <div className='col-span-2'>
                        <DevicesField devices={devices} />
                        <p
                            className='text-xs mt-1 text-[#5e758d]'>
                            Press Enter to add a device tag.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className='border-t border-[#e6e3e3] flex items-center justify-end bg-[#f9fafb] h-35 gap-10 px-6'>
                <button type='button' onClick={() => history.back()}
                    className='bg-white border border-[#e4e4e4] shadow rounded-md py-2 px-4 font-bold'>
                    Cancel
                </button>
                <button
                    className='bg-(--primary-col) shadow rounded-md py-2 px-4 text-white flex font-bold gap-1 text-nowrap'>
                    {isPending ? <LoadingProcess size='21' borderSize='4' className='mx-10 my-0.5' /> :
                        (<><span class="material-symbols-outlined">
                            save
                        </span>
                            <p>Save {initOffer ? 'Changes' : 'Offer'}</p></>)}
                </button>
            </div>
            <Dialog icon={message === 'success' ? 'check' : 'close'}
                confirmText='back' confirmColor='bg-(--primary-col)'
                iconColor={message === 'success' ? '#2abc75' : '#dc2727'}
                title={message === 'success' ? 'Success' : 'Failed'}
                content={message === 'success' ? null : message}
                onCancel={() => history.back()}
                onConfirm={() => history.back()}
                show={message !== undefined}
            />
        </form>
    )

    function DevicesField() {
        function handleInput(e) {
            if (e.target.value.length !== 0 && e.key === ' ' || e.key === 'Enter') {
                const inputDevices = e.target.value.split(' ')
                const lastDevice = inputDevices[inputDevices.length - 1]
                if (lastDevice.length !== 0) setDevices(prev => new Set(prev).add(lastDevice))
            }
        }
        return (
            <div
                className='flex flex-col w-full mt-3'>
                <label for='devices'>
                    <b>Supported Devices</b>
                </label>
                <div id='devices'
                    className='border-2 border-[#e4e4e4] rounded-xl mt-2 flex gap-3 items-center p-3 overflow-scroll'>
                    {[...devices].map((device, i) => (<Item name={device} key={i} />))}
                    <input type='text' placeholder="Add Device..."
                        onKeyDown={handleInput}
                        className='placeholder:text-[#5e758d] outline-none w-full min-w-50 h-full' />
                </div>
            </div>
        )

        function Item({ name }) {
            return (
                <div
                    className='flex items-center text-(--primary-col) bg-blue-50 font-bold gap-2 h-full px-3 py-2 rounded-md border border-blue-100'>
                    {name}
                    <button type='button'
                        onClick={() => setDevices(prev => {
                            const next = new Set(prev);
                            next.delete(name);
                            return next;
                        })}>
                        <span
                            style={{
                                'fontSize': '18px'
                            }}
                            className="material-symbols-outlined">
                            close
                        </span>
                    </button>
                </div>
            )
        }
    }

    function SwitchField() {
        return (<div className='mt-3'>
            <b >Spatial Audio</b>
            <div
                className='flex justify-between bg-[#f0f7ff]  border-2 border-[#e4e4e4] rounded-xl items-center mt-2 p-4'>
                <p className='text-[#5e758d]'>360° rendering</p>
                <SwitchInput
                    checked={offer?.have_spatial_audio === 1 || offer?.have_spatial_audio}
                    name='Spatial Audio'
                    onChange={(e) => setOffer(prev => ({ ...prev, 'have_spatial_audio': e.target.checked }))}
                />
            </div>
        </div>)
    }
}


function TextField({ label, placeholder, options, className, value, type = 'text', onChange }) {
    if (!options) return (<div
        className={`${className} flex flex-col w-full`}>
        <label for={label}>
            <b>{label}</b>
        </label>
        <input id={label} type={type} name={label} placeholder={placeholder} value={value} onChange={onChange} required
            className='border-2 border-[#e4e4e4] rounded-xl p-3 mt-2 placeholder:text-[#5e758d] focus:border-none' />
    </div>)
    return (<div
        className='flex flex-col w-full'>
        <label>
            <b>{label}</b>
        </label>
        <select name={label} onChange={onChange} value={value} defaultValue={value}
            className='border-2 border-[#e4e4e4] rounded-xl p-3 mt-2'>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>)
            )}
        </select>
    </div>)
}
