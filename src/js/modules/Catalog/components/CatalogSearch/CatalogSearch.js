import React, { useEffect } from 'react';
import { useAuth } from '../../../Auth/providers/AuthProvider';
import useSearchStore from '../../store/SearchStore';
import { useDebounce } from 'use-debounce';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useNotificationModal } from '../../../Modals/provider/NotificationModalProvider';
const CatalogSearch = () => {
    
    const {isAgent, user} = useAuth()
    const {searchValue, setSearchValue, loading, products, findProductsByValue, clearProducts} = useSearchStore()
    const {selectProduct} = useNotificationModal()
    const [valueDebounced] = useDebounce(searchValue, 1000);

    useEffect(() => {
        if(valueDebounced) {
            findProductsByValue(valueDebounced)
        }
    },[valueDebounced])

    return (
    <div className="search-cont-main">
        {isAgent || user  && 
            <div className="search-cont">
                <div className="input">
                    <input
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                        type="text"
                        placeholder={"חיפוש מוצר..."}
                        // onKeyPress={e => searchCheckEnter(e)}

                    />
                    {searchValue == "" ?
                        <span className="material-symbols-outlined search-img">search</span>
                        :
                        <span className="material-symbols-outlined search-img" onClick={() => {setSearchValue(''); clearProducts()}}>close</span>
                    }

                </div>
                {searchValue &&
                    <div className="searchRes-cont">
                        {loading &&
                            <div className="spinner-wrapper search-header">
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>
                            </div>
                        }
                        {products?.map((item, key) => {
                            if (key < 10) {
                                return (
                                    <div key={key} className="searchRes-row flex-container" onClick={() => selectProduct(item)}>
                                        <div className="img-cont col-lg-3">
                                            <img className="img"
                                                src={item.ImgPath ? item.ImgPath : globalFileServer + 'products/' + item.Img}
                                                onError={(e) => e.target.src = globalFileServer + 'placeholder.jpg'}/>
                                        </div>
                                        <div className="content col-lg-9">
                                            <p className="title">{item.Title}</p>
                                            <p className="catalog">{"#" + item.CatalogNumber}</p>
                                            {/* {localStorage.user ?
                                                <p className="price">{item.Price ? "₪ " + parseFloat(item.Price).toFixed(1) : ''}</p>
                                                : null} */}
                                        </div>
                                    </div>
                                )
                            }
                        })}

                        {products.length > 0 &&
                            <div className="all-res-cont" onClick={() => {setSearchValue('');clearProducts()}}>
                                <NavLink
                                    to={'/category/search/0/0/0/1/0/' + 'he' + '?Search=' + searchValue + '%26'}
                                    onClick={() => searchPhpFunc('', searchMode)}>
                                        <p>{"מעבר לכל ה (" + products.length + " ) תוצאות"}</p>
                                </NavLink>
                            </div>
                        
                        }
                        {(!searchValue || products.length == 0) &&
                            <div className="all-res-cont not-found">
                                <p>{"לא נמצאו תוצאות"}</p>
                            </div>
                        }
                    </div>
                }
            </div>
        }
    </div>
    );
};

export default CatalogSearch;