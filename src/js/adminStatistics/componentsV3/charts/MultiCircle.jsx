import React from 'react';
import ReactApexChart from 'react-apexcharts';
const MultiCircle = ({precent}) => {
    const options = {
        chart: {
            height: 350,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '70%',
              }
            },
          },
          labels: ['כמות'],
    }

    const series = [precent]

    return (
        <div>
            <ReactApexChart options={options} series={series} type="radialBar" height={180} />
        </div>
    );
};

export default MultiCircle;