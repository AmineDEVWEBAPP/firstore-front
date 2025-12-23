import './style.css'

export default function LoadingProcess({ size = 50, borderSize = 8 }) {
    return (<>
        <span
            className='loader'
            style={{
                width: `${size}px`
            }}
        />
        <style>{`
        .loader::before,
        .loader::after {
          content: "";
          grid-area: 1/1;
          border: ${borderSize}px solid;
          border-radius: 50%;
          border-color: var(--secondary-col) var(--secondary-col) #0000 #0000;
          mix-blend-mode: normal;
        }
        .loader::after{
          border-color: #0000 #0000 var(--primary-col) var(--primary-col);
        }
        `}</style>
    </>
    )
}