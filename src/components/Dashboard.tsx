import { useEffect, useState } from "react"
import axios from "axios"

import TextInput from "./TextInput"
import DropdownList from "./DropdownList"
import ListItem from "./ListItem"
import TemperatureCard from "./TemperatureCard"
import TemperatureList from "./TemperatureList"
import TemperatureListItem from "./TemperatureListItem"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"



export interface ICity {
    name: string
    displayName: string
}

export interface IMeasurement {
    dateTime: string
    value: number
}

export interface IData {
    displayName: string
    dateTime: string
    value: number
}


const DEFAULT_CITY = 'warsaw'


const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [cities, setCities] = useState<ICity[]>([])
    const [currentCity, setCurrentCity] = useState<ICity>()
    const [latestTemperature, setLatestTemperature] = useState<IData>()
    const [temperatures, setTemperatures] = useState([])
    const [maxTemperatures, setMaxTemperatures] = useState<IMeasurement[]>([])
    
    

    const displayProposedResults = (city: ICity): city is ICity => {
        return city.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    }


    const setDefaultCity = (cities: ICity[]) => {
        const defaultCity = cities.find(city => {
            return city.name === DEFAULT_CITY
        })
        setCurrentCity(defaultCity)
    }


    const fetchCitiesData = async (url: string) => {
        try {
            const response = await axios.get(url)
            setCities(response.data)
            setDefaultCity(response.data)
        } catch(error) {
            console.log(error)
        }
    }


    const fetchLatestTemperatureData = async (url: string) => {
        try {
            const response = await axios.get(url)
            setLatestTemperature(response.data)
        } catch(error) {
            console.log(error)
        }
    }


    const fetchTemperatureData = async (url: string) => {
        try {
            const response = await axios.get(url)
            setTemperatures(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    
    const fetchMaxTemperatureData = async (url: string) => {
        try {
            const response = await axios.get(url)
            setMaxTemperatures(response.data)
        } catch(error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if(searchQuery) {
            setIsDropdownVisible(true)
        }

        if(searchQuery.length === 0) {
            setIsDropdownVisible(false)
        }

        if(!isInputFocused) {
            setIsDropdownVisible(false)
        }
    }, [searchQuery, isInputFocused])


    useEffect(() => {
        fetchCitiesData('http://localhost:8000/cities')
        fetchLatestTemperatureData(`http://localhost:8000/${DEFAULT_CITY}/chartData/temperature/latest`)
        fetchTemperatureData(`http://localhost:8000/${DEFAULT_CITY}/chartData/temperature`) 
        fetchMaxTemperatureData(`http://localhost:8000/${DEFAULT_CITY}/chartData/temperature/max`)
    }, [])

    
    useEffect(() => {
        if(currentCity) {
            fetchLatestTemperatureData(`http://localhost:8000/${currentCity.name}/chartData/temperature/latest`)
            fetchTemperatureData(`http://localhost:8000/${currentCity.name}/chartData/temperature`) 
            fetchMaxTemperatureData(`http://localhost:8000/${currentCity.name}/chartData/temperature/max`)
        }
    }, [currentCity])


    return (
        <div className="container mx-auto">
            <div className="flex flex-row justify-center items-center my-12">
                <div className="relative w-3/12">
                    <TextInput 
                        placeholder="Enter city name..." 
                        value={searchQuery} 
                        onFocus={() => { setIsInputFocused(true) }}
                        onBlur={() => { setIsInputFocused(false) }}
                        onChange={(event) => { setSearchQuery(event.target.value) }} 
                    />
                    <DropdownList display={isDropdownVisible ? 'block' : 'hidden'}>
                        {cities && cities.filter(displayProposedResults).length !== 0
                            ?
                            cities
                                .filter(displayProposedResults)
                                .map((city: ICity) => (
                                    <ListItem
                                        key={city.name}
                                        text={city.displayName}
                                        onMouseDown={() => {
                                            setSearchQuery(city.displayName)
                                            setCurrentCity(city)
                                        }}
                                    />
                                ))
                            :
                            <ListItem
                                text="No results..."
                            />
                        }
                    </DropdownList>
                </div>
            </div>
            <hr />
            <div className="flex justify-center my-24">
                {latestTemperature &&
                    <TemperatureCard
                        displayName={currentCity && currentCity.displayName}
                        dateTime={latestTemperature.dateTime}
                        value={latestTemperature.value}
                    />
                }
            </div>
            <div className="flex flex-row justify-around">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-xl my-1">Last 14 days weather forecast, {latestTemperature && latestTemperature.displayName}</h1>
                    <TemperatureList>
                        {temperatures.map((temperature: any) => (
                            <TemperatureListItem 
                                key={temperature.dateTime} 
                                dateTime={temperature.dateTime}
                                value={temperature.value}
                            />
                        ))}
                    </TemperatureList>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-xl my-1">Last 14 days max temperatures, {latestTemperature && latestTemperature.displayName}</h1>
                    {maxTemperatures &&
                        <AreaChart 
                            width={650} 
                            height={250} 
                            data={maxTemperatures}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="maxTemp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#cc0000" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#cc0000" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey='dateTime' />
                            <YAxis />
                            <CartesianGrid strokeDasharray='3 3' />
                            <Tooltip />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#cc0000" 
                                fillOpacity={1} 
                                fill="url(#maxTemp)"
                            />
                        </AreaChart>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard