import React, { useEffect, useState } from 'react';
import { useMyTarget } from '../../../../store/TargetStore';
import { useHistory } from 'react-router-dom';
import { FetchHistoryAgentId } from '../../../../utils/helpers/FetchHistoryAgentId';
import Wrap from '../../../../ui/Wrap/Wrap'
import MyCard from '../../../../ui/MyCard/MyCard';
import { ConvertNumberToHebrewMonth } from '../../../../utils/helpers/ConvertNumberToHebrewMonth';
import { BallClipRotate } from 'react-pure-loaders';
const TargetList = ({handleOpenModal}) => {

    //stores
    const {MyTargetMethods,targets,loading} = useMyTarget()

    const history = useHistory()

/*
parseInt(item.TargetValue)
parseInt(item.CurrentValue)
*/

    const completedType = (item) => {
        let answer = '';
        let bg = 'primaryWrap'
        if(!item.TargetValue || !item.CurrentValue){
            bg = 'primaryWrap'
            answer = 'ממתין'
        } else {
            if(parseInt(item.CurrentValue) > parseInt(item.TargetValue)){
                bg = 'successWrap'
                answer = 'הגיע ליעד'
            }else{
                bg = 'errorWrap'
                answer = 'לא הגיע'
            }

        }
        
        
        
      
        return (
            <Wrap bg={bg}>
                {answer}
            </Wrap>
        )
    }
    const numberWithCommas = (x)=> {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    useEffect(() => {
        MyTargetMethods.fetchTargetList(FetchHistoryAgentId(history))
    },[])

    return (
        <div className='TargetList'>
            <div className='head myDesktop'>
                <div className='flex-container'>
                    <div className='col-lg-2 col-1'>
                        <p>תאריך</p>
                    </div>
                    <div className='col-lg-2 col-2'>
                        <p>מחזור</p>
                    </div>
                    <div className='col-lg-2 col-3'>
                        <p>יעד</p>
                    </div>
                    <div className='col-lg-2 col-4'>
                        <p>מחזור</p>
                    </div>
                    <div className='col-lg-2 myCenterAlign col-5'>
                        <p>סטאטוס</p>
                    </div>
                    <div className='col-lg-1 myCenterAlign col-6'>
                        <p>פעולות</p>
                    </div>
                </div>
            </div>
            {loading ?
                <div className='myCenterAlign loaderHeigth'>
                    <BallClipRotate
                        color={'#000000'}
                        loading={loading}
                    />
                </div>   
            :
            <div>
            {targets.map((item,index) => {

                return (
                    <MyCard key={index} props={'myPadding'}>
                        <div className='flex-container body'>
                            <div className='col-lg-2 colMobile4 mobileAlign col-1'>
                                <p>{ConvertNumberToHebrewMonth(item.Month)}</p>
                            </div>   
                            <div className='col-lg-2 colMobile4 mobileAlign col-2'>
                                <p>חודשי</p>
                            </div>   
                            <div className='col-lg-2 colMobile6 mobileAlign col-3'>
                                <p>{item.TargetValue ? numberWithCommas(parseInt(item.TargetValue)) : ''}</p>
                            </div>   
                            <div className='col-lg-2 colMobile6 mobileAlign col-4'>
                                <p>{item.CurrentValue ? numberWithCommas(parseInt(item.CurrentValue)) : ''}</p>
                            </div>     
                            <div className='col-lg-2 myCenterAlign colMobile6 mobileAlign col-5'>
                                    {completedType(item)}
                            </div>  
                            {localStorage.role || (localStorage.agent && JSON.parse(localStorage.agent).Super) && 
                                <div className='col-lg-1 myCenterAlign modalBtn colMobile6 mobileAlign col-6' onClick={() => handleOpenModal(item)}>
                                    <Wrap>
                                        <img src={globalFileServer + 'agentApp/Draw.svg'} />
                                    </Wrap>
                                </div>  
                            }  
                        </div>    
                    </MyCard>    
                )
            })}
        </div>
            }
        </div>
    );
};

export default TargetList;