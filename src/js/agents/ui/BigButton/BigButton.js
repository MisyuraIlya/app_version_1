import React from 'react';

const BigButton = ({onClickBtn, imgLink,color,googleIcon}) => {
    return (
        <div className={`BigButton myCenterAlign ${color}`} onClick={() => onClickBtn()}>
            {googleIcon ?
            <span className="material-symbols-outlined">{googleIcon}</span>
            :
            <img src={imgLink}/>

            }
        </div>
    );
};

export default BigButton;