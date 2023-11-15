import React, { useEffect } from 'react';
import CartList from '../components/CartList/CartList';
import Summary from '../components/Summary/Summary';
import CartOptions from '../components/CartOptions/CartOptions';
import useCart from '../store/CartStore';
import { getProductsLocalStorage } from '../helpers/localstorage';
const CartPage = () => {
    const {loading, cart, setCart} = useCart()
    useEffect(() => {
        setCart(getProductsLocalStorage())
    },[])
    return (
        <div className='page-container shop-cart docs'>
            {/* TODO ADD PRELOADER */}
            {loading && 
                <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div>
            }
            <div className='container flex-container prods-main-cont'>
                <div className='col-lg-9 right-cont'>
                    <div className='right-cont-subcont'>
                        <CartOptions/>
                        <CartList/>
                    </div>
                </div>
                <div className='col-lg-3 summary'>
                    <Summary/>
                </div>
            </div>
        </div>
    );
};

export default CartPage;