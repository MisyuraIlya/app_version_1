import React from 'react';

const CategoryNavBar = () => {
    return (
    <nav id='cat-nav' onClick={() => console.log('toggle nav')} className={true ? 'active header-cats-main-desktop' : 'header-cats-main-desktop'}>
        <div className="container">
          <ul className="main-menu-ecare">
            <>
            {/* {getCategories(null).map((element, index) => {
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
                            
                            <div className="col-lg-3">
                            <div className="banner animated pulse">
                                <NavLink to={element.Link ? element.Link : '/'}>
                                <img src={globalFileServer + 'categories-banner/' + element.Banner} alt=""/>
                                </NavLink>
                            </div>
                            </div>
                           
                        </div>
                        </div>
                    :null}
                    </div>
                </li>
                );
            })} */}
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
};

export default CategoryNavBar;