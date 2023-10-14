import React, { useState } from 'react';
import { useMyObjective } from '../../../../store/ObjectiveStore';
import MyInput from '../../../../ui/MyInput/MyInput'
import MyTextArea from '../../../../ui/MyTextArea/MyTextArea';
import ReactSelect from 'react-select'

import { useForm, Controller } from "react-hook-form";
import Calendar from 'react-calendar';
import { ReactSelectOptionsOfFullHour } from '../../../../utils/constants/ReactSelectOptionsOfFullHour';
import moment from 'moment';
import MySideButton from '../../../../ui/MySideButton/MySideButton';

const CreateModal = ({closePopUpHandler,createMissionHandler}) => {
    const { MyObjectiveMethods,date} = useMyObjective()
    const [activeCalendar, setActiveCalendar] = useState(false)
    const { register, handleSubmit, control } = useForm();

    const calendarHandler = (e) => {
        MyObjectiveMethods.setDate(e)
        setActiveCalendar(false)
    }
    
    return (
        <div className='CreateModalObjective'>
            <div className='container'>
                <div className='flex-container form'>
                    <div className='col-lg-12'>
                        <div className='flex-container myPadding'>
                            <div className='col-lg-10'>
                                <h4>יצירת משימה</h4>
                            </div>
                            <div className='col-lg-2  myAlignLeft close_btn' onClick={() => closePopUpHandler()}>
                            <span className="material-symbols-outlined">
                            close
                            </span>
                        </div>
                        </div>
                    </div>
                    <div className='col-lg-12'>
                        {/* select box */}
                    </div>
                    <div className='col-lg-12'>
                        <div className='myPadding pointer' onClick={() => setActiveCalendar(!activeCalendar)}>
                            <MyInput imgLink={globalFileServer + 'agentApp/Calendar.svg'} placeholder={'תאריך'} disabled={false} value={moment(date).format('DD-MM-YYYY')} onChange={MyObjectiveMethods.setDate}/>  
                        </div>
                    </div>
                    {activeCalendar &&
                    <div className='calendarModal myCenter'>
                        <Calendar onChange={calendarHandler} value={date} />
                    </div>    
                    }
                    <form className='myWidth'>
                        <div className='flex-container '>
                            <div className='col-lg-6'>
                                <div className='myPadding '>
                                <Controller
                                    name="HoursFromSelect"
                                    control={control}
                                    render={({ field }) => (
                                    <ReactSelect
                                        placeholder="מ שעה"
                                        isClearable
                                        {...field}
                                        options={ReactSelectOptionsOfFullHour}
                                    />
                                    )}
                                />
                                </div>
                            </div>
                            <div className='col-lg-6 '>
                                <div className='myPadding '>
                                    <Controller
                                        name="HoursToSelect"
                                        control={control}
                                        render={({ field }) => (
                                        <ReactSelect
                                            placeholder="עד שעה"
                                            isClearable
                                            {...field}
                                            options={ReactSelectOptionsOfFullHour}
                                        />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-12'>
                            <div className='myPadding'>
                                <MyTextArea props={{...register(`text`)}} placeholder={'פרטי משימה'}/>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
            <MySideButton imgLink={globalFileServer + 'agentApp/VIcon.png'} onClickBtn={handleSubmit(createMissionHandler)}/>
        </div>
    );
};

export default CreateModal;