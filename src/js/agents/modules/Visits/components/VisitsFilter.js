import React from 'react';
import MyCard from '../../../ui/MyCard/MyCard';
import MyInputV2 from '../../../ui/MyInputV2/MyInputV2';
import { useMyQuestionDocsStore } from '../../../store/QuestionDocsStore';
import { useMyVisits } from '../../../store/VIsitsStore';
const VisitsFilter = () => {

    const {MyVisitsMethods,searchValue} = useMyVisits()
    
    return (
        <MyCard>
            <div className='flex-container myPadding'>
                <div className='col-lg-3 colMobile12 mobileAlign'>
                    <div className=''>
                        <MyInputV2 placeholder={'חיפוש לפי לקוח'} value={searchValue} onChange={MyVisitsMethods.setSearchValue}/>
                    </div>
                </div>
            </div>
        </MyCard>
    );
};

export default VisitsFilter;