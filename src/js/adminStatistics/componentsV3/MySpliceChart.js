import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
const MySpliceChart = ({data}) => {
    const [time, setTime] = useState([])
    const [info, setInfo]= useState([])

    const prepareObj = () => {

      let timeArr = []
      let infoArr = []
      data && data.map((item) => {
        timeArr.push(item.hour+':00')
        infoArr.push(parseFloat(item.total))
      })

      setTime(timeArr)
      setInfo(infoArr)
    }
    const options = {
        chart: {
            height: 350,
            type: 'area',
            zoom: {
                enabled: false
              },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
          
            categories: time
          },
          tooltip: {
            // x: {
            //   format: 'HH'
            // },
          },          
          yaxis: {
            labels: {
              formatter: (value) => {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              }
            }
          }
        
    }

    const series = [{
        name: 'פעילות באתר',
        data: info
      }]


      useEffect(() => {
        if(data){
          prepareObj()
        }
      },[data])

    return (
        <div>
            <ReactApexChart options={options} series={series} type="area" height={470} />
        </div>
    );
};

export default MySpliceChart;