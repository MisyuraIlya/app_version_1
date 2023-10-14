import React, { useState } from 'react';
import MySideButton from '../../ui/MySideButton/MySideButton';
// import CreateModal from './components/CreateModal';
import CreateModal from './components/CreateModal';
import { useMyModal } from '../../store/ModalStore';
import AgentFormsList from './components/AgentFormsList/AgentFormsList';
import AgentFormDetailed from './components/AgentFormDetailed/AgentFormDetailed';
import { useMyQuestionDocsStore } from '../../store/QuestionDocsStore';
import AgentFormFilter from './components/AgentFormFilter/AgentFormFilter';
import MyPagination from '../../ui/MyPagination/MyPagination';
import { useHistory } from 'react-router-dom';
import { fetchPage } from '../../services/localstorage/pagination.service';
const QuestionsFormModule = () => {

    //store
    const {MyQuestionDocsStoreMethods,paginationObject,searchValue} = useMyQuestionDocsStore()
    const {MyModalMethods} = useMyModal()
    // const [pagination, setPagination] = useState('1')

    //states
    const history = useHistory()
    const [activeCreteModal, setActiveCreateModal] = useState(false)
    const [activeFormDetailed, setActiveFormDetailed] = useState(false)
    const [choosedObject, setChoosedObject] = useState({})
    //helpers
    const handleActiveModal = () => {
        setActiveCreateModal(true)
        MyModalMethods.setModalOpen(true)
    }

    const handleCloseModal = () => {
        setActiveCreateModal(false)
        MyModalMethods.setModalOpen(false)
    }

    const handleOpenFormDetailed = (object) => {
        setActiveFormDetailed(true)
        setChoosedObject(object)
        MyQuestionDocsStoreMethods.fetchAgentDetailedForm(object.Id)
    }

    const handleCloseFormDetailed = () => {
        setActiveFormDetailed(false)
        MyQuestionDocsStoreMethods.setAgentFormDetailed([])
        setChoosedObject({})
    }

     return (
        <div>
            <div className='myMarginTop'>
                <AgentFormFilter/>
            </div>
            <div className='myMarginTop'>
                {!activeFormDetailed ? <AgentFormsList handleOpenFormDetailed={handleOpenFormDetailed} pagination={fetchPage(history)}/> : <AgentFormDetailed choosedObject={choosedObject} handleCloseFormDetailed={handleCloseFormDetailed}/>}
            </div>
            
            {activeCreteModal && <CreateModal handleCloseModal={handleCloseModal}/> }

            <MySideButton onClickBtn={handleActiveModal}  imgLink={globalFileServer + 'agentApp/+Icon.png'}/>
            <div className='myMarginTop'>
                <MyPagination
                    paginateObj={paginationObject}
                    headProps={{page:fetchPage(history), lang:'he'}}
                    headLocation={searchValue} 
                    lang={'he'}
                />
            </div>
        </div>
    );
};

export default QuestionsFormModule;