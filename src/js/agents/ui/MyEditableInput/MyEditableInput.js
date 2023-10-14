import React from 'react';
import { useState } from 'react';

const MyEditableInput = ({value, onChange, deleteFunc}) => {
    const [activeInput, setActiveInput] = useState('')
    const [localValue, setLocalValue] = useState(value)

    const onChangeFunc = (e) => {
        setLocalValue(e)
        // onChange(e)
    }
    
    return (
        <div className='MyEditableInput'>
            <div className='flex-container'>
                <div className='col-lg-10'>
                    <div className='titleBlock'>
                    {activeInput ?
                        <input type='text' value={localValue} onChange={(e) => onChangeFunc(e.target.value)}/>                    
                        :

                        <span>{localValue}</span>
                    }
                    </div>

                </div>
                <div className='col-lg-2'>
                    <div className='flex-container align'>
                        <div className='col-lg-6 align'>
                            <img src={globalFileServer + 'agentApp/Draw.svg'} onClick={() => setActiveInput(!activeInput)}/>
                        </div>
                        <div className='col-lg-6 align'>
                            <img src={globalFileServer + 'agentApp/xIcon.png'} onClick={() => deleteFunc()}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyEditableInput;