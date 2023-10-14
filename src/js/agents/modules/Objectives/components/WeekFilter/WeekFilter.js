import React from 'react';
import moment from 'moment';
import { useMyScheduleCalendar } from '../../../../store/ScheduleCalendarStore';
const WeekFilter = () => {

    const {MyScheduleCalendarMethods, weekFrom, weekTo} = useMyScheduleCalendar();
    return (
        <div className='WeekFilter myCenterAlign '>
            <div className='img' onClick={() => MyScheduleCalendarMethods.switchCalendarBackWeek()}>
                <img src={globalFileServer + 'agentApp/RightArrow.png'}/>
            </div>
            <div className='filterDates'>
                <p> {moment(weekFrom).format('DD-MM-YYYY')}  -  {moment(weekTo).format('DD-MM-YYYY')} </p>
            </div>
            <div className='img' onClick={() => MyScheduleCalendarMethods.switchCalendarForwardWeek()}>
                <img src={globalFileServer + 'agentApp/LeftArrow.png'}/>
            </div>
        </div>
    );
};

export default WeekFilter;