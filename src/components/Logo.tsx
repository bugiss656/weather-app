import { TiWeatherPartlySunny } from 'react-icons/ti'
import { IconContext } from 'react-icons'


const Logo = () => {
    return (
        <div className="flex flex-row justify-center items-center">
            <IconContext.Provider value={{ size: "32" }}>
                <TiWeatherPartlySunny />
            </IconContext.Provider>
            <div className="font-sans text-3xl pl-1">Weather App</div>
        </div>
    )
}

export default Logo