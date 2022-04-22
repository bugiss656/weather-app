import { changeDateFormat } from '../utils'

import { FaTemperatureLow } from 'react-icons/fa'
import { IconContext } from 'react-icons'


interface IProps {
    dateTime: string
    value: number
}


const TemperatureListItem = ({ dateTime, value }: IProps) => {
    return (
        <li className="flex flex-row justify-between items-center text-lg p-2 my-1 bg-white border hover:cursor-pointer">
            <p>{changeDateFormat(dateTime, 'cccc dd.LL - hh:mm')}</p>
            <div className="flex flex-row items-center">
                <p className="text-2xl mx-1">{value}</p>
                <IconContext.Provider value={{ size: '20', style: { marginTop: '4px' } }}>
                    <FaTemperatureLow />
                </IconContext.Provider>
            </div>
        </li>
    )
}

export default TemperatureListItem