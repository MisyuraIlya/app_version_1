import React from 'react';
import MyCard from '../../ui/MyCard/MyCard';
import MyCardCircle from '../../ui/MyCardCircle/MyCardCircle';
import Tabs, {Tab} from 'react-best-tabs';
import MyDivider from '../../ui/MyDivider/MyDivider';
import Wrap from '../../ui/Wrap/Wrap';
import { useMyAgent } from '../../store/AgentStore';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../utils/constants/tabsRouter';
import { ReturnTabNumber } from '../../utils/helpers/TabsRouter';
import { FetchHistoryAgentId } from '../../utils/helpers/FetchHistoryAgentId';
import MobileInfoBanner from './MobileInfoBanner';
const InfoBanner = () => {
    const history = useHistory()
    const {agentInfo,MyAgentMethods} = useMyAgent()
    
    let currentTab = ReturnTabNumber(history.location.pathname.split('/')[1]);
    if(!currentTab){
        currentTab = ROUTES.AGENT_DASHBOARD.id;
    }
    const agentId = FetchHistoryAgentId(history);

    const handleTabsROuter = (tabNumber) => {
        switch(tabNumber) {
            case 1:
                history.push(ROUTES.AGENT_DASHBOARD.path + `/${agentId}`)
            break;
            case 2:
                history.push(ROUTES.OBJECTIVE.path + `/${agentId}`)
            break;
            case 3:
                history.push(ROUTES.VISITS.path + `/${agentId}` + `/1`)
            break;
            case 4:
                history.push(ROUTES.TARGET.path + `/${agentId}`)
            break;
        }
    }

    useEffect(() => {
        if(currentTab<4){
            document.getElementById("tabs-cont").scrollLeft = -((currentTab-1)*70);
        }else{
            document.getElementById("tabs-cont").scrollLeft = -((currentTab-1)*80);
        }
    },[history.location.pathname])
  
   

    return (
        <>
            <div id = 'tabs-cont' className='myDesktop tabs-cont'>
                <div className='InfoBanner'>
                    {/*<MyDivider/>*/}
                    <div id = 'tabsBar' className='flex-container TabsBar'>
                        <Tabs
                            activeTab={currentTab}
                            className=""
                            ulClassName=""
                            activityClassName="bg-success"
                            onClick={(event, tab) => handleTabsROuter(tab)}
                            >
                            <Tab  title="דאשבורד" className="mr-4 tab-1">
                            </Tab>
                            <Tab title="משימות" className="mr-4 tab-2">
                            </Tab>
                            <Tab title="תבניות ביקורים" className="mr-4 tab-3">
                            </Tab>
                            <Tab title="יעדים" className="mr-4 tab-4">
                            </Tab>
                        </Tabs>
                    </div>
                </div>

            </div>
{/*
            <div className='myMobile'>
                <MobileInfoBanner
                    agentInfo={agentInfo}
                    handleTabsROuter={handleTabsROuter}
                    currentTab={currentTab}
                />
            </div>
    */}
        </>

    );
};

export default InfoBanner;