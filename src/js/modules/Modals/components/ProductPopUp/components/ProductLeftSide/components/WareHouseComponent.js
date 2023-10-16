import React from 'react';
import useSelectedProduct from '../../../../../store/SelectedProductStore';
import { useAuth } from '../../../../../../Auth/providers/AuthProvider';

const WareHouseComponent = () => {
    const {selectedProd} = useSelectedProduct()
    const {isSuperAgent, isAgent} = useAuth()
    return (
        <>
        {selectedProd?.sku ? (
        <>
            <div className="devider"></div>
            <div className="prod-info-cont flex-container">
                <div className="col-lg-3">
                    <p className="c-title">{"מלאי מחסן"}</p>
                </div>
                <div className="col-lg-9">
                    <p className="c-nomber">{selectedProd.stock}</p>
                </div>
            </div>
            {/* <div className="prod-info-cont flex-container">
                <div className="col-lg-3">
                    <p className="c-title">{"מלאי מוקצה"}</p>
                </div>
                <div className="col-lg-9">
                    <p className="c-nomber">{selectedProd.OnHandOpenOrders}</p>
                    {selectedProd.OnHandOpenOrders &&
                    parseInt(selectedProd.OnHandOpenOrders) > 0 &&
                    isSuperAgent ? (
                        <span
                            onClick={() => this.setUpAjaxBeforeFunc('getOnHandOpenOrdersList')}
                            className="ExtendBtn material-symbols-outlined"
                        >
                            visibility
                        </span>
                    ) : null}
                </div>
            </div> */}
            {/* <div className="prod-info-cont flex-container">
                <div className="col-lg-3">
                    <p className="c-title">{"ממתין לאישור"}</p>
                </div>
                <div className="col-lg-9">
                    <p className="c-nomber">{isSuperAgent.OnHandInternalWaitingOrders}</p>
                    {isSuperAgent.OnHandInternalWaitingOrders &&
                    parseInt(isSuperAgent.OnHandInternalWaitingOrders) > 0 &&
                    isSuperAgent ? (
                        <span
                            onClick={() => this.setUpAjaxBeforeFunc('getOnHandInternalWaitingOrders')}
                            className="ExtendBtn material-symbols-outlined"
                        >
                            visibility
                        </span>
                    ) : null}
                </div>
            </div> */}
            {/* <div className="prod-info-cont flex-container">
                <div className="col-lg-3">
                    <p className="c-title">{"כמות בדרך"}</p>
                </div>
                <div className="col-lg-9">
                    <p className="c-nomber">{selectedProd.OnHandFutureOrdersItems}</p>
                    {selectedProd.OnHandFutureOrdersItems &&
                    parseInt(selectedProd.OnHandFutureOrdersItems) > 0 &&
                    isAgent ? (
                        <span
                            onClick={() => this.setUpAjaxBeforeFunc('getFutureOrdersList')}
                            className="ExtendBtn material-symbols-outlined"
                        >
                            visibility
                        </span>
                    ) : null}
                </div>
            </div> */}
            <div className="prod-info-cont flex-container">
                <div className="col-lg-3">
                    <p className="c-title">{"זמין למכירה"}</p>
                </div>
                <div className="col-lg-9">
                    <p className="c-nomber">{selectedProd.stock}</p>
                </div>
            </div>
        </>
        
            ) : null}

        </>
    );
};

export default WareHouseComponent;