import React from 'react';
import useSelectedProduct from '../../../../../store/SelectedProductStore';

const ProductMainInfo = () => {
    const {selectedProd} = useSelectedProduct()
    console.log('selectedProd',selectedProd)
    return (
        <>
        <h2>{selectedProd?.title}</h2>
        {selectedProd.title ? (
            <div className="details">
                <p>{selectedProd.title}</p>
            </div>
        ) : null}
        {selectedProd?.sku && (
            <div className="prod-info-cont flex-container">
                <div className="col-lg-3">
                    <p className="c-title">
                        {'מספר קטלוגי'}
                    </p>
                </div>
                <div className="col-lg-9">
                    <p className="c-nomber">
                        {selectedProd?.sku}
                    </p>
                </div>
            </div>
        )}
        {selectedProd?.ResellPrice && (
            <div className="prod-info-cont flex-container">
                <div className="col-lg-3">
                    <p className="c-title">
                        {'מחיר לצרכן'}
                    </p>
                </div>
                <div className="col-lg-9">
                    <p className="c-nomber rtl">
                        {parseFloat(selectedProd?.ResellPrice)?.toFixed(1)}
                    </p>
                </div>
            </div>
        )}
        {selectedProd?.packQuantity && (
            <div className="prod-info-cont flex-container">
                <div className="col-lg-3">
                    <p className="c-title pack_quan">
                        {'יחידות במארז'}
                    </p>
                </div>
                <div className="col-lg-9">
                    <p className="c-nomber rtl">
                        {selectedProd?.packQuantity}
                    </p>
                </div>
            </div>
        )}
        {selectedProd?.Extra7 && ( // TODO FIX 
            <div className="prod-info-cont flex-container">
                <div className="col-lg-3">
                    <p className="c-title pack_quan">
                        {'יחידות במשטח'}
                    </p>
                </div>
                <div className="col-lg-9">
                    <p className="c-nomber rtl">
                        {selectedProd?.Extra7}
                    </p>
                </div>
            </div>
        )}

        {selectedProd?.InnerPack && (
            <div className="prod-info-cont flex-container">
                <div className="col-lg-3">
                    <p className="c-title pack_quan">
                        {'Inner'}
                    </p>
                </div>
                <div className="col-lg-9">
                    <p className="c-nomber rtl">
                        {selectedProd?.PackQuan}
                    </p>
                </div>
            </div>
        )}

        {selectedProd?.MasterCarton && (
            <div className="prod-info-cont flex-container">
                <div className="col-lg-3">
                    <p className="c-title pack_quan">
                        {'Master'}
                    </p>
                </div>
                <div className="col-lg-9">
                    <p className="c-nomber rtl">
                        {selectedProd?.PackQuan}
                    </p>
                </div>
            </div>
        )}
        </>
    );
};

export default ProductMainInfo;