import React, { useEffect } from 'react';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import useSelectedProduct from '../../store/SelectedProductStore';
import { BallClipRotate } from 'react-pure-loaders';
const TablePopUp = ({active, setActive}) => {
    const {purchesHistoryData, loading} = useSelectedProduct()
    

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
                {purchesHistoryData?.PageTitleObj ? 
                    <div className="for-calendar flex-container card">
                    <div className="golbal-header">
                        {purchesHistoryData?.PageTitleObj?.Title &&
                        <h3 className="mainTitle">{purchesHistoryData?.PageTitleObj.Title}</h3>
                        }
                        {purchesHistoryData?.CustTitle &&
                        <p className="subTitle">{purchesHistoryData?.PageTitleObj?.CustTitle}</p>
                        }
                        {purchesHistoryData?.CustExId &&
                        <p className="subTitle">{"#" + purchesHistoryData?.PageTitleObj?.CustExId}</p>
                        }
                    </div>
                    </div>
                :null}

                <div id='lines-main-cont' className={purchesHistoryData?.openDept ? "lines-main-cont openDept" : "lines-main-cont"}>
                    <table className="lines-sub-cont">
                        <tbody>
                        <tr className="heading">
                            {purchesHistoryData?.HeaderObj?.map((element, index) => {
                                return(
                                <th key={index} className="col-cont">
                                    <p>{element}</p>
                                </th>
                                )
                            })}
                        </tr>
                        {purchesHistoryData?.BodyArr?.map((element, index) => {
                            return(
                                <tr key={index} className={"item"}>
                                    {element.map((el, ind) => {
                                    // let findObjInArr = this.state.linesSelectedSumObj.filter(item => item.Row == index); //TODO 
                                    return(
                                        <th className={false ? "col-cont color": "col-cont"} onClick={()=>this.clickOnCol(index,element,ind)}>
                                        <p>{el}</p>
                                        </th>
                                    )
                                    })}
                                </tr>
                            );
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