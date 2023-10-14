import React, { useEffect, useState } from 'react';

import { useMyVisits } from '../../../../store/VIsitsStore';
import MyCard from '../../../../ui/MyCard/MyCard';
import Wrap from '../../../../ui/Wrap/Wrap';
import { useHistory } from 'react-router-dom';
import { BallClipRotate } from 'react-pure-loaders';
const VisitsList = ({openEditModal}) => {
    //stores
    const history = useHistory()
    const {MyVisitsMethods,visits, loading} = useMyVisits()
    // useEffect(() => {
    //     MyVisitsMethods.fetchVisitsList()
    // },[history.location.pathname])

    return (
        <div className='VisitsList'>
            <div className='head'>
                <div className='flex-container'>
                    <div className='col-lg-5'>
                        <p>לקוח</p>
                    </div>
                    <div className='col-lg-2'>
                        <p>כתובת</p>
                    </div>
                    <div className='col-lg-2'>
                        <p>טלפון</p>
                    </div>
                    <div className='col-lg-1'>
                        <p>שעות</p>
                    </div>
                    <div className='col-lg-1 myCenterAlign'>
                        <p>יום</p>
                    </div>
                    <div className='col-lg-1 myCenterAlign'>
                        <p>פעולות</p>
                    </div>
                </div>
            </div>

            {loading ?
            <div className='loaderHeightMin myCenterAlign myWidth'>
                <div className='myCenterAlign'>
                    <BallClipRotate
                        color={'#000000'}
                        loading={loading}
                    />
                </div>
            </div>    


            :
            visits.map((item,index) => {
                return (
                    <MyCard key={index} props={'myPadding'}>
                        <div className='flex-container'>
                            <div className='col-lg-5 colMobile6 mobileAlign'>
                                <p>{item.ClientName}</p>
                            </div>   
                            <div className='col-lg-2 colMobile6 mobileAlign'>
                                <p>{item.ClientAddress}</p>
                            </div>   
                            <div className='col-lg-2 colMobile6 mobileAlign'>
                                <p>{item.ClientContact}</p>
                            </div>   
                            <div className='col-lg-1 colMobile3 mobileAlign'>
                                {item.HourFrom && item.HourTo 
                                ?
                                <p>{item.HourFrom } - {item.HourTo}</p>
                                :
                                <p>אין תאריכים</p>
                                }
                            </div>     
                            <div className='col-lg-1 colMobile3 myCenterAlign mobileAlign'>
                                <p>{item.ChoosedDay}</p>
                            </div>  
                            {localStorage.role || (localStorage.agent && JSON.parse(localStorage.agent).Super) && 
                                <div className='col-lg-1 colMobile3 myCenterAlign mobileAlign modalBtn' >
                                    <Wrap onClick={() => openEditModal(item)}>
                                        <img src={globalFileServer + 'agentApp/Draw.svg'} />
                                    </Wrap>
                                </div>  
                             }  
                        </div>    
                    </MyCard>    
                )
                })
            }


        </div>

        
    );
};

export default VisitsList;