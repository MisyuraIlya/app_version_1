import React from 'react';
import useCategoriesEditStore from '../../store/CategoriesEditStore';

const CategoryEditFilters = () => {

    const {search,setSearch} = useCategoriesEditStore()
    return (
        <div className="add-item add-item-main">
            <div className="flex-container">
                <div className="col-lg-6 alon-main-container">

                </div>
                <div className="col-lg-6">
                    <div className="search">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            type="text"
                            placeholder="חיפוש..."
                        />
                        {search ?
                            <img className="close" onClick={() => setSearch('')} src={globalFileServer + "icons/close.svg"} alt=""/>
                        :
                        <img src={globalFileServer + "icons/search.svg"} alt=""/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryEditFilters;