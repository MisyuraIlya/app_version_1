import React, { useEffect, useState } from 'react';
import useCategories from '../../../Catalog/store/CategoriesStore';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const CategoryNavBar = () => {
  const { categories, getCategories } = useCategories();
  const [active, setActive] = useState('');

  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
  }, []);

  return (
    <nav
      id="cat-nav"
      onClick={() => console.log('toggle nav')}
      className={true ? 'active header-cats-main-desktop' : 'header-cats-main-desktop'}
    >
      <div className="container">
        <ul className="main-menu-ecare">
          {categories?.map((element, index) => {
            if(element.lvlNumber === 1 && element.isPublished) {
              return (
                <li key={index} className={active === element.Id ? 'active main-li' : 'main-li'}>
                  <NavLink to={`/client/catalog/${element.id}/0/0`}>
                    <p>{element.title}</p>
                  </NavLink>
  
                  <div
                    id={"sub_menu_" + element.Id}
                    className={active === element.Id ? "wide-sub-menu active" : "wide-sub-menu"}
                    onClick={(e) => close("sub_menu_" + element.Id)}
                  >
                    <div className="sub-menu-wrapp scrollbar animated fadeIn">
                      <div className="flex-container">
                        <div className="col-lg-12 flex-container sub-menu-container">
                          {element.categories?.map((elem, ind) => {
                            return (
                              <div key={ind} className="item">
                                <NavLink
                                  to={`/client/catalog/${element.id}/${elem.id}/0`}
                                >
                                  <h2>{elem.title}</h2>
                                </NavLink>
                                <div className="children">
                                  <ul>
                                    {elem?.categories?.map((e, i) => {
                                      return (
                                        <li key={i}>
                                          <NavLink
                                            to={`/client/catalog/${element.id}/${elem.id}/${e.id}`}
                                          >
                                            { e.title}
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
  
                        <div className="col-lg-3">
                          <div className="banner animated pulse">
                            <NavLink to={element.Link ? element.Link : '/'}>
                              <img src={`${globalFileServer}categories-banner/${element.Banner}`} alt="" />
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryNavBar;
