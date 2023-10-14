import React from 'react';

import MyCard from '../../ui/MyCard/MyCard';
import MyCardCircle from '../../ui/MyCardCircle/MyCardCircle';
import Tabs, {Tab} from 'react-best-tabs';
import MyDivider from '../../ui/MyDivider/MyDivider';
import Wrap from '../../ui/Wrap/Wrap';
import { useMyAgent } from '../../store/AgentStore';
import { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { ROUTES } from '../../utils/constants/tabsRouter';
import { ReturnTabNumber } from '../../utils/helpers/TabsRouter';
import { FetchHistoryAgentId } from '../../utils/helpers/FetchHistoryAgentId';
import MobileInfoBanner from './MobileInfoBanner';


const AgentsList = ({ triggerAgentListMob}) => {
    const history = useHistory()
    const {agentInfo,MyAgentMethods,agentList} = useMyAgent()

    let scrollFunc =()=>{

        setTimeout(() => {
			window.scrollTo(0, 0);
            triggerAgentListMob(false);

		}, 200);
    }
    return (
        <>
            <div className='agentsListMainCont'>
                <div className='AgentsList'>
                    {/*<MyDivider/>*/}
                    <div className='AgentsListCont'>
                        {agentList && agentList.length ? agentList.map((item,index) => {
                            return(
                                <NavLink key={index} to={'/agentDashboard/' + item.Id} onClick={()=> scrollFunc()}>
                                    <div className={index==0 ? 'set-border' : ''}>
                                        <div className={String(item.Id) == FetchHistoryAgentId(history) ? 'AgentsListContRow active' : 'AgentsListContRow'}>
                                            <p>{'#' + item.ExId}</p>
                                            <p>{item.Name}</p>
                                        </div>
                                    </div>
                                </NavLink>
                            )
                        }):null}
                    </div>
                </div>
            </div>

        </>

    );
};

export default AgentsList;