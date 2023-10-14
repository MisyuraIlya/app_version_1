import React, { useEffect, useState } from 'react';
import Tabs, {Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import MainApp from './MainAppAgentStats';
import { useMyCalendar } from './states/CalendarProvider';
import moment from 'moment-timezone';
import { useHistory } from 'react-router-dom';
import { useShop } from './states/ShopProvider';
const AgentStatisticsNew = () => {

    const {openCalendar,methods, dateFrom, dateTo, dataType} = useMyCalendar();
    const {data} = useShop();
    const history = useHistory();
    let pathTab = history.location.pathname.split('/')[2]
    const [tabNumber, setTabNumber] = useState(1)


    const dateHanlder = (tab) => {

        if(tab == 1){
            methods.setDateFrom(new Date());
            methods.setDateTo(new Date());
            methods.FindButtonHandler(moment(),new Date());
            history.push(`/statistics/${tab}`)
        } else if (tab == 3){
            methods.setDateFrom(moment().startOf('month'));
            methods.setDateTo(new Date());
            methods.FindButtonHandler(moment().startOf('month'),new Date());
            history.push(`/statistics/${tab}`)

        } else if (tab == 4){
            methods.setDateFrom(moment().startOf('year'));
            methods.setDateTo(new Date());
            methods.FindButtonHandler(moment().startOf('year'),new Date());
            history.push(`/statistics/${tab}`)
        }
    }
    // console.log(data)
    // useEffect(() => {
    //     if(!data.length > 0){
    //         dateHanlder(pathTab)
    //     }
    // },[])
    return (
        <div className="App">
            <div className='container container-app'>
                <Tabs
                    activeTab={pathTab}
                    className=""
                    ulClassName=""
                    activityClassName="bg-success"
                     onClick={(event, tab) => setTabNumber(tab)}
                    >
                    <Tab title="יומי" className="mr-3">
                        {tabNumber == 1 &&
                            <div className="mt-3">
                                <MainApp tabNumber={tabNumber} dateName={'יומי'}/>
                            </div>
                        }
                    </Tab>
                   
                    <Tab title="חודשי" className="mr-3">
                        <div className="mt-3">
                            {tabNumber == 2 &&
                                <MainApp  tabNumber={tabNumber} dateName={'חודשי'}/>
                            }
                        </div>
                    </Tab>
                    
                    <Tab title="שנתי" className="mr-3">
                        <div className="mt-3">
                        {tabNumber == 3 &&
                            <MainApp   tabNumber={tabNumber} dateName={"שנתי"}/>
                        }
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default AgentStatisticsNew;
