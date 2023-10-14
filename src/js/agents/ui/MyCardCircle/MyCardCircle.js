import React from 'react';

const MyCardCircle = ({imgLink}) => {
    return (
        <div className='MyCardCircle myCenterAlign'>
            <img src={imgLink} />
        </div>
    );
};

export default MyCardCircle;