import React, { Component, Fragment, useState, useEffect, useContext  } from 'react';
import { NavLink, useParams } from "react-router-dom";
import UserContext from '../../UserContext';

const ProfileNav = params => {

  const app = useContext(UserContext);
  let params2 = useParams();

  return (
    <div className={"ProfileNav-main-cont"}>
      <div className="ProfileNav-sub-cont">
        {app.state.profileObj && app.state.profileObj.length ?
          <ul className="ProfileNav-ul flex-container">
            {app.state.profileObj.map((item, index) => {
              return(
                <li className={params.props.match.path.includes(item.Link) ? 'active-li col-lg-4' : 'col-lg-4'}>
                  <NavLink to={item.Link + app.state.lang}>
                    {/*<img src={globalFileServer + 'icons/' + item.Img} alt=""/>*/}
                    <p>{app.state.lang=="he" ? item.Title : item.TitleEng}</p>
                  </NavLink>

                </li>
              )
            })}
          </ul>
        :null}
      </div>
    </div>
  )

}
export default ProfileNav;
