import React from 'react';
import { useModals } from '../../provider/ModalsProvider';
import ReactDOM from "react-dom";


const ModalWrapper = ({active,setActive, children, height, width}) => {
    return (
        <>
        { active &&
            ReactDOM.createPortal(
                <div className="my-modal prod-info">
                    {/* TODO */}
                    <div className={`modal-wrapper animated ${active === 'openCartSettings' ? 'shopCartSpecialSet' : ''}`} style={{width:width+'%',height:height+'%'}}>  
                        <div className="close-cont">
                            <div onClick={() => setActive(!active)} className="close">
                                <span class="material-symbols-outlined">close</span>
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