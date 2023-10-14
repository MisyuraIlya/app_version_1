import React, { useState, useEffect} from 'react';
import MyCard from '../../ui/MyCard/MyCard';
import MySelectBox from '../../ui/MySelectBox/MySelectBox';
import Container from '../../ui/Container/Container'
import {useMyTarget} from '../../store/TargetStore';
import { useHistory } from 'react-router-dom';
import { FetchHistoryAgentId } from '../../utils/helpers/FetchHistoryAgentId';
import Select from 'react-select'
import moment from 'moment';
const YearSelectorBanner = (params) => {
    const history = useHistory()
    const {MyTargetMethods,years,choosedYear} = useMyTarget();

    const dates = [
        { value: moment().year()-1, label: moment().year()-1 },
        { value: moment().year(), label: moment().year() },
        { value: moment().year()+1, label: moment().year()+1 }
      ]

    useEffect(() => {
        MyTargetMethods.fetchTargetList()

    },[choosedYear])
    return (
            <div className={params.isDashborad ? 'flex-container' : 'flex-container myPadding'}>
                <div className='col-lg-2 colMobile12 mobileAlign'>
                    {/* <MySelectBox array={years} state={choosedYear} setState={MyTargetMethods.setChoosedYear}/> */}
                    <Select options={dates} placeholder={'בחר שנה'} value={{ value:choosedYear, label: choosedYear }} onChange={(e) => MyTargetMethods.setChoosedYear(e.value)} />
                </div>
            </div>
    );
};

export default YearSelectorBanner;