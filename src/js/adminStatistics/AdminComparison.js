import React, { useEffect } from 'react';
import { useShop } from './states/ShopProvider';
import ColumgChart1 from './componentsV3/charts/ColumgChart1';
import ColumnYear from './componentsV3/ColumnYear';
const AdminComparison = () => {
    const {data,loading,shopMethods,averageItemInOrderPerMonth,averageItemsInOrderPerYear,averagePricePerOrderByMonth,averagePricePerOrderByYear,salesPerMonth,salesPerYear,orderTypesPerMonths,orderTypesPerYear} = useShop();
    useEffect(() => {
      shopMethods.getComprassionData()
    },[])
    return (
        <div className="App">
            <div className='container container-app'>
              <div className='flex-container  list-block'>
                <div className='card_shadowing col-lg-12'>
                  <div className='container' >
                    <div className='list-block-title-cont comparison-block'>
                      <div className='title_cont'>
                        <h2>{'פילוח שנתי'}</h2>
                      </div>
                      <ColumnYear
                      averageItemsInOrderPerYear={averageItemsInOrderPerYear}
                      averagePricePerOrderByYear={averagePricePerOrderByYear}
                      salesPerYear={salesPerYear}
                      orderTypesPerYear={orderTypesPerYear}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex-container list-block'>
                  <div className='card_shadowing col-lg-12'>
                    <div className='container' >
                      <div className='list-block-title-cont comparison-block'>
                        <div className='title_cont'>
                          <h2>{'פילוח חודשי'}</h2>
                        </div>
                        <ColumgChart1
                        averageItemInOrderPerMonth={averageItemInOrderPerMonth}
                        averagePricePerOrderByMonth={averagePricePerOrderByMonth}
                        salesPerMonth={salesPerMonth}
                        orderTypesPerMonths={orderTypesPerMonths}
                        />
                      </div>
                    </div>
                  </div>
              </div>

            </div>
        </div>
    );
};

export default AdminComparison;
