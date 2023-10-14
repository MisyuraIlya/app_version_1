export const ConvertNumberStringToFullHour = (number) => {
    let num = null
    if(number < 10){
        num = "0" + number + ":00"
    } else {
        num = number+":00"
    }
    return num 
}