import React from 'react';
import { BallClipRotate } from 'react-pure-loaders';

// TODO 
const AgentStatisticsModule = ({dateName}) => {
    return (
        <>
            <div className='flex-container'>
                <div className='col-lg-3'>
                    <div className='col-lg-11 card_shadowing' style={{position:'relative'}}>
                      <div className='card_shadowing_cont'>

                        <p  className='mainStatisticAdmin'>שלום,</p>
                        <p  className='mainStatisticAdmin'>argentools</p>

                        <div className={'hello-img-cont'}>
                            <img src='https://bazar-react.vercel.app/assets/images/illustrations/dashboard/welcome.svg'/>
                        </div>
                      </div>
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div className='col-lg-11 card_shadowing'  style={{position:'relative'}}>
                      <div className='card_shadowing_cont'>
                        {/* {loading ?
                          <div className='myCenter'>
                              <BallClipRotate
                                  color={'#000000'}
                                  loading={loading}
                              />
                          </div>
                        : */}
                        <>
                          <div className='values-cont'>
                            <div className='values-subcont'>
                                {/* <p>{commaNumber(parseFloat(totalSum).toFixed(1))} ₪</p> */}
                            </div>
                            <p className='values-title'>מחזור</p>
                          </div>
                          <div className='values-cont'>
                            <div className='values-subcont'>
                                {/* <p>{commaNumber(parseFloat(averagePrice).toFixed(1))} ₪</p> */}
                            </div>
                            <p className='values-title'>ממוצע להזמנה</p>
                          </div>
                          <div className='values-cont'>
                            <div className='values-subcont'>
                                {/* <p>{ordersQuantity}</p> */}
                            </div>
                            <p className='values-title'>כמות הזמנות</p>
                          </div>
                          <div className='values-cont'>
                              <div className='values-subcont'>
                                  {/* <p>{commaNumber(totalItems)}</p> */}
                              </div>
                              <p className='values-title'>סה״כ כמות פריטים</p>
                            </div>
                            <div className='values-cont'>
                              <div className='values-subcont'>
                                  {/* <p>{commaNumber(averageItems)}</p> */}
                              </div>
                              <p className='values-title'>ממוצע כמות פריטים להזמנה</p>
                            </div>
                            <div className='values-cont'>
                              <div className='values-subcont smaller-font'>
                                  {/* <p>{bestItem}</p> */}
                              </div>
                              <p className='values-title'>סוכן מצטיין</p>
                            </div>
                        </>
                        {/* } */}
                      </div>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='col-lg-11 card_shadowing' style={{position:'relative'}}>
                      <div className='card_shadowing_cont'>
                        <p  className='mainStatisticAdmin'>מכירות לפי סוכן</p>

                        <p  className='mainStatisticAdmin'></p>
                        {/* {loading?
                        <div className='myCenter'>
                            <BallClipRotate
                                color={'#000000'}
                                loading={loading}
                            />
                        </div>
                        :
                        <MyPieChart title={titleCategory} price={priceCategory}/>
                        } */}
                      </div>
                    </div>
                </div>

            </div>


            <div className='flex-container list-block'>
                <div className='col-lg-6'>
                    <div className='col-lg-11 card_shadowing' style={{ position:'relative'}}>
                        {/* {loading ?
                        <div className='myCenter'>
                            <BallClipRotate
                                color={'#000000'}
                                loading={loading}
                            />
                        </div>

                    :
                        <NewTopTenSegment
                        titleArr={['שם סוכן','סה״כ']}
                        dataArr={topProductsPrice}
                        dataArr2={topProductsCount}
                        mainTitle={'מכירות סוכנים'}
                        showSelectBox={true}
                        selectBoxArr={['מחיר', 'כמות']}
                        defaultTitle={'מחיר'}
                        />} */}

                    </div>
                </div>

                <div className='col-lg-6'>
                    <div className='col-lg-11 card_shadowing' style={{ position:'relative'}}>
                        {/* {loading ?
                        <div className='myCenter'>
                            <BallClipRotate
                                color={'#000000'}
                                loading={loading}
                            />
                        </div>

                        :
                        <NewTopTenSegment
                        titleArr={['שם סוכן','ביקורים', 'משימות']}
                        dataArr={topOrdersObj}
                        dataArr2={[]}
                        mainTitle={'משימות/ביקורים סוכנים'}
                        showSelectBox={false}
                        selectBoxArr={['כמות']}
                        defaultTitle={'כמות'}
                        />
                        } */}

                    </div>
                </div>

            </div>

           
        </>
    );
};

export default AgentStatisticsModule;