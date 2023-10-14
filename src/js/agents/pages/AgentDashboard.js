import React, { useEffect, useState } from 'react';
import AgentLayout from '../components/layout/AgentLayout';
import Container from '../ui/Container/Container';
import AgentPerformanceInfo from '../components/AgentPerformanceInfo';

import VisitsDashboard from '../components/VisitsDashboard';
import SalesDashboard from '../components/SalesDashboard';
import TargetsDashboard from '../components/TargetsDashboard';
import { useMyDashboard } from '../store/DashboardStore';
import { useMyTarget } from '../store/TargetStore';
import { useMyAgent } from '../store/AgentStore';

import NearestObjectives from '../components/NearestObjectives/NearestObjectives';
import EditModal from '../modules/Objectives/components/EditModal/EditModal';
import { useMyModal } from '../store/ModalStore';
import { useMyScheduleCalendar } from '../store/ScheduleCalendarStore';
import { useHistory } from 'react-router-dom';
import { fetchAgentNewGlobalFunc } from '../services/localstorage/agent.service';
import AgentsList from '../components/InfoBanner/AgentsList';

const AgentDashboard = () => {
    const history = useHistory()
    const {MyDashboardMethods,visits,sales,objectives,performanceInfo} = useMyDashboard()
    const {MyScheduleCalendarMethods} = useMyScheduleCalendar()
    const {MyModalMethods} = useMyModal()
    const [openEditModal, setOpenEditModal] = useState(false)
    const {targets, MyTargetMethods} = useMyTarget()
    const {agentMethods, MyAgentMethods} = useMyAgent()

    
    const [openAgentListMob, setOpenAgentListMob] = useState(false)


    const openEditHandler = (event) => {
        MyModalMethods.setModalOpen(true)
        setOpenEditModal(true)
        // MyScheduleCalendarMethods.fetchInfoModal(event.tableName, event.idDocument)
        MyScheduleCalendarMethods.fetchInfoModal2(event)
    }

    const closeEditHandler = () => {
        setOpenEditModal(false)
        MyModalMethods.setModalOpen(false)
    }

    const triggerAgentListMob = (param) => {
        setOpenAgentListMob(param)
    }

    useEffect(() => {
        MyDashboardMethods.FetchAllFuncs()
        MyTargetMethods.fetchTargetList()
        MyAgentMethods.fetchAgentList()
        setTimeout(() => {
			window.scrollTo(0, 0);
		}, 300);
    },[fetchAgentNewGlobalFunc(history)])

    
    return (
        <div className={!openAgentListMob ? 'page-container myMarginTop': 'page-container myMarginTop openAgentListMob'}>
            <Container>
                {localStorage.role || (localStorage.agent && JSON.parse(localStorage.agent).Super && !JSON.parse(localStorage.agent).IsMisrad) && <AgentsList triggerAgentListMob={triggerAgentListMob}/>}

                <AgentLayout>
                    <AgentPerformanceInfo performanceInfo={performanceInfo} triggerAgentListMob={triggerAgentListMob}/>
                    <VisitsDashboard visits={visits} objectives={objectives}/>
                    <NearestObjectives openEditHandler={openEditHandler}/>
                    {openEditModal && <EditModal closeEditHandler={closeEditHandler}/>}
                    <TargetsDashboard targets={targets}/>
                </AgentLayout>
            </Container>
        </div>
    );
};

export default AgentDashboard;