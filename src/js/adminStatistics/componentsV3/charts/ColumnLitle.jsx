import React from 'react';
import ReactApexChart from 'react-apexcharts';
const ColumnLitle = ({last}) => {
    const options = {
      dataLabels: {
        enabled: false,
        offsetX: 20,
        style: {
          fontSize: '12px',
          colors: ['#000']
        }
      },
      chart: {
        type: 'bar',
        height: 450,
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            show:false,
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 0,
          dataLabels: {
            total: {
              enabled: false,
              style: {
                fontSize: '1px',
                fontWeight: 900
              }
            }
          }
        },
      },
      xaxis: {
        show: false,
        labels: {
            show: false
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
        },
      yaxis: {
        show:false
      },
      legend: {
        show:false,
        position: 'right',
        offsetY: 40
      },
      fill: {
        opacity: 1
      }
    }

    const series = last

    return (
        <div>
           <ReactApexChart options={options} series={series} type="bar" height={150} />
        </div>
    );
};

export default ColumnLitle;