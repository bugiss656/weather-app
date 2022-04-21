import React from "react"
import { AiOutlineSearch } from 'react-icons/ai'
import { IconContext } from 'react-icons'


interface IProps {
    placeholder: string
    value: string
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}


const TextInput = ({ placeholder, value, onFocus, onBlur, onChange }: IProps) => {
    return (
        <div className="flex items-center">
            <IconContext.Provider value={{ className: "absolute pl-2", size: '28' }} >
                <AiOutlineSearch />
            </IconContext.Provider>
            <input type="text" 
                placeholder={placeholder} 
                value={value} 
                onFocus={onFocus} 
                onBlur={onBlur} 
                onChange={onChange} 
                className="w-full border rounded-md border-gray-300 shadow-sm text-gray-900 tracking-wider focus:outline-none text-md block px-10 py-2" 
                required
            />
        </div>
    )
}

export default TextInput