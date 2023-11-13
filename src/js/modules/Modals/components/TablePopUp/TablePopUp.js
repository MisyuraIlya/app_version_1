import React, { useEffect } from 'react';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import useSelectedProduct from '../../store/SelectedProductStore';
import { BallClipRotate } from 'react-pure-loaders';
import moment from 'moment';
const TablePopUp = ({active, setActive}) => {
    const {purchesHistoryData, loading} = useSelectedProduct()
    const {selectedProd} = useSelectedProduct()
    return (
    <ModalWrapper active={active} setActive={setActive}>
        <div className="tablePopUp docs">
            {loading &&
                <div style={{display:'flex',justifyContent:'center'}}>
                    <BallClipRotate
                        color={'#000000'}
                        loading={loading}
                    />
                </div>
            }
            {!loading &&
                <>
                <div className="for-calendar flex-container card">
                    <div className="golbal-header">
                        <h3 className="mainTitle">{selectedProd?.title}</h3>
                        <p className="subTitle">{selectedProd?.description}</p>
                        <p className="subTitle">{"#" + selectedProd?.sku}</p>
                    </div>
                </div>

                <div id='lines-main-cont' className={purchesHistoryData?.documentNumber ? "lines-main-cont openDept" : "lines-main-cont"}>
                    <table className="lines-sub-cont">
                        <tbody>
                        <tr className="heading">
                            <th className="col-cont">
                                <p>{'מספר הזמנה'}</p>
                            </th>
                            <th className="col-cont">
                                <p>{'תאריך'}</p>
                            </th>
                            <th className="col-cont">
                                <p>{'כמות'}</p>
                            </th>
                            <th className="col-cont">
                                <p>{'מחיר'}</p>
                            </th>
                            <th className="col-cont">
                                <p>{'מחיר מע״מ'}</p>
                            </th>
                            <th className="col-cont">
                                <p>{'הנחה'}</p>
                            </th>
                            <th className="col-cont">
                                <p>{'סה״כ'}</p>
                            </th>
                            <th className="col-cont">
                                <p>{'סה״כ כולל מע״מ'}</p>
                            </th>
                        </tr>
                        {purchesHistoryData?.map((el, ind) => {
                        return(
                            <tr key={ind} className={"item"}>
                                <th className={false ? "col-cont color": "col-cont"}>
                                    <p>{el?.documentNumber}</p>
                                </th>
                                <th className={false ? "col-cont color": "col-cont"}>
                                    <p>{moment(el?.date).format('DD-MM-YYYY')}</p>
                                </th>
                                <th className={false ? "col-cont color": "col-cont"}>
                                    <p>{el?.quantity}</p>
                                </th>
                                <th className={false ? "col-cont color": "col-cont"}>
                                    <p>{el?.price}</p>
                                </th>
                                <th className={false ? "col-cont color": "col-cont"}>
                                    <p>{el?.vatPrice}</p>
                                </th>
                                <th className={false ? "col-cont color": "col-cont"}>
                                    <p>{el?.discount}</p>
                                </th>
                                <th className={false ? "col-cont color": "col-cont"}>
                                    <p>{el?.totalPrice}</p>
                                </th>
                                <th className={false ? "col-cont color": "col-cont"}>
                                    <p>{el?.vatTotal}</p>
                                </th>
                            </tr>
                        )
                        })}
               
                        </tbody>
                    </table>
                </div>
                </>
            }


        </div>
    </ModalWrapper>

    );
};

export default TablePopUp;