import React from 'react';

const MyInput = ({googleIcons, register, name,  ...props}) => {
    return (
        <div className="clientsAgentSearchWrapper">
            <div className="search-cont">
                <input {...props} {...register(name)}/>
                <span className="material-symbols-outlined search-img">{googleIcons}</span>
            </div>
        </div>
    );
};

export default MyInput;