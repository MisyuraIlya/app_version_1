import React, { useEffect, useState } from 'react';
import 'react-best-tabs/dist/index.css';
import MyPieChart from './componentsV3/MyPieChart';
import MySpliceChart from './componentsV3/MySpliceChart';
import { useAgentStats } from './states/AgentsStatsPorvider';
import { BallClipRotate } from 'react-pure-loaders';
import NewTopTenSegment from './componentsV3/NewTopTenSegment';
import commaNumber from 'comma-number';
const MainAppAgentStats = ({dateName,  tabNumber}) => {
    const [titleCategory, setTitleCategory] = useState([])
    const [priceCategory, setPriceCategory] = useState([])
    const {shopMethods} = useAgentStats()
    const [titleOrderType, setTitleOrderType] = useState([])
    const [priceOrderType, setPriceOrderType] = useState([])

    //tops

    const [topProductsPrice, setTopProductsPrice] = useState([])
    const [topProductsCount, setTopProductsCount] = useState([])
    const [topCustomersObj, setTopCustomersObj] = useState([])
    const [topOrdersObj , setTopOrderObj] = useState([])
    const [monthsSelectObj, setMonthsSelectObj] = useState([])
    const [selectedMonthToView, setSelectedMonthToView] = useState(false)

    const [agentListObj , setAgentListObj] = useState([])



    const prepareObjCategory = () => {
        let priceArr = []
        let titleArr = []


        let agentListObj = [];
        let tmpObj = {};
        salesPerCategory.map((item,key) => {
          priceArr.push(parseInt(item.sum));
          titleArr.push(item.title);
          
          tmpObj = {'title':item.title,'num': item.num , 'sum' : item.sum}
          agentListObj.push(tmpObj);
         
        })
        setTitleCategory(titleArr)
        setPriceCategory(priceArr)
        setAgentListObj(agentListObj);
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
    const prepareSelectObj = () =>{
      let monthsSelectObj = [
                      {'Id' : 0,'Title': 'ינואר'},
                      {'Id' : 1,'Title': 'פברואר'},
                      {'Id' : 2,'Title': 'מרץ'},
                      {'Id' : 3,'Title': 'אפריל'},
                      {'Id' : 4,'Title': 'מאי'},
                      {'Id' : 5,'Title': 'יוני'},
                      {'Id' : 6,'Title': 'יולי'},
                      {'Id' : 7,'Title': 'אוגוסט'},
                      {'Id' : 8,'Title': 'ספטמבר'},
                      {'Id' : 9,'Title': 'אוקטובר'},
                      {'Id' : 10,'Title': 'נובמבר'},
                      {'Id' : 11,'Title': 'דצמבר'}
                     ];

      setMonthsSelectObj(monthsSelectObj);
      let d = new Date();
      let month = d.getMonth();

      setSelectedMonthToView(month);
      shopMethods.getData(month);
    }

    const editDocTypeSort = (event ) =>{

      let value = parseInt(event.target.value);
      setSelectedMonthToView(value);

      shopMethods.getData(value);

      //AgentStatsProvider.getData(value);
    }

    let width = window.innerWidth < 600
    const {data,loading,totalSum,ordersQuantity,averagePrice,totalItems,averageItems,salesPerCategory,orderTypes,bestItem,topCustomers,topOrders,topProductsPerPrice,topProductsPerCount,activity} = useAgentStats();

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

      useEffect(() => {
         if(tabNumber==1){
          shopMethods.getData('daily');
        }else if(tabNumber==2){
            prepareSelectObj()
        }else if(tabNumber==3){
          shopMethods.getData('year');
        }
       
      },[tabNumber])
    return (
        <>
            <div className='flex-container'>
                <div className='col-lg-3 card-cont'>
                    <div className='col-lg-11 card_shadowing' style={{position:'relative'}}>
                      <div className='card_shadowing_cont'>

                        <p  className='mainStatisticAdmin'>שלום,</p>
                        <p  className='mainStatisticAdmin'>argentools</p>
                        {tabNumber == '2' &&
                          <div className="select-cont">
                            <select value={selectedMonthToView}  onChange={(e) => editDocTypeSort(e)}>
                              {monthsSelectObj.map((ele, ind) => {
                                return (
                                  <option key={ind} id={parseInt(ele.Id)} value={parseInt(ele.Id)}>{ele.Title}</option>
                                )
                              })}
                            </select>
                          </div>
                        }
                        <div className={'hello-img-cont'}>
                            <img src='https://bazar-react.vercel.app/assets/images/illustrations/dashboard/welcome.svg' />
                        </div>
                      </div>
                    </div>
                </div>
                <div className='col-lg-3 card-cont'>
                    <div className='col-lg-11 card_shadowing agents-stats-card'  style={{position:'relative'}}>
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
                        titleArr={['סוכן','יעד', 'מחזור']}
                        dataArr={agentListObj}
                        dataArr2={[]}
                        mainTitle={'פירוט ביצועי סוכנים'}
                        showSelectBox={false}
                        selectBoxArr={['כמות','מחיר']}
                        defaultTitle={'מחיר'}
                        />
                        }

                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='col-lg-11 card_shadowing' style={{position:'relative'}}>
                      <div className='card_shadowing_cont'>

                        <p  className='mainStatisticAdmin'>מכירות לפי סוכן </p>
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

            </div>

           
        </>
    );
};

export default MainAppAgentStats;
