import React from 'react';
import Wrap from '../../ui/Wrap/Wrap';
import MyDivider from '../../ui/MyDivider/MyDivider';
import MyCardCircle from '../../ui/MyCardCircle/MyCardCircle';
import MyCard from '../../ui/MyCard/MyCard';
import Tabs, {Tab} from 'react-best-tabs';
const MobileInfoBanner = ({agentInfo,handleTabsROuter,currentTab}) => {
    return (
        <MyCard>
            <div className='InfoBanner'>
                <div className='flex-container myPadding'>
                    <div className='col-lg-6'>
                        <div className='flex-container'>
                            <div className='col-lg-6 myCenterAlign'>
                                <img src={ globalFileServer + 'avatar.png'}/>
                            </div>
                            <div className='col-lg-6'>
                                <h4 className='mainName'>{agentInfo.Name}</h4>
                            </div>
                        </div>

                        <div className='flex-container'>
                            <img src={globalFileServer + 'agentApp/Time.svg'} className="myPadding iconImg"/>
                            <p  className='title'>ותק בשנים <span  className='desc'>{agentInfo.Standing}</span></p>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='flex-container'>
                            <img src={globalFileServer + 'agentApp/Icon.svg'} className="myPadding iconImg"/>
                            <p className='title'>עסקאות:  <span className='desc'>{agentInfo.TotalDeals}</span></p>
                        </div>
                        <div className='flex-container'>
                            <img src={globalFileServer + 'agentApp/Cart.svg'} className="myPadding iconImg"/>
                            <p  className='title'>סך עסקאות: <span  className='desc'>{agentInfo.TotalDeals}</span></p>
                        </div>
                        <div className='flex-container'>
                            <img src={globalFileServer + 'agentApp/Clients.svg'} className="myPadding iconImg"/>
                            <p  className='title'>לקוחות: <span  className='desc'>{agentInfo.TotalCustomers}</span></p>
                        </div>
                    </div>
                </div>
                <div className='myPadding'>
                    <MyDivider/>
                </div>
                <div className='flex-container myPadding'>
                    <div className='col-lg-12 flex-container'>
                        <div className='col-lg-4 myCenterAlign'>
                            <div>
                                <h3 className='title'>סל ממוצע</h3>
                                <Wrap>
                                {agentInfo.AverageDeals}
                                </Wrap>
                            </div>
                        </div>
                        <div className='col-lg-4 myCenterAlign'>
                            <div>
                                <h3 className='title'>שיא עסקאות</h3>
                                <Wrap>
                                {agentInfo.TopDeals}
                                </Wrap>
                            </div>
                        </div>
                        
                        <div className='col-lg-4 myCenterAlign'>
                                <MyCardCircle imgLink={globalFileServer + 'agentApp/Draw.svg'}/>
                        </div>
                    </div>
                </div>        
                <MyDivider/>
                <div className='flex-container TabsBar'>
                    <Tabs
                        activeTab={currentTab}
                        className=""
                        ulClassName=""
                        activityClassName="bg-success"
                        onClick={(event, tab) => handleTabsROuter(tab)}
                        >
                        <Tab title="דאשבורד" className="mr-4">
                        </Tab>
                        <Tab title="יעדים" className="mr-4">
                        </Tab>
                        <Tab title="משימות" className="mr-4">
                        </Tab>
                        <Tab title="שאלונים" className="mr-4">
                        </Tab>
                        <Tab title="תבניות ביקורים" className="mr-4">
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </MyCard>
    );
};

export default MobileInfoBanner;