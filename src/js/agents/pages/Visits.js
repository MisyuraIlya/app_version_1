import React, {useEffect} from 'react';
import AgentLayout from '../components/layout/AgentLayout';
import Container from '../ui/Container/Container';
import VisitsModule from '../modules/Visits/VisitsModule';
import MySideButton from '../ui/MySideButton/MySideButton';
import VisitsFilter from '../modules/Visits/components/VisitsFilter';
import MyPagination from '../ui/MyPagination/MyPagination';
import { useMyVisits } from '../store/VIsitsStore';
import { fetchPage } from '../services/localstorage/pagination.service';
import { useHistory } from 'react-router-dom';
import MyCard from '../ui/MyCard/MyCard';
import AgentsList from '../components/InfoBanner/AgentsList';

const Visits = () => {
    const history = useHistory()
    const {paginationObject,searchValue,searchValueDebounced,MyVisitsMethods} = useMyVisits()
    useEffect(() => {
        if(!searchValueDebounced){
            MyVisitsMethods.fetchVisitsList()
        }
    },[searchValueDebounced,history.location.pathname])

    return (
        <div className='page-container myMarginTop agentVisitsPage'>
            <Container>
                {localStorage.role || (localStorage.agent && JSON.parse(localStorage.agent).Super) && <AgentsList/>}
                <AgentLayout>
                    <div className='myPadding'>
                        <VisitsFilter/>
                    </div>
                    <div className='myPadding'>
                        <MyCard>
                            <VisitsModule/>
                        </MyCard>
                    </div>

                    <div className='myMarginTop'>
                        <MyPagination
                            paginateObj={paginationObject}
                            headProps={{page:fetchPage(history), lang:'he'}}
                            headLocation={searchValue} 
                            lang={'he'}
                        />
                    </div>
                </AgentLayout>
            </Container>
        </div>
    );
};

export default Visits;