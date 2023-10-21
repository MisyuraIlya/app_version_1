import React from 'react';
import { useModals } from '../../provider/ModalsProvider';
import ReactDOM from "react-dom";


const ModalWrapper = ({active,setActive, children}) => {
    return (
        <>
        { active &&
            ReactDOM.createPortal(
                <div className="my-modal prod-info">
                    {/* TODO */}
                    <div className={`modal-wrapper animated ${active === 'openCartSettings' ? 'shopCartSpecialSet' : ''}`}>  
                        <div className="close-cont">
                            <div onClick={() => setActive(!active)}
                                className="close">
                                <img src={globalFileServer + 'icons/close.svg'} />
                            </div>
                        </div>
                        {children}
                    </div>
                    <div onClick={() => setActive(!active)} className="overflow"></div>
                </div>,
                document.getElementById('modal-root')
            )
        }
        </>
    );
};

export default ModalWrapper;