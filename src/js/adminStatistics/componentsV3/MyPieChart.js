import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import chroma from "chroma-js";


const MyPieChart = ({title,price}) => {


  const numDataPoints = title.length;
  const colorScale = chroma.scale('Set1').colors(numDataPoints);
  
    const options = {
        chart: {
          width: 380,
          type: 'donut',
        },
        colors: colorScale,

        labels: title,
        dataLabels: {
          enabled: true
        },
        responsive: [{
          breakpoint: 680,
          options: {
            chart: {
              height: 950
            },
            legend: {
              show: true,
              position: 'bottom'
            }
          }
        }],
        legend: {
          show: true,
          position: 'right',
          offsetY: 0,
        },
        yaxis: {
          labels: {
            formatter: (value) => {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
          }
        }

    }

    const series = price


    return (
        <div>
            <ReactApexChart options={options} series={series} type="pie"  height={950} />
        </div>
    );
};

export default MyPieChart;
