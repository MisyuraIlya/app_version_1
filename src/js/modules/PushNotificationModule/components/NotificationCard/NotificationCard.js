import React, { useState } from 'react';
import './NotificationCard.styles.scss'
import moment from 'moment-timezone';
import { useNotifications } from '../../provider/PushNotification';
const NotificationCard = ({element, index}) => {
    const [open, setOpen] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false);
    const [endDelete, setEndDelete] = useState(false)
    const {NotificationsMethods} = useNotifications()
    
    const handleDelete = () => {
        setIsDeleted(true);
        setTimeout(() => {
          NotificationsMethods.handleIsRead(element.id, true);
          setEndDelete(true)
        }, 500); 
    };
    return (
        <div key={index}>
        {!endDelete &&
                <div className={`NotificationCard ${isDeleted ? 'deleted' : ''}`}>
            
                <div className='head'>
                    <div className='wrap' >
                        <div className='centered pointer'>
                            {element.is_read === 1 ?
                            <div>
                                <img src={globalFileServer + 'notificationsIcons/readAll.svg'} className="isRead" onClick={() => NotificationsMethods.handleIsRead(element.id, false)}/>
                            </div>    
                            :
                            <div className='circle' onClick={() => handleDelete()}>
                            </div>
                            }
                            <div>
                                <p>קראתי</p>
                            </div>
                        </div>
                        <div className='centered'>
                            <p>{moment(element.date).format('DD-MM-YYYY')}</p>
    
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='title' onClick={() => setOpen(!open)}>
                        <img src={'https://shanishenhav.online/src/newImages/icons/Box.svg'} width={30} />
                        {element.title} 
                        { open ?
                            <img className='arrow' src={globalFileServer + 'notificationsIcons/arrow_cat_down.svg'} onClick={() => setOpen(false)}/>
                        :
                            <img className='arrow' src={globalFileServer + 'notificationsIcons/arrow_left.svg'} onClick={() => setOpen(true)}/>
                        }
                    </div>
                    {open &&
                    <div className='description'>
                        {element.description}
    
                        {element.link &&
                            <div>
                                <a href={element.link} >לינק</a>
                            </div>    
                        }
    
                        {element.img && 
                            <div>
                                <img src={element.img} />
                            </div>    
                        }
                    </div>
                    }
    
                </div>
    
            </div>
        }
        </div>

    );
};
export default NotificationCard;