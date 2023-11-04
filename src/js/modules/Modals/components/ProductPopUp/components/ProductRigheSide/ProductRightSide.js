import React from 'react';
import useSelectedProduct from '../../../../store/SelectedProductStore';
import AdditionalImages from '../AdditionalImages';

const ProductRightSide = () => {
    const {selectedProd} = useSelectedProduct()

    const shareImage = () => {
        let message = 'שיתוף לינק לתמונה \n';
        message += 'מק״ט: ' + selectedProd.sku + '\n';
        message += 'מוצר: ' + selectedProd.title + '\n';
        message += 'לינק: '
        message += globalFileServer + "products/" + selectedProd.defaultImagePath;
        window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(message));
    }

    const openLink = () => {
        let imageURL = globalFileServer + "products/" + selectedProd.defaultImagePath;
        window.open(imageURL, '_blank');
    }

    return (
        <>
            <span className="material-symbols-outlined span1" onClick={()=> shareImage()}>share</span>
            <span className="material-symbols-outlined span2" onClick={()=> openLink()}>link</span>
            <img className="img  col-lg-12" src={globalFileServer + 'products/' + selectedProd.defaultImagePath}/>
            <div className="additional-img-cont col-lg-11">
                {selectedProd?.imagePath.length > 1 &&
                <AdditionalImages/>
                }
            </div>
        </>
    );
};

export default ProductRightSide;