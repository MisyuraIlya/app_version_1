import React from 'react';

const MyInput = ({imgLink,googleIcon,placeholder, props ,value, onChange, disabled}) => {
    return (
        <div className='MyInput'>
            <div className='flex-container myCenterAlign cardInput'>
                <div className='col-lg-2'>
                    <div className='myCenterAlign img'>
                        {googleIcon ? 
                            <span class="material-symbols-outlined">{googleIcon}</span>
                        :
                        <img src={imgLink} />
                        }
                    </div>
                </div>
                {/* <div className='col-lg-2'>
                    <div className='myCenterAlign placeholder'>
                        <p>{placeholder}</p>
                    </div>
                </div> */}
                <div className='col-lg-10 input'>
                    <input type='text' disabled={disabled? 'disabled' : null} value={value} onChange={(e) => onChange(e.target.value)}  placeholder={placeholder}/>
                </div>
            </div>
        </div>
    );
};

export default MyInput;