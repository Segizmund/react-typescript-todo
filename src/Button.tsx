type ButtonPropsType = {
    title: string
    onClick?: () => void
    className?: string
    id?: string
}

export const Button = ({ title, onClick, className,id }: ButtonPropsType) => {
    return <button type="button" className={className} id={id} onClick={onClick}>{title}</button>
}