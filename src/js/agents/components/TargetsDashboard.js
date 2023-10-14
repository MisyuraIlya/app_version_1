import React, { useEffect, useState } from 'react';
import MyCard from '../ui/MyCard/MyCard';
import ReactApexChart from 'react-apexcharts';
import YearSelectorBanner from './YearSelectorBanner/YearSelectorBanner';


const TargetsDashboard = ({targets}) => {
    const optionsMob = {
      chart: {
        height: 350,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      colors: ['#FFAD0D'],
      dataLabels: {
        formatter: function(val, opt) {
          const goals =
            opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
              .goals
      
          if (goals && goals.length) {
            return `${val} / ${goals[0].value}`
          }
          return val
        },
        enabled: false

      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: ['מכירות', 'יעד'],
        markers: {
          fillColors: ['#FFAD0D', '#6F3FF5']
        },
        fill: {
          colors: ['#FFAD0D', '#6F3FF5']
        }
      }
    }
    const optionsDesktop = {
        chart: {
            height: 350,
            width: 600,
            type: 'bar'
          },
          plotOptions: {
            bar: {
              columnWidth: '60%'
            }
          },
          colors: ['#FFAD0D'],
          dataLabels: {
            enabled: false
          },
          legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: ['מכירות', 'יעד'],
            markers: {
              fillColors: ['#FFAD0D', '#6F3FF5']
            }
          },
          fill: {
            colors: ['#FFAD0D', '#6F3FF5']
          }
    }
    const [setData, setSerData] = useState([])
    const seriesDesktop =[
        {
          name: 'Actual',
          data: setData
        }
    ]


    const prepareObject = () => {

      const arr = [];
      targets.map((item,index) => {
        let obj = {
          x:item.Month,
          y:item.CurrentValue,
          goals:null
        }
        if(item.TargetValue){
          obj.goals = [
            {
              name:'Expected',
              value:item.TargetValue,
              strokeHeight: 5,
              strokeColor: '#775DD0'

            }
          ]
        }

        arr.push(obj)
      })
      setSerData(arr)
    }
    useEffect(() => {
      prepareObject()
    },[targets])

    return (
        <div className='myMarginTop myMarginBottom'>
          
            <MyCard>
                
                <div className='container targets-cont'>
                    <h4>עמידה ביעדים</h4>
                    <div className='myMarginTop'>
                      <YearSelectorBanner isDashborad={true}/>
                    </div>
                    {window.innerWidth > 1050 ?
                    <ReactApexChart options={optionsDesktop} series={seriesDesktop} type="bar" height={350} /> 
                     :
                     <ReactApexChart options={optionsMob} series={seriesDesktop} type="bar" height={550}  styles />
                    }

                </div>
            </MyCard>
        </div>
    );
};

export default TargetsDashboard;