import { HomeContext, HomeProvider } from "../../context/homeContext";
import { WhatsappIcon } from "../../core/config/constants";
import OfferServices from "../../core/services/offer_services";
import Footer from "../components/footer";
import ConfermForm from "./components/confermCart/confermCart";
import DisktopBody from "./components/disktopBody";
import Logo from "../components/logo";
import PhoneBody from "./components/phoneBody";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";

// eslint-disable-next-line react-refresh/only-export-components
export async function initLanding() {
    const [offers] = await Promise.all([OfferServices.get()])
    return { offers }
}

export default function Landing() {
    return (<HomeProvider>
        <Helmet>
            <title>Buy Netflix Premium Accounts | HD & 4K Streaming</title>
            <meta name="author" content="Amine khadir" />
            <meta
                name="description"
                content="Buy Netflix Premium accounts at affordable prices. Instant delivery, secure payment, multiple profiles, and 24/7 customer support. Enjoy HD and 4K streaming today."
            />
            <meta
                name="keywords"
                content="Netflix account, Netflix Premium, buy Netflix, Netflix subscription, Netflix HD, Netflix 4K, Netflix profiles, streaming accounts"
            />
        </Helmet>
        <div
            className='min-h-full'>
            <header
                className="bg-white py-2 px-3 md:py-3 md:px-10 lg:px-20 flex items-center justify-between shadow">
                <Logo />
                <ContactMeBtn />
            </header>
            <div
                className='body-container w-full px-3 md:px-10 lg:px-20 flex flex-col items-center'>
                <b className='mt-4 text-2xl sm:text-3xl md:text-4xl md:mt-6 lg:text-5xl lg:mt-7'>
                    Choose Your Plan
                </b>
                <PhoneBody />
                <DisktopBody />
                <ConfermForm />
                <div
                    className='flex items-center my-3 w-full text-sm [&>hr]:w-full [&>hr]:border-[#a0a0a0] text-[#6d6f70] max-w-140 lg:max-w-160'>
                    <hr />
                    <b className='mx-2'>OR</b>
                    <hr />
                </div>
                <WhatsappOrderBtn />
            </div>
        </div>
        <Footer />
    </HomeProvider>)
}

function ContactMeBtn() {
    const { selectedOffer } = useContext(HomeContext)

    return <a href={`https://wa.me/212675512400?text=I%20want%20${selectedOffer['name']}%20offer`}
        className='flex items-center gap-1 rounded-md shadow bg-(--primary-col) text-white py-1 px-3 cursor-pointer hover:bg-blue-600'>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M16.53 14.84C16.48 14.71 16.29 14.53 16.09 14.43C15.9 14.33 14.95 13.86 14.77 13.8C14.6 13.73 14.48 13.7 14.36 13.87C14.24 14.05 13.9 14.45 13.8 14.56C13.69 14.68 13.59 14.69 13.39 14.59C13.2 14.5 12.57 14.29 11.83 13.63C11.23 13.1 10.83 12.45 10.72 12.26C10.61 12.07 10.71 11.97 10.81 11.87C10.9 11.78 11 11.64 11.1 11.53C11.2 11.41 11.24 11.33 11.3 11.2C11.37 11.08 11.33 10.97 11.29 10.87C11.24 10.77 10.87 9.87 10.72 9.5C10.56 9.15 10.4 9.19 10.29 9.19H10C9.88 9.19 9.68 9.24 9.51 9.42C9.34 9.6 8.87 10.05 8.87 10.96C8.87 11.87 9.53 12.75 9.62 12.87C9.72 13 10.99 14.96 12.93 15.8C13.39 16 13.75 16.12 14.04 16.21C14.57 16.38 15.05 16.36 15.43 16.3C15.86 16.24 16.75 15.76 16.94 15.23C17.13 14.7 17.13 14.24 17.07 14.15C17.01 14.05 16.83 13.97 16.63 13.87"></path>
        </svg>
        Contact us
    </a>
}

function WhatsappOrderBtn() {
    const { selectedOffer } = useContext(HomeContext)

    return <a href={`https://wa.me/212675512400?text=I%20want%20${selectedOffer['name']}%20offer`}
        className='bg-[#0cc043] shadow rounded-md text-white flex items-center justify-center gap-2 text-nowrap font-bold text-xl min-h-12 px-5 cursor-pointer hover:bg-[#0caa11]'>
        <WhatsappIcon />
        Whatapp Order
    </a>
}