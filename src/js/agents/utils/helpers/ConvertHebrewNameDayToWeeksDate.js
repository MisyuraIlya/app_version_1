import moment from "moment"
export const ConvertHebrewNameDayToWeeksDate = (numberDay) => {
    
    const date = moment().day(numberDay);
    const dayOfWeek = date.day();
    const dateString = date.format('DD-MM');
    return dateString
    
}

export const COnvertHebrewNameDayToWeekDateByWeekRane = (numberDay, weekFrom) => {
      const startDate = moment(weekFrom, 'MM/DD/YYYY').startOf('week');
      const targetDate = startDate.clone().add(numberDay , 'days');
      return targetDate.format('DD-MM');
}