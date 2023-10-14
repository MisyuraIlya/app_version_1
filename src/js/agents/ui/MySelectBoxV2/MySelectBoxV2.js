import React, { useState } from 'react';

const MySelectBoxV2 = ({array,state,setState, imageLink, props}) => {
    const [active, setActive] = useState(false)

    const handleSet = (item) => {
        setState(item)
        setActive(false)
    }
    return (
        <div className='SelectBox_wrapper' >
        <div className='MySelectBox' onClick={() => setActive(!active)}>
            <div className='container'>
                <div className='flex-container'>
                    <div className='col-lg-8 myCenterAlign'>
                        <p className='area_selected'>{state}</p>
                    </div>
                    <div className={`col-lg-4 frameVector myCenterAlign`}>
                        <div className={` ${active ? 'active' : ''}`}>
                            <img src={globalFileServer + 'agentApp/Vector.svg'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='selectBox_content myCenterAlign'>
            <div className='myWidth '>
                {active &&
                
                array.map((item,index) => {

                    return(
                        <div key={index} className="myCenterAlign cardSelect pointer" onClick={() => handleSet(item)}>
                            <p>{item}</p>
                        </div>    
                    )
                })
                }
            </div>
        </div>

        </div>
    );
};

export default MySelectBoxV2;