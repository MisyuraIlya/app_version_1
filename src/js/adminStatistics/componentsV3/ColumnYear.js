import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import MySelectBox from './MySelectBox';
const ColumnYear = ({averageItemsInOrderPerYear,averagePricePerOrderByYear,salesPerYear,orderTypesPerYear}) => {

      // console.log('1',averageItemsInOrderPerYear)
  // console.log('2',averagePricePerOrderByMonth)
  // console.log('3',orderTypesPerMonths)
  // console.log('4',salesPerMonth)

  const [object, setObject] = useState([])
  const [secondObject, setSecondObject] = useState([])

  const [openSelect, setOpenSelect] = useState(false); //to open the selectbox
  const [optionsState, setOptionState] = useState('בחר'); //output

  const fetchActualData = (type) => {
    let data = null;
    if('הזמנות שוטף/אשראי' == type){
      data = orderTypesPerYear;
    } else if('ממוצע להזמנה' == type){
      data = averagePricePerOrderByYear;
    } else if('ממוצע פריטים להזמנה' == type){
      data = averageItemsInOrderPerYear;
    } else if('מחזור' == type){
      data = salesPerYear;
    }
    return data;
  }
  const fetchAllYears = () => {
    let object = []
    let type = fetchActualData(optionsState)
    if(type){
      if(type.sent && type.draft){
        let firstObject = []
        let secondObject = []
        type.sent.map((item) => {
            let obj = {
              x: item.year,
              y:item.total ? item.total : item.count
            }
            firstObject.push(obj)

        })

        type.draft.map((item) => {
            let obj = {
              x:item.year ,
              y:item.total ? item.total : item.count
            }
            secondObject.push(obj)

        })
        setObject(firstObject)
        setSecondObject(secondObject)

      } else {
        type.map((item) => {
            let obj = {
              x:item.year,
              y:item.total ? item.total : item.count
            }
            object.push(obj)
        })
        setSecondObject([])
        setObject(object)
      }

    }
  }

  const fetchData = () => {

  }

  useEffect(() => {
    if(averageItemsInOrderPerYear && averagePricePerOrderByYear && salesPerYear && orderTypesPerYear){
      fetchAllYears()
      fetchData()
    }
  },[averageItemsInOrderPerYear,averagePricePerOrderByYear,salesPerYear,orderTypesPerYear,optionsState])

    const options = {
        chart: {
            type: 'bar',
            height: 380
          },
            plotOptions: {
            bar: {
              borderRadius: 20,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          xaxis: {
            type: 'category',
            labels: {
            //   formatter: function(val) {
            //     return "Q" + dayjs(val).quarter()
            //   }
            },

            group: {
              style: {
                fontSize: '10px',
                fontWeight: 700
              },
              // groups: [
              //   { title: '2019', cols: 4 },
              //   { title: '2020', cols: 4 }
              // ]
            }
          },

          tooltip: {
            x: {
            //   formatter: function(val) {
            //     return "Q" + dayjs(val).quarter() + " " + dayjs(val).format("YYYY")
            //   }
            }
          },
          dataLabels: {
            enabled: false,
            style: {
              colors: ['#000000']
            },
            offsetY: 15, // play with this value
          },
          yaxis: {
            labels: {
              formatter: (value) => {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
            }
          }
    }

    let series = null



    if(object){

       series =  [{
        data: object
      }]
    }

    if(object && secondObject.length > 0 ){

      series =  [{
       name: "הזמנה רגילה",
       data: object
     },
     {
       name: "אשראי",
       data: secondObject
     }]
   }


    return (
        <div className=' salesPerMonthSegment_container'>

            <div className='calendar flex-container'>
              <div className='col-lg-6'> </div>
                <div className='col-lg-4 compare-select-cont' >
                  <MySelectBox
                      data={['מחזור','ממוצע להזמנה','ממוצע פריטים להזמנה','הזמנות שוטף/אשראי']}
                      globalFileServer={'globalFileServer'}
                      defaultTitle={'בחר מוצר'}
                      openSelect={openSelect}
                      setOpenSelect={setOpenSelect}
                      optionsState={optionsState}
                      setOptionState={setOptionState}
                  />
                </div>

            </div>

           <ReactApexChart options={options} series={series} type="bar" height={380} />
        </div>
    );
};

export default ColumnYear;
