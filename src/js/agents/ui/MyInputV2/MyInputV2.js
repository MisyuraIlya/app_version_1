import React from 'react';

const MyInputV2 = ({value,onChange,clearSearchFunc, placeholder}) => {
    return (
    <div className="search-cont">
        <input
            onChange={(e) => onChange(e.target.value)}
            value={value}
            type="text"
            placeholder={placeholder}
        />
        {value?
            <span className="material-symbols-outlined search-img"
                onClick={() => onChange('')}>close</span>
            :
            <span className="material-symbols-outlined search-img">search</span>
        }
    </div>
    );
};

export default MyInputV2;