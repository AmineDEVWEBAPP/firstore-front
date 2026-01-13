import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"


export default function NotFound() {
    const navigate = useNavigate()

    return (
        <div
            className='flex flex-col items-center justify-between h-full text-center py-10 sm:py-30'>
            <Helmet>
                <title>404 – Page Not Found</title>
                <meta
                    name="description"
                    content="The page you are looking for does not exist or has been moved."
                />
            </Helmet>
            <span
                style={{
                    'fontSize': '200px'
                }}
                className="material-symbols-outlined text-red-500">
                cancel
            </span>
            <b
                className="text-(--primary-col) text-8xl md:text-9xl font-extrabold">
                404
            </b>
            <b
                className='text-3xl md:text-4xl text-nowrap'>
                Oops? Page Not Found
            </b>
            <p
                className='text-[#5c6f8c] max-w-100 md:text-lg'>
                The digital product or page you are looking for has either been
                moved to a new location or no longer exits.let's get you back on track.
            </p>
            <button
                onClick={async () => navigate('/', { replace: true })}
                className='rounded-md shadow bg-(--primary-col) font-bold text-white py-2 px-4 md:text-lg'>
                Return Home
            </button>
        </div>
    )
}