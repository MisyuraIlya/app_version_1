import React from 'react';
import useCatalog from '../../store/CatalogStore';
import ProductList from './components/ProductList/ProductList';
import FiltersBlock from './components/FiltersBlock/FiltersBlock';
// import Pagination from './components/Pagination/Pagination';
import Pagination from '../../../../SharedComponents/Pagination';
import {Helmet} from "react-helmet";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useSearchStore from '../../store/SearchStore';

const LeftSide = () => {
    const {
        pageTitle,
        categoriesLvl1, 
        loading,
        totalPages, 
        page, 
        lastPage, 
        nextPage,
        previousPage
    } = useCatalog()
    const {
        totalPages: filterTotalPages, 
        page: filterPage, 
        lastPage: filterLastPage, 
        nextPage: filterNextPage,
        previousPage: filterPreviousPage
    } = useSearchStore()
    const {documentType,lvl1} = useParams()
    const currentCategory = (categoriesLvl1?.filter((item) => item.Id == lvl1))[0]
    const isSearchDocument = documentType === 'search'
    return (
    <div className={"category-page-sub2"}>
        {currentCategory?.Id &&
        <Helmet>
            <title>{currentCategory.Title}</title>
            <meta name="keywords" content={currentCategory.Title}/>
            <link rel="canonical" href={entry + '/category/' + currentCategory.ParentId + '/' + currentCategory.Id}/>
            <link rel="alternate" href={entry + '/category/' + currentCategory.ParentId + '/' + currentCategory.Id} hreflang="he-il"/>
        </Helmet>
        }
        
        <FiltersBlock/>
        <div className="category-header-cont">
            <div className="row-cont flex-container">
                <div className="h1-cont col-lg-8">
                    <h1>{pageTitle}</h1>
                </div>
            </div>
        </div>
        <ProductList/>
        <Pagination 
            totalPages={(filterTotalPages && isSearchDocument) ? filterTotalPages :totalPages} 
            page={(filterPage && isSearchDocument)? filterPage :page} 
            lastPage={(filterLastPage && isSearchDocument) ? filterLastPage : lastPage} 
            nextPage={(filterNextPage && isSearchDocument) ? filterNextPage : nextPage} 
            previousPage={(previousPage && isSearchDocument)? previousPage : previousPage}
        />
    </div>
    );
};

export default LeftSide;