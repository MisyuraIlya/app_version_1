import React from 'react';
import useCart from '../modules/Cart/store/CartStore';

const CartLength = () => {
    const {cart} = useCart()
    return (
        <>
            {cart.length}   
        </>
    );
};

export default CartLength;