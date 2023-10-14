import React, { useEffect, useState } from 'react';
import MyModal from '../../../ui/MyModal/MyModal';
import MySelectBox from '../../../ui/MySelectBox/MySelectBox';
import MyInput from '../../../ui/MyInput/MyInput';
import MyCheckBox from '../../../ui/MyCheckBox/MyCheckBox';
import { HEBREW_DAYS } from '../../../utils/constants/ArrayOfDays';
import { ReactSelectOptionsOfFullHour } from '../../../utils/constants/ReactSelectOptionsOfFullHour';

import { useMyModal } from '../../../store/ModalStore';
import { useMyVisits } from '../../../store/VIsitsStore';
import Select from 'react-select'
const EditModal = ({objectInfo,closeEditModal}) => {
    
    //myStore
    const {MyVisitsMethods} = useMyVisits();
    const {MyModalMethods} = useMyModal();

    //states
    const [objectId, setObjectId] = useState(objectInfo.Id)
    const [objectClientName, setObjectClientName] = useState(objectInfo.ClientName)
    const [objectWeek1, setObjectWeek1] = useState(objectInfo.Week1)
    const [objectWeek2, setObjectWeek2] = useState(objectInfo.Week2)
    const [objectWeek3, setObjectWeek3] = useState(objectInfo.Week3)
    const [objectWeek4, setObjectWeek4] = useState(objectInfo.Week4)
    const [objectWeekChoosed, setObjectWeekChoosed] = useState(objectInfo.ChoosedDay)
    const [objectFromHour, setObjectFromHour] = useState(objectInfo.HourFrom)
    const [objectToHour, setObjectToHour] = useState(objectInfo.HourTo)

    const daysHebrew = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת']

    //helpers
    const handleClick = () => {
        MyVisitsMethods.editVisits(
            objectId,
            objectClientName,
            objectWeek1,
            objectWeek2,
            objectWeek3,
            objectWeek4,
            objectWeekChoosed,
            objectFromHour,
            objectToHour
        )
        MyModalMethods.setModalOpen(false)
        setObjectId('')
        setObjectClientName('')
        setObjectWeek1('')
        setObjectWeek2('')
        setObjectWeek3('')
        setObjectWeek4('')
        setObjectWeekChoosed('')
        setObjectFromHour('')
        setObjectToHour('')
        closeEditModal()
    }

    const handleUnpublishVisit = () => {
        MyVisitsMethods.unpublishVisit(objectId)
        MyModalMethods.setModalOpen(false)
        setObjectId('')
        setObjectClientName('')
        setObjectWeek1('')
        setObjectWeek2('')
        setObjectWeek3('')
        setObjectWeek4('')
        setObjectWeekChoosed('')
        setObjectFromHour('')
        setObjectToHour('')
        closeEditModal()
    }

    //process
    useEffect(() => {
        setObjectId(objectInfo.Id)
        setObjectClientName(objectInfo.ClientName)
        setObjectWeek1(objectInfo.Week1)
        setObjectWeek2(objectInfo.Week2)
        setObjectWeek3(objectInfo.Week3)
        setObjectWeek4(objectInfo.Week4)
        setObjectWeekChoosed(objectInfo.ChoosedDay)
        setObjectFromHour(objectInfo.HourFrom)
        setObjectToHour(objectInfo.HourTo)
    },[objectInfo]) 

    return (
        <MyModal title={'עדכן ביקור'} isButton={true} buttonTitle={'עדכן ביקור'} buttonClick={handleClick} isDeleteButton={true} deleteButton={handleUnpublishVisit} handleClose={closeEditModal}>
        <div className='flex-container visitModal'>
            <div className='col-lg-12 modalTitle'>
                <h3>עדכון ביקור</h3>
            </div>
            <div className='col-lg-12 '>
                <div className='myPadding'>
                    <MyInput imgLink={globalFileServer + 'agentApp/User.svg'} placeholder={'שם לקוח'} disabled={true} value={objectClientName} onChange={setObjectClientName}/>
                </div>
            </div>
            <div className='col-lg-12'>
                <div className='myPadding'>
                    <div className='myCenterAlign'>
                        <h4>שבוע</h4>
                    </div>
                    <div className='flex-container days-cont'>
                        <div className=' col-lg-3'>
                            <div className='myCenterAlign'>
                                <div>
                                    <p className='myCenterAlign numCls'>1</p>
                                    <MyCheckBox checked={objectWeek1} handleCheckboxChange={setObjectWeek1}/>
                                </div>
                            </div>
                        </div>
                        <div className=' col-lg-3'>
                            <div className='myCenterAlign'>
                                <div>
                                    <p className='myCenterAlign numCls'>2</p>
                                    <MyCheckBox checked={objectWeek2} handleCheckboxChange={setObjectWeek2}/>
                                </div>
                            </div>
                        </div>
                        <div className=' col-lg-3'>
                            <div className='myCenterAlign'>
                                <div>
                                    <p className='myCenterAlign numCls'>3</p>
                                    <MyCheckBox checked={objectWeek3} handleCheckboxChange={setObjectWeek3}/>
                                </div>
                            </div>
                        </div>
                        <div className=' col-lg-3'>
                            <div className='myCenterAlign'>
                                <div>
                                    <p className='myCenterAlign numCls'>4</p>
                                    <MyCheckBox checked={objectWeek4} handleCheckboxChange={setObjectWeek4}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-12 modalSelect'>
                <div className='myPadding'>
                    <div className='myCenterAlign'>
                        <h4>יום בשבוע</h4>
                    </div>
                </div>
                <div className='myPadding selectModal'>
                    {/* <MySelectBox array={daysHebrew}  state={objectWeekChoosed} setState={setObjectWeekChoosed} /> */}
                    <Select options={HEBREW_DAYS} placeholder={'בחר..'} value={{ value: objectWeekChoosed, label: objectWeekChoosed}} onChange={(e) => setObjectWeekChoosed(e.value)} />
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='myPadding'>
                    <Select options={ReactSelectOptionsOfFullHour} placeholder={'משעה'} value={{ value: objectFromHour, label: objectFromHour}} onChange={(e) => setObjectFromHour(e.value)} />
                    {/* <MyInput imgLink={globalFileServer + 'agentApp/Calendar.svg'} placeholder={'משעה'} disabled={false} value={objectFromHour} onChange={setObjectFromHour}/> */}
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='myPadding'>
                    <Select options={ReactSelectOptionsOfFullHour} placeholder={'עד שעה'}  value={{ value: objectToHour, label: objectToHour}} onChange={(e) => setObjectToHour(e.value)} />
                    {/* <MyInput imgLink={globalFileServer + 'agentApp/Calendar.svg'} placeholder={'עד שעה'} disabled={false} value={objectToHour} onChange={setObjectToHour}/> */}
                </div>
            </div>
        </div>
    </MyModal>
    );
};

export default EditModal;