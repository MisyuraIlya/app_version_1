import React, { useEffect, useState } from 'react';
import 'react-best-tabs/dist/index.css';
import MyPieChart from './componentsV3/MyPieChart';
import MySpliceChart from './componentsV3/MySpliceChart';
import { useShop } from './states/ShopProvider';
import { BallClipRotate } from 'react-pure-loaders';
import NewTopTenSegment from './componentsV3/NewTopTenSegment';
import commaNumber from 'comma-number';
const MainApp = ({dateName}) => {
    const [titleCategory, setTitleCategory] = useState([])
    const [priceCategory, setPriceCategory] = useState([])

    const [titleOrderType, setTitleOrderType] = useState([])
    const [priceOrderType, setPriceOrderType] = useState([])

    //tops

    const [topProductsPrice, setTopProductsPrice] = useState([])
    const [topProductsCount, setTopProductsCount] = useState([])
    const [topCustomersObj, setTopCustomersObj] = useState([])
    const [topOrdersObj , setTopOrderObj] = useState([])

    const prepareObjCategory = () => {
        let priceArr = []
        let titleArr = []

        salesPerCategory.map((item) => {
          priceArr.push(item.sum)
          titleArr.push(item.title)
        })
        setTitleCategory(titleArr)
        setPriceCategory(priceArr)
      }

    const prepareObjOrderType = () => {
    setTitleOrderType(['אשראי','הזמנות רגליות'])
    //console.log([parseFloat(orderTypes.totalCards), parseFloat(orderTypes.totalSimple)])
    setPriceOrderType([parseFloat(orderTypes.totalCards), parseFloat(orderTypes.totalSimple)])
    }

    const prepareObjTopCustomers = () => {
        let res = []
        topCustomers && topCustomers.map((item,index) => {
            let obj = {
                title:item.clientName,
                num:item.total,
            }

            res.push(obj)
        })
        setTopCustomersObj(res)
    }

    const prepareObjTopOrders = () => {
        let res = []
        topOrders&& topOrders.map((item,index) => {
            let obj = {
                title:item.clientName,
                num:item.orderExtId,
                sum:item.total,
            }

            res.push(obj)
        })
        setTopOrderObj(res)
    }

    const prepareObjTopProductsPerPrice = () => {
        let res = []
        topProductsPerPrice&& topProductsPerPrice.map((item,index) => {
            let obj = {
                title:item.title,
                num:item.catalogNumber,
                sum:item.price,
            }

            res.push(obj)
        })
        setTopProductsPrice(res)
    }

    const prepareObjTopProductsPerCount = () => {
        let res = []
        topProductsPerCount&& topProductsPerCount.map((item,index) => {
            let obj = {
                title:item.title,
                num:item.catalogNumber,
                sum:item.count,
            }

            res.push(obj)
        })
        setTopProductsCount(res)
    }

    let width = window.innerWidth < 600
    const {data,loading,totalSum,ordersQuantity,averagePrice,totalItems,averageItems,salesPerCategory,orderTypes,bestItem,topCustomers,topOrders,topProductsPerPrice,topProductsPerCount,activity} = useShop();

    useEffect(() => {
        if(salesPerCategory){
            prepareObjCategory()
        }
      },[salesPerCategory])
      useEffect(() => {
        if(orderTypes){
            prepareObjOrderType()
        }
      },[orderTypes])
      useEffect(() => {
        if(topProductsPerPrice){
            prepareObjTopProductsPerPrice()
        }
      },[topProductsPerPrice])
      useEffect(() => {
        if(topProductsPerCount){
            prepareObjTopProductsPerCount()
        }
      },[topProductsPerCount])

      useEffect(() => {
        if(topCustomers){
            prepareObjTopCustomers()
        }
      },[topCustomers])
      useEffect(() => {
        if(topCustomers){
            prepareObjTopOrders()
        }
      },[topOrders])
    return (
        <>
            <div className='flex-container'>
                <div className='col-lg-3 card-cont'>
                    <div className='col-lg-11 card_shadowing' style={{position:'relative'}}>
                      <div className='card_shadowing_cont'>

                        <p  className='mainStatisticAdmin'>שלום,</p>
                        <p  className='mainStatisticAdmin'>argentools</p>

                        <div className={'hello-img-cont'}>
                            <img src='https://bazar-react.vercel.app/assets/images/illustrations/dashboard/welcome.svg' />
                        </div>
                      </div>
                    </div>
                </div>
                {totalSum != 0 && 
                <>
                  <div className='col-lg-3 card-cont'>
                      <div className='col-lg-11 card_shadowing'  style={{position:'relative'}}>
                        <div className='card_shadowing_cont'>
                          {loading ?
                            <div className='myCenter'>
                                <BallClipRotate
                                    color={'#000000'}
                                    loading={loading}
                                />
                            </div>
                          :
                          <>
                            <div className='values-cont'>
                              <div className='values-subcont'>
                                  <p>{commaNumber(parseFloat(totalSum).toFixed(1))} ₪</p>
                              </div>
                              <p className='values-title'>מחזור</p>
                            </div>
                            <div className='values-cont'>
                              <div className='values-subcont'>
                                  <p>{commaNumber(parseFloat(averagePrice).toFixed(1))} ₪</p>
                              </div>
                              <p className='values-title'>ממוצע להזמנה</p>
                            </div>
                            <div className='values-cont'>
                              <div className='values-subcont'>
                                  <p>{ordersQuantity}</p>
                              </div>
                              <p className='values-title'>כמות הזמנות</p>
                            </div>
                          </>
                          }
                        </div>
                      </div>
                  </div>
                  <div className='col-lg-6 card-cont'>
                      <div className='col-lg-11 card_shadowing' style={{position:'relative'}}>
                        <div className='card_shadowing_cont'>

                          <p  className='mainStatisticAdmin'>מכירות לפי קטגוריה בש"ח</p>
                          {loading?
                          <div className='myCenter'>
                              <BallClipRotate
                                  color={'#000000'}
                                  loading={loading}
                              />
                          </div>
                          :
                          <MyPieChart title={titleCategory} price={priceCategory}/>
                          }
                        </div>
                      </div>
                  </div>
                </>}

            </div>
            {totalSum != 0 && 
            <>
              <div className='flex-container'>
                  <div className='col-lg-3 card-cont hide-on-mob'>
                    <div className='col-lg-1'  style={{height:'250px', position:'relative'}}>
                    </div>
                  </div>
                  <div className='col-lg-3 card-cont'>
                      <div className='col-lg-11 card_shadowing'  style={{position:'relative'}}>
                        <div className='card_shadowing_cont'>
                          {loading ?
                            <div className='myCenter'>
                                <BallClipRotate
                                    color={'#000000'}
                                    loading={loading}
                                />
                            </div>
                          :
                            <>
                              <div className='values-cont'>
                                <div className='values-subcont'>
                                    <p>{commaNumber(totalItems)}</p>
                                </div>
                                <p className='values-title'>סה"כ כמות פריטים</p>
                              </div>
                              <div className='values-cont'>
                                <div className='values-subcont'>
                                    <p>{commaNumber(averageItems)}</p>
                                </div>
                                <p className='values-title'>ממוצע כמות פריטים להזמנה</p>
                              </div>
                              <div className='values-cont'>
                                <div className='values-subcont smaller-font'>
                                    <p>{bestItem}</p>
                                </div>
                                <p className='values-title'>נמכר ביותר</p>
                              </div>

                            </>
                          }
                        </div>
                      </div>
                  </div>

                  <div className='col-lg-6'>
                      <div className='col-lg-11 card_shadowing' style={{position:'relative'}}>
                        <div className='card_shadowing_cont'>
                          <p  className='mainStatisticAdmin'>סוג תשלום</p>
                          {loading?
                          <div className='myCenter'>
                              <BallClipRotate
                                  color={'#000000'}
                                  loading={loading}
                              />
                          </div>
                          :
                          <MyPieChart  title={titleOrderType} price={priceOrderType}/>
                          }
                        </div>
                      </div>
                  </div>
              </div>

              <div className='flex-container list-block'>
                  <div className='col-lg-6'>
                      <div className='col-lg-11 card_shadowing' style={{ position:'relative'}}>
                          {loading ?
                          <div className='myCenter'>
                              <BallClipRotate
                                  color={'#000000'}
                                  loading={loading}
                              />
                          </div>

                      :
                          <NewTopTenSegment
                          titleArr={['שם פריט','מספר פריט','כמות']}
                          dataArr={topProductsPrice}
                          dataArr2={topProductsCount}
                          mainTitle={'פריטים - TOP 10'}
                          showSelectBox={true}
                          selectBoxArr={['מחיר', 'כמות']}
                          defaultTitle={'מחיר'}
                          />}

                      </div>
                  </div>

                  <div className='col-lg-6'>
                      <div className='col-lg-11 card_shadowing' style={{ position:'relative'}}>
                          {loading ?
                          <div className='myCenter'>
                              <BallClipRotate
                                  color={'#000000'}
                                  loading={loading}
                              />
                          </div>

                          :
                          <NewTopTenSegment
                          titleArr={['שם לקוח','מספר הזמנה', 'סה"כ']}
                          dataArr={topOrdersObj}
                          dataArr2={[]}
                          mainTitle={'הזמנות - TOP 10'}
                          showSelectBox={false}
                          selectBoxArr={['כמות','מחיר']}
                          defaultTitle={'מחיר'}
                          />
                          }

                      </div>
                  </div>

              </div>

              <div className='flex-container  list-block'>
                  <div className='col-lg-6'>
                      <div className='col-lg-11 card_shadowing' style={{ position:'relative'}}>
                          {loading ?

                          <div className='myCenter'>
                          <BallClipRotate
                              color={'#000000'}
                              loading={loading}
                          />
                          </div>
                          :
                          <NewTopTenSegment
                          titleArr={['שם לקוח','סכום']}
                          dataArr={topCustomersObj}
                          dataArr2={[]}
                          mainTitle={'לקוחות - TOP 10'}
                          showSelectBox={false}
                          selectBoxArr={['כמות','מחיר']}
                          defaultTitle={'מחיר'}
                          />
                          }

                      </div>
                  </div>

                  <div className='col-lg-6'>
                      <div className='col-lg-11 card_shadowing' style={{height:'580px', position:'relative'}}>
                        <div className='container' >
                          <div className='flex-container list-block-title-cont'>
                            <div className='col-lg-12 title_cont'>
                                <h2>{'זמני מכירות ביממה'}</h2>
                            </div>
                          </div>
                          {loading ?
                              <div className='myCenter'>
                              <BallClipRotate
                                  color={'#000000'}
                                  loading={loading}
                              />
                              </div>

                              :

                              <MySpliceChart data={activity}/>
                          }
                        </div>
                      </div>
                  </div>

              </div>
            </>
            }
        </>
    );
};

export default MainApp;
