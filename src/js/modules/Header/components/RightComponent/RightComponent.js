import React from 'react';
import { useAuth } from '../../../Auth/providers/AuthProvider';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { getCurrentUserId } from '../../../Auth/helpers/getCurrentUserId';
import { useNotificationModal } from '../../../Modals/provider/NotificationModalProvider';
import AgentMenu from './components/AgentMenu';
const RightComponent = () => {
    const {user, isAgent} = useAuth()
    const {openSideBar, setOpenSideBar} = useNotificationModal()
    return (
        <>
            <nav className={openSideBar ? "header-right-cont-main-bigRes opened" : "header-right-cont-main-bigRes closed"}>
                {user &&
                    <div onClick={() => setOpenSideBar(true)} className="menu-new">
                        <img src={globalFileServer + 'icons/head_icons/menu_new.svg'}/>
                    </div>
                }
                <div className="header-right-cont">
                    <nav className={false ? "site-nav active" : "site-nav"}>
                        <div className="flex-container">
                            <div className="reg-menu">
                                <ul>
                                    <li>
                                        <div className="img" style={{cursor:'pointer'}}>
                                            <NavLink to={'/'}>
                                                <img src={globalFileServer + 'logo.png'} alt=""/>
                                            </NavLink>
                                        </div>
                                    </li>
                                    <li className="about-li-hover">
                                        <AgentMenu/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </nav>
        </>
    );
};

export default RightComponent;