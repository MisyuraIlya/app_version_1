import React, { useEffect } from 'react';
import RightSide from '../components/RightSide/RightSide';
import LeftSide from '../components/LeftSide/LeftSide';
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs';
import useCatalog from '../store/CatalogStore';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getProductsLocalStorage } from '../../Cart/helpers/localstorage';
import useCart from '../../Cart/store/CartStore';
import { BallClipRotate } from 'react-pure-loaders';

const Catalog = () => {
    const {lvl1, lvl2, lvl3} = useParams() 
    const asd = useHistory()
    const {location} = useHistory()
    const {loading, setCatalogParameters, getCatalog,setUrlSearch,getAttributes} = useCatalog()
    const {setCart} = useCart()
    useEffect(() => {
        setCatalogParameters(lvl1,lvl2, lvl3, location.search)
        // setUrlSearch(decodeURIComponent(location.search))
        setCart(getProductsLocalStorage())
        getCatalog()
        getAttributes()

    },[
        location.pathname, 
        location.search
    ])
    return (
        <div className='page-container category-page'>
            <div className='category-page-subcont'>
                <div className='category-page-subcont2 flex-container'>
                    {loading ?
						<div className="spinner-wrapper">
							<div className="spinner">
								<div className="bounce1"></div>
								<div className="bounce2"></div>
								<div className="bounce3"></div>
							</div>
						</div>
					: null}
                    <BreadCrumbs/>
                    <div className='slide-menu-cont col-lg-3'>
                        <RightSide/>
                    </div>
                    <div className='category-page-sub col-lg-9'>
                        <LeftSide/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog;