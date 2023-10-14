import React, { useEffect } from 'react';
import { shortText } from "limit-text-js";

import { useMyScheduleCalendar } from '../../store/ScheduleCalendarStore';
import Container from '../../ui/Container/ContainerNoFlex';
import MyCard from '../../ui/MyCard/MyCard';
import { BallClipRotate } from 'react-pure-loaders';
import moment from 'moment';
import MyRemainingTimer from '../MyRemainingTimer/MyRemainingTimer';
import BigButton from '../../ui/BigButton/BigButton';
import { useMyDashboard } from '../../store/DashboardStore';
const NearestObjectives = ({openEditHandler}) => {
    const {MyDashboardMethods, todayTask} = useMyDashboard();
    const {MyScheduleCalendarMethods,loading} = useMyScheduleCalendar()
    

    const handleStatusBtn = (tableName,idDocument,status,e) => {
        MyScheduleCalendarMethods.updateStatus(tableName,idDocument,status)
        setTimeout(() => {
            MyDashboardMethods.FetchAllFuncs()
        },1000)
    }


    return (
        <div className='myMarginTop'>
            <MyCard>
                <div className='objectives-cont'>
                    <Container>
                        <div className=''>
                        <h4>המשימות שלך להיום</h4>
                            {loading ?
                            <div className='myCenterAlign loaderHeightMin'>
                                <BallClipRotate
                                    color={'#000000'}
                                    loading={loading}
                                />
                            </div>
                            :
                                <div>
                                    {todayTask.map((item,index) => {
                                        return(
                                            <div key={index} >
                                                <MyCard>
                                                    <div className='flex-container pointer'>
                                                        <div className='col-lg-1 colMobile1 myCenterAlign' onClick={() => openEditHandler(item)}>
                                                            {item.typeId == 1 &&
                                                                <span className="material-symbols-outlined">location_on</span>
                                                            }
                                                            {item.typeId == 2 &&
                                                                <span className="material-symbols-outlined">task</span>
                                                            }
                                                        </div>
                                                        <div className='col-lg-1 colMobile2' onClick={() => openEditHandler(item)}>
                                                            <p>{item.type}</p>
                                                        </div>
                                                        <div className='col-lg-4 colMobile4 long-text' onClick={() => openEditHandler(item)}>
                                                            <p>{item.mission} {item.visit}</p>
                                                        </div>
                                                        <div className='col-lg-1 colMobile6 myCenterAlign' onClick={() => openEditHandler(item)}>
                                                            <p>{item.startHour}</p>
                                                        </div>
                                                        <div className='col-lg-1 colMobile6 myCenterAlign' onClick={() => openEditHandler(item)}>
                                                            <p>{item.endHour}</p>
                                                        </div>
                                                        <div className='col-lg-3 colMobile6 myCenterAlign btns' >
                                                            {item.completedDate ?
                                                                <div>
                                                                    {item.completed ?
                                                                        <div className='myCenterAlign' >
                                                                            <p>בוצע</p>
                                                                        </div>
                                                                    :
                                                                        <div className='myCenterAlign' >
                                                                            <p>לא בוצע</p>
                                                                        </div>
                                                                    }

                                                                </div>
                                                            :
                                                            <div>
                                                                <div>
                                                                    <div className='flex-container'>  
                                                                        <div className='BigButton-cont'>
                                                                            <BigButton googleIcon ='check_circle' imgLink={globalFileServer + '/agentApp/VIcon.png'} color={'suc'} onClickBtn={() => handleStatusBtn(item.tableName,item.idDocument,true)}/>
                                                                        </div>   
                                                                        <div className='BigButton-cont'>
                                                                            <BigButton googleIcon ='block' imgLink={globalFileServer + 'agentApp/+Icon.png'} color={'fal'} onClickBtn={() => handleStatusBtn(item.tableName,item.idDocument,false)}/>
                                                                        </div>   
                                                                    </div>   
                                                                </div>
                                                            </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </MyCard>
                                            </div>    
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    </Container>
                </div>
            </MyCard>
        </div>

    );
};

export default NearestObjectives;