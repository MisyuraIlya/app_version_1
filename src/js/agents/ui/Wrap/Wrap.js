import React from 'react';

const Wrap = ({children, bg, onClick}) => {
    return (
        <div className={`Wrap ${bg}`} onClick={() => onClick()} >
            {children}
        </div>
    );
};

export default Wrap;