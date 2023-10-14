import React from 'react';
import { MyAgentProvider } from './store/AgentStore';
import { MyObjectiveProvider } from './store/ObjectiveStore';
import { MyVisitsProvider } from './store/VIsitsStore';
import { MyTargetProvider } from './store/TargetStore';
import { MyModalProvider } from './store/ModalStore';
import MyModal from './ui/MyModal/MyModal';
import { MyQuestionDocsStoreProvider } from './store/QuestionDocsStore';
import MySideButton from './ui/MySideButton/MySideButton';
import { MyUsersProvider } from './store/UsersStore';
import { MyDashboardProvider } from './store/DashboardStore';
import { MyScheduleCalendarProvider } from './store/ScheduleCalendarStore';


const AgentReducer = ({children}) => {
    return (
        <MyAgentProvider>
            <MyUsersProvider>
                <MyTargetProvider>
                    <MyObjectiveProvider>
                        <MyVisitsProvider>
                            <MyQuestionDocsStoreProvider>
                                <MyModalProvider>
                                    <MyScheduleCalendarProvider>
                                        <MyDashboardProvider>
                                        <MyModal/>
                                        {children}
                                        </MyDashboardProvider>
                                    </MyScheduleCalendarProvider>
                                </MyModalProvider>
                            </MyQuestionDocsStoreProvider>
                        </MyVisitsProvider>
                    </MyObjectiveProvider>
                </MyTargetProvider>
            </MyUsersProvider>
        </MyAgentProvider>
    );
};

export default AgentReducer;