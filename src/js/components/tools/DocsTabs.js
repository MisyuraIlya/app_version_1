import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

const DocsTabs = params => {
	let { activeTab,lang } = params;
	return(
		  <div className="tabs-main-cont">
              <div className="tabs-main-subcont">
                <div className="tab-cont">
                  <NavLink to={'/docs/1/' + lang}>
                    <p className={activeTab == 1 ? "active" : null} >{"מסמכים"}</p>
                  </NavLink>
                </div>
                <div className="tab-cont">
                  <NavLink to={'/docsHistory/1/' + lang}>
                    <p className={activeTab == 0 ? "active" : null}>{"מסמכי Web"}</p>
                  </NavLink>
                </div>
               
                <div className="tab-cont">
                  <NavLink to={'/docsKarteset/1/' + lang}>
                    <p className={activeTab == 3 ? "active" : null}>{"כרטסת"}</p>
                  </NavLink>
                </div>
              </div>
          </div>
	)
}

export default DocsTabs;
