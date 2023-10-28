import React from 'react';
import useSelectedProduct from '../../../../../store/SelectedProductStore';
import useCart from '../../../../../../Cart/store/CartStore';
import { getUserFromStorage } from '../../../../../../Auth/helpers/auth.helper';
import AddToCart from '../../../../../../Cart/components/AddToCart/AddToCart';
import { useAuth } from '../../../../../../Auth/providers/AuthProvider';

const ProductAddToCart = () => {
    const {selectedProd, isFetchOnline, loading} = useSelectedProduct()
    const {isUser} = useAuth()
    const {selectedMode, getCartItem, Maam} = useCart()
    const cartItem = getCartItem(selectedProd)
    return (
    <div className="flex-container bottom-flex">
        {(!isFetchOnline || !loading) &&
            <>
        {selectedProd.finalPrice ? (
            <div className="price-cont col-lg-8"></div>
        ) : null}
        
        <div className="add-cont col-lg-4">
            {selectedProd.finalPrice &&
            selectedMode &&
            (isUser) ? (
                <div className="actions flex-container">
                    {cartItem?.sku && (
                        <div className="added">
                            <span class="material-symbols-outlined">done</span>
                            <p>{'נוסף לסל'}</p>
                        </div>
                    )}
                    {selectedProd?.stock > 0 ? (
                        <>
                            <div className={cartItem.length ? "add-to-cart" : "add-to-cart not-in-cart"}>
                                <AddToCart item={selectedProd}/>
                            </div>

                            <div className="sum-cont">
                                <h3 className="h3-1">{"סה״כ: "}</h3>
                                {(
                                    (cartItem.length)
                                ) ? (
                                    <h3 className="h3-2">
                                        {cartItem?.sku
                                            ? ((parseFloat(selectedProd.finalPrice)) *
                                                cartItem.quantity)
                                                .toFixed(1)
                                            : "0"}
                                    </h3>
                                ) : (
                                    <h3 className="h3-2">
                                        {cartItem?.sku  
                                            ? (
                                            selectedProd.finalPrice * cartItem.quantity * selectedProd.packQuantity 
                                              ).toFixed(1)
                                            : "0"}
                                    </h3>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="added">
                            <span className="material-symbols-outlined">info</span>
                            <p className="red">{'אזל המלאי'}</p>
                        </div>
                    )}
                </div>
            ) : null}
        </div>
            
            </>
        }

    </div>
    );
};

export default ProductAddToCart;