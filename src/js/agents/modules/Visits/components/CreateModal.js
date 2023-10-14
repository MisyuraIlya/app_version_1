import React, { useEffect, useState } from 'react';
import MyModal from '../../../ui/MyModal/MyModal';
import MyCheckBox from '../../../ui/MyCheckBox/MyCheckBox';
import MySelectBox from '../../../ui/MySelectBox/MySelectBox';
import { useMyUsers } from '../../../store/UsersStore';
import MyInput from '../../../ui/MyInput/MyInput';
import { HEBREW_DAYS } from '../../../utils/constants/ArrayOfDays';
import { ReactSelectOptionsOfFullHour } from '../../../utils/constants/ReactSelectOptionsOfFullHour';
import { useMyVisits } from '../../../store/VIsitsStore';
import { useDebounce } from 'use-debounce';
import { useMyModal } from '../../../store/ModalStore';
import VisitsSearchInput from './VisitsSearchInput/VisitsSearchInput';
import Select from 'react-select'
const CreateModal = ({closeCreateModal}) => {

    //stores
    const {MyModalMethods} = useMyModal()
    const {MyVisitsMethods,visits} = useMyVisits()
    const {filteredUsers,MyUsersMethods,loading} = useMyUsers()

    //states
    const [searchInput, setSearchInput] = useState('')
    const [isChoosed, setIsChoosed] = useState(false)
    const [choosedDayHebrew, setChoosedDayHewbrew] = useState('בחר יום') 
    const [filterUser, setFIlterUser] = useState({})
    const [valueDebounced] = useDebounce(searchInput, 1000);
    const [week1, setWeek1] = useState(false);
    const [week2, setWeek2] = useState(false);
    const [week3, setWeek3] = useState(false);
    const [week4, setWeek4] = useState(false);
    const [hourFrom, setHourFrom] = useState('')
    const [hourTo, setHourTo] = useState('')

    const daysHebrew = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת']


    //helpers
    const handleOnChangeInput = (target) => {
        setSearchInput(target)
        setIsChoosed(false)
    }

    const handleClickInputSearch = (item) => {
        setFIlterUser(item)
        setSearchInput(item.Name)
        MyUsersMethods.filterByUser(item.Name)
        setIsChoosed(true)
    }

    const handleCreateButton = () => {
        MyModalMethods.setModalOpen(false)
        MyVisitsMethods.creatreVisit(filterUser,week1,week2,week3,week4,choosedDayHebrew,hourFrom,hourTo)
        closeCreateModal()
    }

    //process
    useEffect(() => {
        if(valueDebounced){
            MyUsersMethods.filterByUser(valueDebounced)
        }
    },[valueDebounced])


    return (
        <MyModal title={'צור ביקור'} isButton={true} buttonTitle={'צור ביקור'} buttonClick={handleCreateButton} handleClose={closeCreateModal}>
        <div className='flex-container visitModal'>
            <div className='col-lg-12 modalTitle'>
                <h3>יצירת ביקור</h3>
            </div>
            <div className='col-lg-12 '>
                <div className='myPadding'>
                    <VisitsSearchInput 
                        imgLink={globalFileServer + 'agentApp/User.svg'} 
                        placeholder={'שם לקוח/ מספר לקוח'} 
                        disabled={false} 
                        value={searchInput} 
                        onChange={handleOnChangeInput} 
                        contentArr={filteredUsers} 
                        setContentState={handleClickInputSearch} 
                        choosedValue={isChoosed}
                        loading={loading}
                  />
                    {/* <MyInput imgLink={globalFileServer + 'agentApp/User.svg'} placeholder={'שם לקוח/ מספר לקוח'} disabled={false} value={clientName} onChange={setClientNmae}/> */}
                </div>
            </div>
            <div className='col-lg-12'>
                <div className='myPadding'>
                    <div className='myCenterAlign'>
                        <h4>שבוע</h4>
                    </div>
                    <div className='flex-container days-cont'>
                        <div className=' col-lg-3 colMobile6'>
                            <div className='myCenterAlign'>
                                <div>
                                    <p className='myCenterAlign numCls'>1</p>
                                    <MyCheckBox checked={week1} handleCheckboxChange={setWeek1}/>
                                </div>
                            </div>
                        </div>
                        <div className=' col-lg-3 colMobile6'>
                            <div className='myCenterAlign'>
                                <div>
                                    <p className='myCenterAlign numCls'>2</p>
                                    <MyCheckBox checked={week2} handleCheckboxChange={setWeek2}/>
                                </div>
                            </div>
                        </div>
                        <div className=' col-lg-3 colMobile6'>
                            <div className='myCenterAlign'>
                                <div>
                                    <p className='myCenterAlign numCls'>3</p>
                                    <MyCheckBox checked={week3} handleCheckboxChange={setWeek3}/>
                                </div>
                            </div>
                        </div>
                        <div className=' col-lg-3 colMobile6'>
                            <div className='myCenterAlign'>
                                <div>
                                    <p className='myCenterAlign numCls'>4</p>
                                    <MyCheckBox checked={week4} handleCheckboxChange={setWeek4}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-lg-12 modalSelect '>
                <div className='myPadding'>
                    <div className='myCenterAlign'>
                        <h4>יום בשבוע</h4>
                    </div>
                </div>
                <div className='myPadding selectModal'>
                    {/* <MySelectBox array={daysHebrew}  state={choosedDayHebrew} setState={setChoosedDayHewbrew} /> */}
                    <Select options={HEBREW_DAYS} placeholder={'בחר..'} onChange={(e) => setChoosedDayHewbrew(e.value)} />
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='myPadding'>
                    {/* <MyInput imgLink={globalFileServer + 'agentApp/Calendar.svg'} placeholder={'משעה'} disabled={false} value={hourFrom} onChange={setHourFrom}/> */}
                    <Select options={ReactSelectOptionsOfFullHour} placeholder={'משעה'}  onChange={(e) => setHourFrom(e.value)} />
                </div>
            </div>
            <div className='col-lg-6'>
                <div className='myPadding'>
                    <Select options={ReactSelectOptionsOfFullHour} placeholder={'עד שעה'}  onChange={(e) => setHourTo(e.value)} />
                    {/* <MyInput imgLink={globalFileServer + 'agentApp/Calendar.svg'} placeholder={'עד שעה'} disabled={false} value={hourTo} onChange={setHourTo}/> */}
                </div>
            </div>
        </div>
    </MyModal>
    );
};

export default CreateModal;