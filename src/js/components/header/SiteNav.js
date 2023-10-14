import React, { Component, useContext, useState } from "react";
import UserContext from '../../UserContext';
import { NavLink, useHistory } from "react-router-dom";
import LoginButton from './LoginButton';
import Categories from './Categories';

const SiteNav = (params) => {

  const app = useContext(UserContext);

  return(
    <nav id='cat-nav' onClick={params.toggleNav} className={params.nav ? 'active header-cats-main-desktop' : 'header-cats-main-desktop'}>
      <div className="container">
        <ul className="main-menu-ecare">
          <Categories />
           {/*
          {app.whoIs().mobile ?
            <>
           
            <li>
              <span className="close">
                <img src={globalFileServer + 'icons/close.svg'} alt=""/>
              </span>
            </li>
        
            <LoginButton />
             
            </>
          : null}
          {!app.whoIs().mobile ?
          <Categories />
          : null}
           */}

        </ul>
      </div>
    </nav>
  );
}

export default SiteNav;
