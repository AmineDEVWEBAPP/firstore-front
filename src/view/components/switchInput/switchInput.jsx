import './style.css'

export default function SwitchInput({ id, name, onChange, checked }) {
    return (
        <label className="switch" id={id}>
            <input type="checkbox" name={name} checked={checked} onChange={onChange} />
            <span className="slider round"></span>
        </label>
    )
}