import React from 'react';
import { useModals } from '../../Modals/provider/ModalsProvider';

const MobileHeader = () => {
    const {clientRightSideBar, setClientRightSideBar} = useModals()
    return (
        <div className="open-menu">
            <div onClick={() => setClientRightSideBar(!clientRightSideBar)}
                className={clientRightSideBar ? "nav-icon3 open" : "nav-icon3"}>
                <span></span><span></span><span></span><span></span>
                
            </div>
            {/*
            <NotificationIcon/>
            */}
            <div className="main-logo-mobile">
                {/* <NavLink to="/">
                    <img src={globalFileServer + 'logo.png'} width={50}/>
                </NavLink> */}
            </div>
            <div>
                <div className="back" onClick={() => this.goBack}>
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </div>
                <div className="search-icon"
                    onClick={() => this.setState({showSearchMob: !this.state.showSearchMob})}>
                    <span className="material-symbols-outlined">search</span>
                </div>
            </div>
        </div>
    );
};

export default MobileHeader;