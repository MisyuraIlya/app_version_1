import React, { Component, useContext, useState } from "react";
import UserContext from '../../UserContext';
import { NavLink, useHistory } from "react-router-dom";
import Slider from "../tools/Slider";
import Categories from './Categories';

const CategorySlider = () => {

  const app = useContext(UserContext);
  const history = useHistory();

  const [active, setActive] = useState(false);
  const [children, setChildren] = useState(false);

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
    let categories = app.state.categories.filter(item => item.ParentId == id && !item.Unpublished );
    if(categories && categories.length>0 && !id){
      let newObj = {
        'Decription':'New In!',
        'ExtId':'-1',
        'Id':-1,
        'LvlNumber':'1',
        'ParentExtId':'-1',
        'ParentId':'-1',
        'Title': 'חדש!'
      };
      categories.unshift(newObj);
    }

    return categories;
  }

  const close = () => {
    const menu = document.getElementById('sub_menu');
    menu.classList.add('closed');
    setTimeout(() => {
      menu.classList.remove('closed');
    }, 300);
  }

  const toggleChildren = (id) => {
    children === id ? setChildren(false) : setChildren(id);
  }

  const getParentActive = (id) => {
    let pActive = false;
    if (active === id) {
      pActive = true
    }
    let pathAry = history.location.pathname.split('/');
    if ( pathAry.includes('product-list') ) {
      let currentId = pathAry[2];
      let current = app.state.categories.filter(item => item.Id == currentId );
      if (current.length) {
        if (id == current[0].ParentId) {
          pActive = true
        }
      }
    }
    return pActive;
  }

  const getSecondLavelActive = (id) => {
    let pActive = false;
    let pathAry = history.location.pathname.split('/');
    let currentId = pathAry[3];
    let current = app.state.categories.filter(item => item.Id == currentId );
    if (current.length) {
      if (id == current[0].ParentId) {
        pActive = true
      }
    }
    return pActive;
  }

  return (
    <>
    <Slider
      className="category-slider"
      slidesPerView={'auto'}
      spaceBetween={24}
      speed={1000}
      autoplay={false}
      loop={false}
      pagination={false}
    >

      {getCategories(null).map((element, index) => {
        if(element.Id==-1){
          return(
            <NavLink key={index} to={'/category/new/0/0/0/1/0/' + app.state.lang}>
              <span className={element.Id==-1 ? 'newArrivals' : null}>{app.state.lang=='he' ? element.Title : element.Decription}</span>
            </NavLink>
          );
        }else{
          return(
            <a
              data-text={element.Title}
              key={index} className={getParentActive(element.Id) ? 'active' : null}
              onClick={e => setParent(element.Id)}
            >
              <span className={element.Id==-1 ? 'newArrivals' : null}>{app.state.lang=='he' ? element.Title : element.Decription}</span>
            </a>
          );
        }
      })}

    </Slider>
    {active ?
    <div className="chidren-nav">
      <div className="items">
        {getCategories(active).map((element, index) => {
          return(
            <div key={index} className="item">
              <p>
                <NavLink
                  className={getSecondLavelActive(element.Id) ? 'active' : null}
                  onClick={e => setActive(false)} to={'/category/catalog/' + active + '/' + element.Id + '/0/1/0/' + app.state.lang}
                  >
                  {element.Title}
                </NavLink>
                <span className="material-symbols-outlined"
                      onClick={ e => toggleChildren(element.Id) }>{children == element.Id ? 'remove' : 'add'}</span>
              </p>
              {children == element.Id ?
              <div className="children">
                <ul>
                {getCategories(element.Id).map((elem, ind) => {
                  return(
                    <li key={ind}>
                      <NavLink onClick={e => setActive(false)}
                      to={'/category/catalog/' + active + '/' + element.Id + '/' + elem.Id + '/1/0/' + app.state.lang}>
                        {elem.Title}
                      </NavLink>
                    </li>
                  );
                })}
                </ul>
              </div>
              : null}
            </div>
          );
        })}
      </div>
    </div>
    : null}
    </>
  );
}

export default CategorySlider;
