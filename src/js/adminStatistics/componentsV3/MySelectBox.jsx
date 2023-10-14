import React from 'react';

const MySelectBox = ({data, globalFileServer, defaultTitle,openSelect,setOpenSelect,optionsState,setOptionState}) => {
    return (
        <div className='selection_card'>
            <div className={openSelect ? "select active padding" : "select padding"} >
                <div onClick={() => setOpenSelect(!openSelect)}  className="headind" >
                <p>{optionsState ? optionsState : defaultTitle}</p>
                <div className="img">
                    <img src={'https://b2bportal.co.il/src/img/icons/down-chevron.svg'} alt=""/>
                </div>
                </div>
                <div className={openSelect ? "masc active" : "masc"}>
                <ul>
                    {data.map((ele,ind) => {
                    return(
                        <li key={ind}>
                        <div className="mask-li-cls" onClick={() => {
                            setOptionState(ele);
                            setOpenSelect(false);
                            }}>
                            <span>{ele}</span>
                            <div className="img">
                            <img src={globalFileServer + 'icons/back-select.svg'} alt=""/>
                            </div>
                        </div>
                        </li>
                    )
                    })}
                </ul>
                </div>
            </div>
        </div> 
    );
};

export default MySelectBox;