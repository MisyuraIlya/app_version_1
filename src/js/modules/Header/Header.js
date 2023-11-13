import React, { useState } from 'react';
import CatalogSearch from '../Catalog/components/CatalogSearch/CatalogSearch';
import { useAuth } from '../Auth/providers/AuthProvider';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { getCurrentUserId } from '../Auth/helpers/getCurrentUserId';
import RightComponent from './components/RightComponent/RightComponent';
import CenterComponent from './components/CenterComponent/CenterComponent';
import LeftComponent from './components/LeftComponent/LeftComponent';
import CategoryNavBar from './components/CategoryNavBar/CategoryNavBar';
import MobileHeader from './components/MobileHeader';
const Header = () => {
    const {user, isAgent} = useAuth()
    const [mobileSearchOn, setMobileSearchOn] = useState(false)
    return (
        <div className={user ? "header-wrapper" : "header-wrapper no-cats"}>
            <div className="header-wrapper-subcont flex-container">
                <div className={mobileSearchOn ? "main-menu col-lg-4 opened" : "main-menu col-lg-4 closed"}>
                    <MobileHeader mobileSearchOn={mobileSearchOn} setMobileSearchOn={setMobileSearchOn}/>
                    <RightComponent/>
                </div>
                <div className={!mobileSearchOn ? "search-li col-lg-4 hide-mob" : "col-lg-12 search-li show-mob"}>
                    <CenterComponent/>
                </div>
                <div className="actions col-lg-4">
                    <LeftComponent/>
                </div>
            </div>
            <CategoryNavBar/>
        </div>
    );
};

export default Header;