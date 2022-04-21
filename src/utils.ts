import { DateTime } from 'luxon'



export const roundTemperatureValue = (value: number) => {
    return Math.round(value)
}

export const changeDateFormat = (datetime: string, format: string) => {
    return DateTime.fromISO(datetime).toFormat(format)
}