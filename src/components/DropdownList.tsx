

interface IProps {
    children?: JSX.Element | JSX.Element[]
    display: string
}


const DropdownList = ({ children, display }: IProps) => {
    return (
        <ul className={`${display} absolute w-full h-auto mt-1 list-none divide-y border rounded-md border-gray-300`}>
            {children}
        </ul>
    )
}

export default DropdownList