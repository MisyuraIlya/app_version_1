
export const GetWeekNumberFromThisMonth = (startDate, endDate) => {
  const firstDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const startOfFirstWeek = firstDayOfMonth.setDate(1 - firstDayOfWeek);
  const weeks = Math.ceil((startDate - startOfFirstWeek) / (7 * 24 * 60 * 60 * 1000));
  const endOfCurrentWeek = new Date(startOfFirstWeek + (weeks * 7 * 24 * 60 * 60 * 1000));
  if (endOfCurrentWeek <= endDate) {
    console.log(weeks)
    if(weeks == 5){
      return weeks - 1;
    }else{
      return weeks;
    }
    
  } else {
    console.log( weeks - 1)
    return weeks - 1;
  }
}