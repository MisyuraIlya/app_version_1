import React from 'react';
import ReactApexChart from 'react-apexcharts';
import MyCard from '../ui/MyCard/MyCard';
import Wrap from '../ui/Wrap/Wrap';
import { useHistory } from 'react-router-dom';
import { useMyAgent } from '../store/AgentStore';
import AgentsList from '../components/InfoBanner/AgentsList';

const AgentPerformanceInfo = ({performanceInfo, triggerAgentListMob}) => {
    const history = useHistory();
    const {agentInfo,MyAgentMethods} = useMyAgent();

    const numberWithCommas = (x)=> {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className='myMarginTop'>
            <MyCard>
                <div className='InfoBanner AgentPerformanceInfo'>
                    <div className='flex-container flexCont'>
                        <div className='col-lg-8 info-box-right-maincont'>
                            <div className='flex-container col-lg-12 info-box-right-cont'>
                                <div className='flex-container col-lg-2 agent-name'>
                                    <div className='agent-name-subcont'>
                                        <span className="material-symbols-outlined">support_agent</span>
                                        <h4 className='mainName'>{agentInfo.Name}</h4>
                                    </div>
                                    {localStorage.role || (localStorage.agent && JSON.parse(localStorage.agent).Super) && !JSON.parse(localStorage.agent).IsMisrad && 
                                        <div className='agentsListMobBtn' onClick={()=>triggerAgentListMob(true)}>
                                            <span className="material-symbols-outlined">list_alt</span>
                                        </div>
                                    }
                                </div>
                                <div className='col-lg-10 info-box-left-cont'>
                                    <div className='info-box'>
                                        <span className="material-symbols-outlined">monitoring</span>
                                        <p  className='title'>סה״כ שנתי</p>
                                        <p className='desc'>{performanceInfo.TotalOrderSum ? numberWithCommas(parseInt(performanceInfo.TotalOrderSum)) : ''}</p>
                                    </div>
                                    <div className='info-box'>
                                        <span className="material-symbols-outlined">analytics</span>
                                        <p  className='title'>סל ממוצע</p>
                                        <p className='desc'>{performanceInfo.DailySalesSum ? numberWithCommas(parseInt(performanceInfo.MonthlyAverage)) : ''}</p>
                                    </div>
                                    <div className='info-box'>
                                        <span className="material-symbols-outlined">group</span>
                                        <p  className='title'>לקוחות</p>
                                        <p className='desc'>{performanceInfo.ClientsAssigned ? parseInt(performanceInfo.ClientsAssigned) : '0'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 flex-container info-box-left-cont main-ttls'>
                            <div className='col-lg-6 myCenterAlign'>
                                <div>
                                    <h3 className='title'>סה״כ יומי</h3>
                                    <Wrap>
                                    {performanceInfo.DailySalesSum ? numberWithCommas(parseInt(performanceInfo.DailySalesSum)) : ''}
                                    </Wrap>
                                </div>
                            </div>
                            <div className='col-lg-6 myCenterAlign'>
                                <div>
                                    <h3 className='title'>כמות עסקאות יומי</h3>
                                    <Wrap>
                                    {performanceInfo.DailySalesQuantity ? parseInt(performanceInfo.DailySalesQuantity) : ''}
                                    </Wrap>
                                </div>
                            </div>
                            <div className='col-lg-6 myCenterAlign'>
                                <div>
                                    <h3 className='title'>סה״כ חודשי</h3>
                                    <Wrap>
                                    {performanceInfo.DailySalesSum ? numberWithCommas(parseInt(performanceInfo.monthlySalesSum)) : ''}
                                    </Wrap>
                                </div>
                            </div>
                            <div className='col-lg-6 myCenterAlign'>
                                <div>
                                    <h3 className='title'>עמידה ביעד</h3>
                                    <Wrap>
                                    {performanceInfo.DailySalesQuantity ? parseInt(performanceInfo.targetPercentage) + '%' : '0%'}
                                    </Wrap>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </MyCard>
        </div>
    );
};

export default AgentPerformanceInfo;