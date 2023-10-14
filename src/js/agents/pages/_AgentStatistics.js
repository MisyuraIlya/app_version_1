import React, { useEffect, useState } from 'react';
import Tabs, {Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import moment from 'moment-timezone';
import MainApp from '../../adminStatistics/MainApp';
import { useHistory } from 'react-router-dom';
import { useShop } from '../../adminStatistics/states/ShopProvider';
import AgentStatisticsModule from '../modules/AgentStatistics/AgentStatisticsModule';
import ColumgChart1 from '../../adminStatistics/componentsV3/charts/ColumgChart1';

const AgentStatistics = () => {

    // const {openCalendar,methods, dateFrom, dateTo, dataType} = useMyCalendar();
    const {data} = useShop();
    const history = useHistory();
    let pathTab = history.location.pathname.split('/')[2]
   

    return (
        <div className="App">
            <div className='container container-app'>
                <Tabs
                    activeTab={pathTab}
                    className=""
                    ulClassName=""
                    activityClassName="bg-success"
                    onClick={(event, tab) => dateHanlder(tab)}
                    >
                    <Tab title="יומי" className="mr-3">
                        <div className="mt-3">
                            <AgentStatisticsModule dateName={'יומי'}/>
                        </div>
                    </Tab>
                    <Tab title="שבועי" className="mr-3">
                        <div className="mt-3">
                            <AgentStatisticsModule dateName={'שבועי'}/>
                        </div>
                    </Tab>
                    <Tab title="חודשי" className="mr-3">
                        <div className="mt-3">
                            <AgentStatisticsModule dateName={'חודשי'}/>
                        </div>
                    </Tab>
                    <Tab title="שנתי" className="mr-3">
                        <div className="mt-3">
                            <AgentStatisticsModule dateName={'שנתי'}/>
                        </div>
                    </Tab>
                </Tabs>

                <div className='flex-container list-block'>
                  <div className='card_shadowing col-lg-12'>
                    <div className='container' >
                      <div className='list-block-title-cont comparison-block'>
                        <div className='title_cont'>
                          <h2>{'פילוח חודשי'}</h2>
                        </div>
                        {/*
                        <ColumgChart1
                        averageItemInOrderPerMonth={averageItemInOrderPerMonth}
                        averagePricePerOrderByMonth={averagePricePerOrderByMonth}
                        salesPerMonth={salesPerMonth}
                        orderTypesPerMonths={orderTypesPerMonths}
                      />*/}
                      </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    );
};

export default AgentStatistics;