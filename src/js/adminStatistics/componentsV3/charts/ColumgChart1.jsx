import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import MySelectBox from '../../componentsV3/MySelectBox';
const ColumgChart1 = ({averageItemInOrderPerMonth,averagePricePerOrderByMonth,orderTypesPerMonths,salesPerMonth}) => {
  // console.log('1',averageItemInOrderPerMonth)
  // console.log('2',averagePricePerOrderByMonth)
  // console.log('3',orderTypesPerMonths)
  // console.log('4',salesPerMonth)

  const [year, setYear] = useState([])
  const [object, setObject] = useState([])
  const [secondObject, setSecondObject] = useState([])
  const [currentYear, setCurrentYear] = useState('2022')

  const [openSelect, setOpenSelect] = useState(false); //to open the selectbox
  const [optionsState, setOptionState] = useState('בחר'); //output

  const covertNumberToHebrewMont = (number) => {
    let data = null
    if(number == 1){
      data = 'ינואר'
    } else if(number == 2){
      data = 'פברואר'
    } else if (number == 3){
      data = 'מרץ'
    }else if(number == 4){
      data = 'אפריל'
    } else if (number == 5){
      data = 'מאי'
    }else if(number == 6){
      data = 'יוני'
    } else if (number == 7){
      data = 'יולי'
    }else if(number == 8){
      data = 'אוגוסט'
    } else if (number == 9){
      data = 'ספטמבר'
    }else if(number == 10){
      data = 'אוקטובר'
    } else if (number == 11){
      data = 'נובמבר'
    } else if (number == 12){
      data = 'דצמבר'
    }
    return data
  }

  const fetchActualData = (type) => {
    let data = null;
    if('הזמנות שוטף/אשראי' == type){
      data = orderTypesPerMonths;
    } else if('ממוצע להזמנה' == type){
      data = averagePricePerOrderByMonth;
    } else if('ממוצע פריטים להזמנה' == type){
      data = averageItemInOrderPerMonth;
    } else if('מחזור' == type){
      data = salesPerMonth;
    }
    return data;
  }
  const fetchAllYears = () => {
    let years = []
    let object = []
    let type = fetchActualData(optionsState)
    if(type){
      if(type.sent && type.draft){
        let firstObject = []
        let secondObject = []
        type.sent.map((item) => {
          years.push(item.year)
          if( item.year == currentYear){
            let monthName = covertNumberToHebrewMont(item.month ? item.month : item.monthNumber)
            let obj = {
              x:monthName,
              y:item.total ? item.total : item.count
            }
            firstObject.push(obj)
          }

        })

        type.draft.map((item) => {
          years.push(item.year)
          if(item.year == currentYear){
            let monthName = covertNumberToHebrewMont(item.month ? item.month : item.monthNumber)
            let obj = {
              x:monthName,
              y:item.total ? item.total : item.count
            }
            secondObject.push(obj)
          }

        })
        let uniqueYear = [...new Set(years)];
        setYear(uniqueYear)
        setObject(firstObject)
        setSecondObject(secondObject)

      } else {
        type.map((item) => {
          years.push(item.year)
          if(item.year == currentYear){
            let monthName = covertNumberToHebrewMont(item.month ? item.month : item.monthNumber)
            let obj = {
              x:monthName, //here
              y:item.total ? item.total : item.count
            }
            object.push(obj)
          }
        })
        setSecondObject([])
        let uniqueYear = [...new Set(years)];
        setYear(uniqueYear)
        setObject(object)
      }

    }
  }

  const fetchData = () => {

  }

  useEffect(() => {
    if(averageItemInOrderPerMonth && averagePricePerOrderByMonth && orderTypesPerMonths && salesPerMonth){
      fetchAllYears()
      fetchData()
    }
  },[averageItemInOrderPerMonth,averagePricePerOrderByMonth,orderTypesPerMonths,salesPerMonth,optionsState,currentYear])

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
                <div className='col-lg-6 calendar_block flex-container'>

                {year.map((item,index) =>
                    <div className='btn_year' onClick={() => setCurrentYear(item)}>
                        <div className={`calendar_btn ${item == currentYear ? 'clickedBtn' : null}`} key={index}>
                            <h1 >{item}</h1>
                        </div>
                    </div>
                )}
                </div>
                <div className='col-lg-4 compare-select-cont'>
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

export default ColumgChart1;
