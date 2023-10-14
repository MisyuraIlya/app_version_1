import React from 'react';
import { useMyModal } from '../../store/ModalStore';
import MyButton from '../MyButton/MyButton';
import Wrap from '../../ui/Wrap/Wrap'

const MyModal = ({children, title, isButton, buttonTitle, buttonClick, handleClose, isDeleteButton,deleteButton}) => {
    const {MyModalMethods,modalOpen} = useMyModal();
    
    const handleCloseFunc = () => {
        if(handleClose){
            handleClose()
        }
        MyModalMethods.setModalOpen(false)
    }
    return (
        <>

        {modalOpen &&
        <>
        <div className='MyModalCont'>
            <div className='MyModalContHeader'>
                <div className='myAlignLeft close_btn' onClick={() => handleCloseFunc()}>
                    <span className="material-symbols-outlined">
                    close
                    </span>
                </div>
            </div>
            <div className='container'>
                {children}
            </div>
            {isButton &&
            <div className='MyModalButton myPadding flex-container'>
                <div className='container alignLeft flex-container'>
                    {isDeleteButton &&
                        <div className='redBtn'>
                            <MyButton title={'מחק'} buttonClick={deleteButton}/>
                        </div>
                    }
                    <div className=''>
                        <MyButton title={buttonTitle} buttonClick={buttonClick}/>
                    </div>    
                </div>
            </div>
            }

        </div>
        {children == undefined &&
                <div className='MyModalBg' onClick={() => handleCloseFunc()}>

                </div>
        }

        </>
        }

        </>

    );
};

export default MyModal;