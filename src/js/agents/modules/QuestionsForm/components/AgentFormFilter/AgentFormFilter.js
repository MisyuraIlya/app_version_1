import React, { useEffect, useState } from 'react';
import { useMyQuestionDocsStore } from '../../../../store/QuestionDocsStore';
import MyCard from '../../../../ui/MyCard/MyCard';
import MyInput from '../../../../ui/MyInput/MyInput';
import MySelectBox from '../../../../ui/MySelectBox/MySelectBox';
import { MONTH_HEBREW_3 } from '../../../../utils/constants/arrayOfMonths';
import { findMonthNumber, findMonthName } from '../../../../utils/helpers/FindMonthNumber';
import Select from 'react-select'
import moment from 'moment';
import MyInputV2 from '../../../../ui/MyInputV2/MyInputV2';
const AgentFormFilter = () => {

    const { MyQuestionDocsStoreMethods,searchValue,year,month, searchValueDebounced } = useMyQuestionDocsStore()

    const dates = [
        { value: moment().year()-1, label: moment().year()-1 },
        { value: moment().year(), label: moment().year() },
        { value: moment().year()+1, label: moment().year()+1 }
      ]
    const changeMonthHandler = (name) => {
        const num = findMonthNumber(name.value)
        MyQuestionDocsStoreMethods.setMonth(num)
    }


    useEffect(() => {
        MyQuestionDocsStoreMethods.filterQuestionAgentForms(year,month)
    },[year,month])

    useEffect(() => {
        if(searchValueDebounced){
            MyQuestionDocsStoreMethods.filterByClientNameAndExtId()
        }
    },[searchValueDebounced])
    return ( 
        <MyCard>
            <div className='flex-container myPadding'>
                <div className='col-lg-3 colMobile12 mobileAlign'>
                    <div className='myPadding colMobile12'>
                        {/* <MySelectBox array={MONTH_HEBREW_2} state={findMonthName(month)} setState={changeMonthHandler}/> */}
                        <Select options={MONTH_HEBREW_3} value={findMonthName(month)} onChange={changeMonthHandler} />
                    </div>
                </div>
                <div className='col-lg-3 colMobile12 mobileAlign'>
                    <div className='myPadding colMobile12'>
                        {/* <MySelectBox array={dates} state={year} setState={MyQuestionDocsStoreMethods.setYear}/> */}
                        <Select options={dates} value={{ value:year, label: year }} onChange={(e) => MyQuestionDocsStoreMethods.setYear(e.value)} />
                    </div>
                </div>
                <div className='col-lg-3 myCenterAlign colMobile12 mobileAlign'>
                    <div className=''>
                        <MyInputV2 placeholder={'חיפוש לפי לקוח'} value={searchValue} onChange={MyQuestionDocsStoreMethods.setSearchValue}/>
                    </div>
                </div>
            </div>
        </MyCard>
    );
};

export default AgentFormFilter;