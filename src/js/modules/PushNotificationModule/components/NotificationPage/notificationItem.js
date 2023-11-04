import React, { useState } from 'react';
import useNotificationStore from '../../store/notificationStore';
import moment from 'moment';
import UserSelection from './UserSelection';
const NotificationItem = ({element,index}) => {
    const {deleteItem,itemToSend,sendNotification,item,setChoosedItem,createItem} = useNotificationStore()
    const [active, setActive] = useState(false)
    return (
        <div key={index} className={element?.id == itemToSend?.id || element?.id == item?.id ? "item active" : "item"} onClick={() => setChoosedItem(element)}>
            <div className="flex-container">
                <div className="col-lg-1 img">
                    <div className="wr">
                        {element?.image?.filePath ?
                            <img src={globalFileServer + 'notifications/' + element?.image?.filePath} />
                            :
                            <img src={globalFileServer + 'placeholder.jpg'} />
                        }
                    </div>
                </div>
                <div className="col-lg-3 title">
                    <div className="wr">
                        <p>{"כותרת ההודעה"}</p>
                    </div>
                </div>
                <div className="col-lg-3 description">
                    <div className="wr">
                        <p>{ "מלל הודעה"}</p>
                    </div>
                </div>
                <div className="col-lg-1 description">
                    <div className="wr">
            
                    </div>
                </div>
                <div className="col-lg-2 date">
                    <div className="wr">
                        <p>{moment(element?.createdAt).format('DD-MM-YYYY')}</p>
                    </div>
                </div>
                <div className="col-lg-2 actions-cont">
                    <div className="wr actions">
                        <div onClick={() => deleteItem(element?.id)}>
                            <span className="material-symbols-outlined">delete</span>
                        </div>
                        
                        {element?.title && element?.description &&
                            <div onClick={() => createItem(element)}>
                                <span className="material-symbols-outlined">content_copy</span>
                            </div>
                        }
                        {!element.isPublic &&
                            <>
                                {element.title && element.description &&
                                <div>
                                    {active ?
                                        <span onClick={() => setActive(false)} className="material-symbols-outlined">close</span>
                                        :
                                        <span onClick={() => setActive(true)} className="material-symbols-outlined">send</span>
                                    }
                                </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
            {active &&
                <div className="select-group">
                    <h2>בחר מרשימה</h2>
                    <div className="select-group-wrapper" >
                        <div>
                            <UserSelection id={1} title={'לכולם'}/>
                            <UserSelection id={2} title={'לפי לקוחות'}/>
                            <button className={'buttonDisabled'} onClick={() => sendNotification()}>
                                <span>שלח</span>
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default NotificationItem;