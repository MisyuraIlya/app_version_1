import React from 'react';
import AgentLayout from '../components/layout/AgentLayout';
import Container from '../ui/Container/Container';
import YearSelectorBanner from '../components/YearSelectorBanner/YearSelectorBanner';
import TargetModule from '../modules/Targets/TargetModule';
import MyCard from '../ui/MyCard/MyCard';
import AgentsList from '../components/InfoBanner/AgentsList';

const Target = () => {
    return (
        <div className='page-container myMarginTop targetPageCls myMarginBottom agentTargetPage'>
            <Container>
                {localStorage.role || (localStorage.agent && JSON.parse(localStorage.agent).Super) && <AgentsList/>}

                <AgentLayout>
                    <div className='myMarginTop'>
                        <MyCard>
                            <YearSelectorBanner/>
                        </MyCard>
                    </div>
                    <div className='myMarginTop'>
                        <MyCard>
                            <TargetModule/>
                        </MyCard>
                    </div>
                </AgentLayout>
            </Container>
        </div>
    );
};

export default Target;