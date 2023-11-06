import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
const ClientRightSideBar = ({active, setActive}) => {
    return (
        <div className='main-menuu'>
            <div className="header-right-cont-main-smallRes">
                    <nav className={active ? "opened" : "closed"}>
                        <div className="header-right-cont col-lg-5 header-mob-right-cont">
                            <ul className={!active ? 'to-left' : null}>
                                <li className="logo" onClick={() => this.setState({ toggleMenu: false, showCategories: false })}>
                                <NavLink exact to="/">
                                    <img src={globalFileServer + 'main-logo.png'} />
                                </NavLink>
                                </li>
                                <NavLink exact to="/">
                                    <li onClick={() => setActive(false)}>
                                        <p>{'בית'}</p>
                                    </li>
                                </NavLink>
                                <NavLink to={'/profile/'}>
                                    <li onClick={() => setActive(false)}>
                                        <p>{"אזור אישי"}</p>
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                    </nav>
                    <div onClick={() => setActive(false)} className={active ? "fake-click opened" : "fake-click closed"}></div>
                </div> 
        </div>
 
    );
};

export default ClientRightSideBar;