import React from 'react';
import { BallClipRotate } from 'react-pure-loaders';

const VisitsSearchInput = ({imgLink,placeholder,value, onChange, disabled,contentArr,setContentState,choosedValue,loading}) => {
    return (
        <>
        <div className='MySearchInput'>
            <div className='flex-container myCenterAlign inputBorder'>
                <div className='col-lg-2'>
                    <div className='myCenterAlign img'>
                        <img src={imgLink} />
                    </div>
                </div>
                <div className='col-lg-10 input'>
                    <input type='text' disabled={disabled? 'disabled' : null} value={value} 
                    onChange={(e) => onChange(e.target.value)} 
                     />
                </div>
            </div>
        </div>
        {value.length > 0 && !choosedValue &&
        <>
            {
            loading ?
            <div className='MySearchInputCont'>
                <div className='myCenterAlign '>
                    <div className='loaderMargin'>
                        <BallClipRotate
                            color={'#000000'}
                            loading={loading}
                        />
                    </div>
                </div> 
            </div>
            :
            <div className='MySearchInputCont'>
                {contentArr.length > 0 ?
                    contentArr.map((item,index) => {
                        return(
                            <div className='cardCont' onClick={() => setContentState(item)}>
                                <div className='container searchCont'>
                                    <div className='flex-container' key={index}>
                                        <div className='col-lg-4'>
                                            <p>{item.ExId}</p>
                                        </div>    
                                        <div className='col-lg-8'>
                                            <p>{item.Name}</p>
                                        </div>      
                                    </div>
                                </div> 
                            </div>    
                        )
                    })
                :
                    <div className='myCenterAlign noUsers'>
                    <h4>לא נמצאו לקוחות</h4>

                    </div>    
                }

            </div>
            }
        </>
        }
        </>

    );
};

export default VisitsSearchInput;