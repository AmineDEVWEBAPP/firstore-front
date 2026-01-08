import Icon from "../../assets/favicon.svg"

export default function Logo() {
    return (
        <div
            className='flex gap-2 items-center text-xl md:text-2xl xl:text-3xl'>
            <img src={Icon} alt="Logo"
                className="h-7 md:h-10" />
            <b>Firstore</b>
        </div>
    )
}