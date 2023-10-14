import React from 'react';
import AgentLayout from '../components/layout/AgentLayout';
import Container from '../ui/Container/Container';
import ObjectivesModule from '../modules/Objectives/ObjectivesModule';
import AgentsList from '../components/InfoBanner/AgentsList';

const Objectives = () => {
    return (
        <div className='page-container myMarginTop'>
            <Container>
                {localStorage.role || (localStorage.agent && JSON.parse(localStorage.agent).Super) && <AgentsList/>}
                <AgentLayout>
                    <ObjectivesModule/>
                </AgentLayout>
            </Container>
        </div>

    );
};

export default Objectives;