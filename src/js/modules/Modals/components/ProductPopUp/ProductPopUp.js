import React from 'react';
import ProductRightSide from './components/ProductRigheSide/ProductRightSide';
import ProductLeftSide from './components/ProductLeftSide/ProductLeftSide';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

const ProductPopUp = ({active, setActive}) => {
    
    return (
        <ModalWrapper active={active} setActive={setActive}>
            <div className='product-page'>
                <div className='product-wrapper flex-container'>
                    <div className='col-lg-5 image flex-container'>
                        <ProductRightSide/>
                    </div>
                    <div className='col-lg-7 info-p'>
                        <ProductLeftSide/>
                    </div>
                </div>
            </div>
        </ModalWrapper>

    );
};

export default ProductPopUp;