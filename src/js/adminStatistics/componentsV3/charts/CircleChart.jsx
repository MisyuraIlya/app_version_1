import React from 'react';
import ReactApexChart from 'react-apexcharts';
const CircleChart = ({info}) => {
    const options = {
        chart: {
            width: 380,
            type: 'donut',
          },
          labels: ["הזמנה רגילה", "אשראי"],
          dataLabels: {
            enabled: false
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false
              }
            }
          }],
          legend: {
            position: 'bottom',
            offsetY: 0,
          }
          
    }

    const series = [parseFloat(info.totalCards),parseFloat(info.totalSimple)]
    return (
        <div className='myCenter'>
           <ReactApexChart options={options} series={series} type="donut" width={400} /> 
        </div>
    );
};

export default CircleChart;