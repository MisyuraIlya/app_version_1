import React, { useEffect, useState } from 'react';
import { ConvertHebrewNameDayToWeeksDate } from '../../utils/helpers/ConvertHebrewNameDayToWeeksDate';
import { BallClipRotate } from 'react-pure-loaders';
import MyCard from '../../ui/MyCard/MyCard';
import moment from 'moment';
const MobileMyScheduleCalendar = ({daysOfWeek,hoursOfDay,loading,ScheduleCalendarInfo,openEditHandler}) => {
    const [todayName, setTodayName] = useState('')

    const fetchCurrentDay = () => {
        const today = moment().locale('he');
        const dayName = today.format('dddd'); 
        let dayToday = null;
        daysOfWeek.map((item) => {
            if(item == dayName){
                dayToday = item
            }
        })
        setTodayName(dayToday)
    }

    const handleNextDay = () => {
        let previous = null
        for (let i = 0; i < daysOfWeek.length; i++) {
            if (daysOfWeek[i] === todayName) {
                previous = (daysOfWeek[i + 1]);
              break;
            }
        }
        if(!previous){
            const today = moment().locale('he');
            const dayName = today.format('dddd'); 
            let dayToday = null;
            daysOfWeek.map((item) => {
                if(item == dayName){
                    dayToday = item
                }
            })
            previous = dayToday
        }
        setTodayName(previous)
    }

    const handlePreviousDay = () => {
        let previous = null
        for (let i = 0; i < daysOfWeek.length; i++) {
            if (daysOfWeek[i] === todayName) {
                previous = (daysOfWeek[i - 1]);
              break;
            }
        }
        if(!previous){
            const today = moment().locale('he');
            const dayName = today.format('dddd'); 
            let dayToday = null;
            daysOfWeek.map((item) => {
                if(item == dayName){
                    dayToday = item
                }
            })
            previous = dayToday
        }
        setTodayName(previous)
    }

    useEffect(() => {
        fetchCurrentDay()
    },[])
    return (
        <>
            <div className='myPadding myWidth'>
                    <div className='flex-container myCenterAlign'>
                        <div className='myPadding'>
                            <img src={globalFileServer+'agentApp/RightArrow.png'} onClick={() => handlePreviousDay()}/>
                        </div>
                        <div className='myPadding'>
                            <span>{todayName}</span>
                        </div>
                        <div className='myPadding'>
                            <img src={globalFileServer+'agentApp/LeftArrow.png'} onClick={() => handleNextDay()}/>
                        </div>
                    </div>
            </div>

            <div className="weekly-scheduler">
                <div className="header">
                <div className="cell img_time">
                    <img src={globalFileServer + 'agentApp/Time.png'} />
                </div>
                {daysOfWeek.map((day,index) => {
                    if(day === todayName){
                        return (
                            <div key={day} className="cell day myCenterAlign">
                            <p>
                                {day} - {ConvertHebrewNameDayToWeeksDate(index)}
                            </p>
                            </div>
                        )
                    }

                })}
                </div>
                <div className="body">

                {loading ?
                
                <div className='myCenterAlign loaderHeightMin'>
                    <BallClipRotate
                    color={'#000000'}
                    loading={loading}
                    />
                </div>  

                :
                
                hoursOfDay.map(hour => (
                    <div key={hour} className="row">
                    <div className="cell hour">
                        <p>{hour}</p>
                    </div>
                    {daysOfWeek.map(day => {
                        if(day === todayName){
                            return (
                                <div key={`${day}-${hour}`} className="cell">
                                {ScheduleCalendarInfo.map(event => {
                                    if (event.dayOfWeek === day && event.startHour === hour) {
                                    const eventDuration = hoursOfDay.indexOf(event.endHour) - hoursOfDay.indexOf(event.startHour) ;
                                    return (
                                        <div key={`${day}-${hour}-${event.startHour} event`} className={`event_${event.typeId}`} style={{ height: `${eventDuration * 100}px` }} onClick={() => openEditHandler(event)}>
                                        <div className={`entire`}>
                                            <div className="head">
                                            <div className='hour_card'>
                                            {event.endHour}
                                            </div>  
                                            <div className='hour_card'>
                                            {event.startHour}
                                            </div>  
                                            </div>  
                                            <div className='cont_block'>
                                            <div className='heading'>
                                            {event.subTusk? 
                                                <h3>{event.subTusk.length} משולב</h3>
                                                :
                                                <h3>{event.type}</h3>
                
                                                
                                                }
                                            </div>  
                                            <div className='title_cont'>
                                                <p>{event.mission} {event.visit}</p>
                                            </div>  
                                            </div>  
                                        </div>
                                        </div>
                                    );
                                    }
                                    return null;
                                })}
                                {/* <button onClick={() => addEvent(day, hour, hoursOfDay[hoursOfDay.indexOf(hour) + 1])}>Add Event</button> */}
                                </div>
                            )
                        }

                    })}
                    </div>
                ))
                
                }

                </div>
            </div>
        </>

    );
};

export default MobileMyScheduleCalendar;