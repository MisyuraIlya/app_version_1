import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useMyScheduleCalendar } from '../../store/ScheduleCalendarStore';
import { COnvertHebrewNameDayToWeekDateByWeekRane } from '../../utils/helpers/ConvertHebrewNameDayToWeeksDate';
import { BallClipRotate } from 'react-pure-loaders';
import MobileMyScheduleCalendar from './MobileMyScheduleCalendar';

const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
const hoursOfDay = ['06:00','07:00','08:00','09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

const Cal = ({openEditHandler}) => {

    const {MyScheduleCalendarMethods,ScheduleCalendarInfo,weekFrom, weekTo, loading} = useMyScheduleCalendar();
   
    const addEvent = (dayOfWeek, startHour, endHour) => {
      setEvents(prevEvents => [...prevEvents, { dayOfWeek, startHour, endHour }]);
    };

    useEffect(() => {
      MyScheduleCalendarMethods.fetchAgentCalendar(weekFrom,weekTo)
    },[])

    return (
      <>
      {window.innerWidth > 1000 ?
          <div className="weekly-scheduler myMarginBottom">
            <div className="header">
              <div className="cell img_time">
                <img src={globalFileServer + 'agentApp/Time.png'} />
              </div>
              {daysOfWeek.map((day,index) => (
                <div key={day} className="cell day">
                  <p>
                    {day} - {COnvertHebrewNameDayToWeekDateByWeekRane(index,weekFrom)}
                  </p>
                </div>
              ))}
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
                  {daysOfWeek.map(day => (
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
                                  {/* <div className='title_cont'>
                                    <p>{event.mission} {event.visit}</p>
                                  </div>   */}
                                </div>  
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                      {/* <button onClick={() => addEvent(day, hour, hoursOfDay[hoursOfDay.indexOf(hour) + 1])}>Add Event</button> */}
                    </div>
                  ))}
                </div>
              ))
              
              }
    
            </div>
          </div>
    
      :

      <MobileMyScheduleCalendar 
      daysOfWeek={daysOfWeek}
      hoursOfDay={hoursOfDay}
      loading={loading}
      ScheduleCalendarInfo={ScheduleCalendarInfo}
      openEditHandler={openEditHandler}
      />
      
      }
      </>

    );
};

export default Cal;