import React, { useState } from 'react';
import VisitsList from './components/VisitsList/VisitsList';
import EditModal from './components/EditModal';
import CreateModal from './components/CreateModal';
import MySideButton from '../../ui/MySideButton/MySideButton';
import { useMyModal } from '../../store/ModalStore';
const VisitsModule = () => {

    //stores
    const {MyModalMethods} = useMyModal()

    //states
    const [activeCreateModal, setActiveCreateModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)
    const [objectInfo, setObjectInfo] = useState({})


    //open/close handlers
    const openCreateModal = () => {
        setActiveCreateModal(true)
        MyModalMethods.setModalOpen(true)
    }

    const openEditModal = (card) => {
        setObjectInfo(card)
        setActiveEditModal(true)
        MyModalMethods.setModalOpen(true)
    }

    const closeCreateModal = () => {
        setActiveCreateModal(false)
        MyModalMethods.setModalOpen(false)
    }

    const closeEditModal = () => {
        setObjectInfo({})
        setActiveEditModal(false)
        MyModalMethods.setModalOpen(false)
    }
 

    return (
        <div>
            <VisitsList openEditModal={openEditModal}/>
            {activeEditModal&&<EditModal objectInfo={objectInfo} closeEditModal={closeEditModal}/>}
            {activeCreateModal&&<CreateModal closeCreateModal={closeCreateModal}/>}
            {localStorage.role || (localStorage.agent && JSON.parse(localStorage.agent).Super) && 
                <MySideButton onClickBtn={openCreateModal}  imgLink={globalFileServer + 'agentApp/+Icon.png'}/>
            }

        </div>
    );
};

export default VisitsModule;