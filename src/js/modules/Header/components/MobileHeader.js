import React from 'react';
import { useModals } from '../../Modals/provider/ModalsProvider';
import { NavLink, useHistory  } from 'react-router-dom/cjs/react-router-dom.min';
const MobileHeader = ({mobileSearchOn, setMobileSearchOn}) => {
    const {clientRightSideBar, setClientRightSideBar} = useModals()
    const {goBack} = useHistory()
    return (
        <div className="open-menu">
            <div onClick={() => setClientRightSideBar(!clientRightSideBar)}
                className={clientRightSideBar ? "nav-icon3 open" : "nav-icon3"}>
                <span></span><span></span><span></span><span></span>
            </div>
            <div className="main-logo-mobile">
                <NavLink to="/">
                    <img src={globalFileServer + 'logo.png'} />
                </NavLink>
            </div>
            <div>
                <div className="back" onClick={() => goBack()}>
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </div>
                <div className="search-icon"
                    onClick={() => setMobileSearchOn(!mobileSearchOn)}>
                    <span className="material-symbols-outlined">search</span>
                </div>
            </div>
        </div>
    );
};

export default MobileHeader;