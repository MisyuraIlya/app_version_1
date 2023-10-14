import React from 'react';

const MyAddInputButton = ({value, onChange, placeholder,onClick}) => {
    return (
        <div className='MyAddInputButton'>
            <div className='flex-container'>
                <div className='col-lg-10 textInput colMobile8'>
                    <div className='blockInput inputWith'>
                        <input type='text' placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
                    </div>
                </div>
                <div className='col-lg-2 colMobile4'>
                    <div className='flex-container btn' onClick={() => onClick()}>
                        <div className='col-lg-4'>
                            <div className='myCenterAlign'>
                                +
                            </div>
                        </div>
                        <div className='col-lg-8'>
                            <div className='myCenterAlign'>
                                הוסף
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAddInputButton;