import React, { useState } from 'react';
const MyCheckBox = ({checked, handleCheckboxChange, props}) => {
    return (
    <label className='switch'>
        <input
          type="checkbox"
          checked={checked}
          onClick={() => handleCheckboxChange(!checked)}
          {...props}
        />
        <span className='slider round'></span>
        
    </label>
    );
};

export default MyCheckBox;