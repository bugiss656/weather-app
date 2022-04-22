import { DateTime } from 'luxon'



export const changeDateFormat = (datetime: string, format: string) => {
    return DateTime.fromISO(datetime).toFormat(format)
}