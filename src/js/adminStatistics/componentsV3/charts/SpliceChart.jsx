import React from 'react';
import ReactApexChart from 'react-apexcharts';
const SpliceChart = ({last}) => {
    const options = {
      chart: {
        id: 'spark1',
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
          enabled: true
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 2,
          opacity: 0.2,
        }
      },
        
    }

    const series = [{
        name: 'ממוצע מכירות',
        data: last
      }
    ]

    return (
        <div>
            <ReactApexChart options={options} series={series} type="area" height={150} />
        </div>
    );
};

export default SpliceChart;