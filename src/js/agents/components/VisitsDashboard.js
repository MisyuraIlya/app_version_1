import React from 'react';
import ReactApexChart from 'react-apexcharts';
import MyCard from '../ui/MyCard/MyCard';
import Wrap from '../ui/Wrap/Wrap';

const VisitsDashboard = ({visits, objectives}) => {
    const total = visits.total
    const completed = visits.completed
    const precent = parseFloat((completed / total) * 100).toFixed(1) == 'NaN' ? 0 : parseFloat((completed / total) * 100).toFixed(1)
    const totalObj = objectives.total
    const completedObj = objectives.completed
    const precentObj = parseFloat((completedObj / totalObj) * 100).toFixed(1) == 'NaN' ? 0 : parseFloat((completedObj / totalObj) * 100).toFixed(1)



    const series2 = [precent]
    const options2 =  {
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
        labels: ['ביקורים'],
        colors:['#24426b']

    }
    const series1 = [precentObj]
    const options1 =  {
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
        labels: ['משימות'],
        colors:['#24426b']

    }
    return (
        <div className='myMarginTop'>
            <MyCard>
                <div className='flex-container visit-dash-cont'>
                    <div className='container flex-container col-lg-6'>
                        <div className='textAlign col-lg-4'>
                            <h3>ביקורים</h3>
                            <div className='text-wrap-cont'>
                                <h4>בוצע</h4>
                                <Wrap>
                                    {completed}
                                </Wrap>
                            </div>
                            <div className='text-wrap-cont'>
                                <h4>לביצוע</h4>
                                <Wrap>
                                    {total}
                                </Wrap>
                            </div>
                        </div>
                        <div className='apex-cont col-lg-7'>
                            <ReactApexChart options={options2} series={series2} type="radialBar" height={250} />
                        </div>
                    </div>
                    <div className='container flex-container col-lg-6'>
                        <div className='textAlign col-lg-4'>
                            <h3>משימות</h3>
                            <div className='text-wrap-cont'>
                                <h4>בוצע</h4>
                                <Wrap>
                                    {completedObj}
                                </Wrap>
                            </div>
                            <div className='text-wrap-cont'>
                                <h4>לביצוע</h4>
                                <Wrap>
                                    {totalObj}
                                </Wrap>
                            </div>
                        </div>
                        <div className='apex-cont col-lg-7'>
                            <ReactApexChart options={options1} series={series1} type="radialBar" height={250} />
                        </div>
                    </div>
                </div>
            </MyCard>
        </div>
    );
};

export default VisitsDashboard;