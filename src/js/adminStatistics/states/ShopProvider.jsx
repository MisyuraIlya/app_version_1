import React, { createContext, useState, useContext, useEffect }from 'react';
import { ajax } from '../enums/AjaxFunction';
import moment from 'moment-timezone';

const ShopContex = createContext();

const useShop = () => {
    const context = useContext(ShopContex);
    if (!context) {
      throw new Error('Can not run without "ProductsProvider"');
    }
    return context;
  }



const ShopProvider = (props) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [totalSum, setTotalSum] = useState('0');
    const [ordersQuantity, setOrdersQuantity] = useState('0');
    const [averagePrice, setAveragePrice] = useState('0');
    const [totalItems, setTotalItems] = useState('0');
    const [averageItems, setAverageItems] = useState('0');
    const [salesPerCategory, setSalesPerCategory] = useState([]);
    const [orderTypes, setOrderTypes] = useState([]);
    const [bestItem, setBestItem] = useState('0')

    //tops
    const [topCustomers, setTopCustomers] = useState([])
    const [topOrders, setTopOrders] = useState([])
    const [topProductsPerPrice, setTopProductsPerPrice] = useState([])
    const [topProductsPerCount, setTopProductsPerCount] = useState([])

    //comprasion
    const [averageItemInOrderPerMonth, setAverageItemInOrderPerMonth] = useState([])
    const [averageItemsInOrderPerYear, setAverageItemsInOrderPerYear] = useState([])

    const [averagePricePerOrderByMonth, setAveragePricePerOrderByMonth] = useState([])
    const [averagePricePerOrderByYear, setAveragePricePerOrderByYear] = useState([])

    const [salesPerMonth, setSalesPerMonth] = useState({})
    const [salesPerYear, setSalesPerYear]= useState([])

    const [orderTypesPerMonths, setOrderTypesPerMonths] = useState([])
    const [orderTypesPerYear, setOrderTypesPerYear] = useState([])

    //activityChart
    const [activity, setActivity] = useState([])


    const getData = async (dateFrom , dateTo ) => {
        setLoading(true);
        let previousStart = moment(dateFrom).subtract(moment(dateTo).diff(moment(dateFrom), 'days') + 1,'days').format('DD/MM/YYYY');
        let previousEnd = moment(dateFrom).subtract(1,'day').format('DD/MM/YYYY');
        const valAjax = {
          funcName: 'getItems',
          point: 'products',
          val: {
            dateFrom : moment(dateFrom).format('DD/MM/YYYY'),
            dateTo: moment(dateTo).format('DD/MM/YYYY'),
            previousDateFrom:previousStart,
            previousDateTo:previousEnd
          }
        };
        try {
          const data = await ajax(valAjax);
          console.log('data',data)
          const parsedData = data
          console.log('parsedData',parsedData)
          if(parsedData.sumPrice.response){
            const exampleObj = {
              todaySumPrice:parsedData.todayTotalSales,
              sumOrder:parsedData.sumOrder,
              sumPrice:parsedData.sumPrice,
              ordersQuantity: parsedData.ordersQuantity,
              sumItems:parsedData.sumItems,
              bestSelletItem:parsedData.topTenProductsPerCount[0].title,
              averagePrice:{total:parsedData.averages.averageAmountPerOrder, last:parsedData.AverageAmountPerOrderDay},
              averageOrder:{total:parsedData.charts.orders,precent:parsedData.averages.averageOfItemsPerOrder.precent},
              averageItems:{total:parsedData.averages.averageOfItemsPerOrder,precent:54},
              bestCategories:parsedData.bestCategoriyPerDate,
              typeOrders:parsedData.charts.orders,
              topTenProductsPerPrice:parsedData.topTenProductsPerPrice,
              topTenProductsPerCount:parsedData.topTenProductsPerCount,
              salesPerMonth:parsedData.salesPerMonth,
              salesByCategory:parsedData.salesByCategory
            }
            setActivity(parsedData.FetchActivityHourDay)
            setTotalSum(parsedData.sumPrice.response)
            setOrdersQuantity(parsedData.ordersQuantity.response)
  
            setAveragePrice(parsedData.averages.averageAmountPerOrder.response)
            setTotalItems(parsedData.sumItemsPerDate)
            setAverageItems(parseInt(parsedData.averages.averageOfItemsPerOrder.response))
            setSalesPerCategory(parsedData.bestCategoriyPerDate)
            setOrderTypes(parsedData.charts.orders)
            setBestItem(parsedData.topTenProductsPerCount[0].title)
            setTopCustomers(parsedData.topTenCustomers)
            setTopOrders(parsedData.topTenOrders)
            setTopProductsPerPrice(parsedData.topTenProductsPerPrice)
            setTopProductsPerCount(parsedData.topTenProductsPerCount)
            setAverageItemInOrderPerMonth(parsedData.AverageItemInOrderPerMonth)
            setAverageItemsInOrderPerYear(parsedData.AverageItemsInOrderPerYear)
            setAveragePricePerOrderByMonth(parsedData.AveragePricePerOrderByMonth)
            setAveragePricePerOrderByYear(parsedData.AveragePricePerOrderByYear)
            setSalesPerMonth(parsedData.SalesPerMonth)
            setSalesPerYear(parsedData.SalesPerYear)
            setOrderTypesPerMonths(parsedData.OrderTypesPerMonths)
            setOrderTypesPerYear(parsedData.OrderTypesPerYear)
            setData(exampleObj)
        }else{
          setTotalSum(0);

        }

          
        } catch (error) {
          //console.error('[state/Shop/loadProducts] Failed to load shop data', { error });
        } finally {
          setLoading(false);
        }
    }

    const getComprassionData = async (dateFrom , dateTo) => {
      setLoading(true);
      let previousStart = moment(dateFrom).subtract(moment(dateTo).diff(moment(dateFrom), 'days') + 1,'days').format('DD/MM/YYYY');
      let previousEnd = moment(dateFrom).subtract(1,'day').format('DD/MM/YYYY');
      const valAjax = {
        funcName: 'getItems',
        point: 'products',
        val: {
          dateFrom : moment(dateFrom).format('DD/MM/YYYY'),
          dateTo: moment(dateTo).format('DD/MM/YYYY'),
          previousDateFrom:previousStart,
          previousDateTo:previousEnd
        }
      };
      try{
        const data = await ajax(valAjax);
        const parsedData = JSON.parse(data)
        const exampleObj = {
          todaySumPrice:parsedData.todayTotalSales,
          sumOrder:parsedData.sumOrder,
          sumPrice:parsedData.sumPrice,
          ordersQuantity: parsedData.ordersQuantity,
          sumItems:parsedData.sumItems,
          bestSelletItem:parsedData.topTenProductsPerCount[0].title,
          averagePrice:{total:parsedData.averages.averageAmountPerOrder, last:parsedData.AverageAmountPerOrderDay},
          averageOrder:{total:parsedData.charts.orders,precent:parsedData.averages.averageOfItemsPerOrder.precent},
          averageItems:{total:parsedData.averages.averageOfItemsPerOrder,precent:54},
          bestCategories:parsedData.bestCategoriyPerDate,
          typeOrders:parsedData.charts.orders,
          topTenProductsPerPrice:parsedData.topTenProductsPerPrice,
          topTenProductsPerCount:parsedData.topTenProductsPerCount,
          salesPerMonth:parsedData.salesPerMonth,
          salesByCategory:parsedData.salesByCategory
        }
        setAverageItemInOrderPerMonth(parsedData.AverageItemInOrderPerMonth)
        setAverageItemsInOrderPerYear(parsedData.AverageItemsInOrderPerYear)
        setAveragePricePerOrderByMonth(parsedData.AveragePricePerOrderByMonth)
        setAveragePricePerOrderByYear(parsedData.AveragePricePerOrderByYear)
        setSalesPerMonth(parsedData.SalesPerMonth)
        setSalesPerYear(parsedData.SalesPerYear)
        setOrderTypesPerMonths(parsedData.OrderTypesPerMonths)
        setOrderTypesPerYear(parsedData.OrderTypesPerYear)
      } catch (e) {

      } finally {
        setLoading(false)
      }
 
    }




    useEffect(() => {
        getData()
    },[])


    const shopMethods = {
        getData,
        getComprassionData,

      };

    return (
        <ShopContex.Provider value={{
            data,
            loading,
            shopMethods,
            totalSum,
            ordersQuantity,
            averagePrice,
            totalItems,
            averageItems,
            salesPerCategory,
            orderTypes,
            bestItem,
            topCustomers,
            topOrders,
            topProductsPerPrice,
            topProductsPerCount,
            activity,
            averageItemInOrderPerMonth,
            averageItemsInOrderPerYear,
            averagePricePerOrderByMonth,
            averagePricePerOrderByYear,
            salesPerMonth,
            salesPerYear,
            orderTypesPerMonths,
            orderTypesPerYear
          }} {...props} />
    );
};



export { useShop, ShopProvider };
