import React, { useEffect, useState } from 'react';
import { useMyModal } from '../../../store/ModalStore';
import { useMyTarget } from '../../../store/TargetStore';
import { useMyAgent } from '../../../store/AgentStore';
import MyModal from '../../../ui/MyModal/MyModal';
import MyInput from '../../../ui/MyInput/MyInput';
import { ConvertNumberToHebrewMonth } from '../../../utils/helpers/ConvertNumberToHebrewMonth';
const EditModal = ({objectInfo,handleCloseModal}) => {

    //stores
    const {MyModalMethods} = useMyModal()
    const {MyTargetMethods} = useMyTarget()
    const {agentInfo} = useMyAgent()
    //states 

    const [currentTargetValue, setCurrentTargetValue] = useState(objectInfo.CurrentValue)
    const [targetValue, setTargetValue] = useState(objectInfo.TargetValue)

    const handleClick = () => {
        MyTargetMethods.editTarget(objectInfo.Month,currentTargetValue,targetValue)
        MyModalMethods.setModalOpen(false)
        setCurrentTargetValue('')
        setTargetValue('')
        handleCloseModal()
    }

    useEffect(() => {
        setCurrentTargetValue(objectInfo.CurrentValue)
        setTargetValue(objectInfo.TargetValue)
    },[objectInfo])

    return (
        <MyModal title={'עדכן יעד'} isButton={true} buttonTitle={'עדכן יעד'} buttonClick={handleClick}>
        <div className='flex-container'>
            <div className='col-lg-12'>
                <h3>עדכון יעד</h3>
            </div>
            <div className='col-lg-6 '>
                <div className='myPadding'>
                    <MyInput googleIcon='support_agent' imgLink={globalFileServer + 'agentApp/User.svg'} placeholder={'סוכן'} disabled={true} value={agentInfo.Name}/>
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='myPadding'>
                    <MyInput googleIcon='calendar_month' imgLink={globalFileServer + 'agentApp/Calendar.svg'} placeholder={'תאריך'} disabled={true} value={ConvertNumberToHebrewMonth(objectInfo.Month) + ' ' +  objectInfo.Year }/>
                </div>
            </div>
            {/*
            <div className='col-lg-6 '>
                <div className='myPadding'>
                    <MyInput imgLink={globalFileServer + 'agentApp/Cart.svg'} placeholder={'מחזור'} disabled={false} value={currentTargetValue} onChange={setCurrentTargetValue}/>
                </div>
            </div>
            */}
            <div className='col-lg-6'>
                <div className='myPadding'>
                    <MyInput googleIcon='paid' imgLink={globalFileServer + 'agentApp/Icon.svg'} placeholder={'יעד'} disabled={false} value={targetValue} onChange={setTargetValue}/>
                </div>
            </div>
            
        </div>
    </MyModal>
    );
};

export default EditModal;