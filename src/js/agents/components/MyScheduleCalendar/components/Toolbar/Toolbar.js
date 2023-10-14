import React from 'react';

const Toolbar = ({timeFormatState}) => {

    const handleTimeFormatStateChange = (e) => {
        if (this.props.onTimeFormatStateChange) {
            this.props.onTimeFormatStateChange(e.target.checked)
        }
    }

    return (
        <div className='time-format-section'>
            <label className='time-format-chkbx'>
                Time format: 
                <input type='checkbox'
                    checked={ timeFormatState }
                    onChange={ handleTimeFormatStateChange }
                />
                <div className='chkbx-text'></div>
            </label>
        </div>
    );
};

export default Toolbar;