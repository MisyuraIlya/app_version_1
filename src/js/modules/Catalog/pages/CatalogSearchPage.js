import React from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useCatalogSearchStore from '../store/CatalogSearchStore';
import BreadCrubms from '../../../SharedComponents/BreadCrubms';
import RightSide from '../components/RightSide/RightSide';
import LeftSide from '../components/LeftSide/LeftSide';
const CatalogSearchPage = () => {

    const {lvl1, lvl2, lvl3} = useParams() 
    const {location} = useHistory()
    const {loading} = useCatalogSearchStore()
    // useEffect(() => {

    // },[
    //     location.search
    // ])

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
                    <BreadCrubms/>
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

export default CatalogSearchPage;