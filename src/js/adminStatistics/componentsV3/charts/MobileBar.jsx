import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const MobileBar = ({info}) => {

    const [datesArr, setDatesArr] = useState([])
    const [lableArr, setLableArr] = useState([])
    const [sumArr, setSumArr] = useState([])
    const [resData, setResData] = useState([])
    const [years,setYears] = useState([])
    const [choosedYear, setChoosedYear] = useState('2022')


    const series = resData
    

      const options = {
        chart: {
            type: 'bar',
            height: 430
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                position: 'top',
              },
            }
          },
          dataLabels: {
            enabled: true,
            offsetX: 20,
            style: {
              fontSize: '12px',
              colors: ['#000']
            }
          },
          stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
          },
          tooltip: {
            shared: true,
            intersect: false
          },
        //   xaxis: {
            
        //   },



        xaxis: {
            categories: datesArr,

        show: false,
        labels: {
            show: false
        },
        axisBorder: {
            show: true
        },
        axisTicks: {
            show: true
        }
        },
    }


    const splitFunction = () => {
        let datesArr = []
        let lableArr = []
        let sumArr = []
        let data = []
        
        let arr = []
        info.map((item,index) => {
            if(item.yearNumber == choosedYear){
                datesArr.push(item.monthNumber)
                lableArr.push(item.title)
            
                let obj = {
                    title:item.title,
                    sumArr: takeSumsCorrectly(item.title)
                }
                data.push(obj)
            }
        })

        let newData= data.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.title === value.title 
        ))
        )

        let uniqMonth = [...new Set(datesArr)];
        let uniqTitle = [...new Set(lableArr)];

        setDatesArr(uniqMonth)
        setLableArr(uniqTitle)
        let mobileData = []
        newData.map((item) => {
            let obj = {
                name: item.title,
                data:item.sumArr
            }
            mobileData.push(obj)
        })

        setResData(mobileData)
    }

    const takeSumsCorrectly = (title) => {
        let sums = [];
        
        info.map((item,index) => {
            if(item.yearNumber == choosedYear){
                if(title == item.title){
                    sums.push(parseFloat(item.sum).toFixed(1))
                }
            }
        })

        return sums;
    }

    const fetchAllYears = () => {
        let year = [];
        info.map((item,index) => {
            year.push(item.yearNumber)
        })

        let uniq = [...new Set(year)];
        setYears(uniq)
    }

    useEffect(() => {
        if(info){
            splitFunction()
            fetchAllYears()
        }
    },[info])


    useEffect(() => {
        if(info){
            splitFunction()

        }
    },[choosedYear])
    return (
        <div className=' salesPerMonthSegment_container'>
            <div className='calendar flex-container'>
                <div className='calendar_block flex-container'>

                {info && years.map((item,index) => 
                    <div className='btn_year'>
                        <div className={`calendar_btn ${item == choosedYear ? 'clickedBtn' : null}`} key={index}>
                            <h1 onClick={() => setChoosedYear(item)}>{item}</h1>
                        </div>
                    </div>

                )}
                </div>

            </div>
           <ReactApexChart options={options} series={series} type="bar" height={2230} /> 
        </div>
    );
};

export default MobileBar;