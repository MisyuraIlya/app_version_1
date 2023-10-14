import React, { useEffect,useState } from 'react';
import { BallClipRotate } from 'react-pure-loaders';
import { useMyUsers } from '../../store/UsersStore';
import { useDebounce } from 'use-debounce';

const ClientSearchInput = ({value, onChange}) => {
    
    const {filteredUsers,MyUsersMethods,loading} = useMyUsers()
    const [isChoosed, setIsChoosed] = useState(false)
    const [valueDebounced] = useDebounce(value, 1000);
    const [filter, setFilter] = useState('')

    const handleClickInputSearch = (item) => {
        onChange(item.Name)
        setFilter(item.Name)
        MyUsersMethods.filterByUser(item.Name)
        setIsChoosed(true)
    }

    useEffect(() => {
        if(valueDebounced){
            MyUsersMethods.filterByUser(valueDebounced)
        }
    },[valueDebounced])
    
    useEffect(() => {
        if(value !== filter){
            setIsChoosed(false)
        }
    },[value])


    return (
        <>
        <div className='MySearchInput'>
            <div className='flex-container myCenterAlign myPadding'>
                <div className='col-lg-12 input'>
                    <input type='text'  value={value} 
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="שם לקוח/ מספר לקוח" 
                     />
                </div>
            </div>
        </div>
        {value && !isChoosed &&
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
                {filteredUsers.length > 0 ?
                    filteredUsers.map((item,index) => {
                        return(
                            <div className='cardCont' onClick={() => handleClickInputSearch(item)}>
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

export default ClientSearchInput;