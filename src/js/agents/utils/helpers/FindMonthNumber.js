import { MONTH_HEBREW_1 } from "../constants/arrayOfMonths"
export const findMonthNumber = (name) => {
    const res = MONTH_HEBREW_1.find((item) => item.name == name )
    return res.id
} 

export const findMonthName = (id) => {
    const res = MONTH_HEBREW_1.find((item) => item.id == id )
    return { value: res.name, label: res.name }
} 