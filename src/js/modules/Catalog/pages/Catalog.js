import React, { useEffect } from 'react';
import RightSide from '../components/RightSide/RightSide';
import LeftSide from '../components/LeftSide/LeftSide';
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs';
import useCatalog from '../store/CatalogStore';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getProductsLocalStorage } from '../../Cart/helpers/localstorage';
import useCart from '../../Cart/store/CartStore';
import { BallClipRotate } from 'react-pure-loaders';
import useSearchStore from '../store/SearchStore';

const Catalog = () => {
    const {documentType, lvl1, lvl2, lvl3} = useParams() 
    const asd = useHistory()
    const {location} = useHistory()
    const {loading, setCatalogParameters, getCatalog,setUrlSearch,getAttributes} = useCatalog()
    const {loading:filterLoading, findCategoriesFilter,setSavedValue,searchValue,savedValue,setCategoriesFilter,clearPaginationSearch,findProductsByValue} = useSearchStore()
    const {setCart} = useCart()
    const isSearchDocument = documentType === 'search'
    useEffect(() => {
        setCatalogParameters(lvl1,lvl2, lvl3, location.search)
        setCart(getProductsLocalStorage())
        if(!isSearchDocument) {
            setSavedValue('')
            setCategoriesFilter([])
            clearPaginationSearch()
            getCatalog()
        } 
        if(isSearchDocument) {
            findCategoriesFilter()
            findProductsByValue(lvl1,lvl2, lvl3, location.search)
        }
        // TODO HANDLE SEARCH VALUE PER SEARCHVALUE
        getAttributes(searchValue)
 

    },[
        location.pathname, 
        location.search
    ])
    return (
        <div className='page-container category-page'>
            <div className='category-page-subcont'>
                <div className='category-page-subcont2 flex-container'>
                    {(loading || filterLoading)  ?
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