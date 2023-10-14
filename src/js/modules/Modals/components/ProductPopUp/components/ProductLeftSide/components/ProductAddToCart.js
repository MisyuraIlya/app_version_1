import React from 'react';
import useSelectedProduct from '../../../../../store/SelectedProductStore';
import useCart from '../../../../../../Cart/store/CartStore';
import { getUserFromStorage } from '../../../../../../Auth/helpers/auth.helper';
import AddToCart from '../../../../../../Cart/components/AddToCart/AddToCart';

const ProductAddToCart = () => {
    const {selectedProd, isFetchOnline, loading} = useSelectedProduct()
    const {selectedMode, getCartItem, Maam} = useCart()
    const cartItem = getCartItem(selectedProd)

    return (
    <div className="flex-container bottom-flex">
        {(!isFetchOnline || !loading) &&
            <>
        {selectedProd.Price ? (
            <div className="price-cont col-lg-8"></div>
        ) : null}

        <div className="add-cont col-lg-4">
            {selectedProd.Price &&
            selectedMode &&
            (getUserFromStorage()) ? (
                <div className="actions flex-container">
                    {cartItem?.Id && (
                        <div className="added">
                            <img src={globalFileServer + 'icons/in_cart.png'} />
                            <p>{'נוסף לסל'}</p>
                        </div>
                    )}
                    {parseInt(selectedProd.OnHand) !== 0 ? (
                        <>
                            <div className={cartItem.length ? "add-to-cart" : "add-to-cart not-in-cart"}>
                                <AddToCart item={selectedProd}/>
                            </div>

                            <div className="sum-cont">
                                <h3 className="h3-1">{"סה״כ: "}</h3>
                                {(
                                    (cartItem.length && (("UnitChosen" in cartItem && (cartItem.UnitChosen === 0 || cartItem.UnitChosen === 2)) || (!("UnitChosen" in cartItem)))) ||
                                    (cartItem.length === 0)
                                ) ? (
                                    <h3 className="h3-2">
                                        {cartItem?.Id
                                            ? ((parseFloat(selectedProd.Products.Price)) *
                                                cartItem.Quantity)
                                                .toFixed(1)
                                            : "0"}
                                    </h3>
                                ) : (
                                    <h3 className="h3-2">
                                        {cartItem?.Id  
                                            ? (
                                                  (parseFloat(selectedProd.Price)) *
                                                  cartItem.Quantity *
                                                  parseFloat(selectedProd.PackQuan)
                                                  .toFixed(1)
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