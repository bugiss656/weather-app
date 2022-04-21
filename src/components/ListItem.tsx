

interface IProps {
    text: string
    onMouseDown?: any
}


const ListItem = ({ text, onMouseDown }: IProps) => {
    return (
        <li className="block p-2 hover:cursor-pointer hover:bg-slate-50" onMouseDown={onMouseDown}>{text}</li>
    )
}

export default ListItem