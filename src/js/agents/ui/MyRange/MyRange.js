import React from 'react';

const MyRange = ({value,onChange,props}) => {
    return (
        <div>
            <input type='range' min={'0'} max={'4'} value={value} onChange={(e) => onChange(e.target.value)}  className="range" {...props}/>
        </div>
    );
};

export default MyRange;