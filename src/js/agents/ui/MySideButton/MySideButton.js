import React from 'react';

const MySideButton = ({onClickBtn, imgLink}) => {
    return (
        <div className='MySideButton myCenterAlign' onClick={() => onClickBtn()}>
            <img src={imgLink}/>
        </div>
    );
};

export default MySideButton;