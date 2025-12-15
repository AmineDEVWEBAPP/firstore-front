import ProcessLoading from '../../../../components/loadingProcess/loadingProcess'
import './style.css'

export default function SubmitButton({ isLoading }) {
    return (<button
        className='mt-5 bg-(--primary-col) shadow-sm md:shadow-md hover:shadow-lg transition-shadow duration-150 items-center rounded-full text-white flex justify-center h-10 px-4 md:px-6 text-sm md:text-base'
        type='submit'>
        {isLoading ? <ProcessLoading size={22} borderSize={4} /> : <div
            className='flex items-center'>
            Login
            <span className="material-symbols-outlined icon ">
                arrow_forward
            </span>
        </div>}
    </button>)
}