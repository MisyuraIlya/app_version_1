import React, { useEffect, useState } from 'react';
import TargetList from './components/TargetList/TargetList';
import EditModal from './components/EditModal';
import { useMyModal } from '../../store/ModalStore';
const TargetModule = () => {

    //stores
    const {MyModalMethods} = useMyModal()

    //states
    const [activeTargetModal, setActiveModal] = useState(false)
    const [objectInfo, setObjectInfo] = useState({})

    //helpers
    const handleOpenModal = (card) => {
        setObjectInfo(card)
        setActiveModal(true)
        MyModalMethods.setModalOpen(true)
    }

    const handleCloseModal = () => {
        setObjectInfo({})
        setActiveModal(false)
        MyModalMethods.setModalOpen(false)
    }
    return (
        <div className='TargetListCont'>
            <TargetList handleOpenModal={handleOpenModal}/>
            {activeTargetModal &&
                <EditModal objectInfo={objectInfo} handleCloseModal={handleCloseModal} />
            }
        </div>
    );
};

export default TargetModule;