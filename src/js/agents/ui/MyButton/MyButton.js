import React from 'react';

const MyButton = ({props, title, buttonClick, color}) => {
    return (
        <div className='MyButton' onClick={() => buttonClick()} style={color? {color:color} : null}>
            <button>{title}</button >
        </div>
    );
};

export default MyButton;