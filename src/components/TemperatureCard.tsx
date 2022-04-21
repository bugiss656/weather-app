import { roundTemperatureValue, changeDateFormat } from '../utils'

import { FaTemperatureLow } from 'react-icons/fa'
import { FaLocationArrow } from 'react-icons/fa'
import { IconContext } from 'react-icons'


interface IProps {
    displayName: string | undefined
    dateTime: string
    value: number
}


const TemperatureCard = ({ displayName, dateTime, value }: IProps) => {
    return (
        <div className="flex flex-col justify-center items-center bg-slate-50 rounded shadow px-8 py-3">
            <h3 className="my-2">Aktualnie:</h3>
            <div className="flex flex-row justify-center items-center">
                <div className="flex flex-row justify-center items-center mr-6">
                    <IconContext.Provider value={{ size: '20', style: { marginTop: '3px' } }}>
                        <FaLocationArrow />
                    </IconContext.Provider>
                    <h1 className="text-4xl px-2 my-2">{displayName}</h1>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <IconContext.Provider value={{ size: '32', style: { marginTop: '5px' } }}>
                        <FaTemperatureLow />
                    </IconContext.Provider>
                    <p className="text-5xl px-4">{roundTemperatureValue(value)} &deg;C</p>
                </div>
            </div>
            <div className="py-3">{changeDateFormat(dateTime, 'd MMM yy, HH:mm:ss')}</div>
        </div>
    )
}

export default TemperatureCard