

interface IProps {
    children?: JSX.Element | JSX.Element[]
}


const TemperatureList = ({ children }: IProps) => {
    return (
        <ul className="w-80 h-64 bg-slate-50 list-none border overflow-y-scroll" >
            {children}
        </ul>
    )
}

export default TemperatureList