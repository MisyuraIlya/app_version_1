import React from 'react';
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
    return (
        <div className={user ? "header-wrapper" : "header-wrapper no-cats"}>
            <div className="header-wrapper-subcont flex-container">
                <div className={true? "main-menu col-lg-4 opened" : "main-menu col-lg-6 closed"}>
                    <MobileHeader/>
                    <RightComponent/>
                </div>
                <div className={true ? "search-li col-lg-5 hide-mob" : "search-li show-mob"}>
                    <CenterComponent/>
                </div>
                <div className="actions col-lg-3">
                    <LeftComponent/>
                </div>
            </div>
            <CategoryNavBar/>
        </div>
    );
};

export default Header;