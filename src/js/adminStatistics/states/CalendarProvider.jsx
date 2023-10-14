import React, { createContext, useState, useContext, useEffect }from 'react';
import { ajax } from '../enums/AjaxFunction';
import { useShop } from './ShopProvider';



const MyCalendarContex = createContext();

const useMyCalendar = () => {
    const context = useContext(MyCalendarContex);
    if (!context) {
      throw new Error('Can not run without "ProductsProvider"');
    }
    return context;
  }



const MyCalendarProvider = (props) => {

    const [openCalendar, setOpenCalendar] = useState(false)
    const [dateFrom ,setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [dataType, setDataType] = useState('')
    const {shopMethods} = useShop()

    const CalengarHandler = (e) => {
        setOpenCalendar(!openCalendar)
        setDataType(e)
    }

    const CalendatSetDate = (e) => {
        if(dataType == 1){
            setDateFrom(e)
        }

        if(dataType == 2){
            setDateTo(e)
        }

        setOpenCalendar(false)
    }

    const FindButtonHandler = (currentDateFrom, currentDateTo) => {
        if(currentDateFrom && currentDateTo) {
            shopMethods.getData(currentDateFrom,currentDateTo)
        } else {
            shopMethods.getData(dateFrom,dateTo)
        }


    }

    // useEffect(() => {
    //     getData()
    // },[dateTo,dateFrom])


    const methods = {
        setOpenCalendar,
        CalengarHandler,
        CalendatSetDate,
        FindButtonHandler,
        setDateFrom,
        setDateTo
      };

    return (
        <MyCalendarContex.Provider value={{
            openCalendar,
            dateFrom,
            dateTo,
            dataType,
            methods,
          }} {...props} />
    );
};



export { useMyCalendar, MyCalendarProvider };
