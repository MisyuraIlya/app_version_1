//globals
import React, {useState} from 'react';
import moment from 'moment';
import { BallClipRotate } from 'react-pure-loaders';
import { useForm, Controller } from "react-hook-form";
import ReactSelect from 'react-select'
import { shortText } from "limit-text-js";
//locals
import MySelectBoxV2 from '../../../../ui/MySelectBoxV2/MySelectBoxV2';
import MyModal from '../../../../ui/MyModal/MyModal';
import { useMyScheduleCalendar } from '../../../../store/ScheduleCalendarStore';
import Wrap from '../../../../ui/Wrap/Wrap'
import MyTextArea from '../../../../ui/MyTextArea/MyTextArea';
import { ReactSelectOptionsOfFullHour } from '../../../../utils/constants/ReactSelectOptionsOfFullHour';
import MyCard from '../../../../ui/MyCard/MyCard';
import MyButton from '../../../../ui/MyButton/MyButton';
import ClientSearchInput from '../../../../components/ClientsSearchInput/ClientSearchInput';
import MyDivider from '../../../../ui/MyDivider/MyDivider';
import MyRemainingTimer from '../../../../components/MyRemainingTimer/MyRemainingTimer';
import BigButton from '../../../../ui/BigButton/BigButton';
// import { ConvertNumberStringToFullHour } from '../../../../utils/helpers/ConvertNumberStringToFullHour';

// type 1 - visit
// type 2 - object 
// type 3 - multiple
// moment.locale('he'); 
const SubTaskList = ({ dayName, subTasks, hourFrom, hourTo,handleSetSubTask}) => {



    return (
        <div className='taskList'>
            <div className='myCenterAlign'>  
                <h3>בחר משימה - יום {dayName} בין השעות {hourFrom} - {hourTo}</h3>   
            </div>
            <div>
            {/*
            <div className='heading myPadding'>
                <div className='flex-container'>
                    <div className='col-lg-1 myCenterAlign'>
                        <p>#</p>
                    </div>
                    <div className='col-lg-2 myCenterAlign'>
                        <div className='myPadding'>
                            <img src={globalFileServer + 'agentApp/Icon.svg'}  style={{width:'20px', height:'20px'}} />
                        </div>
                        <div className='myPadding'>
                            <p>משימה</p>
                        </div>
                    </div>
                    <div className='col-lg-2 myCenterAlign flex-contianer'>
                        <div className='myPadding'>
                            <img src={globalFileServer + 'agentApp/Time.svg'}  style={{width:'20px', height:'20px'}} />
                        </div>
                        <div className='myPadding'>
                            <p>שעות</p>
                        </div>
                    </div>
                    <div className='col-lg-3 myCenterAlign'>
                        <div className='myPadding'>
                            <img src={globalFileServer + 'agentApp/message.svg'}  style={{width:'20px', height:'20px'}} />
                        </div>
                        <div className='myPadding'>
                            <p>פירוט</p>
                        </div>

                    </div> 
                    <div className='col-lg-3 myCenterAlign'>
                        <p>ביצוע</p>
                    </div>
                </div>
            </div>
            <MyDivider/>
            */}
            <div className='list '>
            {subTasks.map((item,index) => {
                    return(
                        <>
                        <div className='myPadding'>
                            <MyCard>
                                <div className=' pointer' key={index} onClick={() => handleSetSubTask(item)}>
                                    <div className='col-lg-2 myCenterAlign'>
                                        <div className='myPadding type'>
                                            <span>{item.type}</span>
                                        </div>
                                    </div>    
                                    <div className='col-lg-2 myCenterAlign'>
                                        <div className='myPadding'>
                                            <span>{item.startHour} - {item.endHour}</span>
                                        </div>
                                    </div>    
                                    <div className='col-lg-3 myCenterAlign'>
                                        <div className='myPadding'>
                                            <span>{item.mission} {item.visit}</span>
                                        </div>
                                    </div>    
                                    <div className='col-lg-3 myCenterAlign'>
                                        <div className='myPadding'>
                                            <span>{item.completed ? moment(item.completedDate).locale('he').format('LLLL'): 'ממתין'} </span>
                                        </div>
                                    </div> 
                                </div>  
                            </MyCard>  
                        </div>    
                        </>
                    )
                })}
            </div>

            </div>
        </div>
    )
}

const ModalInfo = ({modalInfo,setEditMode, canBack, backFunction,closeEditHandler}) => {
    let dateTime = `${modalInfo.date}T${modalInfo.endHour}:00`;
    const targetTime = Date.parse(dateTime);
    const currentTime = Date.now();
    const remaining = (targetTime - Date.now()) > 0;

    const {MyScheduleCalendarMethods} = useMyScheduleCalendar()

    const handleStatusBtn = (status) => {
        MyScheduleCalendarMethods.updateStatus(modalInfo.tableName,modalInfo.idDocument,status)
        closeEditHandler()
    }

    return (
        <div>
            <div className='flex-container'>
                {/* <div className='col-lg-6 myCenterAlign'>
                    <div className='flex-container'>
                        <div className='myPadding'>
                            <img src={globalFileServer + 'agentApp/Time.svg'} />
                        </div>
                        <div className='myPadding'>
                            <span>תאריך הקמה</span>
                        </div>
                        <div className='myPadding'>
                            <span>{moment(modalInfo.DbDate).format('DD-MM-YYYY')}</span>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6 myCenterAlign'>
                    <div className='flex-container'>
                        <div className='myPadding'>
                            <img src={globalFileServer + 'agentApp/Time.svg'} />
                        </div>
                        <div className='myPadding'>
                            <span> משעה</span>
                        </div>
                        <div className='myPadding'>
                            <span>{moment(modalInfo.ObjectiveDate).format('DD-MM-YYYY')}</span>
                        </div>
                    </div>
                </div> */}
            </div>
            {/* <div className='myPadding'>
                <MyDivider/>
            </div> */}
        <div className='flex-container hours-cont'>
            <h3 className='myMarginBottom' >{modalInfo.type}</h3>
            <div className='hours-box col-lg-12 myMarginBottom'>
                <div className='flex-container flex'>
                    <span className="material-symbols-outlined">calendar_month</span>
                    <span>תאריך</span>
                    <span>{modalInfo.date}</span>
                </div>
            </div>
            <div className='hours-box'>
                <div className='flex-container flex'>
                    <span className="material-symbols-outlined">schedule</span>
                    <span>משעה</span>
                    <span>{modalInfo.startHour}</span>
                </div>
            </div>
            <div className='hours-box myMarginBottom'>
                <div className='flex-container flex'>
                    <span className="material-symbols-outlined">schedule</span>
                    <span>עד שעה</span>
                    <span>{modalInfo.endHour}</span>
                </div>
            </div>
        </div>  
        <div className=''>
            <MyDivider/>
        </div>
        <div className='flex-container myMarginTop'>
            <div className='col-lg-12'>
                <div className='flex-container flex'>
                    <span className="material-symbols-outlined">event_note</span>
                    <div className='myPadding'>
                        <span>{modalInfo.description}</span>
                    </div>
                </div>
            </div>
        </div>
        {console.log('modalInfo',modalInfo)}
        {modalInfo.completedDate ?
            <div>
                {
                    modalInfo.completed ? 
                    <div>
                        <div className='myCenterAlign'>
                            <h4>המשימה הושלמה</h4>
                        </div>
                {/*
                        <div className='myCenterAlign'>
                            <span>ב{moment(modalInfo.completedDate).locale('he').format('LLLL')}</span>
                        </div>
                */}
                    </div>    
                    :
                    <div>
                        <div className='myCenterAlign'>
                            <h4>המשימה לא הושלמה</h4>
                        </div>
                        {/*
                        <div className='myCenterAlign'>
                            <span>ב{moment(modalInfo.completedDate).locale('he').format('LLLL')}</span>
                        </div>
                        */}
                    </div>
                }
            </div>
        :
        <div className='myCenterAlign'>
       
        <div className="modal-mark-cont">
            {/*
            <div className='myCenterAlign'>
                <h3>המשימה הסתיימה</h3>
            </div>
            */}   
            <div className='myCenterAlign'>
                <h4>המשימה הושלמה?</h4>
            </div> 
            <div className='flex-container'>
                <div>
                </div>    
                <div className='myPadding'>
                    <BigButton googleIcon ='check_circle' imgLink={globalFileServer + '/agentApp/VIcon.png'} color={'suc'} onClickBtn={() => handleStatusBtn(true)}/>
                </div>    
                <div className='myPadding'>
                    <BigButton googleIcon ='block' imgLink={globalFileServer + 'agentApp/+Icon.png'} color={'fal'} onClickBtn={() => handleStatusBtn(false)}/>
                </div>  
            </div>   
        </div>    

        
    </div>
        }


        {canBack &&
             <div className='close_btn' onClick={() => backFunction()}>
                <span className="material-symbols-outlined">keyboard_backspace</span>
            </div>
            
        }
        <div className='flex-container'>
            
            {localStorage.role ? 
                <div className='myPadding'>
                    <MyButton title={'עדכון'} buttonClick={() => setEditMode(true)}/>
                </div>
            :null}
        </div>  
    </div>
    )
}

const EditableMode = ({modalInfo,setEditMode, handleBackToInfo, chooseAccount, setChoosedAccount, doneEditHandler,closeEditHandler}) => {
    const defaultValues = {
        HoursFromSelect: { value:modalInfo.startHour,label:modalInfo.startHour},
        HoursToSelect:{ value:modalInfo.endHour,label:modalInfo.endHour},
    }

    const {MyScheduleCalendarMethods} = useMyScheduleCalendar()
    const { register, handleSubmit, control } = useForm({ defaultValues });

    const handleUnpublishMission = () => {
        MyScheduleCalendarMethods.unpublushMission(modalInfo.tableName,modalInfo.idDocument)
        closeEditHandler()
    }
    return (
    <>
        <form>
            <div className='flex-container'>
                <div className='col-lg-12'>
                    <p>ביצוע - {moment(modalInfo.ObjectiveDate).format('DD-MM-YYYY')}</p>
                </div>
            </div>

            <div className='flex-container'>
                <div className='col-lg-6'>
                    <div className='myPadding'>
                    <Controller
                        name="HoursFromSelect"
                        control={control}
                        render={({ field }) => (
                        <ReactSelect
                            isClearable
                            {...field}
                            options={ReactSelectOptionsOfFullHour}
                        />
                        )}
                    />
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='myPadding'>
                        <Controller
                            name="HoursToSelect"
                            control={control}
                            render={({ field }) => (
                            <ReactSelect
                                isClearable
                                {...field}
                                options={ReactSelectOptionsOfFullHour}
                            />
                            )}
                        />
                    </div>
                </div>
            </div>

            {modalInfo.typeId == 2 &&
                <div>
                    <p>פירוט..</p>
                    <MyTextArea  props={{...register(`description`, { value: modalInfo.description })}} placeholder={'פירוט'}/>
                </div>
            }

            {modalInfo.typeId == 1 &&
                <div>
                    {/* <p>בחר לקוח</p> */}
                    {/* <ClientSearchInput value={chooseAccount} onChange={setChoosedAccount}/> */}
                </div>
            }




        </form>
        <div className='flex-container'>
            <div className='col-lg-6'>
                <div className='flex-container'>
                    {/*
                    <div className='myPadding'>
                        <span className="pointer MyAlign">חזרה</span>
                        <span onClick={() => handleBackToInfo()} className="material-symbols-outlined">arrow_back</span>
                         <MyButton title={'חזרה'} buttonClick={() => handleBackToInfo()}/>
                    </div> */}
                    <div className='myPadding'>
                        <MyButton title={'עדכן'} buttonClick={handleSubmit(doneEditHandler)}/>
                    </div>
                    <div className='myPadding'>
                        <MyButton title={'מחק'} buttonClick={() => handleUnpublishMission()} color={'red'}/>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

const EditModal = ({closeEditHandler}) => {
    const {modalInfo,modalLoading,MyScheduleCalendarMethods} = useMyScheduleCalendar()
    const [chooseAccount, setChoosedAccount] = useState(null)

    const [editMode, setEditMode] = useState(false)
    const [choosedSubTask, setChoosedSubTask] = useState({})
    const doneEditHandler = (data) => {
        let documentId = null;
        let tableName = null;
        if(choosedSubTask.idDocument){
            documentId = choosedSubTask.idDocument
            tableName = choosedSubTask.tableName
        } else {
            documentId = modalInfo.idDocument
            tableName = modalInfo.tableName
        }
        
        if(chooseAccount){
            data['clientToChange'] = chooseAccount
        }
        MyScheduleCalendarMethods.editDocument(data,documentId,tableName)
        closeEditHandler()
    }
    
    const backFunction = () => {
        setChoosedSubTask({})
    }

    const handleClose = () => {
        setEditMode(false)
        setChoosedSubTask({})
    }

    const handleBackToInfo = () => {
        setEditMode(false)
    }

    const handleSetSubTask = (task) => {
        setChoosedSubTask(task)
        setChoosedAccount(task.visit)
    }

    return (
        <MyModal title={modalInfo.ObjectiveTitle} isButton={false} buttonTitle={'עדכן'}  handleClose={handleClose}>
            {modalLoading?
            <div className='myCenterAlign'>
                <BallClipRotate
                    color={'#000000'}
                    loading={modalLoading}
                />
            </div>

            :
            
            <div>
                {! modalInfo.subTusk ?
                        <div>
                            {editMode ?
                                <EditableMode 
                                modalInfo={modalInfo} 
                                setEditMode={setEditMode} 
                                // register={register} 
                                // control={control}
                                handleBackToInfo={handleBackToInfo}
                                chooseAccount={chooseAccount}
                                setChoosedAccount={setChoosedAccount}
                                doneEditHandler={doneEditHandler}
                                closeEditHandler={closeEditHandler}
                                />
                            :
                                <ModalInfo 
                                canBack={false}
                                modalInfo={modalInfo} 
                                setEditMode={setEditMode}
                                closeEditHandler={closeEditHandler}
                                />
                            }
                        </div>
                :
                    <div>
                        {choosedSubTask.idDocument ?
                        
                            <div>
                            {editMode ?
                                <EditableMode 
                                modalInfo={choosedSubTask} 
                                setEditMode={setEditMode} 
                                // register={register} 
                                // control={control}
                                handleBackToInfo={handleBackToInfo}
                                chooseAccount={chooseAccount}
                                setChoosedAccount={setChoosedAccount}
                                doneEditHandler={doneEditHandler}
                                closeEditHandler={closeEditHandler}
                                />
                            :
                                <ModalInfo 
                                canBack={true}
                                modalInfo={choosedSubTask} 
                                setEditMode={setEditMode}
                                backFunction={backFunction}
                                closeEditHandler={closeEditHandler}
                                />
                            }
                            </div>
                        :
                            <SubTaskList 
                                dayName={modalInfo.dayOfWeek} 
                                subTasks={modalInfo.subTusk} 
                                hourFrom={modalInfo.startHour} 
                                hourTo={modalInfo.endHour}
                                handleSetSubTask={handleSetSubTask}
                            />
                        }
                    </div>    

                }
            </div>
            }

        </MyModal>
    );
};

export default EditModal;