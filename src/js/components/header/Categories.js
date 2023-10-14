import React, { Component, useContext, useState } from "react";
import UserContext from '../../UserContext';
import { NavLink, useHistory } from "react-router-dom";

const Categories = () => {

  const app = useContext(UserContext);
  console.log('pp.state.categories',app.state)
  const [active, setActive] = useState(false);

  const setParent = (id) => {
    active === id ? setActive(false) : setActive(id);
  }

  const scroll = () => {
    var element = document.getElementsByTagName("footer")[0];
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }

  const getCategories = (id) => {
    let categories = app.state.categories.filter(item => item.LvlNumber == '1');
    return categories;
  }
  const getCategoriesLvl2 = (id) => {
    let categories = app.state.categories.filter(item => item.LvlNumber == '2' && item.ParentId == id);
    return categories;
  }
  const getCategoriesLvl3 = (id) => {
    let categories = app.state.categories.filter(item => item.LvlNumber == '3' && item.ParentId == id);
    return categories;
  }

  const close = (id) => {
    const menu = document.getElementById(id);
    menu.classList.add('closed');
    setTimeout(() => {
      menu.classList.remove('closed');
    }, 2000);
  }

  const hideNav = () => {
    setActive(false);
    // const menu = document.getElementById(id);
    // menu.classList.add('closed');
    // setTimeout(() => {
    //   menu.classList.remove('closed');
    // }, 300);
  }

  return(
    <>
   
    {getCategories(null).map((element, index) => {
      return(
        <li key={index} className={active === element.Id ? 'active main-li' : 'main-li'}>
          <NavLink onClick={ e => hideNav("sub_menu_" + element.Id) } to={'/category/catalog/' + element.Id + '/0/0/1/0/' + app.state.lang}>
            <p>{app.state.lang == 'he' ? element.Title : element.Decription}</p>
          </NavLink>

          <div
            id={"sub_menu_" + element.Id}
            className={active === element.Id ? "wide-sub-menu active" : "wide-sub-menu"}
            onClick={ e => close("sub_menu_" + element.Id) }
            >
            {getCategoriesLvl2(element.Id).length ? 
              <div className="sub-menu-wrapp scrollbar animated fadeIn">
                <div className="flex-container">
                  <div className="col-lg-12 flex-container sub-menu-container">
                    {getCategoriesLvl2(element.Id).map((elem, ind) => {
                      return(
                        <div key={ind} className="item">
                          <NavLink onClick={ e => hideNav("sub_menu_" + element.Id) } to={'/category/catalog/' + element.Id + '/' + elem.Id + '/0/1/0/' + app.state.lang}>
                            <h2>{app.state.lang == 'he' ? elem.Title : elem.Decription}</h2>
                          </NavLink>
                          <div className="children">
                            <ul>
                            {getCategoriesLvl3(elem.Id).map((e, i) => {
                              return(
                                <li key={i}>
                                  <NavLink onClick={ e => hideNav("sub_menu_" + element.Id) } to={'/category/catalog/' + element.Id + '/' + elem.Id + '/' + e.Id + '/1/0/' + app.state.lang}>
                                    {app.state.lang == 'he' ? e.Title : e.Decription}
                                  </NavLink>
                                </li>
                              );
                            })}
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/*
                  <div className="col-lg-3">
                    <div className="banner animated pulse">
                      <NavLink to={element.Link ? element.Link : '/'}>
                        <img src={globalFileServer + 'categories-banner/' + element.Banner} alt=""/>
                      </NavLink>
                    </div>
                  </div>
                  */}
                </div>
              </div>
            :null}
          </div>
        </li>
      );
    })}
      {/* <li className="main-li">
      <NavLink onClick={ e => hideNav } to={'/category/new/0/0/0/1/0/' + app.state.lang}>
        <p className="newArrivals">{app.state.lang == 'he' ? 'חדש!' : 'New In!'}</p>
      </NavLink>
    </li>
      <li className="main-li">
        <NavLink onClick={ e => hideNav } to={'/category/sales/0/0/0/1/0/' + app.state.lang}>
          <p>{app.state.lang == 'he' ? 'מבצעים' : 'Sales'}</p>
        </NavLink>
      </li>
      
      <li className="main-li">
        <NavLink onClick={ e => hideNav } to={'/brands/collection/0/' + app.state.lang}>
          <p>{app.state.lang == 'he' ? 'סדרות' : 'Brands'}</p>
        </NavLink>
      </li>
      <li className="main-li">
        <NavLink onClick={ e => hideNav } to={'/brands/brand/0/' + app.state.lang}>
          <p>{app.state.lang == 'he' ? 'מותגים' : 'Brands'}</p>
        </NavLink>
      </li> */}
  
    </>
  );
}
export default Categories;
